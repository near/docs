#!/usr/bin/env bash

set -e

# build the project
yarn build

# serve up files for testing to port 5000 (default)
npx serve build/near-docs &

# wait til the server is responding
npx wait-on http://localhost:5000/

# ignore errors since broken-link-checker exits with nonzero error if any links break
set +e

# crawl site and check all links
npx broken-link-checker -gro --exclude "localhost:3030" --exclude "https://github.com/nearprotocol/docs/tree/master/docs" --exclude "https://youtu.be" --exclude "http://near.ai/wbs" --exclude "https://www.youtube.com" --host-requests 2 http://localhost:5000 --exclude "https://rpc.testnet.near.org" --exclude "https://rpc.betanet.near.org" --exclude "https://crates.io/crates/near-sdk" --exclude "https://github.com/nearprotocol/workshop" --exclude "https://wasmbyexample.dev"

# cleanup
kill $(ps -eaf | awk '/npx serve/ {print $2}' | head -1)
