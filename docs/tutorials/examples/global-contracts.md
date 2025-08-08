---
id: global-contracts
title: Global Contracts
sidebar_label: Global Contracts
description: "Learn how to deploy a Global contract and use it from another account."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github, Language} from "@site/src/components/codetabs";


If you've ever deployed the same contract code to multiple accounts, you’ve likely noticed that each deployment requires you to pay the full storage cost again.

Imagine that you want to deploy the same 500 KB contract to three accounts: each deployment pays 5 NEAR for the storage — a total of 15 NEAR is locked just to hold identical code.
[Global Contracts](../../smart-contracts/global-contracts.md) eliminates this redundancy by allowing the same contract code to be shared across multiple accounts, so storage cost is paid only once.

In this tutorial you'll learn how to deploy and use a [global contract by Account ID](#global-contract-by-account-id) or [by Hash](#global-contract-by-hash), depending on your needs.

:::info Global Contract types
- [By Account](../../smart-contracts/global-contracts.md#reference-by-account): an upgradable contract is published globally under a specific account ID.
- [By Hash](../../smart-contracts/global-contracts.md#reference-by-hash): an immutable contract is deployed globally and identified by its code hash.
:::

## Examples

Let's define two example smart contracts that we can deploy using Global Contracts, and evaluate which alternative (by Account ID or by Hash) is the best for each case.

- **DAO Factory**: A tool that allows any user to deploy their own DAO governance instance.
- **NFT Collection Factory**: A service that lets users create their own NFT contracts with fixed metadata and royalty values.

:::tip Do you need a Global Contract?
Not sure if you need a Global Contract? Check these questions to decide [when to use a global contract](../../smart-contracts/global-contracts.md#when-to-use-global-contracts).
:::

### Global Contract by Account ID

For example, let's consider the **DAO Factory** case.

Since the same contract is deployed many times by end users across different accounts, this clearly meets the threshold where [Global Contracts](../../smart-contracts/global-contracts.md) become financially efficient. Also, since upgradeability may be useful down the line (e.g., to patch bugs or extend functionality), it's a great case to use a [Global Contract by Account ID](../../smart-contracts/global-contracts.md#reference-by-account).

### Global Contract by Hash

Now let's take for example the **NFT Collection Factory** case.

Since each user deploys the same contract, but once deployed, it should never change (security and immutability are critical), this makes a perfect case to use a [Global Contract by Hash](../../smart-contracts/global-contracts.md#reference-by-hash).

## Deploying a Global Contract

Next, let's see how you can deploy a global contract by Account ID (for the DAO Factory), or by Hash (for the NFT Collection Factory).
As stated, Global contracts can be deployed in 2 ways:
- by their [hash](../../smart-contracts/global-contracts.md#reference-by-hash).
- by the owner [account ID](../../smart-contracts/global-contracts.md#reference-by-account).

Contracts deployed by hash are effectively immutable and cannot be updated.
When deployed by account ID the owner can redeploy the contract updating it for all its users.

:::info
Note that deploying a global contract incurs high storage costs. Tokens are burned to compensate for storing the contract on-chain, unlike regular contracts where tokens are locked based on contract size.
:::


### Deployment

Global contracts can be deployed using [`NEAR CLI`](../../tools/cli.md) or by code using [NEAR APIs](../../tools/near-api.md#deploy-a-global-contract) (JavaScript and Rust).

Since there are two ways to reference a global contract ([by account](../../smart-contracts/global-contracts.md#reference-by-account) or [by hash](../../smart-contracts/global-contracts.md#reference-by-hash)), the deployment step depends on the type of global contract that you want to store on the blockchain.

<Tabs groupId="api">
  <TabItem value="cli" label="🖥️ CLI">

  The process is similar to [deploying a regular contract](../../smart-contracts/release/deploy.md#deploying-the-contract) but `deploy-as-global` command should be used instead of `deploy`.

  <Tabs>
  <TabItem value="account" label="By Account ID" default>

  To deploy a global contract by account, you need to use `as-global-account-id` and pass the source `<account_Id>` where the contract will be deployed.

  ```bash
  near contract deploy-as-global use-file <route_to_wasm> as-global-account-id <account_id> network-config testnet sign-with-keychain send
  ```

  </TabItem>

  <TabItem value="hash" label="By Hash" default>

  To deploy a global contract by hash, you need to use `as-global-hash` function and pass the source `<account_Id>` to fund the transaction.

  ```bash
  near contract deploy-as-global use-file <route_to_wasm> as-global-hash <account_id> network-config testnet sign-with-keychain send
  ```

  </TabItem>
  </Tabs>

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  Once you've created an Account instance, you can deploy your regular contract as a global contract.

  <Tabs>
  <TabItem value="account" label="By Account ID" default>

  Let’s look at an example of deploying a global contract by account.
  
  To do this, use the `deployGlobalContract` function and set the mode to `accountId`, along with the contract’s code bytes.
  
    <Github fname="deploy-global-contract-by-account.js" language="js"
    url="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-global-contract-by-account.js#L22-L27"
    start="22" end="27" />

  </TabItem>

  <TabItem value="hash" label="By Hash">

  Let’s look at an example of deploying a global contract by hash.
  
  To do this, use the `deployGlobalContract` function and set the mode to `codeHash`, along with the contract’s code bytes.

    <Github fname="deploy-global-contract-by-hash.js" language="js"
    url="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-global-contract-by-hash.js#L24-L29"
    start="24" end="29" />
  
  </TabItem>
  </Tabs>

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

  Once you've created an Account instance, you can deploy your regular contract as a global contract.

  <Tabs>
  <TabItem value="account" label="By Account ID" default>

  Let’s look at an example of deploying a global contract by account.
  
  To do this, use the `deploy_global_contract_code` function and use the method `as_account_id`, along with the contract’s code bytes.

    <Github fname="global_contract_accountid.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/blob/main/rust/examples/global_contract_accountid.rs#L17-L28"
    start="17" end="28" />
  
  </TabItem>

  <TabItem value="hash" label="By Hash">

  Let’s look at an example of deploying a global contract by hash.
  
  To do this, use the `deploy_global_contract_code` function and use the method `as_hash`, along with the contract’s code bytes.

    <Github fname="global_contract_hash.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/blob/main/rust/examples/global_contract_hash.rs#L17-L28"
    start="17" end="28" />
  
  </TabItem>
  </Tabs>

  </TabItem>

</Tabs>

:::tip
Check the [NEAR API reference documentation](../../tools/near-api.md#deploy-a-global-contract) for complete code examples.
:::

### Usage

Once a [global contract](../../smart-contracts/global-contracts.md) has been [deployed](#deployment), it can be attached to any NEAR account using [`NEAR CLI`](../../tools/cli.md) or by code using [NEAR APIs](../../tools/near-api.md#use-a-global-contract) (JavaScript and Rust).

Let’s see how you can reference and use your global contract from another account.

<Tabs groupId="api">
  <TabItem value="cli" label="🖥️ CLI">
  
  Use `near deploy` command. Such a contract behaves exactly like a regular contract.

  <Tabs>
  <TabItem value="account" label="By Account ID" default>

  To reference a global contract by account, you need to call the `useGlobalContract` function and pass the source `accountId` where the contract was originally deployed.

  ```bash
  # Using global contract deployed by <global_contract_account_id> account id
  near contract deploy <account_id> use-global-account-id <global_contract_account_id> without-init-call network-config testnet
  ```

  </TabItem>

  <TabItem value="hash" label="By Hash">

  To reference a global contract by hash, you need to call the `useGlobalContract` function and pass the source `codeHash` of the original contract.

  ```bash
  # Using global contract deployed by <global_contract_hash> hash
  near contract deploy <account_id> use-global-hash <global_contract_hash> without-init-call network-config testnet
  ```

  </TabItem>
  </Tabs>

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  <Tabs>
  <TabItem value="account" label="By Account ID" default>

  To reference a global contract by account, you need to call the `useGlobalContract` function and pass the source `accountId` where the contract was originally deployed.

    <Github fname="deploy-global-contract-by-account.js" language="js"
    url="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-global-contract-by-account.js#L39-L45"
    start="39" end="45" />

  </TabItem>

  <TabItem value="hash" label="By Hash">

  To reference a global contract by hash, you need to call the `useGlobalContract` function and pass the source `codeHash` of the original contract.

  ```js
  const hash = bs58.encode(sha256(wasm));
  ```

    <Github fname="deploy-global-contract-by-hash.js" language="js"
    url="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-global-contract-by-hash.js#L45-L53"
    start="45" end="53" />

  </TabItem>
  </Tabs>

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

  <Tabs>
  <TabItem value="account" label="By Account ID" default>

  To reference a global contract by account, you need to call the `use_global_account_id` function and pass the source `accountId` where the contract was originally deployed.

    <Github fname="global_contract_accountid.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/blob/main/rust/examples/global_contract_accountid.rs#L61-L70"
    start="61" end="70" />

  </TabItem>

  <TabItem value="hash" label="By Hash">

  To reference a global contract by hash, you need to call the `use_global_hash` function and pass the source `hash` of the original contract.
  
  ```rust
    // Get a global contract hash
    let code = std::fs::read("../contracts/contract.wasm").unwrap();
    let global_hash = near_primitives::hash::CryptoHash::hash_bytes(&code);
  ```

    <Github fname="global_contract_hash.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/blob/main/rust/examples/global_contract_hash.rs#L62-L70"
    start="62" end="70" />

  </TabItem>
  </Tabs>

  </TabItem>

</Tabs>

:::tip
Check the [NEAR API reference documentation](../../tools/near-api.md#use-a-global-contract) for complete code examples.
:::
