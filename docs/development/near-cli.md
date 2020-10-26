---
id: near-cli
title: NEAR CLI
sidebar_label: NEAR CLI
---

> [`near-cli`](https://github.com/near/near-cli) is a [NodeJS](https://nodejs.org/) command line interface that utilizes [`near-api-js`](https://github.com/near/near-api-js) to connect to and interact with the NEAR blockchain.

---

## Overview

_Click on a command for more information and examples._

**Access Keys**

| Command                                                             | Description                                                                                                       |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [`near login`](/docs/development/near-cli#login)                    | stores a full access key locally using [NEAR Wallet](https://wallet.testnet.near.org/)                            |
| [`near keys`](/docs/development/near-cli#near-keys)                 | displays all access keys for a given account                                                                      |
| [`near generate-key`](/docs/development/near-cli#near-generate-key) | generates a local key pair **or** shows public key & [implicit account](/docs/roles/integrator/implicit-accounts) |
| [`near add-key`](/docs/development/near-cli#near-add-key)           | adds an access key to an account                                                                                  |

**Accounts**

| Command                                                            | Description                                                                 |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| [`near create-account`](/docs/development/near-cli#create-account) | creates an account                                                          |
| `near state`                                                       | shows an account's state _(key / value pairs)_                              |
| [`near keys`](/docs/development/near-cli#near-keys)                | displays all access keys for a given account                                |
| `near send`                                                        | sends tokens between accounts                                               |
| `near stake`                                                       | creates a staking transaction                                               |
| `near delete`                                                      | deletes an account and transfers remaining balance to a beneficiary account |

**Contracts**

| Command           | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `near deploy`     | deploys a smart contract to NEAR                        |
| `near dev-deploy` | deploys a contract using a temp acct _(`testnet` only)_ |
| `near clean`      | cleans the local contract build _(remove `./out` )_     |
| `near call`       | makes a contract call which can modify _or_ view state  |
| `near view`       | makes a contract call which can **only** view state     |

**Transactions**

| Command          | Description                             |
| ---------------- | --------------------------------------- |
| `near tx-status` | looks up a transaction's status by hash |

**Validators**

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `near validators` | views both current and next validator details |
| `near proposals`  | displays proposals for epoch after next.      |

**Repl**

| Command     | Description                                               |
| ----------- | --------------------------------------------------------- |
| `near repl` | launches an interactive connection to the NEAR blockchain |

**Options**

| Option                        | Description                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------- |
| `--help`                      | shows help _(can be used alone or on any command)_                            |
| `--version`                   | shows installed version of `near-cli`                                         |
| `--nodeUrl`, `--node_url`     | selects an [RPC URL](/docs/api/rpc#setup) _(`testnet`, `mainnet`, `betanet`)_ |
| `--helperUrl`                 | selects a contract helper URL                                                 |
| `--keyPath`                   | specify a path to master account key                                          |
| `--accountId`, `--account_id` | selects an `accountId`                                                        |
| `--useLedgerKey`              | uses Ledger with given HD key path `[default: "44'/397'/0'/0'/1'"]`           |
| `--seedPhrase`                | uses a mnemonic seed phrase                                                   |
| `--seedPath`                  | specify a HD path derivation `[default: "m/44'/397'/0'"]`                     |
| `--walletUrl`                 | selects a NEAR wallet URL                                                     |
| `--contractName`              | selects an account contract name                                              |
| `--masterAccount`             | selects a master account                                                      |
| `--helperAccount`             | selects an expected top-level account for a network                           |
| `--verbose`, `-v`             | shows verbose output                                                          |

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

---

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

**Troubleshooting:**

> If you have any issues upgrading NEAR CLI, the fastest way to resolve the issue is to uninstall then reinstall.

```bash
npm uninstall -g near-cli
```

```bash
npm install -g near-cli
```

---

### Network selection

> The default network for `near-cli` is `testnet`.

- You can change the network by prepending an environment variable to your command.

```bash
NEAR_ENV=betanet near send ...
```

- Alternatively, you can setup a global environment variable by running:

```bash
export NEAR_ENV=mainnet
```

---

## Access Keys

### `near login`

> locally stores a full access key of an account you created with [NEAR Wallet](https://wallet.testnet.near.org/).

- arguments: `none`
- options: `default`

**Example:**

```bash
near login
```

- You will be redirected to [NEAR Wallet](https://wallet.testnet.near.org/) requesting full access to your account.
- From here, select which account you would like an access key to.

![near wallet login](../assets/near-login.png)

- After you click `allow`, you will be asked to confirm this authorization by entering the account name.

![near wallet confirm](../assets/near-login-confirm.png)

#### Access Key Location:

- Once complete, you will now have your Access Key stored locally in a hidden directory called `.near-credentials`

  - This directory is located at the root of your `HOME` directory:
    - `~/.near-credentials` _(MAC / Linux)_
    - `C:\Users\YOUR_ACCOUNT\.near-credentials` _(Windows)_

- Inside `.near-credentials`, access keys are organized in network subdirectories:
  - `default` _for `testnet`_
  - `betanet`
  - `mainnet`
- These network subdirectories contain `.JSON` objects with an:
  - `account_id`
  - `private_key`
  - `public_key`

**Example:**

```json
{
  "account_id": "example-acct.testnet",
  "public_key": "ed25519:7ns2AZVaG8XZrFrgRw7g8qhgddNTN64Zkz7Eo8JBnV5g",
  "private_key": "ed25519:4Ijd3vNUmdWJ4L922BxcsGN1aDrdpvUHEgqLQAUSLmL7S2qE9tYR9fqL6DqabGGDxCSHkKwdaAGNcHJ2Sfd"
}
```

---

### `near keys`

> displays all access keys for a given account

- arguments: `accountId`
- options: `default`

**Example:**

```bash
near keys client.chainlink.testnet
```

Example Response:

```
Keys for account client.chainlink.testnet
[
  {
    public_key: 'ed25519:4wrVrZbHrurMYgkcyusfvSJGLburmaw7m3gmCApxgvY4',
    access_key: { nonce: 97, permission: 'FullAccess' }
  },
  {
    public_key: 'ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW',
    access_key: {
      nonce: 88,
      permission: {
        FunctionCall: {
          allowance: '18483247987345065500000000',
          receiver_id: 'client.chainlink.testnet',
          method_names: [ 'get_token_price', [length]: 1 ]
        }
      }
    }
  },
  [length]: 2
]
```

---

### `near generate-key`

> Creates a key pair locally in `.near-credentials` **or** displays public key from Ledger or seed phrase.

- arguments: `accountId` or `none`
- options: `--useLedgerKey`, `--seedPhrase`, or `--seedPath`

---

#### 1) `near generate-key`

> Creates a key pair locally in `.near-credentials` with an [implicit account](/docs/roles/integrator/implicit-accounts) as the accountId. _(hash representation of the public key)_

```bash
near generate-key
```

<details>
<summary>**Example Response:**</summary>
<p>

```bash
Key pair with ed25519:33Vn9VtNEtWQPPd1f4jf5HzJ5weLcvGHU8oz7o5UnPqy public key for an account "1e5b1346bdb4fc5ccd465f6757a9082a84bcacfd396e7d80b0c726252fe8b3e8"
```

</p>
</details>

---

#### 2) `near generate-key accountId`

> Creates a key pair locally in `.near-credentials` with an `accountId` that you specify.

**Note:** This does NOT create an account with this name, and will overwrite an existing `.json` file with the same name.

```bash
near generate-key example.testnet
```

<details>
<summary>**Example Response:**</summary>
<p>

```bash
Key pair with ed25519:CcH3oMEFg8tpJLekyvF7Wp49G81K3QLhGbaWEFwtCjht public key for an account "example.testnet"
```

</p>
</details>

---

#### 3a) `near generate-key --useLedgerKey`

> Uses a connected Ledger device to display a public key and [implicit account](/docs/roles/integrator/implicit-accounts) using the default HD path (`"44'/397'/0'/0'/1'"`)

```bash
near generate-key --useLedgerKey
```

You should then see the following prompt to confirm this request on your Ledger device:

    Make sure to connect your Ledger and open NEAR app
    Waiting for confirmation on Ledger...

After confirming the request on your Ledger device, a public key and implicit accountId will be displayed.

<details>
<summary>**Example Response:**</summary>
<p>

```bash
Using public key: ed25519:B22RP10g695wyeRvKIWv61NjmQZEkWTMzAYgdfx6oSeB2
Implicit account: 42c320xc20739fd9a6bqf2f89z61rd14efe5d3de234199bc771235a4bb8b0e1
```

</p>
</details>

---

#### 3b) `near generate-key --useLedgerKey="HD path you specify"`

> Uses a connected Ledger device to display a public key and [implicit account](/docs/roles/integrator/implicit-accounts) using a custom HD path.

```bash
near generate-key --useLedgerKey="44'/397'/0'/0'/2'"
```

You should then see the following prompt to confirm this request on your Ledger device:

    Make sure to connect your Ledger and open NEAR app
    Waiting for confirmation on Ledger...

After confirming the request on your Ledger device, a public key and implicit accountId will be displayed.

<details>
<summary>**Example Response:**</summary>
<p>

```bash
Using public key: ed25519:B22RP10g695wye3dfa32rDjmQZEkWTMzAYgCX6oSeB2
Implicit account: 42c320xc20739ASD9a6bqf2Dsaf289z61rd14efe5d3de23213789009afDsd5bb8b0e1
```

</p>
</details>

---

#### 4a) `near generate-key --seedPhrase="your seed phrase"`

> Uses a seed phrase to display a public key and [implicit account](/docs/roles/integrator/implicit-accounts)

```bash
near generate-key --seedPhrase="cow moon right send now cool dense quark pretty see light after"
```

<details>
<summary>**Example Response:**</summary>
<p>

    Key pair with ed25519:GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi public key for an account "e9fa50ac20522987a87e566fcd6febdc97bd35c8c489999ca8aff465c56969c3"

</p>
</details>

---

#### 4b) `near generate-key accountId --seedPhrase="your seed phrase"`

> Uses a seed phrase to display a public key **without** the [implicit account](/docs/roles/integrator/implicit-accounts).

```bash
near generate-key example.testnet --seedPhrase="cow moon right send now cool dense quark pretty see light after"
```

<details>
<summary>**Example Response:**</summary>
<p>

    Key pair with ed25519:GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi public key for an account "example.testnet"

</p>
</details>

---

### `near add-key`

> Adds an either a **full access** or **function access** key to a given account.

- arguments: `accountId` `publicKey`
- options: `--contract-id` `--method-names` `--allowance` _(used for function access key)_

**Note:** You will use an _existing_ full access key for the account you would like to add a _new_ key to. ([`near login`](/docs/development/near-cli#near-login))

---

#### 1) add a `full access` key

**Example:**

```bash
near add-key example-acct.testnet Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S
```

<details>
<summary>**Example Response:**</summary>
<p>

    Adding full access key = Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S to example-acct.testnet.
    Transaction Id EwU1ooEvkR42HvGoJHu5ou3xLYT3JcgQwFV3fAwevGJg
    To see the transaction in the transaction explorer, please open this url in your browser
    https://explorer.testnet.near.org/transactions/EwU1ooEvkR42HvGoJHu5ou3xLYT3JcgQwFV3fAwevGJg

</p>
</details>

#### 2) add a `function access` key

**Example:**

```bash
near add-key example-acct.testnet GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi --contract-id example-contract.testnet --method-names example_method --allowance 30000000000
```

<details>
<summary>**Example Response:**</summary>
<p>

    Adding function call access key = GkMNfc92fwM1AmwH1MTjF4b7UZuceamsq96XPkHsQ9vi to example-acct.testnet.
    Transaction Id H2BQL9fXVmdTbwkXcMFfZ7qhZqC8fFhsA8KDHFdT9q2r
    To see the transaction in the transaction explorer, please open this url in your browser
    https://explorer.testnet.near.org/transactions/H2BQL9fXVmdTbwkXcMFfZ7qhZqC8fFhsA8KDHFdT9q2r

</p>
</details>

---

## Accounts

### `near create-account`

> `near create-account` creates an account and requires a `--masterAccount` flag that will be charged for the account's creation.

```bash
near create-account sub-acct.example-acct.testnet --masterAccount example-acct.testnet
```

Result will be:

```bash
Saving key to '/HOME_DIR/.near-credentials/default/sub-acct.example-acct.testnet.json'
Account sub-acct.example-acct.testnet for network "default" was created.
```

- This tool can be used to create accounts, access keys, transactions and more!
- [[ click here ]](https://github.com/near/near-cli) to view the source code

**Accounts**

| Command                                                            | Arguments                           | Description                                                                 |
| ------------------------------------------------------------------ | ----------------------------------- | --------------------------------------------------------------------------- |
| [`near create-account`](/docs/development/near-cli#create-account) | `accountId` `--masterAccount`       | creates an account                                                          |
| `near state`                                                       | `accountId`                         | shows an account's state _(key / value pairs)_                              |
| `near keys`                                                        | `accountId`                         | views **all** of an account's access keys and details                       |
| `near send`                                                        | `sender` `receiver` `amount`        | sends tokens between accounts                                               |
| `near stake`                                                       | `accountId` `staking_key` `amount`  | creates a staking transaction                                               |
| `near delete`                                                      | `accountId` `beneficiary_accountId` | deletes an account and transfers remaining balance to a beneficiary account |

## Contracts

**Contracts**

| Command           | Arguments                                                                | Description                                             |
| ----------------- | ------------------------------------------------------------------------ | ------------------------------------------------------- |
| `near deploy`     | `accountId` `wasmFile` `initFunction` `initArgs` `initGas` `initDeposit` | deploys a smart contract to NEAR                        |
| `near dev-deploy` | `wasmFile`                                                               | deploys a contract using a temp acct _(`testnet` only)_ |
| `near clean`      | n/a                                                                      | cleans the local contract build _(remove `./out` )_     |
| `near call`       | `contractName` `method_name` `[args]`                                    | makes a contract call which can modify _or_ view state  |
| `near view`       | `contractName` `methodName` `[args]`                                     | makes a contract call which can **only** view state     |

## Transactions

## Validators

| Command           | Arguments | Description                                                             |
| ----------------- | --------- | ----------------------------------------------------------------------- |
| `near validators` | `current` | displays current validators and their details                           |
| `near validators` | `next`    | displays next epoch's total seats avail, seat price, and seats assigned |
| `near proposals`  | n/a       | displays proposals for epoch after next.                                |

## Repl

## Options
