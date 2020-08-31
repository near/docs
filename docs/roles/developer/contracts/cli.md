---
id: cli
title: NEAR CLI
sidebar_label: NEAR CLI
---

## Install NEAR CLI

```bash
npm i -g near-cli
```

## Login

Login with NEAR CLI to authorize it for `FullAccess` use with a new or existing NEAR account. You must create an account in this step if you don't already have one.

**Note**: you can also use the Gitpod terminal to run NEAR CLI commands. See [the examples page](https://near.dev) for a list of simple smart contracts that can be opened and modified in Gitpod.

The example commands in this document will begin with `near …`. By default, this is connecting to testnet.
To change the network, simply prepend an environment variable like this:

```bash
NEAR_ENV=betanet near stake …
```

or for mainnet:

```bash
NEAR_ENV=mainnet near send …
```
    
**Note**: the above commands are setting an environment variable inline, and the commands will work on linux and OS X. If you know you'll be using the same network (for instance, you're a validator on betanet) you can set the environment variable in a single command and have it persist for that session.

For linux and OS X:

    export NEAR_ENV=betanet
    
Windows:

    set NEAR_ENV=betanet
    
So to login with NEAR CLI on testnet, simply enter this command into the terminal / command prompt:

```bash
near login
```

Follow the directions until you see something like this:

```text
Which account did you authorize for use with NEAR CLI?
Enter it here (if not redirected automatically):
Logged in as [ YOU.testnet ] with public key [ ed25519:Hyxp7i... ] successfully
```

<blockquote class="info">
<strong>Did you know?</strong><br><br>

On this page we'll show different NEAR CLI commands.
We'll use the account `YOU` to represent whatever is **your** unique account.
Please remember to replace it when copy/pasting.

</blockquote>

At this point one of two things has happened depending on the contents of the folder where you ran `near login`.

If the login has completed successfully, then a key file has been created in your home directory.
On linux and OS X this will be in `~/.near-credentials` where the full path will be something like `/Users/YOU/.near-credentials`
On Windows it will be in `%homepath%\.near-credentials` where the full path will be something like `C:\Users\YOU\.near-credentials`

```text
.near-credentials
└── default
    └── YOU.testnet.json
```

_Using Gitpod?_

Try the command `tree ~/.near-credentials/` to see your credentials

```text
/home/gitpod/.near-credentials/
└── default
    └── YOU.testnet.json
```

## See an account's state

_(These steps explore publicly available information for all accounts. We included them **after** login in case you just created a **new** account for yourself)_

View state on **any** account

```bash
near state YOU.testnet
```

You should see something like this, although your `block_height` and `block_hash` will be different

```js
{
  amount: '100000000000000000000000000',
  locked: '0',
  code_hash: '11111111111111111111111111111111',
  storage_usage: 182,
  storage_paid_at: 0,
  block_height: 2440833,
  block_hash: 'CU4ab5yAN5HYoakRDNiN4ERVRwYRNjiJaTGgrmkSF8yF',
  formattedAmount: '100'
}
```

If the account has a contract deployed to it, you will see a different `code_hash` that represents the sha256 digest of the contract Wasm code encoded as base58.

```js
{
  amount: '99999999948684219965170000',
  locked: '0',
  code_hash: '5KjqNZMPuZZoCuyYc1eHbBLCvCC9c1bh5NLvv3HsVcKH',  // <-- this will be different depending on the deployed contract
  storage_usage: 42513,                                       // <-- this includes deployed contract code and state stored by the account
  storage_paid_at: 0,
  block_height: 2440809,
  block_hash: '6kU6huk1YQ8SRNPVLTk71dFpDeg2sE9aWPH21HcWbzrR',
  formattedAmount: '99.99999994868421996517'
}
```

## View an account's access keys

You may view access keys on **any** account. Here we'll view the access keys of our own: 

```bash
near keys YOU.testnet
```

Below is a representation of an account with a single `FullAccess` key. This is the same one NEAR CLI has been authorized to use and is now in your filesystem in the `.near-credentials` folder mentioned earlier.

**Note**: if you've been working with NEAR projects for a long time, it's possible for some keys to be stored in the older location. The previous location was inside a project in the `neardev` folder.

```js
[
  {
    public_key: "ed25519:GBut2CEV6wDmbeU4c6GjZjwZ52EepTSpiss72pfsG75g",
    access_key: { nonce: 0, permission: "FullAccess" },
  },
];
```

If the account was used to authorize an example app like Greeting or Counter available at https://near.dev then it will also have `FunctionCall` access keys

```js
[
  {
    public_key: "ed25519:CwSDTCU4HnpyqnphpWtjHSEYo16FaNZucWUs6Sgfy8Hn",
    access_key: { nonce: 0, permission: "FullAccess" },
  },
  {
    public_key: "ed25519:BNpJnLdbGY2PuXRL9jCxG6pzpLF1fR2iWcbuWymTDL37",
    access_key: {
      nonce: 0,
      permission: {
        // this is a restricted key for limited use by an application
        FunctionCall: {
          allowance: "10000000000000000000000",
          receiver_id: "null",
          method_names: [],
        },
      },
    },
  },
];
```

**A brief aside about `nonce` values**

In both examples of the access keys above, `FullAccess` keys and `FunctionCall` access keys, there is a `nonce` associated with each key which tracks how many times it has been used. This helps the NEAR runtime distinguish between transactions and avoid processing duplicate transactions. [See this page for more detail](https://nomicon.io/ChainSpec/Transactions.html#transaction-ordering-example-using-pool-iterator) about how NEAR uses `nonce` values.

## Create a subaccount

When working with contracts, it's a good idea to create subaccounts. This makes it easier to iterate on contract development, particularly when working with Rust smart contracts. If a smart contract has fundamentally changed (where new fields are added to structs, for instance) and deployed to the same account, the state can run into issues. Without going too much into detail, having a subaccount is a good way to abate this type of problem. As we'll show later, it's simple to delete and recreate accounts if anything goes wrong.

Create a subaccount from your main account with:

```bash
near create-account my-contract.YOU.testnet --masterAccount YOU.testnet
```

## Deploy a contract

**First build** your contract

For AssemblyScript smart contracts, the common pattern looks like this:

```bash
# the following command may very, check your package.json file
yarn build:contract
```

For Rust smart contracts, there will often be a `build.sh` script in the project, or there will be a command with `cargo build` including a few flags.

After the contract is build, **deploy** the contract.

You will have to create an account to deploy to 

(We assume you already created `name-of-contract.YOU.testnet` in a previous step.)

```bash
near deploy --wasmFile out/contract.wasm --accountId my-contract.YOU.testnet
```

## Deploy and initialize a contract

Many contracts will have an initialization method that typically runs immediately after deploying. This method is oftentimes called `new` and takes a couple arguments.

Let's look at the `new` method from the [fungible token example here](https://github.com/near-examples/FT/blob/6760bf333b13ad2c82a850f219ec35fc5755ffd9/contracts/rust/src/lib.rs#L82-L91):

```rust
    #[init]
    pub fn new(owner_id: AccountId, total_supply: U128) -> Self {
        …
    }
```

It's possible to create a batch transaction that performs multiple "actions" in a single transaction. In a batch transaction, if any of the actions fail the state is rolled back.

For the purpose of this next command, let's pretend we're deploying and initializing the fungible token just mentioned.

```bash
near deploy --accountId my-contract.YOU.testnet --wasmFile res/fungible_token.wasm --initFunction new --initArgs '{"owner_id": "my-contract.YOU.testnet", "total_supply": "100000000000000000"}'
```

**Note**: in Windows, single quotes have issues and the above command would be:

```bash
near deploy --accountId my-contract.YOU.testnet --wasmFile res/fungible_token.wasm --initFunction new --initArgs "{\"owner_id\": \"my-contract.YOU.testnet\", \"total_supply\": \"100000000000000000\"}"
```

Lastly, there are two extra commands for deploy + initialize (`initGas` and `initDeposit`) that can be used. Be sure to use the `--help` flag to see more information about these and other flags/options. For deploy-specific help, you may enter:

```bash
near deploy --help
```

Or for more general help:

```bash
near --help
```

## Call a method

**Finally call** one of the contract methods:

```bash
near call my-contract.YOU.testnet nameOfContractMethod '{"greeting": "Aloha"}' --account-id YOU.testnet
```

Expected outcome:

```text
Scheduling a call: name-of-contract.YOU.testnet.sayMyName()
[name-of-contract.YOU.testnet]: sayMyName() was called
'Aloha, YOU.testnet!'
```

<blockquote class="info">
<strong>Did you know?</strong><br><br>

To invoke a `change` method:

```sh
near call <contractName> <methodName> [args]     # schedule smart contract call which can modify state
```

To invoke a `view` method:

```sh
near view <contractName> <methodName> [args]     # make smart contract call which can view state
```

`view` methods don't change the state of the blockchain, as opposed to `change` methods which do, and therefore require a cryptographic signature. This costs a little more to compute and take a little longer to process since their execution is recorded permanently on the blockchain (which requires consensus).

</blockquote>

## Delete an account

**And cleanup** by deleting the contract account\*\*

```text
near delete name-of-contract.YOU.testnet YOU.testnet
```

Expected outcome:

```text
Deleting account. Account id: name-of-contract.YOU.testnet, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, beneficiary: YOU.testnet
Account name-of-contract.YOU.testnet for network "default" was deleted.
```
