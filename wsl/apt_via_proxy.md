# apt via proxy

### 概要

- ~/.bashrc
  ```bash
  export http_proxy='http://proxy-server:port';
  export https_proxy="$http_proxy";
  export no_proxy='127.0.0.1,localhost';
  ```
- /etc/apt/apt.conf
  ```sh
  Acquire::http::Proxy "http://proxy-server:port";
  Acquire::https::Proxy "http://proxy-server:port";
  ```

認証が必要なプロキシの場合、以下のようにする。  
`http://user:password@proxy-server:port`

---

### 参考
- WSL (Windows Subsystem for Linux)の基本メモ  
  https://qiita.com/rubytomato@github/items/fdfc0a76e848442f374e
