# make sure that the cli installs correctly
npm install -g near-cli

NODE_ENV=ci near state test.near
