---
id: near-drop
title: Near Drop
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

A near-drop is a smart contract that allows users to create NEAR/FT/NFT drop and claim created drops by another user using a PublicKey.

Particularly, it shows:

1. How to calculate storage costs
2. How to create a NEAR drop.
3. How to create a FT drop.
4. How to create a NFT drop.
5. How to claim a drop for an existing account.
6. How to claim a drop for a new account.

---

### Contract State

- `top_level_account` - that account is used to create new accounts. It has to have `create_account` method.
- `next_drop_id` - that id will be assigned to the next created drop.
- `drop_id_by_key` - that LookupMap structure contains relations between `PublicKey` and `DropId`. `PublicKey` is used to claim drop. `DropId` is a unique identificator by which you can get drop's data like amount of tokens to drop, FT or NFT contract, etc.
- `drop_by_id` - that LookupMap structure contains relations between `DropId` and actual drop data - `Drop`.

<Github fname="lib.rs"
      url="https://github.com/near-examples/near-drop/blob/update/src/lib.rs"
      start="22" end="29" />

---

### Drop Types

There are 3 types of drops, which differ in what the user will receive when he claims the corresponding drop - NEAR, fungible tokens (FTs) or non-fungible tokens (NFTs).

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="drop_types.rs"
            url="https://github.com/near-examples/near-drop/blob/update/src/drop_types.rs"
            start="8" end="16" />
    <Github fname="near_drop.rs"
            url="https://github.com/near-examples/near-drop/blob/update/src/near_drop.rs"
            start="9" end="16" />
    <Github fname="ft_drop.rs"
            url="https://github.com/near-examples/near-drop/blob/update/src/ft_drop.rs"
            start="16" end="24" />
    <Github fname="nft_drop.rs"
            url="https://github.com/near-examples/near-drop/blob/update/src/nft_drop.rs"
            start="15" end="22" />
  </Language>
</CodeTabs>

---

### Create a drop

Creating drop functions looks very similar, the main difference is in the structures used to store the drop data.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="create_near_drop"
            url="https://github.com/near-examples/near-drop/blob/update/src/lib.rs"
            start="44" end="66" />
    <Github fname="create_ft_drop"
            url="https://github.com/near-examples/near-drop/blob/update/src/lib.rs"
            start="68" end="89" />
    <Github fname="create_nft_drop"
            url="https://github.com/near-examples/near-drop/blob/update/src/lib.rs"
            start="91" end="103" />
  </Language>
</CodeTabs>

---

### Claim a drop

In order to claim drop claiming methods have to be called by near-drop contract and signed with a corresponding `PublicKey`. There are two ways to claim a drop: claim for an existing account and claim for a new account. In last case claimer account will be created.

When a drop is claimed, its `counter` decreases by 1 and corresponding relation between `PublicKey` and `DropId` removing from the contract state (`drop_id_by_key` collection).

When all drops are claimed (`counter` == 0), relation between `DropId` and `Drop` removing from the `drop_by_id` collection as well.

<hr class="subsection" />

#### Claim for an existing account

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="claim_for"
            url="https://github.com/near-examples/near-drop/blob/update/src/claim.rs"
            start="11" end="14" />
    <Github fname="internal_claim"
            url="https://github.com/near-examples/near-drop/blob/update/src/claim.rs"
            start="58" end="85" />
  </Language>
</CodeTabs>

<hr class="subsection" />

#### Claim for a new account

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="create_account_and_claim"
            url="https://github.com/near-examples/near-drop/blob/update/src/claim.rs"
            start="16" end="41" />
    <Github fname="resolve_account_create"
            url="https://github.com/near-examples/near-drop/blob/update/src/claim.rs"
            start="43" end="56" />
    <Github fname="internal_claim"
            url="https://github.com/near-examples/near-drop/blob/update/src/claim.rs"
            start="58" end="85" />
  </Language>
</CodeTabs>

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
  near call <account-id> create_near_drop '{"public_keys": ["ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q", "ed25519:4FMNvbvU4epP3HL9mRRefsJ2tMECvNLfAYDa9h8eUEa4"], "amount_per_drop": "10000000000000000000000"}' --accountId <account-id> --deposit 1 --gas 300000000000000

  # create a FT drop
  near call <account-id> create_ft_drop '{"public_keys": ["ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "ed25519:5oN7Yk7FKQMKpuP4aroWgNoFfVDLnY3zmRnqYk9fuEvR"], "amount_per_drop": "1", "ft_contract": "<ft-contract-account-id>"}' --accountId <account-id> --gas 300000000000000

  # create a NFT drop
  near call <account-id> create_nft_drop '{"public_key": "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "nft_contract": "<nft-contract-account-id>"}' --accountId <account-id> --gas 300000000000000
  
  # claim to an existing account
  # see the full version

  # claim to a new account
  # see the full version
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  # create a NEAR drop
  near contract call-function as-transaction <account-id> create_near_drop json-args '{"public_keys": ["ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q", "ed25519:4FMNvbvU4epP3HL9mRRefsJ2tMECvNLfAYDa9h8eUEa4"], "amount_per_drop": "10000000000000000000000"}' prepaid-gas '300.0 Tgas' attached-deposit '1 NEAR' sign-as <account-id> network-config testnet sign-with-keychain send

  # create a FT drop
  near contract call-function as-transaction <account-id> create_ft_drop json-args '{"public_keys": ["ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "ed25519:5oN7Yk7FKQMKpuP4aroWgNoFfVDLnY3zmRnqYk9fuEvR"], "amount_per_drop": "1", "ft_contract": "<ft-contract-account-id>"}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as <account-id> network-config testnet sign-with-keychain send

  # create a NFT drop
  near contract call-function as-transaction <account-id> create_nft_drop json-args '{"public_key": "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "nft_contract": "<nft-contract-account-id>"}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as <account-id> network-config testnet sign-with-keychain send

  # claim to an existing account
  near contract call-function as-transaction <account-id> claim_for json-args '{"account_id": "<claimer-account-id>"}' prepaid-gas '30.0 Tgas' attached-deposit '0 NEAR' sign-as <account-id> network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q --signer-private-key ed25519:3yVFxYtyk7ZKEMshioC3BofK8zu2q6Y5hhMKHcV41p5QchFdQRzHYUugsoLtqV3Lj4zURGYnHqMqt7zhZZ2QhdgB send

  # claim to a new account
  near contract call-function as-transaction <account-id> create_account_and_claim json-args '{"account_id": "<claimer-account-id>"}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as <account-id> network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:4FMNvbvU4epP3HL9mRRefsJ2tMECvNLfAYDa9h8eUEa4 --signer-private-key ed25519:2xZcegrZvP52VrhehvApnx4McL85hcSBq1JETJrjuESC6v6TwTcr4VVdzxaCReyMCJvx9V4X1ppv8cFFeQZ6hJzU send
  ```
  </TabItem>
</Tabs>

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `0.17.0`
- rustc: `1.82.0`

:::