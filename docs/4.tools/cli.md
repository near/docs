---
id: near-cli
title: NEAR CLI
---

The NEAR [Command Line Interface](https://github.com/near/near-cli) (CLI) is a tool that enables to interact with the NEAR network directly from the shell. Among other things,
the NEAR CLI enables you to:

- Login with a NEAR account
- Deploy a contract
- Interact and query information from a deployed contract

:::tip
Under the hood, NEAR CLI utilizes the [`NEAR JavaScript API`](https://github.com/near/near-api-js)
:::
---

:::info

The NEAR CLI also comes with an implementation in Rust called [`near-cli-rs`](https://github.com/near/near-cli-rs).
If you want to use `near-cli` while you have `near-cli-rs` installed, prefix the following commands with `npx`.
:::

## Overview {#overview}

_Click on a command for more information and examples._

**Access Keys**

| Command                                   | Description                                                                                                                     |
|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| [`near login`](#near-login)               | stores a full access key locally using [NEAR Wallet](https://testnet.mynearwallet.com//)                                        |
| [`near keys`](#near-keys)                 | displays all access keys and their details for a given account                                                                  |
| [`near generate-key`](#near-generate-key) | generates a local key pair **or** shows public key & [implicit account](/concepts/basics/accounts/account-id#implicit-accounts) |
| [`near add-key`](#near-add-key)           | adds a new access key to an account                                                                                             |
| [`near delete-key`](#near-delete-key)     | deletes an access key from an account                                                                                           |

**Accounts**

| Command                                       | Description                                                                 |
|-----------------------------------------------|-----------------------------------------------------------------------------|
| [`near create-account`](#near-create-account) | creates an account                                                          |
| [`near state`](#near-state)                   | shows general details of an account                                         |
| [`near keys`](#near-keys)                     | displays all access keys for a given account                                |
| [`near send`](#near-send)                     | sends tokens from one account to another                                    |
| [`near delete`](#near-delete)                 | deletes an account and transfers remaining balance to a beneficiary account |

**Contracts**

| Command                               | Description                                                                    |
|---------------------------------------|--------------------------------------------------------------------------------|
| [`near deploy`](#near-deploy)         | deploys a smart contract to the NEAR blockchain                                |
| [`near dev-deploy`](#near-dev-deploy) | creates a development account and deploys a contract to it _(`testnet` only)_  |
| [`near call`](#near-call)             | makes a contract call which can invoke `change` _or_ `view` methods            |
| [`near view`](#near-view)             | makes a contract call which can **only** invoke a `view` method                |
| [`near view-state`](#near-view-state) | returns contract state (key / value pairs) in either utf-8 or borsh serialized |

**Transactions**

| Command                             | Description                                |
|-------------------------------------|--------------------------------------------|
| [`near tx-status`](#near-tx-status) | queries a transaction's status by `txHash` |

**Validators**

| Command                                               | Description                                                                              |
|-------------------------------------------------------|------------------------------------------------------------------------------------------|
| [`near validators current`](#near-validators-current) | displays current [epoch](../1.concepts/basics/epoch.md) validator pool details           |
| [`near validators next`](#near-validators-next)       | displays validator details for the next [epoch](../1.concepts/basics/epoch.md)           |
| [`near proposals`](#near-proposals)                   | displays validator proposals for the [epoch](../1.concepts/basics/epoch.md) _after_ next |

**REPL**

| Command                   | Description                                                                                                                            |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| [`near repl`](#near-repl) | launches an interactive connection to the NEAR blockchain ([REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)) |

> For EVM support see [Project Aurora's](https://aurora.dev) [`aurora-cli`](https://github.com/aurora-is-near/aurora-cli).

---

## Setup {#setup}

### Installation {#installation}

> Make sure you have a current version of `npm` and `NodeJS` installed.

#### Mac and Linux {#mac-and-linux}

1. Install `npm` and `node` using a package manager like `nvm` as sometimes there are issues using Ledger due to how OS X handles node packages related to USB devices. [[click here]](https://nodejs.org/en/download/package-manager/)
2. Ensure you have installed Node version 12 or above.
3. Install `near-cli` globally by running:

```bash
npm install -g near-cli
```

#### Windows {#windows}

> For Windows users, we recommend using Windows Subsystem for Linux (`WSL`).

1. Install `WSL` [[click here]](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distros)
2. Install `npm` [[click here]](https://www.npmjs.com/get-npm)
3. Install ` Node.js` [ [ click here ]](https://nodejs.org/en/download/package-manager/)
4. Change `npm` default directory [ [ click here ] ](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally#manually-change-npms-default-directory)
   - This is to avoid any permission issues with `WSL`
5. Open `WSL` and install `near-cli` globally by running:

```bash
npm install -g near-cli
```

<blockquote class="info">
<strong>heads up</strong><br /><br />

Copy/pasting can be a bit odd using `WSL`.

- "Quick Edit Mode" will allow right-click pasting.
- Depending on your version there may be another checkbox allowing `Ctrl` + `V` pasting as well.

![Windows option called Quick Edit allow right-click pasting in WSL](/docs/assets/windows-quickedit-mode.png)

</blockquote>

---

### Update `near-cli` {#update-near-cli}

> If a `near-cli` update is available, you will be notified in the terminal after running any command. _(see example below)_

![NEAR CLI detects a new version](/docs/assets/update_near-cli.png)

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

### Network selection {#network-selection}

> The default network for `near-cli` is `testnet`.

- You can change the network by prepending an environment variable to your command.

```bash
NEAR_ENV=betanet near send ...
```

- Alternatively, you can set up a global environment variable by running:

```bash
export NEAR_ENV=mainnet
```

---

## Access Keys {#access-keys}

### `near login` {#near-login}

> locally stores a full access key of an account you created with [NEAR Wallet](https://testnet.mynearwallet.com//).

- arguments: `none`
- options: `default`

**Example:**

```bash
near login
```

- You will be redirected to [NEAR Wallet](https://testnet.mynearwallet.com//) requesting full access to your account.
- From here, select which account you would like an access key to.

![near wallet login](/docs/assets/near-login.png)

- After you click `allow`, you will be asked to confirm this authorization by entering the account name.

![near wallet confirm](/docs/assets/near-login-confirm.png)

#### Access Key Location: {#access-key-location}

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

### `near keys` {#near-keys}

> Displays all access keys for a given account.

- arguments: `accountId`
- options: `default`

**Example:**

```bash
near keys client.chainlink.testnet
```

**Example Response:**

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

### `near generate-key` {#near-generate-key}

> Creates a key pair locally in `.near-credentials` **or** displays public key from Ledger or seed phrase.

- arguments: `accountId` or `none`
- options: `--useLedgerKey`, `--seedPhrase`, or `--seedPath`

**Note:** There are several ways to use `generate-key` that return very different results. Please reference the examples below for further details.

---

#### 1) `near generate-key` {#1-near-generate-key}

> Creates a key pair locally in `.near-credentials` with an [implicit account](/concepts/basics/accounts/account-id#implicit-accounts) as the accountId. _(hash representation of the public key)_

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

#### 2) `near generate-key accountId` {#2-near-generate-key-accountid}

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

#### 3a) `near generate-key --useLedgerKey` {#3a-near-generate-key---useledgerkey}

> Uses a connected Ledger device to display a public key and [implicit account](/concepts/basics/accounts/account-id#implicit-accounts) using the default HD path (`"44'/397'/0'/0'/1'"`)

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

#### 3b) `near generate-key --useLedgerKey="HD path you specify"` {#3b-near-generate-key---useledgerkeyhd-path-you-specify}

> Uses a connected Ledger device to display a public key and [implicit account](/concepts/basics/accounts/account-id#implicit-accounts) using a custom HD path.

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

#### 4a) `near generate-key --seedPhrase="your seed phrase"` {#4a-near-generate-key---seedphraseyour-seed-phrase}

> Uses a seed phrase to display a public key and [implicit account](/concepts/basics/accounts/account-id#implicit-accounts)

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

#### 4b) `near generate-key accountId --seedPhrase="your seed phrase"` {#4b-near-generate-key-accountid---seedphraseyour-seed-phrase}

> Uses a seed phrase to display a public key **without** the [implicit account](/concepts/basics/accounts/account-id#implicit-accounts).

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

### `near add-key` {#near-add-key}

> Adds an either a **full access** or **function access** key to a given account.

**Note:** You will use an _existing_ full access key for the account you would like to add a _new_ key to. ([`near login`](#near-login))

#### 1) add a `full access` key {#1-add-a-full-access-key}

- arguments: `accountId` `publicKey`

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
    https://testnet.nearblocks.io/txns/EwU1ooEvkR42HvGoJHu5ou3xLYT3JcgQwFV3fAwevGJg

</p>
</details>

#### 2) add a `function access` key {#2-add-a-function-access-key}

- arguments: `accountId` `publicKey` `--contract-id`
- options: `--method-names` `--allowance`

> `accountId` is the account you are adding the key to
>
> `--contract-id` is the contract you are allowing methods to be called on
>
> `--method-names` are optional and if omitted, all methods of the `--contract-id` can be called.
>
> `--allowance` is the amount of Ⓝ the key is allowed to spend on gas fees _only_. If omitted then key will only be able to call view methods.

**Note:** Each transaction made with this key will have gas fees deducted from the initial allowance and once it runs out a new key must be issued.

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
    https://testnet.nearblocks.io/txns/H2BQL9fXVmdTbwkXcMFfZ7qhZqC8fFhsA8KDHFdT9q2r

</p>
</details>

---

### `near delete-key` {#near-delete-key}

> Deletes an existing key for a given account.

- arguments: `accountId` `publicKey`
- options: `default`

**Note:** You will need separate full access key for the account you would like to delete a key from. ([`near login`](#near-login))

**Example:**

```bash
near delete-key example-acct.testnet Cxg2wgFYrdLTEkMu6j5D6aEZqTb3kXbmJygS48ZKbo1S
```

**Example Response:**

    Transaction Id 4PwW7vjzTCno7W433nu4ieA6FvsAjp7zNFwicNLKjQFT
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/4PwW7vjzTCno7W433nu4ieA6FvsAjp7zNFwicNLKjQFT

---

## Accounts {#accounts}

### `near create-account` {#near-create-account}

> Creates an account using a `--masterAccount` that will pay for the account's creation and any initial balance.

- arguments: `accountId` `--masterAccount`
- options: `--initialBalance` `--publicKey` `--newLedgerKey` 

<blockquote class="warning">
<strong>heads up</strong><br /><br />

This command will only allow the creation of [subaccounts](/concepts/basics/accounts/model#subaccounts) of the `--masterAccount`. You can, however, create a [top-level account](/concepts/basics/accounts/model#top-level-accounts) if the length of the account ID is greater than 31 characters. This is most commonly used for [implicit account](/concepts/basics/accounts/model#implicit-accounts) creation.

If you are looking to create a top-level `.testnet` or `.near` account you can do so using `near-api-js` [ [**here**](/tools/near-api-js/cookbook#create-account) ].

</blockquote>

**Implicit account example:**
```bash
near create-account 7e094afcfc4eda8a970f6648cdf0dbd6de --masterAccount example-acct.testnet
```

**Top level account example:**
```bash
near create-account hiiamalongnamedaccountinnearblockchain --masterAccount example-acct.testnet
```

**Subaccount example:**

```bash
near create-account sub-acct.example-acct.testnet --masterAccount example-acct.testnet
```

**Example using `--initialBalance`:**

```bash
near create-account sub-acct2.example-acct.testnet --masterAccount example-acct.testnet --initialBalance 10
```

**.testnet example:**
To create a `.testnet` (or `.mainnet`) account, you must call the testnet contract to create the account. Here is an example:
```bash
near call testnet create_account '{"new_account_id": "<account-name>.testnet", "new_public_key": "ed25519:<data>"}' --deposit 0.00182 --accountId <account-with-funds>
```

<details>
<summary>**Example Response:**</summary>
<p>

    Saving key to '/HOME_DIR/.near-credentials/default/sub-acct2.example-acct.testnet.json'
    Account sub-acct2.example-acct.testnet for network "default" was created.

</p>
</details>

---

### `near state` {#near-state}

> Shows details of an account's state.

- arguments: `accountId`
- options: `default`

**Example:**

```bash
near state example.testnet
```

**Example Response:**

```json
{
  "amount": "99999999303364037168535000",
  "locked": "0",
  "code_hash": "G1PCjeQbvbUsJ8piXNb7Yg6dn3mfivDQN7QkvsVuMt4e",
  "storage_usage": 53528,
  "storage_paid_at": 0,
  "block_height": 21577354,
  "block_hash": "AWu1mrT3eMJLjqyhNHvMKrrbahN6DqcNxXanB5UH1RjB",
  "formattedAmount": "99.999999303364037168535"
}
```

---

### `near send` {#near-send}

> Sends NEAR tokens (Ⓝ) from one account to another.

- arguments: `senderId` `receiverId` `amount`
- options: `default`

**Note:** You will need a full access key for the sending account. ([`near login`](#near-login))

**Example:**

```bash
near send sender.testnet receiver.testnet 10
```

**Example Response**

    Sending 10 NEAR to receiver.testnet from sender.testnet
    Transaction Id BYTr6WNyaEy2ykAiQB9P5VvTyrJcFk6Yw95HPhXC6KfN
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/BYTr6WNyaEy2ykAiQB9P5VvTyrJcFk6Yw95HPhXC6KfN

---

### `near delete` {#near-delete}

> Deletes an account and transfers remaining balance to a beneficiary account.

:::note
The deleted account's name will be made available for use after this action is performed.
:::

- arguments: `accountId` `beneficiaryId`
- options: `default`

**Example:**

```bash
near delete sub-acct2.example-acct.testnet example-acct.testnet
```

**Example Response:**

    Deleting account. Account id: sub-acct2.example-acct.testnet, node: https://rpc.testnet.near.org,  beneficiary: example-acct.testnet
    Transaction Id 4x8xohER1E3yxeYdXPfG8GvXin1ShiaroqE5GdCd5YxX
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/4x8xohER1E3yxeYdXPfG8GvXin1ShiaroqE5GdCd5YxX
    Account sub-acct2.example-acct.testnet for network "default" was deleted.

:::warning Token Loss
If the beneficiary account does not exist, a refund receipt will be generated and sent
back to the original account. But since the original account has already been deleted
an error will rise, and **the funds will be dispersed among validators**.
:::

---

## Contracts {#contracts}

### `near deploy` {#near-deploy}

> Deploys a smart contract to a given accountId.

- arguments: `accountId` `.wasmFile`
- options: `initFunction` `initArgs` `initGas` `initDeposit`

**Note:** You will need a full access key for the account you are deploying the contract to. ([`near login`](#near-login))

**Example:**

```bash
near deploy --accountId example-contract.testnet --wasmFile out/example.wasm
```

**Initialize Example:**

```bash
near deploy --accountId example-contract.testnet --wasmFile out/example.wasm --initFunction new --initArgs '{"owner_id": "example-contract.testnet", "total_supply": "10000000"}'
```

<details>
<summary>**Example Response:**</summary>
<p>

    Starting deployment. Account id: example-contract.testnet, node: https://rpc.testnet.near.org,  file: main.wasm
    Transaction Id G8GhhPuujMHTRnwursPXE1Lv5iUZ8WUecwiST1PcKWMt
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/G8GhhPuujMHTRnwursPXE1Lv5iUZ8WUecwiST1PcKWMt
    Done deploying to example-contract.testnet

</p>
</details>

### `near dev-deploy` {#near-dev-deploy}

> Creates a development account and deploys a smart contract to it. No access keys needed. **_(`testnet` only)_**

- arguments: `.wasmFile`
- options: `default`

**Example:**

```bash
near dev-deploy out/main.wasm
```

**Example Response:**

    Starting deployment. Account id: dev-1603749005325-6432576, node: https://rpc.testnet.near.org,  file: out/main.wasm
    Transaction Id 5nixQT87KeN3eZFX7zwBLUAKSY4nyjhwzLF27SWWKkAp
    To see the transaction in the transaction explorer, please open this url in your browser
    https://testnet.nearblocks.io/txns/5nixQT87KeN3eZFX7zwBLUAKSY4nyjhwzLF27SWWKkAp
    Done deploying to dev-1603749005325-6432576

---

### `near call` {#near-call}

> Makes a contract call which can modify _or_ view state.

**Note:** Contract calls require a transaction fee (gas) so you will need an access key for the `--accountId` that will be charged. ([`near login`](#near-login))

- arguments: `contractName` `method_name` `{ args }` `--accountId`

| Options                   | Description                                                  |
|---------------------------|--------------------------------------------------------------|
| `--gas`                   | Max amount of gas this call can use (in gas units)           |
| `--deposit` or `--amount` | Number of tokens to attach (in NEAR) to a function call      |
| `--depositYocto`          | Number of tokens to attach (in yoctoNEAR) to a function call |
| `--base64`                | Treat arguments as base64-encoded                            |

**Tip:** There are two ways to deal with methods that require empty `{ args }`. Either send `{"field": null}` or simply omit this field and pass in nothing: `{}`

**Example:**

```bash
near call guest-book.testnet addMessage '{"text": "Aloha"}' --accountId example-acct.testnet
```

**Example Response:**

```bash
Scheduling a call: guest-book.testnet.addMessage({"text": "Aloha"})
Transaction Id FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/FY8hBam2iyQfdHkdR1dp6w5XEPJzJSosX1wUeVPyUvVK
''
```
---

### `near view` {#near-view}

> Makes a contract call which can **only** view state. _(Call is free of charge)_

- arguments: `contractName` `method_name` `{ args }`
- options: `default`

**Example:**

```bash
near view guest-book.testnet getMessages '{}'
```

**Example Response:**

```bash
    View call: guest-book.testnet.getMessages({})
    [
      { premium: false, sender: 'waverlymaven.testnet', text: 'TGIF' },
      {
        premium: true,
        sender: 'waverlymaven.testnet',
        text: 'Hello from New York 🌈'
      },
      { premium: false, sender: 'fhr.testnet', text: 'Hi' },
      { premium: true, sender: 'eugenethedream', text: 'test' },
      { premium: false, sender: 'dongri.testnet', text: 'test' },
      { premium: false, sender: 'dongri.testnet', text: 'hello' },
      { premium: true, sender: 'dongri.testnet', text: 'hey' },
      { premium: false, sender: 'hirokihori.testnet', text: 'hello' },
      { premium: true, sender: 'eugenethedream', text: 'hello' },
      { premium: false, sender: 'example-acct.testnet', text: 'Aloha' },
      [length]: 10
    ]
```

## `near view-state` {#near-view-state}

> Returns contract state (key / value pairs) in either utf-8 or borsh serialized format.

- arguments: `accountId` [`finality`](/api/rpc/setup#using-finality-param) _OR_ [`block-id`](/api/rpc/setup#using-block_id-param)
- options: `default`

**Example:**

```bash
near view-state dao.sputnik-v2.testnet --finality final
```

OR

```bash
near view-state dao.sputnik-v2.testnet --block-id 53199035
```

<details>
<summary>**Example Response:**</summary>
<p>

```js
[
  {
    key: <Buffer 00>,
    value: <Buffer 07 00 00 00 67 65 6e 65 73 69 73 0b 00 00 00 47 65 6e 65 73 69 73 20 44 41 4f 00 00 00 00>
  },
  {
    key: <Buffer 01>,
    value: <Buffer 01 02 00 00 00 03 00 00 00 61 6c 6c 00 01 00 00 00 0d 00 00 00 2a 3a 41 64 64 50 72 6f 70 6f 73 61 6c 00 00 00 00 07 00 00 00 63 6f 75 6e 63 69 6c 02 ... 222 more bytes>
  },
  {
    key: <Buffer 03 00 00 00 00 00 00 00 00>,
    value: <Buffer 00 14 00 00 00 6e 65 61 72 2d 65 78 61 6d 70 6c 65 2e 74 65 73 74 6e 65 74 0f 00 00 00 41 64 64 20 4e 65 77 20 43 6f 75 6e 63 69 6c 02 18 00 00 00 63 ... 133 more bytes>
  },
  {
    key: <Buffer 53 54 41 54 45>,
    value: <Buffer 01 00 00 00 00 01 00 00 00 01 00 00 80 66 de c1 b9 a2 df e3 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 02 01 00 ... 39 more bytes>
  }
]
```

</p>
</details>

---

## Transactions {#transactions}

### `near tx-status` {#near-tx-status}

> Displays transaction status details for given transaction hash and accountId.

- arguments: `tx hash` `--accountId` _OR_ `accountId:tx_hash` _(see examples below)_
- options: `default`

**Example:**

```bash
near tx-status near-example.testnet:6hnVD3n4LvQbUrWofSjxbN2uwLLANnkXLqRYPnMbsP3j
```

OR

```bash
near tx-status 6hnVD3n4LvQbUrWofSjxbN2uwLLANnkXLqRYPnMbsP3j --accountId near-example.testnet
```

<details>
<summary>**Example Response:**</summary>
<p>

```json
Transaction near-example.testnet:6hnVD3n4LvQbUrWofSjxbN2uwLLANnkXLqRYPnMbsP3j
{
  status: { SuccessValue: '' },
  transaction: {
    signer_id: 'near-example.testnet',
    public_key: 'ed25519:3PTXqkrMLb1nVchxzC4RX5fUShq7EBqkSV7Te17n5J42',
    nonce: 50891444000001,
    receiver_id: 'receiver.testnet',
    actions: [ { Transfer: { deposit: '1000000000000000000000000' } } ],
    signature: 'ed25519:4oBvWrBYJT6YPRaJctWxtsMSMcKBcLhCvWAipoQ18qRe4myxJNnkR6hypw2Nqcc99Yg6e47yqmwt3VDXiyGHth7w',
    hash: '6hnVD3n4LvQbUrWofSjxbN2uwLLANnkXLqRYPnMbsP3j'
  },
  transaction_outcome: {
    proof: [],
    block_hash: 'ASUCV9Zk5R9KbXB2ngMernS38KgFwK3Y8x8zZjSX8xcK',
    id: '6hnVD3n4LvQbUrWofSjxbN2uwLLANnkXLqRYPnMbsP3j',
    outcome: {
      logs: [],
      receipt_ids: [ 'JBXhsPNwx1g2gmrAXFy9UmP8ziSgsZn6kxDcijNsbABo' ],
      gas_burnt: 223182562500,
      tokens_burnt: '22318256250000000000',
      executor_id: 'near-example.testnet',
      status: {
        SuccessReceiptId: 'JBXhsPNwx1g2gmrAXFy9UmP8ziSgsZn6kxDcijNsbABo'
      }
    }
  },
  receipts_outcome: [
    {
      proof: [],
      block_hash: '5gsqDtub9x2L6jnThg6gi3FZTVzusvjqhxFWYQ31hedw',
      id: 'JBXhsPNwx1g2gmrAXFy9UmP8ziSgsZn6kxDcijNsbABo',
      outcome: {
        logs: [],
        receipt_ids: [ 'DxBEN5ZcfZJ21e2axAe7aLwTVSyxCmgDuht1TsDXT2DT' ],
        gas_burnt: 223182562500,
        tokens_burnt: '22318256250000000000',
        executor_id: 'receiver.testnet',
        status: { SuccessValue: '' }
      }
    },
    {
      proof: [],
      block_hash: '9BcSFdzHzXtQhSS5uPUY6mAtNWwbQJoEiyqwZk4GAbe6',
      id: 'DxBEN5ZcfZJ21e2axAe7aLwTVSyxCmgDuht1TsDXT2DT',
      outcome: {
        logs: [],
        receipt_ids: [],
        gas_burnt: 0,
        tokens_burnt: '0',
        executor_id: 'near-example.testnet',
        status: { SuccessValue: '' }
      }
    }
  ]
}
```

</p>
</details>

---

## Validators {#validators}

### `near validators current` {#near-validators-current}

> Displays details of current validators.
>
> - amount staked
> - number of seats
> - percentage of uptime
> - expected block production
> - blocks actually produced

- arguments: `current`
- options: `default`

**Example:**

```bash
near validators current
```

**Example for `mainnet`:**

```bash
NEAR_ENV=mainnet near validators current
```

<details>
<summary>**Example Response:**</summary>
<p>

```bash
Validators (total: 49, seat price: 1,976,588):
.--------------------------------------------------------------------------------------------------------------------.
| Validator Id                                 | Stake      | Seats | % Online | Blocks produced | Blocks expected |
|----------------------------------------------|------------|-------|----------|-----------------|-----------------|
| cryptium.poolv1.near                         | 13,945,727 | 7     | 100%     | 1143            | 1143            |
| astro-stakers.poolv1.near                    | 11,660,189 | 5     | 100%     | 817             | 817             |
| blockdaemon.poolv1.near                      | 11,542,867 | 5     | 76.74%   | 627             | 817             |
| zavodil.poolv1.near                          | 11,183,187 | 5     | 100%     | 818             | 818             |
| bisontrails.poolv1.near                      | 10,291,696 | 5     | 99.38%   | 810             | 815             |
| dokiacapital.poolv1.near                     | 7,906,352  | 3     | 99.54%   | 650             | 653             |
| chorusone.poolv1.near                        | 7,480,508  | 3     | 100%     | 490             | 490             |
| figment.poolv1.near                          | 6,931,070  | 3     | 100%     | 489             | 489             |
| stardust.poolv1.near                         | 6,401,678  | 3     | 100%     | 491             | 491             |
| anonymous.poolv1.near                        | 6,291,821  | 3     | 97.55%   | 479             | 491             |
| d1.poolv1.near                               | 6,265,109  | 3     | 100%     | 491             | 491             |
| near8888.poolv1.near                         | 6,202,968  | 3     | 99.38%   | 486             | 489             |
| rekt.poolv1.near                             | 5,950,212  | 3     | 100%     | 490             | 490             |
| epic.poolv1.near                             | 5,639,256  | 2     | 100%     | 326             | 326             |
| fresh.poolv1.near                            | 5,460,410  | 2     | 100%     | 327             | 327             |
| buildlinks.poolv1.near                       | 4,838,398  | 2     | 99.38%   | 325             | 327             |
| jubi.poolv1.near                             | 4,805,921  | 2     | 100%     | 326             | 326             |
| openshards.poolv1.near                       | 4,644,553  | 2     | 100%     | 326             | 326             |
| jazza.poolv1.near                            | 4,563,432  | 2     | 100%     | 327             | 327             |
| northernlights.poolv1.near                   | 4,467,978  | 2     | 99.39%   | 326             | 328             |
| inotel.poolv1.near                           | 4,427,152  | 2     | 100%     | 327             | 327             |
| baziliknear.poolv1.near                      | 4,261,142  | 2     | 100%     | 328             | 328             |
| stakesabai.poolv1.near                       | 4,242,618  | 2     | 100%     | 326             | 326             |
| everstake.poolv1.near                        | 4,234,552  | 2     | 100%     | 327             | 327             |
| stakin.poolv1.near                           | 4,071,704  | 2     | 100%     | 327             | 327             |
| certusone.poolv1.near                        | 3,734,505  | 1     | 100%     | 164             | 164             |
| lux.poolv1.near                              | 3,705,394  | 1     | 100%     | 163             | 163             |
| staked.poolv1.near                           | 3,683,365  | 1     | 100%     | 164             | 164             |
| lunanova.poolv1.near                         | 3,597,231  | 1     | 100%     | 163             | 163             |
| appload.poolv1.near                          | 3,133,163  | 1     | 100%     | 163             | 163             |
| smart-stake.poolv1.near                      | 3,095,711  | 1     | 100%     | 164             | 164             |
| artemis.poolv1.near                          | 3,009,462  | 1     | 99.39%   | 163             | 164             |
| moonlet.poolv1.near                          | 2,790,296  | 1     | 100%     | 163             | 163             |
| nearfans.poolv1.near                         | 2,771,137  | 1     | 100%     | 163             | 163             |
| nodeasy.poolv1.near                          | 2,692,745  | 1     | 99.39%   | 163             | 164             |
| erm.poolv1.near                              | 2,653,524  | 1     | 100%     | 164             | 164             |
| zkv_staketosupportprivacy.poolv1.near        | 2,548,343  | 1     | 99.39%   | 163             | 164             |
| dsrvlabs.poolv1.near                         | 2,542,925  | 1     | 100%     | 164             | 164             |
| 08investinwomen_runbybisontrails.poolv1.near | 2,493,123  | 1     | 100%     | 163             | 163             |
| electric.poolv1.near                         | 2,400,532  | 1     | 99.39%   | 163             | 164             |
| sparkpool.poolv1.near                        | 2,378,191  | 1     | 100%     | 163             | 163             |
| hashquark.poolv1.near                        | 2,376,424  | 1     | 100%     | 164             | 164             |
| masternode24.poolv1.near                     | 2,355,634  | 1     | 100%     | 164             | 164             |
| sharpdarts.poolv1.near                       | 2,332,398  | 1     | 99.38%   | 162             | 163             |
| fish.poolv1.near                             | 2,315,249  | 1     | 100%     | 163             | 163             |
| ashert.poolv1.near                           | 2,103,327  | 1     | 97.56%   | 160             | 164             |
| 01node.poolv1.near                           | 2,058,200  | 1     | 100%     | 163             | 163             |
| finoa.poolv1.near                            | 2,012,304  | 1     | 100%     | 163             | 163             |
| majlovesreg.poolv1.near                      | 2,005,032  | 1     | 100%     | 164             | 164             |
'--------------------------------------------------------------------------------------------------------------------'
```

</p>
</details>

---

### `near validators next` {#near-validators-next}

> Displays details for the next round of validators.
>
> - total number of seats available
> - seat price
> - amount staked
> - number of seats assigned per validator

- arguments: `next`
- options: `default`

**Example:**

```bash
near validators next
```

**Example for `mainnet`:**

```bash
NEAR_ENV=mainnet near validators next
```

<details>
<summary>**Example Response:**</summary>
<p>

```bash
Next validators (total: 49, seat price: 1,983,932):
.----------------------------------------------------------------------------------------------.
| Status   | Validator                                    | Stake                    | Seats |
|----------|----------------------------------------------|--------------------------|-------|
| Rewarded | cryptium.poolv1.near                         | 13,945,727 -> 14,048,816 | 7     |
| Rewarded | astro-stakers.poolv1.near                    | 11,660,189 -> 11,704,904 | 5     |
| Rewarded | blockdaemon.poolv1.near                      | 11,542,867 -> 11,545,942 | 5     |
| Rewarded | zavodil.poolv1.near                          | 11,183,187 -> 11,204,123 | 5     |
| Rewarded | bisontrails.poolv1.near                      | 10,291,696 -> 10,297,923 | 5     |
| Rewarded | dokiacapital.poolv1.near                     | 7,906,352 -> 8,097,275   | 4     |
| Rewarded | chorusone.poolv1.near                        | 7,480,508 -> 7,500,576   | 3     |
| Rewarded | figment.poolv1.near                          | 6,931,070 -> 6,932,916   | 3     |
| Rewarded | stardust.poolv1.near                         | 6,401,678 -> 6,449,363   | 3     |
| Rewarded | anonymous.poolv1.near                        | 6,291,821 -> 6,293,497   | 3     |
| Rewarded | d1.poolv1.near                               | 6,265,109 -> 6,266,777   | 3     |
| Rewarded | near8888.poolv1.near                         | 6,202,968 -> 6,204,620   | 3     |
| Rewarded | rekt.poolv1.near                             | 5,950,212 -> 5,951,797   | 2     |
| Rewarded | epic.poolv1.near                             | 5,639,256 -> 5,640,758   | 2     |
| Rewarded | fresh.poolv1.near                            | 5,460,410 -> 5,461,811   | 2     |
| Rewarded | buildlinks.poolv1.near                       | 4,838,398 -> 4,839,686   | 2     |
| Rewarded | jubi.poolv1.near                             | 4,805,921 -> 4,807,201   | 2     |
| Rewarded | openshards.poolv1.near                       | 4,644,553 -> 4,776,692   | 2     |
| Rewarded | jazza.poolv1.near                            | 4,563,432 -> 4,564,648   | 2     |
| Rewarded | northernlights.poolv1.near                   | 4,467,978 -> 4,469,168   | 2     |
| Rewarded | inotel.poolv1.near                           | 4,427,152 -> 4,428,331   | 2     |
| Rewarded | baziliknear.poolv1.near                      | 4,261,142 -> 4,290,338   | 2     |
| Rewarded | stakesabai.poolv1.near                       | 4,242,618 -> 4,243,748   | 2     |
| Rewarded | everstake.poolv1.near                        | 4,234,552 -> 4,235,679   | 2     |
| Rewarded | stakin.poolv1.near                           | 4,071,704 -> 4,072,773   | 2     |
| Rewarded | certusone.poolv1.near                        | 3,734,505 -> 3,735,500   | 1     |
| Rewarded | lux.poolv1.near                              | 3,705,394 -> 3,716,381   | 1     |
| Rewarded | staked.poolv1.near                           | 3,683,365 -> 3,684,346   | 1     |
| Rewarded | lunanova.poolv1.near                         | 3,597,231 -> 3,597,836   | 1     |
| Rewarded | appload.poolv1.near                          | 3,133,163 -> 3,152,302   | 1     |
| Rewarded | smart-stake.poolv1.near                      | 3,095,711 -> 3,096,509   | 1     |
| Rewarded | artemis.poolv1.near                          | 3,009,462 -> 3,010,265   | 1     |
| Rewarded | moonlet.poolv1.near                          | 2,790,296 -> 2,948,565   | 1     |
| Rewarded | nearfans.poolv1.near                         | 2,771,137 -> 2,771,875   | 1     |
| Rewarded | nodeasy.poolv1.near                          | 2,692,745 -> 2,693,463   | 1     |
| Rewarded | erm.poolv1.near                              | 2,653,524 -> 2,654,231   | 1     |
| Rewarded | dsrvlabs.poolv1.near                         | 2,542,925 -> 2,571,865   | 1     |
| Rewarded | zkv_staketosupportprivacy.poolv1.near        | 2,548,343 -> 2,549,022   | 1     |
| Rewarded | 08investinwomen_runbybisontrails.poolv1.near | 2,493,123 -> 2,493,787   | 1     |
| Rewarded | masternode24.poolv1.near                     | 2,355,634 -> 2,456,226   | 1     |
| Rewarded | fish.poolv1.near                             | 2,315,249 -> 2,415,831   | 1     |
| Rewarded | electric.poolv1.near                         | 2,400,532 -> 2,401,172   | 1     |
| Rewarded | sparkpool.poolv1.near                        | 2,378,191 -> 2,378,824   | 1     |
| Rewarded | hashquark.poolv1.near                        | 2,376,424 -> 2,377,057   | 1     |
| Rewarded | sharpdarts.poolv1.near                       | 2,332,398 -> 2,332,948   | 1     |
| Rewarded | ashert.poolv1.near                           | 2,103,327 -> 2,103,887   | 1     |
| Rewarded | 01node.poolv1.near                           | 2,058,200 -> 2,058,760   | 1     |
| Rewarded | finoa.poolv1.near                            | 2,012,304 -> 2,015,808   | 1     |
| Rewarded | majlovesreg.poolv1.near                      | 2,005,032 -> 2,005,566   | 1     |
'----------------------------------------------------------------------------------------------'
```

</p>
</details>

---

### `near proposals` {#near-proposals}

> Displays validator proposals for [epoch](../1.concepts/basics/epoch.md) after next.
>
> - expected seat price
> - status of proposals
> - previous amount staked and new amount that _will_ be staked
> - amount of seats assigned per validator

- arguments: `none`
- options: `default`

**Example:**

```bash
near proposals
```

**Example for `mainnet`:**

```bash
NEAR_ENV=mainnet near proposals
```

<details>
<summary>**Example Response:**</summary>
<p>

```bash
Proposals for the epoch after next (new: 51, passing: 49, expected seat price = 1,983,932)
.--------------------------------------------------------------------------------------------------------.
| Status             | Validator                                    | Stake => New Stake       | Seats |
|--------------------|----------------------------------------------|--------------------------|-------|
| Proposal(Accepted) | cryptium.poolv1.near                         | 13,945,727 => 14,041,766 | 7     |
| Proposal(Accepted) | astro-stakers.poolv1.near                    | 11,660,189 => 11,705,673 | 5     |
| Proposal(Accepted) | blockdaemon.poolv1.near                      | 11,542,867 => 11,545,942 | 5     |
| Proposal(Accepted) | zavodil.poolv1.near                          | 11,183,187 => 11,207,805 | 5     |
| Proposal(Accepted) | bisontrails.poolv1.near                      | 10,291,696 => 10,300,978 | 5     |
| Proposal(Accepted) | dokiacapital.poolv1.near                     | 7,906,352 => 8,097,275   | 4     |
| Proposal(Accepted) | chorusone.poolv1.near                        | 7,480,508 => 7,568,268   | 3     |
| Proposal(Accepted) | figment.poolv1.near                          | 6,931,070 => 6,932,916   | 3     |
| Proposal(Accepted) | stardust.poolv1.near                         | 6,401,678 => 6,449,363   | 3     |
| Proposal(Accepted) | anonymous.poolv1.near                        | 6,291,821 => 6,293,497   | 3     |
| Proposal(Accepted) | d1.poolv1.near                               | 6,265,109 => 6,266,777   | 3     |
| Proposal(Accepted) | near8888.poolv1.near                         | 6,202,968 => 6,204,620   | 3     |
| Proposal(Accepted) | rekt.poolv1.near                             | 5,950,212 => 5,951,797   | 2     |
| Proposal(Accepted) | epic.poolv1.near                             | 5,639,256 => 5,640,758   | 2     |
| Proposal(Accepted) | fresh.poolv1.near                            | 5,460,410 => 5,461,811   | 2     |
| Proposal(Accepted) | buildlinks.poolv1.near                       | 4,838,398 => 4,839,686   | 2     |
| Proposal(Accepted) | jubi.poolv1.near                             | 4,805,921 => 4,807,201   | 2     |
| Proposal(Accepted) | openshards.poolv1.near                       | 4,644,553 => 4,776,692   | 2     |
| Proposal(Accepted) | jazza.poolv1.near                            | 4,563,432 => 4,564,648   | 2     |
| Proposal(Accepted) | northernlights.poolv1.near                   | 4,467,978 => 4,469,168   | 2     |
| Proposal(Accepted) | inotel.poolv1.near                           | 4,427,152 => 4,428,331   | 2     |
| Proposal(Accepted) | baziliknear.poolv1.near                      | 4,261,142 => 4,290,891   | 2     |
| Proposal(Accepted) | stakesabai.poolv1.near                       | 4,242,618 => 4,243,748   | 2     |
| Proposal(Accepted) | everstake.poolv1.near                        | 4,234,552 => 4,235,679   | 2     |
| Proposal(Accepted) | stakin.poolv1.near                           | 4,071,704 => 4,072,773   | 2     |
| Proposal(Accepted) | certusone.poolv1.near                        | 3,734,505 => 3,735,500   | 1     |
| Proposal(Accepted) | lux.poolv1.near                              | 3,705,394 => 3,716,381   | 1     |
| Proposal(Accepted) | staked.poolv1.near                           | 3,683,365 => 3,684,346   | 1     |
| Proposal(Accepted) | lunanova.poolv1.near                         | 3,597,231 => 3,597,836   | 1     |
| Proposal(Accepted) | appload.poolv1.near                          | 3,133,163 => 3,152,302   | 1     |
| Proposal(Accepted) | smart-stake.poolv1.near                      | 3,095,711 => 3,096,509   | 1     |
| Proposal(Accepted) | artemis.poolv1.near                          | 3,009,462 => 3,010,265   | 1     |
| Proposal(Accepted) | moonlet.poolv1.near                          | 2,790,296 => 2,948,565   | 1     |
| Proposal(Accepted) | nearfans.poolv1.near                         | 2,771,137 => 2,771,875   | 1     |
| Proposal(Accepted) | nodeasy.poolv1.near                          | 2,692,745 => 2,693,463   | 1     |
| Proposal(Accepted) | erm.poolv1.near                              | 2,653,524 => 2,654,231   | 1     |
| Proposal(Accepted) | dsrvlabs.poolv1.near                         | 2,542,925 => 2,571,865   | 1     |
| Proposal(Accepted) | zkv_staketosupportprivacy.poolv1.near        | 2,548,343 => 2,549,022   | 1     |
| Proposal(Accepted) | 08investinwomen_runbybisontrails.poolv1.near | 2,493,123 => 2,493,787   | 1     |
| Proposal(Accepted) | masternode24.poolv1.near                     | 2,355,634 => 2,456,226   | 1     |
| Proposal(Accepted) | fish.poolv1.near                             | 2,315,249 => 2,415,831   | 1     |
| Proposal(Accepted) | electric.poolv1.near                         | 2,400,532 => 2,401,172   | 1     |
| Proposal(Accepted) | sparkpool.poolv1.near                        | 2,378,191 => 2,378,824   | 1     |
| Proposal(Accepted) | hashquark.poolv1.near                        | 2,376,424 => 2,377,057   | 1     |
| Proposal(Accepted) | sharpdarts.poolv1.near                       | 2,332,398 => 2,332,948   | 1     |
| Proposal(Accepted) | ashert.poolv1.near                           | 2,103,327 => 2,103,887   | 1     |
| Proposal(Accepted) | 01node.poolv1.near                           | 2,058,200 => 2,059,314   | 1     |
| Proposal(Accepted) | finoa.poolv1.near                            | 2,012,304 => 2,015,808   | 1     |
| Proposal(Accepted) | majlovesreg.poolv1.near                      | 2,005,032 => 2,005,566   | 1     |
| Proposal(Declined) | huobipool.poolv1.near                        | 1,666,976                | 0     |
| Proposal(Declined) | hb436_pool.poolv1.near                       | 500,030                  | 0     |
'--------------------------------------------------------------------------------------------------------'

```

</p>
</details>

---

## REPL {#repl}

### `near repl` {#near-repl}

> Launches NEAR [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) _(an interactive JavaScript programming environment)_ connected to NEAR.

- arguments: `none`
- options: `--accountId`

To launch, run:

```bash
near repl
```

- You will then be shown a prompt `>` and can begin interacting with NEAR.
- Try typing the following into your prompt that converts NEAR (Ⓝ) into yoctoNEAR (10^-24):

```bash
nearAPI.utils.format.parseNearAmount('1000')
```

> You can also use an `--accountId` with `near repl`.

**Example:**

```bash
near repl --accountId example-acct.testnet
```

- Then try console logging `account` after the `>` prompt.

```bash
console.log(account)
```

**Example Response:**

```json
Account {
  accessKeyByPublicKeyCache: {},
  connection: Connection {
    networkId: 'default',
    provider: JsonRpcProvider { connection: [Object] },
    signer: InMemorySigner { keyStore: [MergeKeyStore] }
  },
  accountId: 'example-acct.testnet',
  _ready: Promise { undefined },
  _state: {
    amount: '98786165075093615800000000',
    locked: '0',
    code_hash: '11111111111111111111111111111111',
    storage_usage: 741,
    storage_paid_at: 0,
    block_height: 21661252,
    block_hash: 'HbAj25dTzP3ssYjNRHov9BQ72UxpHGVqZK1mZwGdGNbo'
  }
}
```

> You can also get a private key's public key.

- First, declare a `privateKey` variable:

```js
const myPrivateKey =
  "3fKM9Rr7LHyzhhzmmedXLvc59rayfh1oUYS3VfUcxwpAFQZtdx1G9aTY6i8hG9mQtYoycTEFTBtatgNKHRtYamrS";
```

- Then, run:

```js
nearAPI.KeyPair.fromString(myPrivateKey).publicKey.toString();
```

With NEAR REPL, you have complete access to [`near-api-js`](https://github.com/near/near-api-js) to help you develop on the NEAR platform.

---

## Options {#options}

| Option                        | Description                                                                                                                            |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `--help`                      | shows help _(can be used alone or on any command)_                                                                                     |
| `--version`                   | shows installed version of `near-cli`                                                                                                  |
| `--nodeUrl`, `--node_url`     | selects an [RPC URL](/api/rpc/setup) _(`testnet`, `mainnet`, `betanet`)_                                                               |
| `--helperUrl`                 | points to a [contract helper](https://github.com/near/near-contract-helper) instance you want to use for account creation / management |
| `--keyPath`                   | specify a path to `--masterAccount` key                                                                                                |
| `--accountId`, `--account_id` | selects an account ID                                                                                                                  |
| `--useLedgerKey`              | uses Ledger with given HD key path `[default: "44'/397'/0'/0'/1'"]`                                                                    |
| `--seedPhrase`                | uses a mnemonic seed phrase                                                                                                            |
| `--seedPath`                  | specify a HD path derivation `[default: "m/44'/397'/0'"]`                                                                              |
| `--walletUrl`                 | selects a [NEAR wallet](https://testnet.mynearwallet.com) URL                                                                          |
| `--contractName`              | selects an account contract name                                                                                                       |
| `--masterAccount`             | selects a master account                                                                                                               |
| `--helperAccount`             | selects an expected top-level account for a network                                                                                    |
| `--verbose`, `-v`             | shows verbose output                                                                                                                   |
| `--gas`                       | specifies amount of gas to use for a contract call `[default: "100000000000000"]`                                                      |
| `--deposit`                   | Number of NEAR tokens (Ⓝ) to attach `[default: "0"]`                                                                                   |
| `--depositYocto`              | Number of tokens to attach (in yocto Ⓝ) to a function call `[default: null]`                                                           |

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"><h8>Ask it on StackOverflow!</h8></a>
:::
