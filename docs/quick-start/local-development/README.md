---
description: Want to develop locally? We'll show you how to get started with near-shell
---

# Local Development

## Requirements

* `npm` \(Get it [here](https://www.npmjs.com/get-npm)\)
* `near-shell`  The NEAR cli tool.
  * Install with\``npm i -g near-shell`
  * Check out the commands [here](https://github.com/nearprotocol/near-shell)
* Whatever frontend build tools you prefer. 
  * By default, `gulp` is used for compiling.  Check it out [here](https://gulpjs.com/). \(You shouldn't need to do any config for gulp specifically\).
  * If you're interested in using React, we have an example template [here](https://github.com/nearprotocol/react-template).

## 1. Create a new project

```bash
near new_project [YOUR_PROJECT_DIR]
```

After this, cd into the project directory and run npm install 

```bash
cd ./[YOUR_PROJECT_DIR] && npm install
```

## 2. Write the smart contract

For a deep dive into the file structure of a NEAR Project template, take a look here:

{% page-ref page="../file-structure.md" %}

If you want to jump right into coding your first smart contract, you'll find these resources helpful:

{% page-ref page="../../working-smart-contracts/" %}

## 3.a Deploy to the main TestNet

Deploy your contract to the same TestNet which the NEAR Studio IDE deploys to. Otherwise, learn [how to point to a local node](installation.md). 

Navigate to your source directory in command line, and do the following:

1. Create an account for your contract

```bash
near create_account <yourcontractname> --node_url https://studio.nearprotocol.com/devnet
```

1. Update `src/config.js` to use `<yourcontractname>` for deploy.
2. Deploy your contract to TestNet and start web server for the frontend.

```bash
npm run start
```

For help using cli tools, you can use `near`. To get list of available `npm` scripts use `npm run`.

## 3.b Deploy to a local node

These instructions can also be found [here](installation.md) and assumes you've already installed the local node.

Using environment variable:

```bash
NODE_ENV=local near deploy
```

Specifying url that the node is running on:

```bash
near deploy --nodeUrl="http://localhost:3030"
```

If you change the NODE\_ENV variable, then all future times you run deploy will default to the settings for that environment. If you run the command with the `--nodeUrl` flag, it will only use that url the time you run it and continue using whatever you've got NODE\_ENV set to on future runs.

## 4. Test the smart contract

Within the application's directory run either:

1. Test on the TestNet:

```bash
NODE_ENV=development npm test
```

1. Test using locally running node:

```bash
npm test
```

That's it! The tests will run against the instance that you've deployed to TestNet!

The tests in `src/test.js` will run against the deployed contract.

## 5. Deploy contract to TestNet and frontend to GitHub pages

```bash
npm run deploy
```



