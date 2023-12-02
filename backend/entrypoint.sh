#!/bin/bash
set -e # エラーが起きたら即終了
rm -f /app/tmp/pids/server.pid # server.pidファイルが存在するときにサーバーが再起動しないようにする。Rails特有らしい。
exec "$@" # コンテナのメインプロセスを実行
