# make sure that the cli installs correctly
npm install -g near-shell

NODE_ENV=ci near state test.near


# test app with snippets 
npx create-near-app assemblyscript-react
cd assemblyscript-react
#yarn TODO: investigate why this fails on build


