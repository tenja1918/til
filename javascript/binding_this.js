// 参考サイト
// https://qiita.com/haduki1208/items/f9cd375d5af157b00af9
// https://dhrname.hatenadiary.org/entry/20121026/p1

// -----------------------------------------------
// 関数定義
// -----------------------------------------------
// functionの場合、実行時にthisが決まる
const ff = function() { this.n = 1; };

// アロー関数の場合、定義時にthisが決まる（この場合はグローバルオブジェクト。ブラウザではwindow）
const fa = () => this.n = 2;

// -----------------------------------------------
// 呼び出しパターン：関数
// -----------------------------------------------
ff();
window.n;   // 1  thisはwindowを束縛

fa();
window.n;   // 2

// -----------------------------------------------
// 呼び出しパターン：call, apply
// -----------------------------------------------
let s = {};
ff.call(s);
s.n;      // 1  thisはsを束縛

fa.call(s);
s.n;      // 1

// -----------------------------------------------
// 呼び出しパターン：メソッド
// -----------------------------------------------
let ffo = { hoge: ff };
let fao = { hoge: fa };

ffo.hoge();
ffo.n;    // 1

fao.hoge();
fao.n;    // undefined

// -----------------------------------------------
// 呼び出しパターン：即時関数
// -----------------------------------------------
(function(){ this.n = 11; })();
window.n;   // 11   thisはwindowを束縛

(()=> this.n = 22 )();
window.n;   // 22

// -----------------------------------------------
// 呼び出しパターン：コンストラクタ
// -----------------------------------------------
let ffo2 = new ff();
ffo2.n;     // 1  thisはffo2を束縛（ff()にてreturnが未指定のため、thisは左辺値になる）

let fao2 = new fa();
TypeError! fa is not a constructor.

// -----------------------------------------------
// 呼び出しパターン：メソッド2
// -----------------------------------------------
let ffs = {};
let fas = {};
let ffo3 = { hoge: ff };
let fao3 = { hoge: fa };

ffs.hoge = ffo3.hoge;
ffs.n = 0;
ffs.hoge();
ffs.n;      // 1  ffでのthisはあくまで実行時に束縛されるため、thisはffsである

fas.hoge = fao3.hoge;
fas.n = 0;
fas.hoge();
fas.n;      // 0  faでのthisは定義時に定まる（この例では一貫してwindow）
