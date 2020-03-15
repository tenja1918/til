# COTOHA API (for Developers) を利用するためのアクセストークンの取得について

## アクセストークンの取得

- アカウント登録してCOTOHAにログイン。そこからClient ID、Client secretを参照。  
  https://api.ce-cotoha.com/home
- 以下のように取得（CLIENT_ID、CLIENT_SECRETは上記ページも内容で置き換える）  
```
curl -X POST -H 'content-type: application/json' -d '{"grantType": "client_credentials", "clientId": "CLIENT_ID", "clientSecret": "CLIENT_SECRET"}' https://api.ce-cotoha.com/v1/oauth/accesstokens
```

## 取得できたアクセストークン

```
{
  "access_token": "xxxxxxxxxxxxxxxxxx",
  "token_type": "bearer",
  "expires_in": "86399" ,
  "scope": "" ,
  "issued_at": "1584258340428"
}
```
なお、有効期限は24時間。期限が切れたら再取得が必要。

## 利用例

- API Base URLを参照し、そのURL + "nlp/v1" + "api名"でAPIをコールする。  
  またHTTP Request Headerとして `Authorization: Bearer xxxxxxxxxxxxxxxxxx` を付与する（xxxxxxxxxxxxxxxxxxはアクセストークン）。  
https://api.ce-cotoha.com/home
- API一覧  
https://api.ce-cotoha.com/contents/api-all.html
- たとえば構文解析をやってみる。以下のsend.jsonを用意。  
```
{
  "sentence": "この先生きのこるには"
}
```
- APIをコール  
```
curl -X POST -H 'Content-type: application/json;charset=UTF-8' -H 'Authorization: Bearer xxxxxxxxxxxxxxxxxx' -d@send.json https://api.ce-cotoha.com/api/dev/nlp/v1/parse
```
- 取得結果  
```javascript
  "result" : [ {
    "chunk_info" : {
      "id" : 0,
      "head" : 1,
      "dep" : "D",
      "chunk_head" : 0,
      "chunk_func" : 0,
      "links" : [ ]
    },
    "tokens" : [ {
      "id" : 0,
      "form" : "この先",
      "kana" : "コノサキ",
      "lemma" : "この先",
      "pos" : "名詞",
      "features" : [ ],
      "dependency_labels" : [ ],
      "attributes" : { }
    } ]
  }, {
    "chunk_info" : {
      "id" : 1,
      "head" : -1,
      "dep" : "O",
      "chunk_head" : 0,
      "chunk_func" : 2,
      "links" : [ {
        "link" : 0,
        "label" : "time"
      } ],
      "predicate" : [ ]
    },
    "tokens" : [ {
      "id" : 1,
      "form" : "生きのこ",
      "kana" : "イキノコ",
      "lemma" : "生き残る",
      "pos" : "動詞語幹",
      "features" : [ "R" ],
      "dependency_labels" : [ {
        "token_id" : 0,
        "label" : "nmod"
      }, {
        "token_id" : 2,
        "label" : "aux"
      }, {
        "token_id" : 3,
        "label" : "mark"
      } ],
      "attributes" : { }
    }, {
      "id" : 2,
      "form" : "る",
      "kana" : "ル",
      "lemma" : "る",
      "pos" : "動詞接尾辞",
      "features" : [ "接続" ],
      "attributes" : { }
    }, {
      "id" : 3,
      "form" : "には",
      "kana" : "ニハ",
      "lemma" : "には",
      "pos" : "接続接尾辞",
      "features" : [ "連用" ],
      "attributes" : { }
    } ]
  } ],
  "status" : 0,
  "message" : ""
}
```

---
## 参考サイト
- https://api.ce-cotoha.com/contents/gettingStarted.html
- https://qiita.com/nach0chos557/items/28970528b7f07d3a3c2f
- https://qiita.com/kunihiros/items/704949ca922a9771ebeb
