---
id: near-cli
title: NEAR CLI
sidebar_label: NEAR CLI
---

## Overview

NEAR CLI is a fully featured NodeJS command line interface that wraps `near-api-js`.

You use NEAR CLI to connect to the NEAR platform from the terminal to create accounts, deploy contracts and more.

**Prerequisites: Make sure you have the latest version npm and node**

## Installation

### Mac and Linux

* `npm` (Get it [here](https://www.npmjs.com/get-npm))
* `node` version 12.x or greater (Get it [here](https://nodejs.org/en/download))

To install NEAR CLI globally (recommended)

```bash
npm install -g near-cli
```

### Windows

Please use the Windows Subsystem for Linux (WSL).

1. Download a [distro from this Microsoft link](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distros).
2. Install Node.js [following the directions here](https://nodejs.org/en/download/package-manager/)
3. We will be installing `near-cli` globally and Windows is known to have permission issues with this in WSL. Follow the [guide here](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally#manually-change-npms-default-directory) in order to fix this issue.
4. Now we can run the same command as Mac and Linux:

```bash
npm install -g near-cli
```

**Note**: Copy/pasting can be a bit odd using WSL. Quick Edit Mode will allow right-click pasting. Depending on your version there may be another checkbox allowing Ctrl+V pasting as well.

![Windows option called Quick Edit allow right-click pasting in WSL](/docs/assets/windows-quickedit-mode.png)


## Upgrade

If an upgrade is available, NEAR CLI will present a notice similar to the following: 

![NEAR CLI detects a new version](/docs/assets/near-cli-upgrade-notice.png)

To upgrade NEAR CLI, just follow the instructions

```bash
npm install -g near-cli
```

If you're curious, you can always check your current version before and after the upgrade with

```bash
near --version  # version info appears on the last line of output
```

And you can always see the latest available version using

```bash
npm outdated -g  # note the difference between Current and Latest
```

But NEAR CLI handles upgrade notification automatically.

If you have any issues upgrading NEAR CLI, sometimes the fastest way to resolve the issue is to uninstall / reinstall

```bash
npm uninstall -g near-cli
npm install -g near-cli
```

## Usage

In command line, from directory with your project:

```bash
near <command>
```

### Commands

#### For accounts:
```bash
near login                                       # logging in through NEAR protocol wallet
near create-account <accountId>                  # create a developer account with --masterAccount(required), publicKey and initialBalance
near state <accountId>                           # view account state
near keys <accountId>                            # view account public keys
near send <sender> <receiver> <amount>           # send tokens to given receiver
near stake <accountId> <stakingKey> <amount>     # create staking transaction (stakingKey is base58 encoded)
near delete <accountId> <beneficiaryId>          # delete an account and transfer funds to beneficiary account
```

#### For contracts:
```bash
near build                                       # build your smart contract
near deploy                                      # deploy your smart contract
near call <contractName> <methodName> [args]     # schedule smart contract call which can modify state
near view <contractName> <methodName> [args]     # make smart contract call which can view state
near clean                                       # clean the smart contract build locally (remove ./out )
```

#### For transactions:
```bash
near tx-status <hash>                            # lookup transaction status by hash
```

#### Other:

```bash
near repl                                        # launch interactive Node.js shell with NEAR connection available to use
near generate-key <account-id>                   # generate key
```

### Options

| Option           | Description                                   | Type                 | Default                 |
| ---------------- | :-------------------------------------------- | :------------------- | :---------------------- |
| --help           | Show help                                     | [boolean]            |                         |
| --version        | Show version number                           | [boolean]            |                         |
| --nodeUrl        | NEAR node URL                                 | [string]             | "http://localhost:3030" |
| --networkId      | NEAR network ID for different keys by network | [string]             | "default"               |
| --helperUrl      | NEAR contract helper URL                      | [string]             |                         |
| --keyPath        | Path to master account key                    | [string]             |                         |
| --accountId      | Unique identifier for the account             | [string]  [required] |                         |
| --masterAccount  | Account used to create requested account.     | [string]  [required] |                         |
| --publicKey      | Public key to initialize the account with     | [string]  [required] |                         |
| --initialBalance | Number of tokens to transfer to newly account | [string]  [required] |                         |
