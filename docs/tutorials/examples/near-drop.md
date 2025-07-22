---
id: near-drop
title: Near Drop
description: "NEAR Drop is a smart contract that allows users to create token drops ($NEAR, Fungible and Non-Fungible Tokens), and link them to specific private keys. Whoever has the private key can claim the drop into an existing account, or ask the contract to create a new one for them."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

NEAR Drop is a smart contract that allows users to create token drops ($NEAR, Fungible and Non-Fungible Tokens), and link them to specific private keys. Whoever has the private key can claim the drop into an existing account, or ask the contract to create a new one for them.

Particularly, it shows:

1. How to create a token drops (NEAR, FT and NFT)
2. How to leverage Function Call keys for enabling amazing UX

:::tip

This example showcases a simplified version of the contract that both [Keypom](https://keypom.xyz/) and the [Token Drop Utility](https://dev.near.org/tools?tab=linkdrops) use to distribute tokens to users

:::

---

## Contract Overview

The contract exposes 3 methods to create drops of NEAR tokens, FT, and NFT. To claim the tokens, the contract exposes two methods, one to claim in an existing account, and another that will create a new account and claim the tokens into it.

This contract leverages NEAR unique feature of [FunctionCall keys](../../protocol/access-keys.md), which allows the contract to create new accounts and claim tokens on behalf of the user.

Imagine Alice want to drop some NEAR to Bob:

1. Alice will call `create_near_drop` passing some NEAR amount, and a **Public** Access Key
2. The Contract will check if Alice attached enough tokens and create the drop
3. The Contract will add the `PublicKey` as a `FunctionCall Key` to itself, that **only allow to call the claim methods**
4. Alice will give the `Private Key` to Bob
5. Bob will use the Key to sign a transaction calling the `claim_for` method
6. The Contract will check if the key is linked to a drop, and if it is, it will send the drop

It is important to notice that, in step (5), Bob will be using the Contract's account to sign the transaction, and not his own account. Remember that in step (3) the contract added the key to itself, meaning that anyone with the key can call the claim methods in the name of the contract.

<details>

<summary>Contract's interface</summary>

#### `create_near_drop(public_keys, amount_per_drop)`
Creates `#public_keys` drops, each with `amount_per_drop` NEAR tokens on them

#### `create_ft_drop(public_keys, ft_contract, amount_per_drop)`
Creates `#public_keys` drops, each with `amount_per_drop` FT tokens, corresponding to the `ft_contract`

#### `create_nft_drop(public_key, nft_contract)`
Creates a drop with an NFT token, which will come from the `nft_contract`

#### `claim_for(account_id)`
Claims a drop, which will be sent to the existing `account_id`

#### `create_account_and_claim(account_id)`
Creates the `account_id`, and then drops the tokens into it

</details>

---

## Contract's State

We can see in the contract's state that the contract keeps track of different `PublicKeys`, and links them to a specific `DropId`, which is simply an identifier for a `Drop` (see below). 

- `top_level_account`: The account that will be used to create new accounts, generally it will be `testnet` or `mainnet`
- `next_drop_id`: A simple counter used to assign unique identifiers to each drop
- `drop_id_by_key`: A `Map` between `PublicKey` and `DropId`, which allows the contract to know what drops are claimable by a given key
- `drop_by_id`: A simple `Map` that links each `DropId` with the actual `Drop` data.

<Github fname="lib.rs" language="rust"
      url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
      start="22" end="29" />

---

## Drop Types

There are 3 types of drops, which differ in what the user will receive when they claims the corresponding drop - NEAR, fungible tokens (FTs) or non-fungible tokens (NFTs).

<Language value="rust" language="rust">
<Github fname="drop_types.rs"
  url="https://github.com/near-examples/near-drop/blob/main/src/drop_types.rs"
  start="8" end="16" />
<Github fname="near_drop.rs"
  url="https://github.com/near-examples/near-drop/blob/main/src/near_drop.rs"
  start="9" end="16" />
<Github fname="ft_drop.rs"
  url="https://github.com/near-examples/near-drop/blob/main/src/ft_drop.rs"
  start="16" end="24" />
<Github fname="nft_drop.rs"
  url="https://github.com/near-examples/near-drop/blob/main/src/nft_drop.rs"
  start="15" end="22" />
</Language>

:::info

Notice that in this example implementation users cannot mix drops. This is, you can either drop NEAR tokens, or FT, or NFTs, but not a mixture of them (i.e. you cannot drop 1 NEAR token and 1 FT token in the same drop)

:::

---

## Create a drop

All `create` start by checking that the user deposited enough funds to create the drop, and then proceed to add the access keys to the contract's account as [FunctionCall Keys](../../protocol/access-keys.md).

<Tabs>

  <TabItem value="NEAR" label="NEAR Drop">
    <Language value="rust" language="rust">
      <Github fname="create_near_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
        start="44" end="66" />
      <Github fname="near_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/near_drop.rs"
        start="63" end="95" />
    </Language>
  </TabItem>
  <TabItem value="FT" label="FT Drop">
    <Language value="rust" language="rust">
      <Github fname="create_ft_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
        start="68" end="89" />
      <Github fname="ft_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/ft_drop.rs"
        start="108" end="142" />
    </Language>
  </TabItem>
  <TabItem value="NFT" label="NFT Drop">
    <Language value="rust" language="rust">
      <Github fname="create_nft_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
        start="91" end="103" />
      <Github fname="nft_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/nft_drop.rs"
        start="80" end="106" />
    </Language>
  </TabItem>
</Tabs>

<hr class="subsection" />

### Storage Costs

While we will not go into the details of how the storage costs are calculated, it is important to know what is being taken into account:

1. The cost of storing each Drop, which will include storing all bytes associated with the `Drop` struct
2. The cost of storing each `PublicKey -> DropId` relation in the maps
3. Cost of storing each `PublicKey` in the account

Notice that (3) is not the cost of storing the byte representation of the `PublicKey` on the state, but the cost of adding the key to the contract's account as a FunctionCall key.

---

## Claim a drop

In order to claim drop, a user needs to sign a transaction using the `Private Key`, which is the counterpart of the `Public Key` that was added to the contract.

All `Drops` have a `counter` which decreases by 1 each time a drop is claimed. This way, when all drops are claimed (`counter` == 0), we can remove all information from the Drop.

There are two ways to claim a drop: claim for an existing account and claim for a new account. The main difference between them is that the first one will send the tokens to an existing account, while the second one will create a new account and send the tokens to it.

<hr class="subsection" />

<Tabs>
  <TabItem value="existing" label="Existing Account">
    <Language value="rust" language="rust">
      <Github fname="claim_for"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="11" end="14" />
      <Github fname="internal_claim"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="58" end="85" />
    </Language>
  </TabItem>
  <TabItem value="new" label="New Account">
    <Language value="rust" language="rust">
      <Github fname="create_account_and_claim"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="16" end="41" />
      <Github fname="resolve_account_create"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="43" end="56" />
      <Github fname="internal_claim"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="58" end="85" />
    </Language>
  </TabItem>
</Tabs>

---

### Testing the Contract

The contract readily includes a sandbox testing to validate its functionality. To execute the tests, run the following command:

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
  
  ```bash
  cargo test
  ```

  </TabItem>
</Tabs>

:::tip
The `integration tests` use a sandbox to create NEAR users and simulate interactions with the contract.
:::

---

### Deploying the Contract to the NEAR network

In order to deploy the contract you will need to create a NEAR account.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  # Create a new account pre-funded by a faucet
  near create-account <accountId> --useFaucet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  # Create a new account pre-funded by a faucet
  near account create-account sponsor-by-faucet-service <my-new-dev-account>.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
</Tabs>

Then build and deploy the contract:

```bash
cargo near build

cargo near deploy <accountId> with-init-call new json-args '{"top_level_account": "testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

---

### CLI: Interacting with the Contract

To interact with the contract through the console, you can use the following commands:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  # create a NEAR drop
  near call <account-id> create_near_drop '{"public_keys": ["ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q", "ed25519:4FMNvbvU4epP3HL9mRRefsJ2tMECvNLfAYDa9h8eUEa4"], "amount_per_drop": "10000000000000000000000"}' --accountId <account-id> --deposit 1 --gas 100000000000000

  # create a FT drop
  near call <account-id> create_ft_drop '{"public_keys": ["ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "ed25519:5oN7Yk7FKQMKpuP4aroWgNoFfVDLnY3zmRnqYk9fuEvR"], "amount_per_drop": "1", "ft_contract": "<ft-contract-account-id>"}' --accountId <account-id> --gas 100000000000000

  # create a NFT drop
  near call <account-id> create_nft_drop '{"public_key": "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "nft_contract": "<nft-contract-account-id>"}' --accountId <account-id> --gas 100000000000000
  
  # claim to an existing account
  # see the full version

  # claim to a new account
  # see the full version
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  # create a NEAR drop
  near contract call-function as-transaction <account-id> create_near_drop json-args '{"public_keys": ["ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q", "ed25519:4FMNvbvU4epP3HL9mRRefsJ2tMECvNLfAYDa9h8eUEa4"], "amount_per_drop": "10000000000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '1 NEAR' sign-as <account-id> network-config testnet sign-with-keychain send

  # create a FT drop
  near contract call-function as-transaction <account-id> create_ft_drop json-args '{"public_keys": ["ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "ed25519:5oN7Yk7FKQMKpuP4aroWgNoFfVDLnY3zmRnqYk9fuEvR"], "amount_per_drop": "1", "ft_contract": "<ft-contract-account-id>"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <account-id> network-config testnet sign-with-keychain send

  # create a NFT drop
  near contract call-function as-transaction <account-id> create_nft_drop json-args '{"public_key": "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "nft_contract": "<nft-contract-account-id>"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <account-id> network-config testnet sign-with-keychain send

  # claim to an existing account
  near contract call-function as-transaction <account-id> claim_for json-args '{"account_id": "<claimer-account-id>"}' prepaid-gas '30.0 Tgas' attached-deposit '0 NEAR' sign-as <account-id> network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q --signer-private-key ed25519:3yVFxYtyk7ZKEMshioC3BofK8zu2q6Y5hhMKHcV41p5QchFdQRzHYUugsoLtqV3Lj4zURGYnHqMqt7zhZZ2QhdgB send

  # claim to a new account
  near contract call-function as-transaction <account-id> create_account_and_claim json-args '{"account_id": "<claimer-account-id>"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <account-id> network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:4FMNvbvU4epP3HL9mRRefsJ2tMECvNLfAYDa9h8eUEa4 --signer-private-key ed25519:2xZcegrZvP52VrhehvApnx4McL85hcSBq1JETJrjuESC6v6TwTcr4VVdzxaCReyMCJvx9V4X1ppv8cFFeQZ6hJzU send
  ```
  </TabItem>
</Tabs>

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `0.17.0`
- rustc: `1.82.0`

:::