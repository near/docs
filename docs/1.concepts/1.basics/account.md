---
id: account
title: Accounts
---

To be more user-friendly and approachable, NEAR account IDs are human-readable instead of public key hashes.

For example, you could create `alice.near` or `bob.near` instead of `0x71C7656EC7ab88b098defB751B7401B5f6d8976F`.
This creates a more straightforward user experience, and reduces confusion when making transactions.

## Accounts and Contracts {#accounts-and-contracts}

Each NEAR account can only hold one smart contract. However, you can create "subaccounts" with a "master account" for apps with multiple contracts. Account naming follows the internet domains model. So for example, the account `user-A-account` can create subaccounts `contract1.user-A-account` and `contract2.user-A-account`.

Using NEAR CLI, you could deploy new contracts to your account like this:

```bash
near deploy --wasm-file path/to/contract.wasm --account-id contractAccount.developerAccount.testnet --master-account YOUR_ACCOUNT.testnet
```

Note that for this to work, you will need to login with NEAR CLI and authorize it to use the master account (`YOUR_ACCOUNT.testnet`) on your behalf. Learn more about [NEAR CLI](/docs/tools/near-cli).

---

## Account ID Rules {#account-id-rules}

The rules for account IDs are:
- Minimum length is 2
- Maximum length is 64
- `ACCOUNT_ID` consists of `ID_PART`s separated by `.`
- `ID_PART` consists of lowercase alphanumeric symbols separated by either `_` or `-`.

Account names are similar to domain names. For example:
- Anyone can create a top-level account (TLA) without separators, e.g. `near`.
- Only `near` can create `alice.near`.
- And only `alice.near` can create `app.alice.near`.
- Note, `near` can NOT create `app.alice.near` directly.

Regex for a full account ID, without checking for length:
```regexp
^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$
```

---

## Account Types {#account-types}

There are few account types, for production use and also for development.

### Top-level Accounts {#top-level-accounts}

Top-level account names (TLAs) are simliar to '.com' or '.org' in domain names. They are very valuable as they provide a root of trust and discoverability for companies, applications, and users. Therefore, to allow for fair access, top-level account names shorter than `MIN_ALLOWED_TOP_LEVEL_ACCOUNT_LENGTH` characters (32 at the time of writing) will be auctioned off.

Specifically, only the`REGISTRAR_ACCOUNT_ID` account can create new top-level accounts that are shorter than `MIN_ALLOWED_TOP_LEVEL_ACCOUNT_LENGTH` characters. `REGISTRAR_ACCOUNT_ID` implements a standard `Account Naming` interface which allows it to create new accounts.

Currently, the `registrar` auction is not allowed. We will allow it to be deployed by the NEAR Foundation in the future.

Currently, all `mainnet` accounts use a `near` top-level account name (ex `example.near`) and all `testnet` accounts use a `testnet` top-level account (ex. `example.testnet`).


### Subaccounts {#subaccounts}

As stated before, account names on NEAR follow a similar naming pattern to that of website domains with similar rules. Accounts can create as many subaccounts as they wish, and only the parent account can create a subaccount.
For example:
- `example.near` can create `subaccount1.example.near` and `subaccount2.example.near`,
- but `example.near` CAN NOT create `sub.subaccount.example.near`.
- Only `subaccount.example.near` can create `sub.subaccount.example.near`,
- in the same way `test.near` can NOT create `subaccount.example.near`.
- Only the direct parent account has permission to create a subaccount.

Try it out using our [`near-cli`](/tools/cli) command, [`near create-account`](/tools/cli#near-create-account), in your terminal.

### Implicit-Accounts {#implicit-accounts}

Implicit accounts work similarly to Bitcoin/Ethereum accounts: they allow you to reserve an account ID before it's created by generating a ED25519 key-pair locally. This key-pair has a public key that maps to 64 character hex representation which becomes the account ID.

For example:
- Public key in base58: `BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX`
- Implicit Account: `98793cd91a3f870fb126f66285808c7e094afcfc4eda8a970f6648cdf0dbd6de`

[ [Click here](../../roles/integrator/implicit-accounts) ] for more information as well as a guide on implicit account creation.


### Dev Accounts {#dev-accounts}

Dev accounts are made automatically by tools like near-cli and the wallet to help you automate testing
and deploying contracts. Since re-deploying a contract on an account DOES NOT create new state, you often want to deploy rapidly to fresh accounts when testing.

Dev accounts are very useful for automating your testing. Many examples in the NEAR ecosystem use automated scripts that deploy contracts to dev accounts. It's important to know how these accounts are created, where their credentials are stored, and how you can use them.

> **Note:** When deploying multiple test examples and creating new dev accounts, you will need to "Sign Out" of the NEAR Wallet on any `localhost` examples and "Sign In" again! Signing in adds an access key to your account and saves the private key in localStorage so the app can call contract methods without asking for approval again. BUT! There's a chance you're now trying to interact with a contract deployed on an entirely different dev account.

#### How to create a dev account {#how-to-create-a-dev-account}

- When you run the command `dev-deploy` from near-cli, it looks for a file in your working dir `./neardev/dev-account` with the dev account ID to deploy to.

- If it doesn't find one, it creates a dev-account (using our cloud helper service for creating test accounts) and then creates the folder for you with the `dev-account` file.

- It also creates the associated credentials, a public and private keypair here: `~/.near-credentials/default/[dev-account-id].json`.


#### How to re-create a dev account {#how-do-i-get-another-one}

- Delete the folder `./neardev` and run `near dev-deploy` again.


---

## Access Keys {#access-keys}

NEAR uses human-readable account IDs instead of a public key hash as the account identifier.

Many keys ([public/private key pairs](https://en.wikipedia.org/wiki/Public-key_cryptography)), called "Access Keys", can be created for each account.
Currently, there are two types of access keys: `FullAccess` & `FunctionCall`.

### Full Access Keys {#full-access-keys}

As the name suggests, `FullAccess` keys have full control of an account, similar to having administrator privileges on your operating system. With this key, you can perform any of the eight action types on NEAR without limitations.

1. Create Account
2. Delete Account
3. Add Key
4. Delete Key
5. Deploy Contract
6. Function Call
7. Transfer Ⓝ
8. Stake Ⓝ _(for validators)_

See our [action specifications](https://nomicon.io/RuntimeSpec/Actions.html) section for more details.

### Function Call Keys {#function-call-keys}

A `FunctionCall` key only has permission to call non-payable functions. Non-payable functions are smart contract's method(s) that _do'nt_ attach Ⓝ as a deposit.
These keys have the following three attributes:

1. `allowance` - the amount of Ⓝ the key is allowed to spend on gas fees _(optional - default: `null`)_
2. `receiver_id` - contract the key is allowed to call methods on _(required)_
3. `method_names` - contract methods the key is allowed to call _(optional)_

> **Note:** If `allowance` is omitted, the default will be `null`, and the key will only be allowed to call `view` (read-only) methods.
You cannot add allowance after the key is created.

> **Note:** If no specific method names are specified, _all methods_ may be called.

The easiest way to create a `FunctionCall` key with your dApp is to prompt users to sign in using [NEAR Wallet](https://wallet.testnet.near.org/) via `near-api-js`'s [`WalletConnection`](https://github.com/near/near-api-js/blob/0aefdb01a151f7361463f3ff65c77dbfeee83200/lib/wallet-account.js#L13-L139). The sign in prompt asks users to authorize access, and then a `FunctionCall` key is created. The newly created key is only allowed to call methods on the contract that redirected the user to NEAR Wallet with a default allowance of 0.25 Ⓝ to cover gas costs for transactions. As non-monetary transactions are performed with this key, the gas allowance decreases, and once 0.25 Ⓝ is burnt, a new key will need to be created. If a request is made to transfer _ANY_ amount of tokens with a `FunctionCall` key, the user will be redirected back to the wallet to authorize this transaction. You can see this functionality in action by trying out [NEAR Guestbook](https://near-examples.github.io/guest-book/).

Another way to create a `FunctionAccess` key is to use `near-cli`'s [`add-key`](/tools/cli#near-add-key) command. With `near-cli` you can be more specific with your `FunctionCall` key by only allowing it to call specific contract methods and make adjustments to the allowance amount.

`FunctionCall` access keys are a powerful usability feature of NEAR, opening up many possibilities. For example, you can eliminate the need for users to authorize small transactions over and over again, and you could allow a user to interact with the blockchain without ever having to create an account. This can be accomplished by having the dApp automatically create a `FunctionCall` key that points to itself with a single click on your front-end, allowing anyone to interact with your dApp seamlessly.

---

## NEAR Accounts Compared to Ethereum {#compared-to-ethereum}

If you're familiar with development on Ethereum, it's worth making a quick note about how accounts are different. The table below summarizes some key differences:

|  | Ethereum Wallet                            | NEAR Account                                                                 |
|--|--------------------------------------------|------------------------------------------------------------------------------|
| Public Identifier | Public Key (`0x123...`) |  Account ID (`alice.near`) |
| Secret Key | Private Key (`0x456...`) | Multiple Keypairs with permissions:<br />- `FullAccess` key<br />- `FunctionCall` key |
| Characteristics | - Private key gives full access<br />- Account doesn't have to be created via a transaction      | - Permission-based keypair<br />- Account ID must be created via blockchain transaction |


---


> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
