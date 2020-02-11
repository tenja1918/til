# JavaScript. var / let / const

## var
* ES5以下でも動作する
* 再宣言、再代入が可能
* 関数スコープ

```javascript
function fnvar() {
  var x = 0;
  console.log(x);     // 0
  
  // 再宣言
  var x = 1;
  console.log(x);     // 1
  
  // 再代入
  x = 2;
  console.log(x);     // 2
  
  // ブロックスコープではない1
  {
    console.log(x);   // 2
    x = 3;
  }
  console.log(x);     // 3

  // ブロックスコープではない2
  {
    var x = 4;
  }
  console.log(x);     // 4

  // 関数スコープ。ブロック内で宣言した変数でも、外側で利用可能
  {
    var y = 'a';
  }
  console.log(y);     // 'a'
};

// 関数スコープ。別関数からは見えない
(function(){ console.log(x); })();    // ReferenceError! x is not defined.
```

