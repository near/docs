# Develop an application locally using near-shell

If you have an app with an existing front-end that you want to hook into the smart contract on the back end, you will need to import our JavaScript SDK on the front-end and write/deploy the smart contract on the back end. The best way to get acquainted with this process is to use the near CLI tool to generate a new project to see how the frontend and backend integration works.

## Requirements

* `npm` Get it [here](https://www.npmjs.com/get-npm)
* `near-shell`  The NEAR cli tool.
  * Install with\``npm i -g near-shell`
  * Check out the commands [here](https://github.com/nearprotocol/near-shell)
* Whatever frontend build tools you prefer. 
  * By default, `gulp` is used for compiling.  Check it out [here](https://gulpjs.com/). \(You shouldn't need to do any config for gulp specifically\).

## 1. Create a new project

```bash
near new_project --project_dir ~/[wherever you want your project]
```

## 2. Write the smart contract

Write the code!

All contract code is found in the `assembly/` folder. \(named for [webassembly](https://webassembly.org/) conventions\)

`assembly/main.ts` is where all smart contract code can be found.

`src/test.js` is where unit tests for the smart contract can be found.

`src/main.js` is the default frontend code, but that can be changed to whatever frontend you prefer!

`src/config.js` provides settings for different `NODE_ENV` environments \(i.e deploy locally, to the TestNet, etc\)

## 3. Deploy to the main TestNet

Deploy your contract to the same TestNet which the NEAR Studio IDE deploys to.

Navigate to your source directory in command line, and do the following:

1. Create an account for your contract

```bash
near create_account --node_url https://studio.nearprotocol.com/devnet --account_id <yourcontractname>
```

2. Update `src/config.js` to use `<yourcontractname>` for deploy.
3. Deploy your contract to TestNet and start web server

```bash
npm run start
```

For help using cli tools, you can use `near`. To get list of available `npm` scripts use `npm run`.

## 4. Test the smart contract

Within the application's directory run either:

1. Test on the TestNet:

```bash
NODE_ENV=development npm test
```

2. Test using locally running node:

```bash
npm test
```

That's it! The tests will run against the instance that you've deployed to TestNet!

The tests in `src/test.js` will run against the deployed contract.

## 5. Deploy contract to TestNet and frontend to GitHub pages

```bash
npm run deploy
```

