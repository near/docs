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
| [`near-sdk-js build`](#build)               | Build a NEAR JS Smart-contract |
| [`near-sdk-js validateContract`](#validate-contract)                 | Validate a NEAR JS Smart-contract |
| [`near-sdk-js checkTypescript`](#check-ts) | Run TSC with some CLI flags |
| [`near-sdk-js createJsFileWithRollup`](#create-js-file)           | Create an intermediate JavaScript file for later processing with QJSC |
| [`near-sdk-js transpileJsAndBuildWasm`](#transpile-js-to-wasm)     | Transpiles the target javascript file into .c and .h using QJSC then compiles that into wasm using clang |

---

## Setup {#setup}

### Installation {#installation}

> Make sure you have a current version of `npm` and `NodeJS` installed.

#### Mac and Linux {#mac-and-linux}

1. Install `npm` and `node` using a [package manager](https://nodejs.org/en/download/package-manager/) like `nvm` as sometimes there are issues using Ledger due to how macOS handles node packages related to USB devices.
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

:::info heads up

Copy/pasting can be a bit odd using `WSL`.

- "Quick Edit Mode" will allow right-click pasting.
- Depending on your version there may be another checkbox allowing `Ctrl` + `V` pasting as well.

![Windows option called Quick Edit allow right-click pasting in WSL](/docs/assets/windows-quickedit-mode.png)

:::

---

## Commands {#commands}

### `near-sdk-js build` {#build}

Build a NEAR JS Smart-contract, specifying the source, target, `package.json`, and `tsconfig.json` files. If none are specified, the default values are used. The argument default values are:

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

Validate a NEAR JS Smart-contract. Validates the contract by checking that all parameters are initialized in the constructor. Works only for TypeScript.

- arguments: `[source]`
- options: `--verbose`

**Example:**

```bash
near-sdk-js validateContract src/main.ts --verbose true
```

**Example Response:**

```bash
npx near-sdk-js validateContract src/index.ts
[validate] › …  awaiting  Validating src/index.ts contract...
```

---

### `near-sdk-js checkTypescript` {#check-ts}

Run TSC with some CLI flags.

 :::note warning
 This command ignores `tsconfig.json`.
 :::

- arguments: `[source]`
- options: `--verbose`

**Example:**

```bash
near-sdk-js checkTypescript src/main.ts --verbose true
```

**Example Response:**

```bash
npx near-sdk-js checkTypescript src/index.ts
[checkTypescript] › …  awaiting  Typechecking src/index.ts with tsc...
```

---

### `near-sdk-js createJsFileWithRollup` {#create-js-file}

Create an intermediate JavaScript file for later processing with QJSC.

- arguments: `[source]` `[target]`
- options: `--verbose`

**Example:**

```bash
near-sdk-js createJsFileWithRollup src/main.ts out/main.js --verbose true
```

**Example Response:**

```bash
npx near-sdk-js createJsFileWithRollup src/index.ts
[createJsFileWithRollup] › …  awaiting  Creating src/index.ts file with Rollup...
```

### `near-sdk-js transpileJsAndBuildWasm` {#transpile-js-to-wasm}

Create an intermediate JavaScript file for later processing with QJSC.

- arguments: `[source]` `[target]`
- options: `--verbose`

**Example:**

```bash
near-sdk-js transpileJsAndBuildWasm src/main.js out/main.wasm --verbose true
```

**Example Response:**

```bash
npx near-sdk-js transpileJsAndBuildWasm
[transpileJsAndBuildWasm] › ✔  success   Generated build/contract.wasm contract successfully!
```
