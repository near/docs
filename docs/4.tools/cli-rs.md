---
id: near-cli-rs
title: NEAR CLI RS
---

# NEAR-CLI-RS

## Quick Start Guide

The `near-cli-rs` tool is a human-friendly companion that helps you interact with the [NEAR Protocol](https://near.org/) from the command line. This has a guided prompt interface to help you make your own commands built in Rust.

:::info note

This is a separate tool from [near-cli](https://docs.near.org/tools/near-cli), a CLI tool of similar functionality without the guided prompts.

:::

## Install

Download the pre-compiled version of `near-cli-rs` for your OS from [GitHub Releases Page](https://github.com/near/near-cli-rs/releases/) or install it with [Cargo](https://doc.rust-lang.org/cargo/) (Rust's package manager tool) with the following command:

```
$ cargo install near-cli-rs
```

## Getting Started

To utilize the commands that involve transactions, sending tokens, deploying contracts, etc., you'll have to store a full access key to a given account on your machine.

Run...

```
near
```

Using the arrow keys navigate to...

```
account  -Manage accounts
```

Navigate to...

```
import-account -Import existing account (a.k.a. "sign-in")
```

choose any of the preferred sign-in methods. For this example, we'll choose the...

```
using-web-wallet -Import existing account using NEAR Wallet (a.k.a. "sign in")
### Account
- Gives you information on a specified account, near balance, storage, list of access keys, etc.
```

For this tutorial select `testnet`

```
What is the name of the network?
mainnet
>testnet
shardnet
```

You'll get redirected to `wallet.testnet.near.org`. Once there, grant authorization. Then in your terminal, you'll be asked to enter your account ID. Give it the name of the account you just authorized access to and a full access key.

If you're on Mac you'll have the option to use the [Mac Keychain](https://support.apple.com/guide/keychain-access/what-is-keychain-access-kyca1083/mac) option.

Either storage option is fine. Using the legacy storage option will save a file in your root directory in a hidden folder called `./near-credentials`. This storage option is compatible with the `near-cli` tool (a cli tool without the guided prompts but similar functionality).

**Good Job!**
Now you can use `near-cli-rs` to it's full capacity.

---

## Usage

To use the `near-cli-rs` simply run the following in your terminal.

```bash
$ near
```

You should then see the following. Use the arrow keys and hit `enter` or simply type out one of the available options to select an option

![](/docs/assets/near-cli-rs.png)

### Accounts

This option will allow you to manage, control, and retrieve information on your accounts.

| Option                 | Description                                |
| ---------------------- | ------------------------------------------ |
| `view-account-summary` | View properties for an account             |
| `import-account`       | Import existing account (a.k.a. "sign in") |
| `create-account`       | Create a new account                       |
| `delete-account`       | Delete an Account                          |
| `list-keys`            | View a list of keys for an account         |
| `add-key`              | Add an access key to an account            |
| `delete-key`           | Delete an access key from an account       |

### Tokens

This will allow you to manage your token assets such as NEAR, FTs and NFTs

| Option              | Description                                                           |
| ------------------- | --------------------------------------------------------------------- |
| `send-near`         | Transfers NEAR to a specified recipient in units of NEAR or yoctoNEAR |
| `send-ft`           | Transfer Fungible Tokens to a specified user                          |
| `send-nft`          | Transfers NFTs between accounts                                       |
| `view-near-balance` | View the balance of NEAR tokens                                       |
| `view-ft-balance`   | View the balance of Fungible Tokens                                   |
| `view-nft-assets`   | View the balance of NFT Tokens                                        |

### Contract

This option allows you to manage and interact with your smart contracts

| Option          | Description             |
| --------------- | ----------------------- |
| `call-function` | Execute Function        |
| `deploy`        | Add a new contract code |
| `download-wasm` | Download Wasm           |

### Transaction

Operate Transactions

| Option                 | Description                 |
| ---------------------- | --------------------------- |
| `view-status`          | View a transaction status   |
| `construct-transaction` | Construct a new transaction |

### Config

Manage the connection parameters inside the `config.toml` file for `near-cli-rs`

This will allow you to change or modify the network connections for your CLI.

| Option              | Description                        |
| ------------------- | ---------------------------------- |
| `show-connections`  | Show a list of network connections |
| `add-connection`    | Add a network connection           |
| `delete-connection` | Delete a network Connection        |

---
