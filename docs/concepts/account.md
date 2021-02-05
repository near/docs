---
id: account
title: Account
sidebar_label: Account
---

NEAR uses human readable account IDs instead of a public key hash. For a 20-minute video explanation, see [this Lunch and Learn](https://www.youtube.com/watch?time_continue=18&v=2_Ekz7w6Eo4&feature=emb_logo) on YouTube.

## Account ID Rules

- minimum length is 2
- maximum length is 64
- `Account ID` consists of `Account ID parts` separated by `.`
- `Account ID part` consists of lowercase alphanumeric symbols separated by either `_` or `-`.

Account names are similar to a domain names. Anyone can create a top level account (TLA) without separators, e.g. `near`. Only `near` can create `alice.near`. And only `alice.near` can create `app.alice.near` and so on. Note, `near` can NOT create `app.alice.near` directly.

Regex for a full account ID, without checking for length: `^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$`

---

## Top Level Accounts

Top level account names (TLAs) are very valuable as they provide root of trust and discoverability for companies, applications and users. To allow for fair access to them, the top level account names that are shorter than `MIN_ALLOWED_TOP_LEVEL_ACCOUNT_LENGTH` characters (32 at time of writing) will be auctioned off.

Specifically, only `REGISTRAR_ACCOUNT_ID` account can create new top level accounts that are shorter than `MIN_ALLOWED_TOP_LEVEL_ACCOUNT_LENGTH` characters. `REGISTRAR_ACCOUNT_ID` implements a standard `Account Naming` interface which allow it to create new accounts.

We are not going to deploy the `registrar` auction at launch. Instead we will allow it to be deployed by the Near Foundation at some point in the future.

Currently all `mainnet` accounts use a `near` top level account name (ex `example.near`) and all `testnet` accounts use a `testnet` top level account (ex. `example.testnet`).

---

## Subaccounts

As stated before, account names on NEAR follow a similar naming pattern to that of website domains with similar rules. Accounts can create as many subaccounts as they wish, and only the parent account can create a subaccount. For example, `example.near` can create `subaccount1.example.near` and `subaccount2.example.near` but CAN NOT create `sub.subaccount.example.near`. Only `subaccount.example.near` can create `sub.subaccount.example.near` in the same way `test.near` can NOT create `subaccount.example.near`. Only the direct parent account has permission to create a subaccount.

Try it out using our [`near-cli`](https://docs.near.org/docs/development/near-cli) command, [`near create-account`](https://docs.near.org/docs/development/near-cli#near-create-account), in your terminal.

---

## Dev Accounts

Dev accounts are special accounts made automatically by tools like near-cli and the wallet to help you automate testing and deploying of contracts. Since every account can have a contract, but re-deploying contracts DOES NOT create new state, you often want to deploy to a completely different account when testing.

> **Note:** When deploying multiple test examples and creating new dev accounts, you will need to "Sign Out" of the NEAR Wallet on any `localhost` examples and "Sign In" again! Signing in adds an access key to your account and saves the private key in localStorage so the app can call contract methods without asking for approval again. BUT! There's a chance you're now trying to interact with a contract that is deployed a completely different dev account.

### How to create a dev account

- When you the command `dev-deploy` from near-cli, it looks for a file here `/neardev/dev-account` with the dev account ID to deploy to.

- If it doesn't find one, it creates a dev-account (using our cloud helper service for creating test accounts) and then creates the folder for you with the `dev-account` file.

- It will also create the associated credentials, a public and private keypair here: `~/.near-credentials/default/[dev-account-id].json`. Go ahead and try it:

```
code ~/.near-credentials/default/[dev-account-id].json
```

- Replace dev-account-id with the account ID here `/neardev/dev-account` and open the json file up in your editor of choice (code for VS Code).

### How do I get another one

- Delete the folder `/neardev` and run `near dev-deploy [wasmFile default="/out/main.wasm"]` and you'll see a new dev account was created in `neardev` and credentials are also stored for you.

### Ok I have a dev account, so what?

- These accounts and associated keypairs found in the json file are super useful for automating your testing.

- Many examples in the NEAR ecosystem use some sort of `yarn dev:deploy` script that deploys contracts and maybe even runs some tests. It's important to know how these accounts are created, where their credentials are stored and how you can use them yourself.

---

## Access Keys

NEAR uses human readable account IDs instead of a public key hash as the account identifier and many keys ([public/private key pairs](https://en.wikipedia.org/wiki/Public-key_cryptography)) can be created for each account that we call "Access Keys". Currently, there are two types of access keys; `FullAccess` & `FunctionCall`.

### Full Access Keys

As the name suggests, `FullAccess` keys have full control of an account similar to having administrator privileges on your operating system. With this key you have the ability to perform any of the eight action types on NEAR without any limitations.

1) Create Account
2) Delete Account
3) Add Key
4) Delete Key
5) Deploy Contract
6) Function Call
7) Transfer Ⓝ
8) Stake Ⓝ _(for validators)_

See our [action specifications](https://nomicon.io/RuntimeSpec/Actions.html) section for more details.

### Function Call Keys

A `FunctionCall` key is unique as it only has permission to call a smart contract's method(s) that _do not_ attach Ⓝ as a deposit (i.e. payable functions). These keys have the following three attributes:

1) `allowance` - amount of Ⓝ loaded onto the key to pay for gas fees  _(0.25 default)_
2) `receiver_id` - contract the key is allowed to call methods on _(required)_
3) `method_names` - contract methods the key is allowed to call _(optional)_

> **Note:** If no specific method names are specified, all methods may be called.

The easiest way to create a `FunctionCall` key with your dApp is to prompt users to sign in using [NEAR Wallet](https://wallet.testnet.near.org/) via `near-api-js`'s [`WalletConnection`](https://github.com/near/near-api-js/blob/0aefdb01a151f7361463f3ff65c77dbfeee83200/lib/wallet-account.js#L13-L139). This prompts users to authorize access and upon approval a `FunctionCall` key is created. This key is only allowed to call methods on the contract that redirected the user to NEAR Wallet with a default allowance of 0.25 Ⓝ to cover gas costs for transactions. As non-monetary transactions are performed with this key, you will notice the allowance decreases and once 0.25 Ⓝ is burnt a new key will need to be created. If a request is made to transfer _ANY_ amount of tokens with a `FunctionCall` key, the user will be redirected back to wallet to authorize this transaction. You can see this functionality in action by trying out [NEAR Guestbook](https://near-examples.github.io/guest-book/).

Another way to create a `FunctionAccess` key is to use `near-cli`'s [`add-key`](/docs/development/near-cli#near-add-key) command. With `near-cli` you can be more specific with your `FunctionCall` key by only allowing it to call specific contract methods as well as make adjustments to the allowance amount.

`FunctionCall` access keys are a powerful usability feature of NEAR opening up many possibilities. Not only can you eliminate the need for users to authorize small transactions over and over again but you could even allow a user to interact with the blockchain without ever having to create an account. This can be accomplished by having the dApp automatically create a `FunctionCall` key that points to itself with a single click on your front-end allowing anyone to interact with your dApp seamlessly.

---

## Compared to Ethereum

If you're familiar with development on Ethereum, it's worth making a quick note about how accounts are different. The image below summarizes some key differences.

![Ethereum vs NEAR accounts](/docs/assets/accounts-compare-ethereum-v-near.png)

_image source: medium.com/@clinder_

---

## Accounts and Contracts

Each NEAR account can only hold 1 smart contract. For applications where users should be able to organize multiple contracts you can create "subaccounts" whose "master account" is the user account. The format of a subaccount would include a dot in the name like `contract1.user-A-account`, `contract2.user-A-account`, etc. NEAR restricts the creation of accounts with a dot in the name such that these accounts can only by created by `user-A-account`, as if the user account is a top-level domain like `your-company.com` if you're familiar with this model.

Using NEAR CLI you could deploy new contracts to your account like this:

```bash
near deploy --wasm-file path/to/contract.wasm --account-id contractAccount.developerAccount.testnet --master-account yourAccount.testnet
```

Note for this to work you will need to login with NEAR CLI and authorize it to use the master account (`YOUR_ACCOUNT.testnet`) on your behalf. Learn more about [NEAR CLI here](/docs/development/near-cli)

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
