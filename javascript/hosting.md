# JavaScript. 巻き上げ(hosting)について
* var ... 関数内でvarで変数宣言をした場合、関数内のvar変数をすべてundefinedで初期化する
* let / const ... 関数内でlet/constで変数/定数宣言をした場合、関数内のlet変数const定数をすべて未初期化にする
* strictモードでの例

1. 環境レコード生成時にその環境レコード内に変数も作成すること。
1. 変数を作成する時に何らかの値(undefinedや関数そのもの等)を代入(assigne)すること。

varは1, 2を行い、let/constは1のみを行う。

* 以下のコードでは`x= 0, y= 0`が表示される。
* 関数内で宣言していないため、巻き上げは起こらない。
```javascript
var x = 0;
let y = 0;
function f() {
  console.log('x=', x);
  console.log('y=', y);
}

f();        // x= 0
            // y= 0
```

* 以下のコードでは`x= undefined`が表示される。（yは参照エラー）
* 関数内で宣言しているため、巻き上げが起こる。
* `f = function(){...`や`f = ()=>{...`でも同様。
```javascript
var x = 0;
let y = 0;
function f() {
  console.log('x=', x);
  console.log('y=', y);
  var x = 1;
  let y = 2;
}

f();        // x= undefined
            // ReferenceError! Cannot access 'y' before initialization.
```

### 参考サイト
https://qiita.com/39_isao/items/d9d80e98b5bd1938bc1d
https://teratail.com/questions/189421
https://www.ecma-international.org/ecma-262/9.0/index.html#sec-let-and-const-declarations
