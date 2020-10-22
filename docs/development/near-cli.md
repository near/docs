---
id: near-cli
title: NEAR CLI
sidebar_label: NEAR CLI
---

> [`near-cli`](https://github.com/near/near-cli) is a [NodeJS](https://nodejs.org/) command line interface that utilizes [`near-api-js`](https://github.com/near/near-api-js) to connect to and interact with the NEAR blockchain.

---

## Overview

_Click on a command for more information and examples._

### Accounts

| Command                                           | Arguments                           | Description                                                                 |
| ------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------- |
| [`near login`](/docs/development/near-cli#log-in) | n/a                                 | logs in through NEAR protocol wallet                                        |
| `near create-account`                             | `accountId` `--masterAccount`       | creates an account                                                          |
| `near state`                                      | `accountId`                         | shows an account's state _(key / value pairs)_                              |
| `near keys`                                       | `accountId`                         | views **all** of an account's access keys and details                       |
| `near send`                                       | `sender` `receiver` `amount`        | sends tokens between accounts                                               |
| `near stake`                                      | `accountId` `staking_key` `amount`  | creates a staking transaction                                               |
| `near delete`                                     | `accountId` `beneficiary_accountId` | deletes an account and transfers remaining balance to a beneficiary account |

### Contracts

| Command           | Arguments                                                                | Description                                             |
| ----------------- | ------------------------------------------------------------------------ | ------------------------------------------------------- |
| `near deploy`     | `accountId` `wasmFile` `initFunction` `initArgs` `initGas` `initDeposit` | deploys a smart contract to NEAR                        |
| `near dev-deploy` | `wasmFile`                                                               | deploys a contract using a temp acct _(`testnet` only)_ |
| `near clean`      | n/a                                                                      | cleans the local contract build _(remove `./out` )_     |
| `near call`       | `contractName` `method_name` `[args]`                                    | makes a contract call which can modify _or_ view state  |
| `near view`       | `contractName` `methodName` `[args]`                                     | makes a contract call which can **only** view state     |

### Keys

| Command             | Arguments                                                           | Description                                                     |
| ------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------- |
| `near keys`         | `accountId`                                                         | views **all** of an account's access keys and details           |
| `near generate-key` | `accountId`                                                         | generates a local key pair and an creates an implicit accountId |
| `near generate-key` | `--useLedgerKey`                                                    | shows access key based on default Ledger HD path                |
| `near generate-key` | `--seed-phrase="seed phrase"`                                       | shows public key & implicit account using `seed-phrase`         |
| `near generate-key` | ` accountId` `--seed-phrase="seed phrase"`                          | shows _only_ public key using `seed-phrase`                     |
| `near add-key`      | `accountId` `publicKey`                                             | adds a **full** access key to an account                        |
| `near add-key`      | `accountId` `pubKey` `--contract-id` `--method-names` `--allowance` | adds a **function** access key to an account                    |

### Transactions

| Command          | Arguments | Description                             |
| ---------------- | --------- | --------------------------------------- |
| `near tx-status` | `tx_hash` | looks up a transaction's status by hash |

### Validators

| Command           | Arguments | Description                                                             |
| ----------------- | --------- | ----------------------------------------------------------------------- |
| `near validators` | `current` | displays current validators and their details                           |
| `near validators` | `next`    | displays next epoch's total seats avail, seat price, and seats assigned |
| `near proposals`  | n/a       | displays proposals for epoch after next.                                |

### Repl

| Command     | Description                                                                                |
| ----------- | ------------------------------------------------------------------------------------------ |
| `near repl` | launches an interactive connection to the NEAR blockchain via an interactive Node.js shell |

### Options

| Option                        | Type                                                   | Description                                            |
| ----------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `--help`                      | `[boolean]`                                            | shows help _(can be used alone or on any command)_     |
| `--version`                   | `[boolean]`                                            | shows installed version of `near-cli`                  |
| `--nodeUrl`, `--node_url`     | `[string]` `[default: "https://rpc.testnet.near.org"]` | selects an RPC URL _(`testnet`, `mainnet`, `betanet`)_ |
| `--helperUrl`                 | `[string]`                                             | selects a NEAR contract helper URL                     |
| `--keyPath`                   | `[string]`                                             | specify a path to master account key                   |
| `--accountId`, `--account_id` | `[string]`                                             | selects an `accountId`                                 |
| `--useLedgerKey`              | `[string]` `[default: "44'/397'/0'/0'/1'"]`            | uses a Ledger with given HD key path                   |
| `--seedPhrase`                | `[string]`                                             | specify a mnemonic seed phrase                         |
| `--seedPath`                  | `[string]` `[default: "m/44'/397'/0'"]`                | specify a HD path derivation                           |
| `--walletUrl`                 | `[string]`                                             | selects a NEAR wallet URL                              |
| `--contractName`              | `[string]`                                             | selects an account contract name                       |
| `--masterAccount`             | `[string]`                                             | selects a master account                               |
| `--helperAccount`             | `[string]`                                             | selects an expected top-level account for a network    |
| `--verbose`, `-v`             | `[boolean]` `[default: false]`                         | shows verbose output                                   |

---

## Setup

### Installation

> Make sure you have a current version of `npm` and `NodeJS` installed.

#### Mac and Linux

1. Install `npm` [[ click here ]](https://www.npmjs.com/get-npm)
2. Install `NodeJS` [[ click here ]](https://nodejs.org/en/download)
3. Install `near-cli` globally by running:

```bash
npm install -g near-cli
```

#### Windows

> For Windows users, we recommend using Windows Subsystem for Linux (`WSL`).

1. Install `WSL` [[ click here ]](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distros)
2. Install `npm` [[ click here ]](https://www.npmjs.com/get-npm)
3. Install ` Node.js` [ [ click here ]](https://nodejs.org/en/download/package-manager/)
4. Change `npm` default directory [ [ click here ] ](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally#manually-change-npms-default-directory)
   - This is to avoid any permission issues with `WSL`
5. Open `WSL` and install `near-cli` globally by running:

```bash
npm install -g near-cli
```

<blockquote class="info">
<strong>heads up</strong><br><br>

Copy/pasting can be a bit odd using `WSL`.

- "Quick Edit Mode" will allow right-click pasting.
- Depending on your version there may be another checkbox allowing `Ctrl` + `V` pasting as well.

![Windows option called Quick Edit allow right-click pasting in WSL](/docs/assets/windows-quickedit-mode.png)

</blockquote>

### Update `near-cli`

> If a `near-cli` update is available, you will be notified in the terminal after running any command. _(see example below)_

![NEAR CLI detects a new version](/docs/assets/near-cli-upgrade-notice.png)

- Follow the instructions to update by running:

```bash
npm install -g near-cli
```

- You can always check your current version by running:

```bash
near --version  # version info appears on the last line of output
```

- Also, you can see the latest available version using `npm outdated`.

```bash
npm outdated -g  # note the difference between Current and Latest
```

#### Troubleshooting

> If you have any issues upgrading NEAR CLI, the fastest way to resolve the issue is to uninstall then reinstall.

```bash
npm uninstall -g near-cli
```

```bash
npm install -g near-cli
```

---

### Environment Config

> The default network for `near-cli` is `testnet`.

- You can change the network by prepending an environment variable to your command.

```bash
NEAR_ENV=betanet near send ...
```

- Alternatively, you can setup a global environment variable in your `.bash_profile`.

```bash
export NEAR_ENV=mainnet
```

---

## Access Keys

> Many of the commands below will require a `FullAccess` key to perform the action.

### Log In

> `near login` stores a full access key of an account you own / created in [NEAR Wallet](https://wallet.testnet.near.org/).

- Run the following in your terminal:

```bash
near login
```

- You should be redirected to [NEAR Wallet](https://wallet.testnet.near.org/).

![near wallet login](../assets/near-login.png)

- After you click `allow`, you will be asked to confirm this authorization by entering the account name.

![near wallet confirm](../assets/near-login-confirm.png)

---

### Key location

> Once complete, you will now have your Access Key stored locally in a hidden directory called `.near-credentials`

- This directory is located at the root of your `HOME` directory:

  - `~/.near-credentials` _(MAC / Linux)_
  - `C:\Users\YOUR_ACCOUNT\.near-credentials` _(Windows)_

- Inside `.near-credentials`, access keys are organized in network subdirectories:
  - `default` _for `testnet`_
  - `betanet`
  - `mainnet`
- The network subdirectories contain `.JSON` objects with an:
  - `account_id`
  - `private_key`
  - `public_key`

### Key example

```json
{
  "account_id": "example-acct.testnet",
  "public_key": "ed25519:7ns2AZVaG8XZrFrgRw7g8qhgddNTN64Zkz7Eo8JBnV5g",
  "private_key": "ed25519:4Ijd3vNUmdWJ4L922BxcsGN1aDrdpvUHEgqLQAUSLmL7S2qE9tYR9fqL6DqabGGDxCSHkKwdaAGNcHJ2Sfd"
}
```
