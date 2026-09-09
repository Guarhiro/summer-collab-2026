import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = await readFile(new URL("../app/scrollToSection.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
});

function setup({ reducedMotion = false, exists = true } = {}) {
  const calls = [];
  const location = { hash: "" };
  const history = {
    state: { existingRouterState: "preserved" },
    pushState(state, title, hash) {
      calls.push({ type: "history", state, hash });
      location.hash = hash;
    },
  };
  const window = {
    location, history, scrollY: 1000,
    getComputedStyle: () => ({ scrollMarginTop: "10px" }),
    matchMedia: () => ({ matches: reducedMotion }),
    scrollTo: (options) => calls.push({ type: "scroll", ...options }),
  };
  const context = vm.createContext({
    exports: {}, window,
    document: { getElementById: () => exists ? { getBoundingClientRect: () => ({ top: 500 }) } : null },
  });
  vm.runInContext(outputText, context);
  const click = (overrides = {}) => {
    const event = {
      button: 0, currentTarget: { hash: "#work-05" },
      preventDefault() { this.defaultPrevented = true; },
      ...overrides,
    };
    context.exports.scrollToSection(event);
    return event;
  };
  return { click, calls, window };
}

test("number jump cancels native navigation and scrolls the document only once", () => {
  const { click, calls, window } = setup();
  assert.equal(click().defaultPrevented, true);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].state, window.history.state);
  assert.equal(calls[0].hash, "#work-05");
  assert.deepEqual(calls[1], { type: "scroll", top: 1490, behavior: "smooth" });
  // Subsequent manual scrolling does not trigger any further position restore.
  window.scrollY = 2400;
  assert.equal(calls.length, 2);
  click({ currentTarget: { hash: "#work-06" } });
  assert.equal(calls[2].hash, "#work-06");
  assert.equal(calls[3].top, 2890);
});

test("same number can be revisited without adding duplicate history", () => {
  const { click, calls } = setup();
  click();
  click();
  assert.equal(calls.filter((call) => call.type === "history").length, 1);
  assert.equal(calls.filter((call) => call.type === "scroll").length, 2);
});

test("reduced motion disables animated scrolling", () => {
  const { click, calls } = setup({ reducedMotion: true });
  click();
  assert.equal(calls[1].behavior, "instant");
});

test("modified clicks, canceled events and missing targets retain default behavior", () => {
  for (const override of [{ metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }, { defaultPrevented: true }]) {
    const { click, calls } = setup();
    click(override);
    assert.equal(calls.length, 0);
  }
  const { click, calls } = setup({ exists: false });
  assert.equal(click().defaultPrevented, undefined);
  assert.equal(calls.length, 0);
});
