---
id: near-clitool
title: NEAR Shell
sidebar_label: NEAR Shell
---

## Overview

NEAR Shell is a fully featured NodeJS command line application that wraps `nearlib`.

You use NEAR Shell to connect to the NEAR platform from the terminal to create accounts, deploy contracts and more.

**Prerequisites: Make sure you have the latest version npm and node**

* `npm` \(Get it [here](https://www.npmjs.com/get-npm)\)
* `node version 10.x` \(Get it [here](https://nodejs.org/en/download)\)

## Installation

### Mac and Linux systems:

```bash
npm install -g near-shell
```

### Windows users

Please use the Windows Subsystem for Linux (WSL).

1. Download a [distro from this Microsoft link](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distros).
2. Install Node.js [following the directions here](https://nodejs.org/en/download/package-manager/)
3. We will be installing `near-shell` globally and Windows is known to have permission issues with this in WSL. Follow the [guide here](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally#manually-change-npms-default-directory) in order to fix this issue.
4. Now we can run the same command as Linux:

```bash
npm install -g near-shell
```

**Note**: Copy/pasting can be a bit odd using WSL. Quick Edit Mode will allow right-click pasting. Depending on your version there may be another checkbox allowing Ctrl+V pasting as well.

![Windows option called Quick Edit allow right-click pasting in WSL](/docs/assets/windows-quickedit-mode.png)


## Upgrade

You can check your current version with

```bash
near --version
```

and update with

```bash
npm upgrade near -g
```

## Usage

In command line, from directory with your project:

```bash
near <command>
```

### Commands

For account:
```bash
  near login                                       # logging in through NEAR protocol wallet (also can create new account)
  near create_account <accountId> <masterAccount>  # create a developer account with --masterAccount(required), publicKey and initialBalance
  near state <accountId>                            # view account state
  near keys <accountId>                            # view account public keys
  near send <sender> <receiver> <amount>           # send tokens to given receiver
  near stake <accountId> <stakingKey> <amount>     # create staking transaction (stakingKey is base58 encoded)
  near delete <accountId> <beneficiaryId>          # delete an account and transfer funds to beneficiary account
```

For smart contract:
```bash
  near build                                   # build your smart contract
  near deploy                                  # deploy your smart contract
  near call <contractName> <methodName>        # schedule smart contract call which
  [args]                                       # can modify state
  near view <contractName> <methodName>        # make smart contract call which can
  [args]                                       # view state
  near clean                                   # clean the smart contract build locally(remove ./out )
```

For transactions:
```bash
  near tx-status <hash>                        # lookup transaction status by hash
```

### Options

| Option                    | Description                                   | Type      | Default               |
| --------------------------|:---------------------------------------------:| :---------|:----------------------|
| --help                    | Show help                                     | [boolean] |                       |
| --version                 | Show version number                           | [boolean] |                       |
| --nodeUrl, --node_url     | NEAR node URL                                 | [string]  |"http://localhost:3030"|
| --networkId, --network_id | NEAR network ID for different keys by network | [string]  |"default"              |
| --helperUrl               | NEAR contract helper URL                      | [string]  |                       |
| --keyPath                 | Path to master account key                    | [string]  |                       |
| --homeDir                 | Where to look for master account              | [string]  |"~/.near"              |
| --accountId, --account_id | Unique identifier for the account             | [string]  [required]|             |
| --masterAccount           | Account used to create requested account.     | [string]  [required]|             |
| --publicKey               | Public key to initialize the account with     | [string]  [required]|             |
| --initialBalance          | Number of tokens to transfer to newly account | [string]  [required]|             |
