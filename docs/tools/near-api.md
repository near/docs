---
id: near-api
title: NEAR API
sidebar_label: NEAR API
description: "Learn to use APIs in JavaScript, Rust, and Python to interact with the blockchain."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github, Language} from "@site/src/components/UI/Codetabs"

We offer a collection of language-specific libraries that allow developers to interact with the NEAR blockchain from both frontend and backend applications. The different APIs allow you to perform a variety of actions on the NEAR blockchain, including but not limited to:

1. Create and manage NEAR accounts
2. Call functions on smart contracts
3. Transfer tokens, including native NEAR, Fungible Tokens, Non-Fungible Tokens
4. Sign transactions/meta-transactions/messages and broadcasting them to the network
5. Deploy smart contracts

---

## Available APIs

We have APIs available for Javascript, Rust, and Python. Add them to your project using the following commands:

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">

  ```bash
  npm i near-api-js
  ```

  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">

  ```bash
  npm i near-kit
  ```

  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  ```bash
  cargo add near-api
  ```
  </TabItem>
  <TabItem value="python" label="🐍 py-near">

  ```shell
  pip install py-near
  ```
  </TabItem>
</Tabs>

:::tip Wallet Integration

If you are building a web app and need to add Wallet Login on it you will instead need a [`Wallet Connector`](../web3-apps/tutorials/wallet-login)

:::

---

## Account

### Get Balance {#get-balance}

Gets the available and staked balance of an account in yoctoNEAR.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">
    <Github language="javascript"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/tokens-balance.ts" />
  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">
    <Github language="javascript"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/tokens-balance.js" />
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="account_details.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/account_details.rs" />

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

    ```python
    from py_near.account import Account

    account = Account(account_id="example-account.testnet", rpc_addr="https://rpc.testnet.pagoda.co")
    await account.startup()

    account_balance = account.get_balance()
    ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Get State {#get-state}

Get basic account information, such as its code hash and storage usage.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">

  <Github language="javascript"
    url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/account-details.ts" />

  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">

  <Github language="javascript"
    url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/account-details.js" />

  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">
  
  <Github fname="account_details.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/account_details.rs#L21-L21"
    start="21" end="21" />

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

    ```python
    from py_near.account import Account

    account = Account(account_id="example-account.testnet", rpc_addr="https://rpc.testnet.pagoda.co")
    await account.startup()

    account_state = account.fetch_state()
    ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Create Named Account {#create-named-account}

To create a named account like `user.testnet`, you need to call the `create_account` function on `near` (or `testnet`), passing as parameters the new account ID, and a public key to add as [FullAccess key](/protocol/access-keys#full-access-keys)

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">

  <Github language="ts" url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/create-tla.ts" />
  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">

  <Github language="js" url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/create-tla.js" />
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="create_account.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/create_account.rs#L32-L47"
    start="32" end="47" />

  <details>
    <summary>Creating an account from a seed phrase</summary>

    You can also create an account via a randomly generated seed phrase.

    <Github fname="create_account_from_seed.rs" language="rust"
      url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/create_account_from_seed.rs#L32-L48"
      start="32" end="48" />

  </details>

  </TabItem>
  <TabItem value="python" label="🐍 py-near">
  
    ```python
    await account.function_call("testnet", "create_account", {"new_account_id": "example-account.testnet", "new_public_key": "ed25519:..."}, "30000000000000", 1 * NEAR)
    ```

  </TabItem>

</Tabs>

<hr class="subsection" />

### Create Sub-Account {#create-sub-account}

Accounts on NEAR can create sub-accounts under their own namespace, which is useful for organizing accounts by purpose — for example, `project.user.testnet`.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">

  <Github language="js"
    url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/create-subaccount.ts" />


  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">

  <Github language="js"
    url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/create-subaccount.js" />


  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="create_account.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/create_account.rs#L61-L82"
    start="61" end="82" />

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

    Create a sub-account and fund it with your main account:

    ```python
    from py_near.account import Account
    from py_near.dapps.core import NEAR

    account = Account(account_id="example-account.testnet", private_key="ed25519:...", rpc_addr="https://rpc.testnet.pagoda.co")
    await account.startup()

    res = account.create_account(account_id="sub.example-account.testnet", public_key="...", initial_balance=1 * NEAR))
    ```
  </TabItem>
</Tabs>

:::info

Parent accounts have **no control** over their sub-accounts, they are completely independent.

:::

<hr class="subsection" />

### Delete Account {#delete-account}

Accounts on NEAR can delete themselves, transferring any remaining balance to a specified beneficiary account.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">

  <Github language="js" start="26" end="30"
    url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/delete-account.ts"
  />
  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">

  <Github language="js"
    url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/delete-account.js"
  />
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="delete_account.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/delete_account.rs#L51-L59"
    start="51" end="59" />

  </TabItem>
</Tabs>

:::info
Deleting an account **DOES NOT** affect its sub-accounts - they will remain active.
:::

:::danger Keep in mind
- Only NEAR tokens are transferred to the beneficiary.
- Fungible (FTs) or Non-Fungible tokens (NFTs) held by the account **ARE NOT** automatically transferred. These tokens are still associated with the account, even after the account is deleted. Make sure to transfer those assets manually before deletion, or you're risking losing them permanently! Once the account is gone, those assets are effectively stuck unless the same account is recreated by anyone (not necessarily you).
- If the beneficiary account doesn't exist, all NEAR tokens sent to it will be burned. Double-check the account ID before proceeding.
:::

---

## Transactions

### Send Tokens {#send-tokens}

Accounts can transfer different types of tokens to other accounts, including the native NEAR token and [NEP-141](https://github.com/near/NEPs/tree/master/neps/nep-0141.md) fungible tokens.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/send-tokens.ts"
    />
  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/send-tokens.js"
    />
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="send_tokens.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/send_tokens.rs#L22-L28"
    start="22" end="28" />

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

    ```python
    from py_near.account import Account
    from py_near.dapps.core import NEAR

    account = Account(account_id="example-account.testnet", private_key="ed25519:...", rpc_addr="https://rpc.testnet.pagoda.co")
    await account.startup()

    await account.send_money("receiver-account.testnet", 1 * NEAR))
    ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Call Function

A smart contract exposes its methods, and making a function call that modifies state requires a `Signer`/`KeyPair`. You can optionally attach a `NEAR` deposit to the call.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">

  <Tabs groupId="api">
    <TabItem value="fc" label="function call">
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/contract-interaction.ts" />
    </TabItem>
    <TabItem value="tc" label="typed contract" default>
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/typed-contract-interaction.ts" />
    </TabItem>
  </Tabs>
  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">

  <Tabs groupId="api">
    <TabItem value="fc" label="function call">
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/contract-interaction.js" />
    </TabItem>
    <TabItem value="tc" label="typed contract" default>
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/typed-contract-interaction.js" />
    </TabItem>
  </Tabs>
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="contract_interaction.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/contract_interaction.rs#L23-L24"
    start="23" end="24" />

  <Github fname="contract_interaction.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/contract_interaction.rs#L37-L49"
    start="37" end="49" />

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

  ```python
  await account.function_call("usn.near", "ft_transfer", {"receiver_id": "bob.near", "amount": "1000000000000000000000000"})
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Batch Actions

You can send multiple [actions](../protocol/transaction-anatomy.md#actions) in a batch to a **single** receiver. If one action fails then the entire batch of actions will be reverted.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/batch-actions.ts" />
  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/batch-actions.js" />
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="batch_actions.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/batch_actions.rs#L22-L42"
    start="22" end="42" />

  </TabItem>
</Tabs>

<hr class="subsection" />

### Simultaneous Transactions

The only way to have true simultaneous transactions is to use multiple access keys on a same account. Each access key maintains its own nonce, allowing transactions signed with different keys to be processed in parallel:

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/simultaneous-transactions.ts" />
  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/simultaneous-transactions.js" />
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="simultaneous_transactions.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/simultaneous_transactions.rs#L23-L55"
    start="23" end="55" />

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

  ```python
  import asyncio
  from py_near.account import Account

  account = Account(account_id="example-account.testnet", private_key="ed25519:...", rpc_addr="https://rpc.testnet.pagoda.co")
  await account.startup()

  # Prepare the transactions
  tx1 = account.function_call("guestbook.near-examples.testnet", "add_message", { "text": "Hello, world!" })
  tx2 = account.function_call("counter.near-examples.testnet", "increment", {})

  # Send the transactions simultaneously
  const transactionsResults = await asyncio.gather(tx1, tx2)
  ```

  </TabItem>
</Tabs>

:::warning Keep in mind
Simultaneous execution means there’s no guarantee of order or success. Any transaction may fail independently. If your use case requires strict ordering, then you should stick to sending transactions sequentially from a single key.
:::

<hr class="subsection" />

### Deploy a Contract {#deploy-a-contract}

On NEAR, a smart contract is deployed as a WASM file. Every account has the potential to become a contract — you simply need to deploy code to it.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/deploy-contract.ts" />
  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/deploy-contract.js" />
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  Note that the `signer` here needs to be a signer for the same `account_id` as the one used to construct the `Contract` object.

  <Github fname="contract_interaction.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/contract_interaction.rs#L54-L61"
    start="54" end="61" />

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

  ```python
  import asyncio
  from py_near.account import Account

  account = Account(account_id="example-account.testnet", private_key="ed25519:...", rpc_addr="https://rpc.testnet.pagoda.co")
  await account.startup()

  with open("contract.wasm", "rb") as f:
    contract_code = f.read()
  await account.deploy_contract(contract_code)
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Deploy a Global Contract {#deploy-a-global-contract}

[Global contracts](../smart-contracts/global-contracts.md) allow smart contracts to be deployed once and reused by any account without incurring high storage costs.

There are two ways to reference a global contract:
- **[By account](../smart-contracts/global-contracts.md#reference-by-account):** The contract code is tied to another account.
- **[By hash](../smart-contracts/global-contracts.md#reference-by-hash):** You reference the contract by its immutable code hash.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">

  <Tabs groupId="global">
  <TabItem value="account" label="by account" default>
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/deploy-global-contract-by-account.ts"
      end="22" />
  </TabItem>
  <TabItem value="hash" label="by hash" default>
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/deploy-global-contract-by-hash.ts"
      end="23" />
  </TabItem>
  </Tabs>

  </TabItem>

  <TabItem value="nk" label="🌐 near-kit">

  <Tabs groupId="global">
  <TabItem value="account" label="by account" default>
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/deploy-global-contract-by-account.js" end="27"/>
  </TabItem>
  <TabItem value="hash" label="by hash" default>
    <Github language="js"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/deploy-global-contract-by-hash.js" end="31"/>
  </TabItem>
  </Tabs>

  </TabItem>

  <TabItem value="rust" label="🦀 near-api-rs">

  Once you've created an Account instance, you can deploy your regular contract as a global contract.

  <Tabs>
  <TabItem value="account" label="By Account" default>

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

### Use a Global Contract

Once a [global contract](../smart-contracts/global-contracts.md) has been [deployed](#deploy-a-global-contract), let’s see how you can reference and use it from another account.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">
    <Tabs groupId="global">
      <TabItem value="account" label="by account" default>
        <Github language="js"
          url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/deploy-global-contract-by-account.ts"
          start="32" end="41"/>
      </TabItem>
      <TabItem value="hash" label="by hash" default>
        <Github language="js"
          url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/deploy-global-contract-by-hash.ts"
          start="37" end="51"/>
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="nk" label="🌐 near-kit">
    <Tabs groupId="global">
      <TabItem value="account" label="by account" default>
        <Github language="js" start="29"
          url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/deploy-global-contract-by-account.js" />
      </TabItem>
      <TabItem value="hash" label="by hash" default>
        <Github language="js" start="36"
          url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/deploy-global-contract-by-hash.js" />
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="rust" label="🦀 near-api-rs">

  <Tabs>
  <TabItem value="account" label="By Account" default>

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

---

## View Function

View functions are read-only methods on a smart contract that do not modify state. You can call them without using an account or signing a transaction.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">
    <Github language="javascript"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/contract-interaction.ts"
      start="9" end="21" />
  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">
    <Github language="javascript"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/contract-interaction.js" end="22"/>
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="contract_interaction.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/contract_interaction.rs#L22-L33"
    start="22" end="33" />

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

  ```python
  view_call_result = await account.view_function("guestbook.near-examples.testnet", "total_messages", {})
  # If args are required, they can be passed in like this in the 3rd argument:
  # {
  #   "from_index": "0",
  #   "limit": "10"
  # }
  print(view_call_result)
  ```
  </TabItem>
</Tabs>

---

## Keys

### Get All Access Keys {#get-all-access-keys}

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">
    <Github language="javascript"
      start="9" end="16"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/keys.ts" />
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="keys.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/keys.rs#L22-L22"
    start="22" end="22" />

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

  ```python
  keys = await account.get_access_key_list()
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Add Full Access Key {#add-full-access-key}

A [Full Access key](/protocol/access-keys.md#full-access-keys) grants complete control over the account.

Anyone with this key can transfer funds, sign transactions, interact with contracts, or even delete the account entirely.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">
    <Github language="javascript"
      start="30" end="37"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/keys.ts" />
  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">
    <Github language="javascript" start="16" end="27"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/keys.js" />
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="keys.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/keys.rs#L25-L37"
    start="25" end="37" />

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

  ```python
  keys = await account.add_full_access_public_key("5X9WvUbRV3aSd9Py1LK7HAndqoktZtcgYdRjMt86SxMj")
  ```
  </TabItem>
</Tabs>

<hr class="subsection" />

### Add Function Call Key {#add-function-call-key}

A [Function Call access key](/protocol/access-keys.md#function-call-keys) is designed specifically to sign transactions that include only [`functionCall` actions](/protocol/transaction-anatomy#actions) to a specific contract.

You can further restrict this key by:
- Limiting which method names can be called
- Capping the amount of `NEAR` the key can spend on transaction fees

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">
    <Github language="javascript"
      start="39" end="45"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/keys.ts" />
  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">
    <Github language="javascript" start="31" end="42"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/keys.js" />
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="keys.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/keys.rs#L38-L56"
    start="38" end="56" />

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

  ```python
  await account.add_public_key(
    "5X9WvUbRV3aSd9Py1LK7HAndqoktZtcgYdRjMt86SxMj",
    "example-contract.testnet", # Contract this key is allowed to call
    ["example_method"], # Methods this key is allowed to call (optional)
    0.25 * NEAR # Gas allowance key can use to call methods (optional)
  )
  ```
  </TabItem>

</Tabs>

:::tip
For security reasons, Function Call access keys **can only be used with function calls that attach zero `NEAR` tokens. Any attempt to include a deposit will result in a failed transaction.
:::

<hr class="subsection" />

### Delete Access Key {#delete-access-key}

Accounts on NEAR can delete their own keys.

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">
    <Github language="javascript"
      start="56" end="56"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/keys.ts" />
  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">
    <Github language="javascript" start="45" end="54"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/keys.js" />
  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  <Github fname="keys.rs" language="rust"
    url="https://github.com/near-examples/near-api-examples/tree/main/rust/examples/keys.rs#L57-L72"
    start="57" end="72" />

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

  ```python
  await account.delete_public_key("5X9WvUbRV3aSd9Py1LK7HAndqoktZtcgYdRjMt86SxMj")
  ```
  </TabItem>
</Tabs>

:::danger
Be very careful when deleting keys, remove all keys from an account and you will lose access to the account permanently
:::

---

## Validate Message Signatures

Users can sign messages using the `wallet-selector` `signMessage` method, which returns a signature. This signature can be verified using the following code:

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">

    <Github fname="authenticate.ts" language="javascript"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-api-js/examples/verify-signature.ts" />

  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">

    <Github fname="authenticate.js" language="javascript"
      url="https://github.com/near-examples/near-api-examples/blob/main/near-kit/examples/verify-signature.js" />

  </TabItem>
</Tabs>

---

## Additional resources

<Tabs groupId="api">
  <TabItem value="naj" label="🌐 near-api-js">

  - [Documentation](https://near.github.io/near-api-js)
  - [Github](https://github.com/near/near-api-js)
  - [Full Examples](https://github.com/near-examples/near-api-examples/tree/main)

  </TabItem>
  <TabItem value="nk" label="🌐 near-kit">

  - [Github](https://github.com/r-near/near-kit/tree/main)
  - [Full Examples](https://github.com/near-examples/near-api-examples/tree/main/near-kit)

  </TabItem>
  <TabItem value="rust" label="🦀 near-api-rs">

  - [Documentation](https://docs.rs/near-api/latest/near_api/)
  - [Github](https://github.com/near/near-api-rs)
  - [Full Examples](https://github.com/near-examples/near-api-examples/tree/main/rust)

  </TabItem>
  <TabItem value="python" label="🐍 py-near">

    - [Github](github.com/pvolnov/py-near)

  </TabItem>
</Tabs>
