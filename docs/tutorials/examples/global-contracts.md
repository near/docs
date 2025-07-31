---
id: global-contracts
title: Global Contracts
sidebar_label: Global Contracts
description: "Learn how to deploy a Global contract and use it from another account."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you've ever deployed the same contract code to multiple accounts, you’ve likely noticed that each deployment requires you to pay the full storage cost again.

Imagine that you want to deploy the same 500 KB contract to three accounts: each deployment pays 5 NEAR for the storage — a total of 15 NEAR is locked just to hold identical code.
[Global Contracts](../../smart-contracts/global-contracts.md) eliminates this redundancy by allowing the same contract code to be shared across multiple accounts, so storage cost is paid only once.

In this tutorial you'll learn how to deploy and use a [global contract by Account ID](#global-contract-by-account-id) or [by Hash](#global-contract-by-hash), depending on your needs.

:::info Global Contract types
- [By Account](../../smart-contracts/global-contracts.md#reference-by-account): an upgradable contract is published globally under a specific account ID.
- [By Hash](../../smart-contracts/global-contracts.md#reference-by-hash): an immutable contract is deployed globally and identified by its code hash.
:::

## Examples

:::tip Do you need a Global Contract?
Check these questions to decide [when to use a global contract](../../smart-contracts/global-contracts.md#when-to-use-global-contracts).
:::

### Global Contract by Account ID

For example, consider a **DAO Factory**: A tool that allows any user to deploy their own DAO governance instance.

Since the same contract is deployed many times by end users across different accounts, this clearly meets the threshold where [Global Contracts](../../smart-contracts/global-contracts.md) become financially efficient. Also, since upgradeability may be useful down the line (e.g. to patch bugs or extend functionality), it's a great case to use a [Global Contract by Account ID](../../smart-contracts/global-contracts.md#reference-by-account).

### Global Contract by Hash

Take for example an **NFT Collection Factory**: A service that lets users create their own NFT contracts with fixed metadata and royalty values.

Since each user deploys the same contract, but once deployed, it should never change (security and immutability are critical), this makes a perfect case to use a [Global Contract by Hash](../../smart-contracts/global-contracts.md#reference-by-hash).

## Deploying a Global Contract

Global contracts can be deployed in 2 ways: either by their [hash](../../smart-contracts/global-contracts.md#reference-by-hash) or by the owner [account ID](../../smart-contracts/global-contracts.md#reference-by-account).
Contracts deployed by hash are effectively immutable and cannot be updated.
When deployed by account ID the owner can redeploy the contract updating it for all its users.

:::info
Note that deploying a global contract incurs high storage costs. Tokens are burned to compensate for storing the contract on-chain, unlike regular contracts where tokens are locked based on contract size.
:::


### Deployment

Global contracts can be deployed using [`NEAR CLI`](../../tools/cli.md) or by code using [NEAR APIs](../../tools/near-api.md#deploy-a-global-contract) (JavaScript and Rust).
The process is similar to [deploying a regular contract](../../smart-contracts/release/deploy.md#deploying-the-contract).

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
  
  ```js
  import { readFileSync } from "fs";

  const account = new Account("user.testnet", provider, signer);

  const wasm = readFileSync("../contracts/contract.wasm");
  await account.deployGlobalContract(wasm, "accountId");
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-global-contract-by-account.js" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>

  <TabItem value="hash" label="By Hash" default>

  Let’s look at an example of deploying a global contract by hash.
  
  To do this, use the `deployGlobalContract` function and set the mode to `codeHash`, along with the contract’s code bytes.
  
  ```js
  import { readFileSync } from "fs";

  const account = new Account("user.testnet", provider, signer);

  const wasm = readFileSync("../contracts/contract.wasm");
  await account.deployGlobalContract(wasm, "codeHash");
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-global-contract-by-hash.js" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>
  </Tabs>

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

  Once you've created an Account instance, you can deploy your regular contract as a global contract.

  <Tabs>
  <TabItem value="account" label="By Account ID" default>

  Let’s look at an example of deploying a global contract by account.
  
  To do this, use the `deploy_global_contract_code` function and use the method `as_account_id`, along with the contract’s code bytes.
  
  ```rust
    let global_account_id: AccountId = "nft-contract.testnet".parse().unwrap();
    let code = std::fs::read("path/to/your/contract.wasm").unwrap();
    let signer = Signer::new(Signer::from_secret_key(private_key)).unwrap();

    let result: FinalExecutionOutcomeView = Contract::deploy_global_contract_code(code)
        .as_account_id(global_account_id)
        .with_signer(signer)
        .send_to_testnet()
        .await.unwrap();
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/rust/examples/global_contract_accountid.rs" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>

  <TabItem value="hash" label="By Hash" default>

  Let’s look at an example of deploying a global contract by hash.
  
  To do this, use the `deploy_global_contract_code` function and use the method `as_hash`, along with the contract’s code bytes.
  
  ```rust
    let account_id: AccountId = "my-account.testnet".parse().unwrap();
    let code = std::fs::read("path/to/your/contract.wasm").unwrap();
    let signer = Signer::new(Signer::from_secret_key(private_key)).unwrap();

    let result: FinalExecutionOutcomeView = Contract::deploy_global_contract_code(code)
        .as_hash()
        .with_signer(account_id, signer)
        .send_to_testnet()
        .await.unwrap();
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/rust/examples/global_contract_hash.rs" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
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

  <TabItem value="hash" label="By Hash" default>

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

  ```js
  const account = new Account("another_user.testnet", provider, signer);

  await account.useGlobalContract({ accountId: "user.testnet" });
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-global-contract-by-account.js" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>

  <TabItem value="hash" label="By Hash" default>

  To reference a global contract by hash, you need to call the `useGlobalContract` function and pass the source `codeHash` of the original contract.

  ```js
  const account = new Account("another_user.testnet", provider, signer);

  await account.useGlobalContract({
    codeHash: "36b15ea09f737220583f63ad120d91b7e233d2039bebea43be527f8fd85450c9",
  });
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/javascript/examples/deploy-global-contract-by-hash.js" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>
  </Tabs>

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

  <Tabs>
  <TabItem value="account" label="By Account ID" default>

  To reference a global contract by account, you need to call the `use_global_account_id` function and pass the source `accountId` where the contract was originally deployed.

  ```rust
    let global_account_id: AccountId = "nft-contract.testnet".parse().unwrap();
    let my_account_id: AccountId = "my-contract.testnet".parse().unwrap();
    let my_signer = Signer::new(Signer::from_secret_key(private_key)).unwrap();

    let result: FinalExecutionOutcomeView = Contract::deploy(my_account_id)
        .use_global_account_id(global_account_id)
        .without_init_call()
        .with_signer(my_signer)
        .send_to_testnet()
        .await.unwrap();
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/rust/examples/global_contract_accountid.rs" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>

  <TabItem value="hash" label="By Hash" default>

  To reference a global contract by hash, you need to call the `use_global_hash` function and pass the source `hash` of the original contract.

  ```rust
    let global_hash: types::CryptoHash = "DxfRbrjT3QPmoANMDYTR6iXPGJr7xRUyDnQhcAWjcoFF".parse().unwrap();
    let account_id: AccountId = "my-contract.testnet".parse().unwrap();
    let signer = Signer::new(Signer::from_secret_key(private_key)).unwrap();

    let result: FinalExecutionOutcomeView = Contract::deploy(account_id)
        .use_global_hash(global_hash)
        .without_init_call()
        .with_signer(signer)
        .send_to_testnet()
        .await.unwrap();
  ```

  <a href="https://github.com/near-examples/near-api-examples/blob/main/rust/examples/global_contract_hash.rs" target="_blank" rel="noreferrer noopener" class="text-center">
    See full example on GitHub
  </a>
  </TabItem>
  </Tabs>

  </TabItem>

</Tabs>

:::tip
Check the [NEAR API reference documentation](../../tools/near-api.md#use-a-global-contract) for complete code examples.
:::
