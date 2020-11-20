#!/usr/bin/env bash

set -e

# build the project
npm install
npm run build

# serve up files for testing to port 5000 (default)
npx serve build/near-docs &

# wait til the server is responding
npx wait-on http://localhost:5000/

# ignore errors since broken-link-checker exits with nonzero error if any links break
set +e

# crawl site and check all links
npx broken-link-checker -gro --exclude "localhost:3030" --exclude "https://youtu.be" --exclude "https://www.youtube.com" --host-requests 2 http://localhost:5000 --exclude "https://rpc.testnet.near.org" --exclude "https://rpc.betanet.near.org" --exclude "https://rpc.near.org"  --exclude "https://crates.io/crates/near-sdk" --exclude "https://wasmbyexample.dev" --exclude "https://near.zavodil.ru/?pools=" --exclude "https://staking.dokia.cloud/staking/near/validators" --exclude "https://www.timeanddate.com/moon/phases/" --exclude "https://github.com/near/docs/tree/master/docs"

# record exit status of link check
status=$?

# cleanup
kill $(ps -eaf | awk '/npx serve/ {print $2}' | head -1)

# set exit status to link check's exit status, so script fails correctly on CI
exit $status
