---
id: deploy
title: Deploy
---
Once you finished developing and testing your smart contract you will want to deploy it, so you and
other people can start using it. Thanks to the `NEAR CLI` this is a very simple task which will take
you only two steps:

1. Compile the contract to wasm (done automatically through `yarn build` in our templates)
2. Deploy it into the desired account using the [NEAR Command Line Interface (CLI)](/concepts/tools/near-cli)

```bash
# Login to NEAR
near login

# Deploy wasm to the <accountId> account
near deploy <accountId> <route_to_wasm>
```

:::tip
By default the contract will be deployed to the testnet. To deploy into `mainnet` you can set the `NEAR_ENV` variable to mainnet (`export NEAR_ENV=mainnet`).
:::

:::tip
You can use `near dev_deploy` to deploy the contract into a newly created account!
:::

## Upgrading Deployed Smart Contacts {#upgrading-deployed-smart-contacts}
  
You can update your dApp by deploying to an account for which you own full access keys. The updated function calls (like called using near-cli with near view and near call, for instance) will work as expected with the new logic. 

Note that state will persist. For instance, if the initial version of the smart contract sets the variable foo = “bar”, an update removes the usage, and a final update brings back the variable foo, the state will persist. That is, updating and deploying a new version of a smart contract will not wipe out the previous state. In the traditional web 2 world, you may think of it like removing a server but leaving the external database instance. Because of this preservation of state, deploying new smart contracts that have equal variable names can lead to conflicts that will yield errors during deployment.

NEAR is organized around `accounts`. Up to at most 1 smart contract is deployed to an account and updating that contract replaces the smart contract code associated with that account. 

## Building Smart Contracts on an Apple M1 Machine (arm64) {#building-smart-contracts-on-apple-m1-arm64}

> **Note:** `arm64` is generally not supported by NEAR, but you should still be able to build smart
> contracts by following the provided workarounds.

#### near-sdk-rs {#near-sdk-rs}

If you're trying to build a Rust smart contract on an Apple M1 (`arm64`), you'll get an `unsupported platform` error such as:

```text
npm ERR! code 1
npm ERR! path /Users/near/smart-contract/node_modules/near-vm
npm ERR! command failed
npm ERR! command sh -c node ./install.js
npm ERR! /Users/near/smart-contract/node_modules/near-vm/getBinary.js:17
npm ERR!     throw new Error(`Unsupported platform: ${type} ${arch}`);
npm ERR!     ^
npm ERR!
npm ERR! Error: Unsupported platform: Darwin arm64
```

You can solve it with [this workaround](https://t.me/neardev/13310):

```sh
rustup target add x86_64-apple-darwin
rustup default stable-x86_64-apple-darwin
```

This will force Rust to compile to `x86`, and your Mac will execute the binary using Rosetta 2.

#### near-sdk-as {#near-sdk-as}

If you cannot install `near-sdk-as` and you get an `Unsupported platform: Darwin arm64` error while trying to build an AssemblyScript smart contract on an Apple M1 (`arm64`):

```text
error /Users/near/guest-book/node_modules/near-vm: Command failed.
Exit code: 1
Command: node ./install.js
Arguments:
Directory: /Users/near/guest-book/node_modules/near-vm
Output:
/Users/near/guest-book/node_modules/near-vm/getBinary.js:17
    throw new Error(`Unsupported platform: ${type} ${arch}`);
    ^

Error: Unsupported platform: Darwin arm64
```

Use this command to install the dependencies without downloading the VM:

```sh
npm install --save-dev --ignore-scripts near-sdk-as
```

> **Note:** if everything else installs correctly, you can disregard this error.
> You should still be able to build, deploy, and run the AS smart contract.