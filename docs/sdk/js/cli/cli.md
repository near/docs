---
title: JS SDK CLI
---

The SDK [Command Line Interface](https://github.com/near/near-sdk-js/blob/develop/packages/near-sdk-js/src/cli/cli.ts) (CLI) is a tool that enables to act on different parts of the build process as well as generate validations and an [ABI](https://github.com/near/abi). Among other things, the SDK CLI enables you to:

- Control the different parts of the build process
- Validate your contract and TypeScript code
- Create an ABI JSON file

---

## Overview {#overview}

_Click on a command for more information and examples._

**Commands**

| Command                                   | Description                                                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [`near-sdk-js build`](#build)               | stores a full access key locally using [NEAR Wallet](https://wallet.testnet.near.org/) |
| [`near-sdk-js validateContract`](#validate-contract)                 | displays all access keys and their details for a given account |
| [`near-sdk-js checkTypescript`](#check-ts) | generates a local key pair **or** shows public key & [implicit account](/concepts/basics/accounts/account-id#implicit-accounts) |
| [`near-sdk-js createJsFileWithRullup`](#create-js-file)           | adds a new access key to an account |
| [`near-sdk-js transpileJsAndBuildWasm`](#transpile-js-to-wasm)     | deletes an access key from an account |

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

## Commands {#commands}

### `near-sdk-js build` {#build}

Build a NEAR JS Smart-contract, specifying the source, target, package.json, and tsconfig.json files. If none are specified, the default values are used. The argument default values are:

- source: `src/index.js`
- target: `build/contract.wasm`
- packageJson: `package.json`
- tsConfig: `tsconfig.json`

Options default values are set to `false`. 

- arguments (optional): `[source] [target] [packageJson] [tsConfig]`
- options: `--verbose --generateABI`

**Example:**

```bash
near-sdk-js build src/main.ts out/main.wasm package.json tsconfig.json --verbose true --generateABI true
```

### `near-sdk-js validateContract` {#validate-contract}

Validate a NEAR JS Smart-contract. Validates the contract by checking that all parameters are initialized in the constructor. Works only for typescript.

- arguments: `[source]`
- options: `--verbose`

**Example:**

```bash
near-sdk-js validateContract src/main.ts --verbose true
```

**Example Response:**

```
npx near-sdk-js validateContract src/index.ts
[validate] › …  awaiting  Validating src/index.ts contract...
```

---

### `near-sdk-js checkTypescript` {#check-ts}

Run TSC with some cli flags - warning - ignores tsconfig.json.

- arguments: `[source]`
- options: `--verbose`

**Example:**

```bash
near-sdk-js checkTypescript src/main.ts --verbose true
```

<details>
<summary>**Example Response:**</summary>
<p>

```bash
npx near-sdk-js checkTypescript src/index.ts
[checkTypescript] › …  awaiting  Typechecking src/index.ts with tsc...
```

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
    https://explorer.testnet.near.org/transactions/EwU1ooEvkR42HvGoJHu5ou3xLYT3JcgQwFV3fAwevGJg

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
    https://explorer.testnet.near.org/transactions/H2BQL9fXVmdTbwkXcMFfZ7qhZqC8fFhsA8KDHFdT9q2r

</p>
</details>
