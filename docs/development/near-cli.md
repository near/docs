---
id: near-cli
title: NEAR CLI
sidebar_label: NEAR CLI
---

>`near-cli` is a [NodeJS](https://nodejs.org/) command line interface that utilizes [`near-api-js`](https://github.com/near/near-api-js) to connect to and interact with the NEAR blockchain.
>
>This tool can be used to create accounts, access keys, transactions and more!

[[ click here ]](https://github.com/near/near-cli) to view the source code
___

## Installation

> Make sure you have a current version of `npm` and `NodeJS` installed.

### Mac and Linux

  1) Install `npm` [[ click here ]](https://www.npmjs.com/get-npm)
  2) Install `NodeJS` [[ click here ]](https://nodejs.org/en/download)
  3) Install `near-cli` globally by running: 

```bash
npm install -g near-cli
```

### Windows

>For Windows users, we recommend using Windows Subsystem for Linux (`WSL`).

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

___

## Update
>If a `near-cli` update is available, you will be notified in the terminal after running any command. _(see example below)_

![NEAR CLI detects a new version](/docs/assets/near-cli-upgrade-notice.png)

>Follow the instructions to update by running:

```bash
npm install -g near-cli
```

>You can always check your current version by running:

```bash
near --version  # version info appears on the last line of output
```

>Also, you can see the latest available version using `npm outdated`.

```bash
npm outdated -g  # note the difference between Current and Latest
```

### Troubleshooting
>If you have any issues upgrading NEAR CLI, the fastest way to resolve the issue is to uninstall then reinstall.

```bash
npm uninstall -g near-cli
```
```bash
npm install -g near-cli
```
---

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
near generate-key                                # generates a local key pair and an creates an implicit accountId 
near generate-key <account-id>                   # generates a local key pair with an account-id you define
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


## Local Access Keypairs

If you're working with the CLI tools, they will locally save access keypairs in a hidden directory called `.near-credentials` which is located on your user root `~/`.  This is a directory with the format `~/near-credentials/networkname/accountname.json` where the network name is eg `testnet` or `mainnet` and the account name is the NEAR account the keys belong to.

If you need to create this file for some reason, you may need to use commands with the appropriate permissions to do so.

The format of the JSON file is:

```
{
  "account_id":"your_account_name_here", 
  "public_key":"your_public_key_here",
  "private_key":"your_private_key_here" 
}
```
