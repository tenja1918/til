# Squid on Windows Subsystem for Linux (WSL)

現在の作業環境がWindowsのため、WSLを前提にしているが他の環境でも設定方法は変わらないと思う。  
WSLにはUbuntuが入っている。

### 概要
- 作業現場ではプロキシが導入されており、外の環境へ接続するにはプロキシを通らなければならない。
- このプロキシはBasic認証が必要。また認証用パスワードは定期的に変更が必要。
- いろいろなツールや設定ファイルに認証用ユーザー名とパスワードを記述すると、パスワード変更のたびにあちこち修正が必要になる。面倒くさい。
- そこでプロキシの認証用ユーザー名とパスワードをSquidに集約する。

### イメージ
```text
                +--- <<Ubuntu on WSL>> --- <<Squid>> ---------------------------------- (プロキシ) ----------------------------------- (インターネット)
                |                             ↑                                           ↑
                |                             ここだけにユーザー・パスワードを持つ。        Squidからの認証情報をもらって認証する。
                |
<<ツール1>>  ---+      ← ほかのツールはすべてSquid経由で接続する。
                |        ツールの設定にはユーザー、パスワードを記載しない。
<<ツール2>>  ---+        (ツールから見ると、認証無しプロキシに接続)
                |
<<ツールn>>  ---+

* << ... >>はローカルPC
* ( ... ) はリモート
```

### インストール (on WSL)
```sh
sudo apt install squid
```
Squidをインストーするためにaptがプロキシを通るには、以下を参考にして設定する。  
（`http://user:pass@proxy-server:port`というように、ユーザー、パスワードの指定ありで設定する）  
https://github.com/tenja1918/til/blob/master/wsl/apt_via_proxy.md


### 設定
以下の例として説明。

| 設定 | 値 |
| --- | --- |
| プロキシサーバー | hogehoge.co.jp |
| プロキシポート | 8080 |
| Squidポート | 8000 |
| 認証用ユーザー名 | pxuser |
| 認証用パスワード | pxpass |


- /etc/squid/squid.conf
```bash
# backup
cd /etc/squid
sudo cp -p squid.conf{,.ORIG}

# コメントや空行が大量にあって編集しにくいので削除
#（例では、通常ユーザーでは上書きできないパーミッションになっていたので、sudoで実施している）
sudo bash -c "grep -Ev '^(#|$)' squid.conf.ORIG > squid.conf"
```

```text
# デフォルトの3128でもいい。ここでは変更した
http_port 8000

# プロキシ設定
cache_peer hogehoge.co.jp parent 8080 0 proxy-only login=pxuser:pxoass
never_direct allow all
```
設定の意味はググってください。

# 起動
```bash
sudo service squid start
# またはsysvinitのため以下で起動してもよい
sudo /etc/init.d/squid start
```

# WindowsのスタートアップでSquidを自動起動させる
毎回、WSLのターミナルから手動で起動するのはつらいので、スタートアップに登録したほうがよい。

- Windowsキー + R で「ファイル名を指定して実行」を表示
- `shell:startup`と入力して実行（スタートアップフォルダが開く）
- 以下の内容のファイルを作成し、スタートアップフォルダに置く（ファイル名はsquid.bat）
  ```bat
  @echo off
  wsl -u root -- service squid start
  ```
