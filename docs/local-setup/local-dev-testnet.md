---
id: local-dev-testnet
title: Local Development on TestNet
sidebar_label: Local Development on TestNet
---

## Requirements

**IMPORTANT: Make sure you have the latest version of NEAR CLI and Node**

<!--DOCUSAURUS_CODE_TABS-->

<!--Rust-->

<br>

- `npm` (Get it [here](https://www.npmjs.com/get-npm))
- `node version 12.x` (or higher. Get it [here](https://nodejs.org/en/download))
- `near-cli`  (Get it [here](/docs/development/near-cli))
- Whatever frontend build tools you prefer.
  - By default, `gulp` is used for compiling.  Check it out [here](https://gulpjs.com/). \(You shouldn't need to do any config for gulp specifically\).
  - If you're interested in using React, we have an example template [here](https://github.com/nearprotocol/react-template).
- Install Rustup
  - `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
- Add wasm target to your toolchain
  - `rustup target add wasm32-unknown-unknown`
  
<blockquote class="info">
  <a href="https://doc.rust-lang.org/edition-guide/rust-2018/platform-and-target-support/webassembly-support.html" target="_blank">Why <code>unknown-unknown</code>?</a>
</blockquote>  

*(see here for more details https://github.com/near/near-sdk-rs#pre-requisites)*

<!--AssemblyScript-->

<br>

- `npm` (Get it [here](https://www.npmjs.com/get-npm))
- `node version 12.x` (Get it [here](https://nodejs.org/en/download))
- `near-cli` (Get it [here](/docs/development/near-cli))
- Whatever frontend build tools you prefer.
  - By default, `gulp` is used for compiling.  Check it out [here](https://gulpjs.com/). (You shouldn't need to do any config for gulp specifically).
  - If you're interested in using React, we have an example template [here](https://github.com/nearprotocol/react-template).


<!--END_DOCUSAURUS_CODE_TABS-->

## 1. Create a new project

Highly recommend checking out [create-near-app](https://github.com/near/create-near-app) to get details

In command line, run different command to build different blank project:

### React JS app

<!--DOCUSAURUS_CODE_TABS-->

<!--Rust-->

<br>

```bash
npx create-near-app --contract=rust --frontend=react  path/to/your/new-awesome-app
```

<!--AssemblyScript-->

<br>

```bash
npx create-near-app --frontend=react  path/to/your/new-awesome-app
```

<!--END_DOCUSAURUS_CODE_TABS-->


### Plain app

<!--DOCUSAURUS_CODE_TABS-->

<!--Rust-->

<br>

```bash
npx create-near-app --contract=rust path/to/your/new-awesome-app
```

<!--AssemblyScript-->

<br>

```bash
npx create-near-app path/to/your/new-awesome-app
```

<!--END_DOCUSAURUS_CODE_TABS-->


## 2. Authorize NEAR CLI on your NEAR account

You'll now want to authorize NEAR CLI on your NEAR account, which will allow NEAR CLI to deploy contracts on your NEAR account's behalf \(and spend your NEAR account balance to do so\).

If you don't have a NEAR account yet, take a look at [how to create a NEAR account](/docs/local-setup/create-account).

Type the command `near login` which should return a url:

```bash
Please navigate to this url and follow the instructions to log in:
https://wallet.testnet.near.org/login/?title=NEAR+CLI&public_key={publicKey}
```

![alt-text](assets/image-shell.png)

From there enter in your terminal the same account ID that you authorized:

`Please enter the accountId that you logged in with: <asdfasdf>`

Once you have entered your account ID, it will display the following message:

`Missing public key for <asdfasdf> in default`
`Logged in with masternode24`

This message is not an error, it just means that it will create a public key for you.

## 3. Write the smart contract

Your project is pre-seeded with a "Hello World" contract which you can deploy right away, so feel free to head to step 4.

If you've already successfully deployed a contract, you'll probably want to start coding your own smart contract. If so, you'll find the below resources helpful.

* [Writing Smart Contracts](/docs/roles/developer/contracts/intro)

## 4. Create an account for your contract

Let's now deploy your contract to the same TestNet which the gitpod IDE deploys to. Navigate to your source directory in command line, and create an account for your contract

```bash
near create-account <yourcontractname> --masterAccount=<login> --initialBalance <initalbalance>
```

**masterAccount** : specifies which account's key should be used to deploy the contract. This is the account ID you specified when you created your wallet.
**initialBalance** : specifies how much to seed the contract balance with. The current default on TestNet is 10 NEAR.

Tip: You can provide 1 NEAR as <initalbalance>

You should see the success message:

`Account <yourcontractname> for network "default" was created.`

The last step is now to update the src/config.js to use &lt;yourcontractname&gt; for deploy.

```javascript
(function() {
    const CONTRACT_NAME = '<yourcontractname>'; /* TODO: fill this in! */
    const DEFAULT_ENV = 'development';
    ...
})();
```

## 5. Deploy your contract and start the web server

Deploy your contract to TestNet and start web server for the frontend.

```bash
npm run start
```

You can run `npm run start` each time you want to redeploy the updated smart contract, or to restart your web server.

For help using cli tools, use `near`. To get a list of available `npm` scripts use `npm run`.

## 6. Test the smart contract

Within the application's directory run either:

**Test on the TestNet:**

```bash
NODE_ENV=ci npm test
```

**Test using locally running node:** \(Using TestNet is recommended for now\)

```bash
npm test
```

That's it! The tests will run against the instance that you've deployed to TestNet!

The tests in `src/test.js` will run against the deployed contract.

## 7. Deploy contract to TestNet and frontend to GitHub pages

```bash
npm run deploy
```

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8> Ask it on stack overflow! </h8>
</a>
