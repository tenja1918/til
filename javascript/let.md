# JavaScript. var / let / const

## let
* ES6以上が必要
* 再宣言が不可能
* 再代入は可能
* ブロックスコープ

```javascript
function fnlet() {
  let x = 0;
  console.log(x);     // 0

  // 再宣言
  let x = 1;          // SyntaxError! Identifier 'x' has already been declared.
  console.log(x);     // 0

  // 再代入
  x = 2;
  console.log(x);     // 2

  // ブロックスコープ
  {
    console.log(x);   // 2
    x = 3;
  }
  console.log(x);     // 3

  // ブロックスコープ。ブロック内で宣言した変数は、外側で利用できない
  {
    let y = 'a';
  }
  console.log(y);     // ReferenceError! y is not defined.
};

// 別関数からは見えない
(function(){ console.log(x); })();    // ReferenceError! x is not defined.
```
