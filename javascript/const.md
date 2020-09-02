# JavaScript. var / let / const

## const
* ES6(ES2015)以上が必要
* 再宣言、再代入が不可能
  * 再宣言は定義時にエラーになる
  * 再代入は実行時にエラーになる
* ブロックスコープ

```javascript
function fnconst() {
  const x = 0;
  console.log(x);     // 0
  
  // 再宣言
  const x = 1;        // SyntaxError! Identifier 'x' has already been declared.
  console.log(x);     // 0
  
  // 再代入
  x = 2;              // TypeError! Assignment to constant variable.
  console.log(x);     // 0
  
  // ブロックスコープ
  {
    console.log(x);   // 0
    x = 3;              // TypeError! Assignment to constant variable.
  }
  console.log(x);     // 0

  // ブロックスコープ。ブロック内で宣言した変数は、外側で利用できない
  {
    const y = 'a';
  }
  console.log(y);     // ReferenceError! y is not defined.
}

// 関数スコープ。別関数からは見えない
(function(){ console.log(x); })();    // ReferenceError! x is not defined.

// オブジェクトの中身は変更できる
const obj = { name: 'hogehoge' };
obj.name = 'mekemeke';
console.log(obj.name);            // mekemeke

// オブジェクト自身は変更不可
obj = { tel: '000-1234-5678' };   // TypeError! Assignment to constant variable.
```

### 参考サイト
* https://qiita.com/wannabe/items/b2a0d63fc786eab13c48
