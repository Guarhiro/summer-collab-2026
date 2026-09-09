# 肝試されてるのお前じゃん！ — BGMスタイル案

陽気でポンコツな幽霊との肝試しコメディを中心に、廃校の夜の不気味さと音楽室への謎を控えめに添える。音楽室を避ける理由や彼の過去は設定しない。いずれも歌・声なしのインストゥルメンタルで、紹介文や会話を読みやすい音数・音量にする。

## A案・採用：びびり幽霊のミッドナイト・スウィング

110 BPM、4/4拍子。軽いスウィングジャズとホラーコメディの組み合わせ。ピチカート弦、クラリネット、木琴、ウッドベース、ブラシドラムで、忍び足、得意げな登場、脅かし失敗のドタバタを表す。短い半音階フレーズで怖さを添え、途中に遠くの柔らかなピアノを数音だけ置いて、音楽室の謎をほのめかす。作品全体の常設BGM向け。

### 生成用スタイル文

Instrumental Japanese horror-comedy visual novel BGM, 110 BPM, light swing in 4/4. A cheerful, overconfident but easily frightened young ghost leads a noisy midnight exploration of an abandoned school. Playful pizzicato strings, cheeky clarinet, dry wooden xylophone, warm upright bass, soft brushed drums, and sparse celesta accents. A short, catchy motif with tiptoeing rhythms, gentle chromatic turns, and amusing call-and-response phrases. Mostly mischievous and endearing, with a small touch of spooky mystery. A brief, quiet passage with a few distant soft piano notes hints at an unexplained music room, then naturally returns to the playful theme. Spacious dialogue-friendly arrangement, steady moderate dynamics, smooth repeating sections, loop-friendly phrasing. No vocals, no humming, no spoken words, no screams, no sudden loud stingers, no aggressive horror drones, no dramatic climax.

## B案・探索向け：廃校こそこそ探検隊

98 BPM、4/4拍子。忍び足のピチカート、バスクラリネット、マリンバ、小さなウッドブロックを中心にした軽い室内楽。足を止めるような短い休符と、予想を外す楽器同士の受け答えで、調の空回りを可愛く表現。A案より静かで、探索や会話の邪魔になりにくい方向。

### 生成用スタイル文

Instrumental playful spooky exploration BGM, 98 BPM, 4/4. A clumsy young ghost and human friends tiptoe through an abandoned school at midnight. Light pizzicato chamber strings, mellow bass clarinet, warm marimba, tiny woodblock taps, and sparse celesta notes. Curious short phrases, little rests, gently surprising instrumental replies, a soft comic bounce, and subtle minor-key mystery. Quietly mischievous, charming, and slightly eerie. Keep the melody restrained and leave plenty of space for reading and conversation. Stable volume, smooth recurring sections, loop-friendly phrasing. No vocals, no humming, no spoken words, no jump-scare hits, no frightening sound effects, no heavy percussion, no large orchestral build.

## C案・音楽室の謎向け：音楽室の前で、ふと黙る

84 BPM、3/4拍子。柔らかなピアノとチェレスタを中心にした、小さなミステリー・ワルツ。薄い弦と、明るさの残る曖昧な和音で、いつも騒がしい調が静かになる瞬間を描く。悲劇や恋愛の結末は決めず、「何かある」という余韻にとどめる。物語後半や音楽室に近づく場面向け。

### 生成用スタイル文

Instrumental gentle mystery waltz for a Japanese visual novel, 84 BPM, 3/4. Outside a quiet music room in an abandoned school at midnight, a normally talkative young ghost unexpectedly falls silent. Soft felt piano, delicate celesta, sparse pizzicato notes, and a very light sustained string texture. A small unresolved motif, tender curiosity, moonlit stillness, and a trace of the ghost's playful personality. Emotionally ambiguous and quietly intriguing, without assuming a tragic backstory or romantic resolution. Intimate, spacious, understated, and suitable for reading dialogue. Gentle repeating phrases, stable quiet dynamics, no grand finale. No vocals, no humming, no spoken words, no heavy suspense drones, no screams, no loud sound effects.

## 制作状況

2026年9月9日、ユーザー指定によりA案を採用。確定した生成用スタイル文は `bgm-style-a.txt` に保存。B案・C案は比較用の記録として保持する。

同日、ユーザー提供の「びびり幽霊のミッドナイト・スウィング.m4a」を作品専用BGMとして採用。元音源は116.64秒、48 kHz・ステレオのOpus音声。Web配信用にMP3（192 kbps）へ変換し、`public/media/kimodameshi/midnight-swing.mp3` に保存した。

作品17の一覧・ギャラリー・紹介ページでこの曲を選択する。既存の再生・停止操作、ループ再生、フェードインを使用する。

元音源の尺・テンポ・音量を編集せず形式変換のみ実施。音声の検査と全体のデコードを確認。聴感およびループのつなぎ目の試聴レビューは未実施。
