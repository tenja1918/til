# プロキシを経由した多段SSHについて

### 概要
ローカルPCから、AWS EC2インスタンスに透過的にSSH接続するやり方。SCPも可能。

### ネットワーク構成
Ubuntu on WSL(Windows Subsystem for Linux)上のsshから、透過的にAWS EC2 instance A,B,Cに接続したい。
```text
<<Ubuntu on WSL>>  -----  (Socks Proxy)  -----  (AWS Bastion)  --+--  (AWS EC2 instance A)
                                                                 |
                                                                 +--  (AWS EC2 instance B)
                                                                 |
                                                                 +--  (AWS EC2 instance C)

<< ... >> はローカルPC
( ... )) はリモート
```

### 設定
- ~/.ssh  
パーミッションは700にする。オーナーは当然自分。

- 秘密鍵  
なんらかの方法で.ssh以下に秘密鍵を置き、パーミッションを400か600にする。オーナーは当然自分。

- ~/.ssh/config  
パーミッションを400か600にする。オーナーは当然自分。
  ```sh
  # ---------------------------------------------------------------------
  # 全ホスト共通設定
  # ---------------------------------------------------------------------
  Host *
    User ec2-user
    # 特定サーバーだけ秘密鍵が異なる場合は、指定を上書きできる
    IdentityFile ~/.ssh/id_pj1_ed25519
    # 一定時間何もしないと切断されてしまうときは、以下の設定を入れるとよい。60秒ごとにサーバーにkeepaliveパケットを送る
    ServerAliveInterval 60

  # ---------------------------------------------------------------------
  # AWS Bastion. 踏み台サーバー
  # ---------------------------------------------------------------------
  Host bastion
    HostName 10.20.30.40
    ProxyCommand connect -S socks-proxy-server:port %h %p

  # ---------------------------------------------------------------------
  # 開発環境  AWSインスタンス
  # ---------------------------------------------------------------------
  Host dev-*
    PorxyCommand ssh -W %h:%p bastion

  Host dev-instance-A
    HostName 172.31.11.01

  Host dev-instance-B
    HostName 172.31.11.02

  Host dev-instance-C
    HostName 172.31.11.03

  # ---------------------------------------------------------------------
  # ステージング環境  AWSインスタンス
  # ---------------------------------------------------------------------
  Host stg-*
    PorxyCommand ssh -W %h:%p bastion
    # ステージング用の秘密鍵を指定
    IdentityFile ~/.ssh/id_pj1_stg_ed25519

  Host stg-instance-A
    HostName 172.31.22.01

  Host stg-instance-B
    HostName 172.31.22.02
```

- .bashrc
  認証が必要なSocks Proxyサーバーの場合、認証情報を環境変数に定義しておく。SOCKS5_USER, SOCKS5_PASSWD。
  ```bash
  export SOCKS5_USER='user-abc';
  export SOCKS5_PASSWD='password-xxx';
  ```

### 接続
- 以下のようにエイリアスで接続できる。
- またコマンドラインでTABを叩けば、エイリアス名の補完も効くので便利。

```sh
# 踏み台への接続
ssh bastion

# 開発環境のinstance-Aへ接続
ssh dev-instance-A

# ステージング環境のinstance-Bへ接続
ssh stg-instance-B

# scpもOK。しかもファイルパス補完も効くからすごい
scp dev-instance-B:~/foo/bar/file ./dev-b-file
```

### SSHポートフォワードする場合
ローカルポート222と、開発環境のinstance-Aのポート22をポートフォワードする。
```sh
# ワンライナーで手軽にやるには
sudo SOCKS5_USER='user-abc' SOCKS5_PASSWD='password-xxx' \
  ssh -i ~/.ssh/id_pj1_ed25519 \
  -o ServerAliveInterval=60 \
  -o ProxyCommand='connect -S socks-proxy-server:port %h %p' \
  ec2-user@10.20.30.40 \
  -L 222:172.31.11.01:22 -f -N
```
