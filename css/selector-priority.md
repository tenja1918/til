# CSS. セレクタの優先順位

### 基本
* `html内のcss > ユーザー指定のCSS > ブラウザ標準のCSS`
* `body内のstyle > head内の<style> > 外部CSS`
* 後勝ち。後に記述したほうが優先
* !importantが優先

---
### 組み合わせでの優先順位の決定
* 点群ごとに点数を加算して優先順位を決定する。点数が高いものが優先される
* ただし`点A > 点B > 点C > 点D`といった具合に、点群ごとに越えられない壁がある
  * 点Cで100点集めても、点Bの1点が優先される

|*指定方法*          |*例*                   |*点A*|*点B*|*点C*|*点D*|*優先順位*|*備考*|
|:-                  |:-                     |-:|-:|-:|-:|-|-|
|タグのstyle属性     |`style="color: red;"`  |1|0|0|0|高|CSS3では無し|
|ID                  |`#hoge`                |0|1|0|0|↑||
|クラス              |`.hoge`                |0|0|1|0|↑||
|属性セレクタ        |`a[href*="google"]`    |0|0|1|0|↑||
|疑似クラス          |`:hover`               |0|0|1|0|↑||
|要素名              |`div`                  |0|0|0|1|↑||
|疑似要素            |`:before`              |0|0|0|1|↑||
|ユニバーサルセレクタ | `*`                   |0|0|0|0|低||

---
### 組み合わせでの優先順位の例
* 下記例では、0.1.0.1が優先される（点群の越えられない壁ルールにより）
  * そのため`#blue p { color: blue; }`により青色の"Sample"になる

```html
<div id="bule">
 <p class="nice red text">
  sample
 </p>
</div>
```
```css
/* 0.0.0.1 ... p=要素名(0.0.0.1) */ 
p { color: green; }

/* 0.1.0.1 ... #blue=ID(0.1.0.0) + p=要素名(0.0.0.1) */ 
#blue p { color: blue; }

/* 0.0.3.1 ... p=要素名(0.0.0.1) + .nice=クラス(0.0.1.0) + .red=クラス(0.0.1.0) + .text=クラス(0.0.1.0) */ 
p.nice.red.text { color: red; }
```

なお`.nice.red.text`と`.nice .red .text`は意味が異なるため注意。  
（前者はnice, red, textの3つのclass指定があるもの。後者はniceの子孫でredの子孫でtextのclass指定があるもの）


### 参考サイト
https://qiita.com/oh_rusty_nail/items/e896825cd54e5c0a3666  
https://www.slideshare.net/yumi-uniq-ishizaki/css-13918388
