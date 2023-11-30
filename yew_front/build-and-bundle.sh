#!/usr/bin/env bash
set -euo pipefail
#make sure we have wasm taget
rustup target add wasm32-unknown-unknown
trunk build --release --dist "dist/yew" --public-url "/yew"
(cd dist/yew && tar c .) | (cd dist && tar xf -)
rm -rf dist/yew