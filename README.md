# handtools.js
実業務で使える汎用的な JavaScript モジュール群です。

# モジュール追加の際のルール
モジュールの追加の際には下記を行ってください。

- 各関数の上に、その関数が何を行うのかをコメントで記述してください。
  - JSDoc にもとづく記述にすることとします。
    - 参考: http://qiita.com/opengl-8080/items/a36679f7926f4cac0a81
  - その関数の概要、引数、戻り値に関する情報を記述してください。
- README.md 内にモジュールの説明を記述する。以下を含めると良いです。
  - 何をするモジュールなのか
  - コード例

README.md はマークダウン記法を用いて記述します。
参考: [.mdファイルの書き方](https://github.com/ncxx-sl-lab/members/wiki/.md%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9)

また、作業を行う前に master からブランチを切り、作業完了後はそのブランチから master へプルリクエストを行ってください。
参考: [初心者向けGithubへのPullRequest方法](http://qiita.com/samurairunner/items/7442521bce2d6ac9330b)


## isMobile

### 使い方
`$.handtools.isMobile();`

navigator.userAgentに以下の文字列にマッチするかどうかでモバイルかどうかの判定をする関数です。
返り値はマッチした文字列、マッチしなければ`false`を返します。

```JavaScript
"iPhone",         //  Apple iPhone
"iPod",           //  Apple iPod touch
"Android",        //  1.5+ Android
"dream",          //  Pre 1.5 Android
"CUPCAKE",        //  1.5+ Android
"blackberry9500", //  Storm
"blackberry9530", //  Storm
"blackberry9520", //  Storm v2
"blackberry9550", //  Storm v2
"blackberry9800", //  Torch
"webOS",          //  Palm Pre Experimental
"incognito",      //  Other iPhone browser
"webmate"         //  Other iPhone browser
```
これ以外にも判定したい文字列があれば、文字列を引数にして実行してください。

#### 例）"iPad"も判定したい
`$.handtools.isMobile("iPad");`

複数ある場合はカンマ区切りで。

#### 例）"iPad"も"safari"も判定したい
`$.handtools.isMobile("iPad", "safari");`


## getCountDown

### 使い方
`$.handtools.getCountDown(年, 月, 日, 時間※, 分※, 秒※);`
※任意

年月日時分秒を指定すると、今から指定日までの残り年月日時分秒が返る関数です。
時、分、秒は任意項目ですが、指定しない場合は0時0分0秒の扱いになります。
返り値はObject型、以下の様に返ります。

| .year   | 残り年数 |
| .month  | 残り月数 |
| .date   | 残り日数 |
| .hour   | 残り時間 |
| .minute | 残り分   |
| .second | 残り秒   |

#### 例）2020年7月24日開催の東京オリンピックまでのカウントダウン

```JavaScript
var result = $.handtools.getCountDown(2020, 7, 24);
console.log("東京オリンピックまで、あと", result.date, "日");
```
