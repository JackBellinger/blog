#!/usr/bin/env bash
set -euo pipefail

#mv ./dist/blog/index.html ./dist
#(cd dist/blog/blog && tar c .) | (cd dist && tar xf -)
#rm -rf ./dist/blog
cp -r ./assets/* ./dist/blog/assets
cp ./index.html ./dist/404.html
