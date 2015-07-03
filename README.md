# handtools.js
実業務で使える汎用的な JavaScript モジュール群です。


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

## stopPropagation (IE8 以下対応版)

### 使い方
```JavaScript
$anchor.on('click', function(event) {
  $.handtools.stopPropagation(event);
});
```

イベントのバブリングをキャンセルする関数です。例えば、子要素クリック時に、親要素のクリックイベントハンドラを動作させたくない場合に使えます。IE8 以下にも対応しています。

## preventDefault (IE8 以下対応版)

### 使い方
```JavaScript
$anchor.on('click', function(event) {
  $.handtools.preventDefault(event);
});
```

イベント発生時のブラウザデフォルトの動作をキャンセルする関数です。例えば、リンククリック時のページ遷移を防ぐといった使い方ができます。IE8 以下にも対応しています。
