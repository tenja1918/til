# PostgreSQL install memo

### 環境
- Ubuntu 20.04.1 on Windows Subsystem for Linux (version 1)

### インストール
※セットアップされた状態でインストールされる
```sh
sudo apt install postgresql

psql --version
psql (PostgreSQL) 12.4 (Ubuntu 12.4-0ubuntu0.20.04.1)
```

### 設定
- /etc/postgresql/12/main/postgresql.conf  
いろいろあるが以下を設定することが多い。
  ```
  # 接続を受け付けるアドレス（デフォルトはlocalhostなので、明示的に指定しなくてもいい）
  listen_address = 'localhost'

  # 最大接続数
  max_connections = 10

  # ログファイルへの出力を有効にする
  logging_collector = on

  # /var/lib/postgresql/12/main/pg_logディレクトリにログファイルを出力させる
  log_directory = 'pg_log'

  # ログファイル名
  log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'

  # 出力されるログファイルのパーミッション
  log_file_mode = 0600

  # ログファイルのローテーション時に同じファイル名があったら上書きさせる
  log_truncate_on_rotation = on

  # 1日単位でのローテーション
  log_rotation_age = 1d

  # ログのフォーマット
  log_line_prefix = '%m [%p:%l] %q%u@%d from %r'

  # 不要な領域を自動整理させる（PostgreSQLは追記型DBのためonが推奨）
  autovacuum = on
  ```

- /etc/postgresql/12/main/pg_hba.conf  
  用途次第だが、WSL上でlocalhost限定の自分向けに使うならpeer接続のみで十分。
  ```
  # super user
  local  all  postgres  peer
  
  # add a general user
  local  all  a_user  peer 
  
  local  all  all  peer
  local  replication  all  peer
  ```
  
  ### ロール追加
  シェル上で以下のコマンドを実施(a_userの名称は、WSLで使っているユーザー)
  ```sh
  sudo -u postgres createuser -d -P a_user
  ```
  
  ### 起動
  ```sh
  sudo service postgres start
  ```
  
  ### 接続確認
  ```sh
  # a_userで接続できるか確認
  whoami
  a_user
  
  # データベース名postgresへ接続
  psql postgres
  
  psql (12.4 (Ubuntu 12.4-0ubuntu0.20.04.1))
  Type "help" for help.
  
  # \c で接続情報を表示
  postgres=> \c
  You are now connected to database "postgres" as user "a_user".
  
  # \du でロール情報を表示
  postgres=> \du
                                       List of roles
   Role name |                          Attributes                        | Member of
   ----------+------------------------------------------------------------+---------
   a_user    | Create DB                                                  | {}
   postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}

  # \q で終了
  postgres=> \q
  ```
