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

## 3. Deploy your contract + start the web server

Deploy your contract to the same TestNet which the NEAR Studio IDE deploys to. If you prefer to deploy to a local node, take a look here: 

{% page-ref page="deploy-local-node.md" %}

Navigate to your source directory in command line, and do the following:

1. Create an account for your contract

```bash
near create_account <yourcontractname>
```

1. Update `src/config.js` to use `<yourcontractname>` for deploy.
2. Deploy your contract to TestNet and start web server for the frontend.

```bash
npm run start
```

You can run `npm run start` each time you want to redeploy the updated smart contract, or to restart your web server.

For help using cli tools, use `near`. To get a list of available `npm` scripts use `npm run`.

## 4. Test the smart contract

Within the application's directory run either:

**Test on the TestNet:**

```bash
NODE_ENV=development npm test
```

**Test using locally running node:** \(Using TestNet is recommended for now\)

```bash
npm test
```

That's it! The tests will run against the instance that you've deployed to TestNet!

The tests in `src/test.js` will run against the deployed contract.

## 5. Deploy contract to TestNet and frontend to GitHub pages

```bash
npm run deploy
```

