---
id: near-cli
title: NEAR CLI
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The NEAR [Command Line Interface](https://github.com/near/near-cli-rs) (CLI) is a tool that enables to interact with the NEAR network directly from the shell. Among other things, the NEAR CLI enables you to create and manage accounts, send tokens such as NEAR, FTs and NFTs, deploy smart contracts,call functions on those contracts, and manage access keys.

---

## Installation

<Tabs>
  <TabItem value="npm">

  ```bash
  npm install -g near-cli-rs@latest
  ```
  </TabItem>
  <TabItem value="Cargo">

  ```
  $ cargo install near-cli-rs
  ```
  </TabItem>
  <TabItem value="Mac and Linux (binaries)">

  ```bash
  curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh
  ```
  </TabItem>
  <TabItem value="Windows (binaries)">

  ```bash
  irm https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.ps1 | iex
  ```
  </TabItem>
</Tabs>

---

## Configuration file
The directory with access keys and available connection networks are defined in the configuration file (`near-cli/config.toml`), which is located depending on the operating system in the following places:

- macOS: `$HOME/Library/Application Support` (e.g. `/Users/Alice/Library/Application Support`)
- Linux: `$XDG_CONFIG_HOME` or `$HOME/.config` (e.g. `/home/alice/.config`)
- Windows: `{FOLDERID*RoamingAppData}` (e.g. `C:\Users\Alice\AppData\Roaming`)

You can learn more about working with the configuration file [here](https://github.com/near/near-cli-rs/blob/main/docs/GUIDE.en.md#config---manage-connections-in-a-configuration-file).


:::tip Custom RPC
You can setup a custom [RPC server](../api/rpc/providers) by changing the `rpc_url` parameter in `near-cli` settings:

```bash
near config edit-connection testnet --key rpc_url --value https://archival-rpc.testnet.near.org/
```
:::


---

## Interactive mode

To use the `near-cli` simply run the following in your terminal.

```bash
$ near
```

You should then see the following. Use the arrow keys and hit `enter` or simply type out one of the available options to select an option

![](/docs/assets/tools/near-cli-rs.png)

:::important
We provide examples only of the most used commands. Such commands may have two versions - a **full** one and a **short** one. If you want to explore all options provided by `near-cli` use the interactive mode described above.
:::

---

## Account

This option will allow you to manage, control, and retrieve information on your accounts.

### Summary

`view-account-summary` - view properties for an account.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

    ```bash
    export ACCOUNT_ID=bob.testnet
    near account view-account-summary $ACCOUNT_ID network-config testnet now
    ```
  </TabItem>
  <TabItem value="Short">

    ```bash
    export ACCOUNT_ID=bob.testnet
    near state $ACCOUNT_ID --networkId testnet
    ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Import

`import-account` - import existing account (a.k.a. "sign in").

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  near account import-account using-web-wallet network-config testnet
  ```
  </TabItem>
  <TabItem value="Short">

  ```bash
  near login --networkId testnet
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Export

`export-account` - export existing account.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export ACCOUNT_ID=bob.testnet
  near account export-account $ACCOUNT_ID using-web-wallet network-config testnet
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Create

`create-account` - create a new account.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export ACCOUNT_ID=bob.testnet
  near account create-account sponsor-by-faucet-service $ACCOUNT_ID autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
  <TabItem value="Short">

  ```bash
  export ACCOUNT_ID=bob.testnet
  near create-account $ACCOUNT_ID --useFaucet --networkId testnet
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Delete

`delete-account` - delete an account.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export ACCOUNT_ID=bob.testnet
  export BENEFICIARY_ID=alice.testnet

  near account delete-account $ACCOUNT_ID beneficiary $BENEFICIARY_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
  <TabItem value="Short">

  ```bash
  export ACCOUNT_ID=bob.testnet
  export BENEFICIARY_ID=alice.testnet

  near delete-account $ACCOUNT_ID $BENEFICIARY_ID --networkId testnet
  ```
  </TabItem>
</Tabs>

---

## Keys

Showing, adding and removing account keys.

### List keys

`list-keys` - view a list of keys for an account.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export ACCOUNT_ID=bob.testnet
  near account list-keys $ACCOUNT_ID network-config testnet now
  ```
  </TabItem>

  <TabItem value="Short">

  ```bash
  export ACCOUNT_ID=bob.testnet
  near list-keys $ACCOUNT_ID --networkId testnet
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Add key

`add-key` - add an access key to an account.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export ACCOUNT_ID=bob.testnet
  near account add-key $ACCOUNT_ID grant-full-access use-manually-provided-public-key ed25519:CXqAs8c8kZz81josLw82RQsnZXk8CAdUo7jAuN7uSht2 network-config testnet sign-with-keychain send
  ```

  </TabItem>
  <TabItem value="Short">

  ```bash
  export ACCOUNT_ID=bob.testnet
  near add-key $ACCOUNT_ID ed25519:CXqAs8c8kZz81josLw82RQsnZXk8CAdUo7jAuN7uSht2 --networkId testnet
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Delete key

`delete-keys` - delete an access key from an account.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export ACCOUNT_ID=bob.testnet
  near account delete-keys $ACCOUNT_ID public-keys ed25519:HdkFZFEPoWfgrrLK3R4t5dWtNoLC8WymBzhCXoP3zrjh network-config testnet sign-with-keychain send
  ```
  </TabItem>
  <TabItem value="Short">

  ```bash
  export ACCOUNT_ID=bob.testnet
  near delete-key $ACCOUNT_ID ed25519:HdkFZFEPoWfgrrLK3R4t5dWtNoLC8WymBzhCXoP3zrjh --networkId testnet
  ```
  </TabItem>
</Tabs>

---

## Tokens

This will allow you to manage your token assets such as NEAR, FTs and NFTs.

### Send NEAR

`send-near` - transfers NEAR to a specified recipient in units of NEAR or yoctoNEAR.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export ACCOUNT_ID=bob.testnet
  export RECEIVER_ID=alice.testnet
  near tokens $ACCOUNT_ID send-near $RECEIVER_ID '0.5 NEAR' network-config testnet sign-with-keychain send
  ```
  </TabItem>
  <TabItem value="Short">

  ```bash
  export ACCOUNT_ID=bob.testnet
  export RECEIVER_ID=alice.testnet

  near send-near $ACCOUNT_ID $RECEIVER_ID 0.5 --networkId testnet
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Send FT

`send-ft` - transfer Fungible Tokens to a specified user.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export ACCOUNT_ID=bob.testnet
  export RECEIVER_ID=alice.testnet
  export FT_CONTRACT_ID=0c97251cd1f630c444dbusdt.testnet

  near tokens $ACCOUNT_ID send-ft $FT_CONTRACT_ID $RECEIVER_ID amount-ft '1 USDT' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Send NFT

`send-nft` - transfers NFTs between accounts.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export ACCOUNT_ID=bob.testnet
  export RECEIVER_ID=alice.testnet
  export NFT_CONTRACT_ID=nft.examples.testnet

  near tokens $ACCOUNT_ID send-nft $NFT_CONTRACT_ID $RECEIVER_ID 1 --prepaid-gas '100.0 Tgas' --attached-deposit '1 yoctoNEAR' network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### View NEAR balance

`view-near-balance` - view the balance of NEAR tokens.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export ACCOUNT_ID=bob.testnet
  near tokens $ACCOUNT_ID view-near-balance network-config testnet now
  ```

  </TabItem>
</Tabs>

<hr class="subsection" />

### View FT balance

`view-ft-balance` - view the balance of Fungible Tokens.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export ACCOUNT_ID=bob.testnet
  export FT_CONTRACT_ID=0c97251cd1f630c444dbusdt.testnet
  near tokens $ACCOUNT_ID view-ft-balance $FT_CONTRACT_ID network-config testnet now
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### View NFT balance

`view-nft-assets` - view the balance of NFT tokens.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export ACCOUNT_ID=bob.testnet
  export NFT_CONTRACT_ID=nft.examples.testnet
  near tokens $ACCOUNT_ID view-nft-assets $NFT_CONTRACT_ID network-config testnet now
  ```
  </TabItem>
</Tabs>

---

## Contract

This option allows you to manage and interact with your smart contracts.

### Call

`call-function` - execute function (contract method).

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  # View method
  export CONTRACT_ID=nft.examples.testnet
  near contract call-function as-read-only $CONTRACT_ID nft_tokens json-args '{"from_index": "0", "limit": 2}' network-config testnet now

  # Call method
  export ACCOUNT_ID=bob.testnet
  near contract call-function as-transaction $CONTRACT_ID nft_mint json-args '{"metadata": {"copies": 1, "description": "The Team Goes", "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/", "title": "GO TEAM"}, "receiver_id": "bob.testnet", "token_id": "5895"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $ACCOUNT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
  <TabItem value="Short">

  ```bash
  # View method
  export CONTRACT_ID=nft.examples.testnet
  near view $CONTRACT_ID nft_tokens '{"from_index": "0", "limit": 2}' --networkId testnet

  # Call method
  export ACCOUNT_ID=bob.testnet
  near call $CONTRACT_ID nft_mint '{"metadata": {"copies": 1, "description": "The Team Goes", "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/", "title": "GO TEAM"}, "receiver_id": "bob.testnet", "token_id": "5896"}' --deposit 0.1 --useAccount $ACCOUNT_ID --networkId testnet
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Deploy

`deploy` - add a new contract code.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export CONTRACT_ID=contract.testnet
  near contract deploy $CONTRACT_ID use-file ../target/near/contract.wasm without-init-call network-config testnet sign-with-keychain send
  ```
  </TabItem>
  <TabItem value="Short">

  ```bash
  export CONTRACT_ID=contract.testnet
  near deploy $CONTRACT_ID ../target/near/contract.wasm --networkId testnet
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Inspect

`inspect` - get a list of available function names.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  export CONTRACT_ID=nft.examples.testnet
  near contract view-storage $CONTRACT_ID all as-text network-config testnet now
  ```
  </TabItem>
  <TabItem value="Short">

  ```bash
  export CONTRACT_ID=nft.examples.testnet
  near storage $CONTRACT_ID --finality final --utf8 --networkId testnet
  ```
  </TabItem>
</Tabs>

---

## Transaction

Operate transactions.

### View status

`view-status` - view a transaction status.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  near transaction view-status BFrVVtjqD2p1zYX1UCvn4nJpy7zPHpY5cTgQaKCZjBvw network-config testnet
  ```
  </TabItem>
  <TabItem value="Short">

  ```bash
  near tx-status BFrVVtjqD2p1zYX1UCvn4nJpy7zPHpY5cTgQaKCZjBvw --networkId testnet
  ```
  </TabItem>
</Tabs>

---

## Config

Manage the connection parameters inside the `config.toml` file for `near-cli`.

This will allow you to change or modify the network connections for your CLI.

### Show connections

`show-connections` - show a list of network connections.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  near config show-connections
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Edit connection

`edit-connection` - edit a network connection.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

  ```bash
  near config edit-connection testnet --key rpc_url --value https://test.rpc.fastnear.com
  ```
  </TabItem>
</Tabs>

---

:::important
We provide examples only of the most used commands. If you want to explore all options provided by `near-cli` use [the interactive mode](#interactive-mode).
:::

---

## Validators

You can use the following commands to interact with the blockchain and view validator stats. There are three reports used to monitor validator status:

- [Proposals](#proposals)
- [Current validators](#current-validators)
- [Next validators](#next-validators)

:::tip
To use these commands, you **must** install the CLI [validator extension](#validator-extension).
:::

### Validator Extension

If you want to interact with [NEAR Validators](https://pages.near.org/papers/economics-in-sharded-blockchain/#validators) from command line, you can install the [NEAR Validator CLI Extension](https://github.com/near-cli-rs/near-validator-cli-rs):

<Tabs>
  <TabItem value="npm">

  ```bash
  npm install -g near-validator
  ```
  </TabItem>
  <TabItem value="Cargo">

  ```bash
  $ cargo install near-validator
  ```
  </TabItem>
  <TabItem value="Mac and Linux (binaries)">

  ```bash
  curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near-cli-rs/near-validator-cli-rs/releases/latest/download/near-validator-installer.sh | sh
  ```
  </TabItem>
  <TabItem value="Windows (binaries)">

  ```bash
  irm https://github.com/near-cli-rs/near-validator-cli-rs/releases/latest/download/near-validator-installer.ps1 | iex
  ```
  </TabItem>
</Tabs>

### Proposals

A proposal by a validator indicates they would like to enter the validator set, in order for a proposal to be accepted it must meet the minimum seat price.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

```sh
near-validator proposals network-config mainnet
```

  </TabItem>
</Tabs>

### Current Validators

This shows a list of active validators in the current epoch, the number of blocks produced, number of blocks expected, and online rate. Used to monitor if a validator is having issues.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

```sh
near-validator validators network-config mainnet now
```

  </TabItem>
</Tabs>

### Next Validators

This shows validators whose proposal was accepted one epoch ago, and that will enter the validator set in the next epoch.

<Tabs groupId="cli-commands">
  <TabItem value="Full">

```sh
near-validator validators network-config mainnet next
```

  </TabItem>
</Tabs>

### Staking

For validators, there's also an option to stake NEAR tokens without deploying a staking pool smart contract.

#### View validator stake

To view the validator's stake on the last block, you need to enter in the terminal command line:

<Tabs groupId="cli-commands">
  <TabItem value="Full">

```sh
near-validator staking view-stake examples.testnet network-config testnet now
```

  </TabItem>
</Tabs>

#### Stake directly without a staking pool

To stake the amount you must enter in the terminal command line:

<Tabs groupId="cli-commands">
  <TabItem value="Full">

```sh
near-validator staking stake-proposal examples.testnet ed25519:AiEo5xepXjY7ChihZJ6AsfoDAaUowhPgvQp997qnFuRP '1500 NEAR' network-config testnet sign-with-keychain send
```

  </TabItem>
</Tabs>

#### Unstake directly without a staking pool

To unstake you must enter in the terminal command line:

<Tabs groupId="cli-commands">
  <TabItem value="Full">

```sh
near-validator staking unstake-proposal examples.testnet ed25519:AiEo5xepXjY7ChihZJ6AsfoDAaUowhPgvQp997qnFuRP network-config testnet sign-with-keychain send
```

  </TabItem>
</Tabs>
