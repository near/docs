---
id: local-dev-node
title: Local Development on Local Network
sidebar_label: Local Development on Local Network
---

## Requirements

**IMPORTANT: Make sure you have the latest version of NEAR CLI and Node Version &gt; 12.x**

<!--DOCUSAURUS_CODE_TABS-->

<!--Rust-->

<br>

- `npm` (Get it [here](https://www.npmjs.com/get-npm))
- `node version 12.x` (Get it [here](https://nodejs.org/en/download))
- `near-cli`  (Get it [here](/docs/development/near-cli))
  - Install with`npm i -g near-cli`
  - Check out the commands [here](https://github.com/near/near-cli)
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
- `near-cli`  (Get it [here](/docs/development/near-cli))
  - Install with`npm i -g near-cli`
  - Check out the commands [here](https://github.com/near/near-cli)

<!--END_DOCUSAURUS_CODE_TABS-->


**Docker**

* By default we use Docker to run the client:
* [MacOS](https://docs.docker.com/docker-for-mac/install/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

## 1. **Run a node locally**

For this step, please refer to the documentation on [running a node on testnet](../local-setup/local-dev-testnet.md). Follow the steps and once your node is running come back to this part of the docs for step 2.

## 2. Create an account and start the node

You will then be prompted for an Account ID. An account will be created for you, which you can then use to deploy your contracts. **It is important that you enter an account ID here so that an account is created for you. Ignore the 'leave empty if not going to be a validator' message.'**

```
Enter your account ID (leave empty if not going to be a validator):
```

A node will then start in the background inside the docker. To check the logs inside the docker, run `docker logs --follow nearcore`.

You should see the success message `Node is running!`

run `docker logs --follow nearcore` to see the logs.

## 3. Create a new project

Highly recommend checking out [create-near-app](https://github.com/near/create-near-app) to get details

In command line, run different command to build different blank project:

### React JS app

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


### Plain app

<!--DOCUSAURUS_CODE_TABS-->

<!--Rust-->

<br>

```bash
npx create-near-app --contract=rust --frontend=react path/to/your/new-awesome-app
```

<!--AssemblyScript-->

<br>

```bash
npx create-near-app --frontend=react path/to/your/new-awesome-app
```

<!--END_DOCUSAURUS_CODE_TABS-->


## 4. Write the smart contract

Your project is pre-seeded with a simple contract which you can deploy right away, so feel free to head to step 5.

If you've already successfully deployed a contract, you'll probably want to start coding your own smart contract. If so, you'll find the below resources helpful.

* [Writing Smart Contracts](/docs/roles/developer/contracts/intro)

## 5. Create an account for your contract on the Local Node

Let's now deploy your contract to the local Node which you have running.

You'll first want to specify NODE\_ENV to be 'local.' Set the NODE\_ENV constant by running this command in bash:

`export NODE_ENV='local'`

From there, use this command to create an account for your contract

```bash
near create-account <yourcontractname> --masterAccount=<login> --initialBalance <initalbalance>
```

**--masterAccount= :** specifies which account's key should be used to deploy the contract. Should be the same account that you created when running the Local Node; i.e. this is your username.
**--initialBalance :** specifies how much to seed the contract balance with; e.g. 100000

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

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8> Ask it on stack overflow! </h8>
</a>
