---
id: ft
title: Fungible Tokens (FT)
hide_table_of_contents: false
description: "Learn about NEAR fungible tokens (FT) following NEP-141 and NEP-148 standards - create, transfer, and integrate FT contracts with comprehensive examples and tools."
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

import CreateTokenForm from "@site/src/components/tools/FungibleToken/CreateTokenForm";


Besides the native NEAR token, NEAR accounts have access to a [multitude of tokens](https://guide.rhea.finance/developers-1/cli-trading#query-whitelisted-tokens) to use throughout the ecosystem. Moreover, it is even possible for users to create their own fungible tokens.

In contrast with the NEAR native token, fungible token (FT) are **not stored** in the user's account. In fact, each FT lives in **their own contract** which is in charge of doing **bookkeeping**. This is, the contract keeps track of how many tokens each user has, and handles transfers internally.

![FT](/assets/docs/primitives/ft.png)

In order for a contract to be considered a FT-contract it has to follow the [**NEP-141 and NEP-148 standards**](https://github.com/near/NEPs/tree/master/neps/nep-0141.md). The **NEP-141** & **NEP-148** standards explain the **minimum interface** required to be implemented, as well as the expected functionality.

---

## Creating a New Token

The simplest way to create a new Fungible Token is by using a factory contract, to which you only need to provide the token metadata, and they will automatically deploy and initialize a [canonical FT contract](https://github.com/near-examples/FT).

<details>

<summary> 1. Using the Token Factory Tool </summary>

We have created a simple UI to interact with the existing `tkn.primitives.testnet` factory contract

<CreateTokenForm />

</details>

<details>

<summary> 2. Interacting with a pre-deployed Token Factory smart contract </summary>

Here is how to directly interact with the factory contract through your application: 

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

    ```js
    import { Wallet } from './near-wallet';

    const wallet = new Wallet({});

    const args = {
      args: {
        owner_id: 'bob.near',
        total_supply: '1000000000',
        metadata: {
          spec: 'ft-1.0.0',
          name: 'Test Token',
          symbol: 'test',
          icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          decimals: 18,
        },
      },
      account_id: 'bob.near',
    };

    await wallet.callMethod({
      method: 'create_token',
      args,
      contractId: 'tkn.primitives.near',
      gas: 300000000000000,
      deposit: '2234830000000000000000000',
    });
    ```

  _The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

    ```bash
    near call tkn.primitives.near create_token '{"args":{"owner_id": "bob.near","total_supply": "1000000000","metadata":{"spec": "ft-1.0.0","name": "Test Token","symbol": "TTTEST","icon": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7","decimals": 18}},"account_id": "bob.near"}' --gas 300000000000000 --depositYocto 2234830000000000000000000 --accountId bob.near
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/create-ft-via-factory.json" />
  </TabItem>
</Tabs>

The FT you create will live in the account `<your_token_symbol>.tkn.primitives.near` (e.g. `test.tkn.primitives.near`).

</details>

---

## Deploying Your Own Contract

You can also create a fungible token by deploying and initializing a [canonical FT contract](https://github.com/near-examples/FT).

On initialization, you will define the token's metadata such as its name (e.g. Ethereum), symbol (e.g. ETH) and total supply (e.g. 10M). You will also define an `owner`, which will own the tokens **total supply**.

To initialize a FT contract you will need to deploy it and then call the `new` method defining the token's metadata.

<Tabs groupId="code-tabs">
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

    ```bash
    cargo near deploy build-non-reproducible-wasm <account-id> \
      with-init-call new \
      json-args '{
        "owner_id": "<owner-account>",
        "total_supply": "1000000000000000",
        "metadata": {
          "spec": "ft-1.0.0",
          "name": "Example Token Name",
          "symbol": "EXLT",
          "decimals": 8
        }
      }' \
      prepaid-gas '100.0 Tgas' \
      attached-deposit '0 NEAR' \
      network-config testnet \
      sign-with-keychain send
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/create-ft-manually.json" />
  </TabItem>
</Tabs>


<hr class="subsection" />

### Global Contracts

You can deploy a new Fungible Token using our global FT contract - a pre-deployed [standard FT contract](https://github.com/near-examples/FT) that you can reuse. [Global contracts](../smart-contracts/global-contracts.md) are deployed once and can be reused by any account without incurring high storage costs.

<Tabs groupId="code-tabs">
  <TabItem value="account" label="By Account">

    ```bash
    near contract deploy <account-id> use-global-account-id ft.globals.primitives.testnet \
      with-init-call \
      new_default_meta \
      json-args '{"owner_id": "<account-id>", "total_supply": "100000000000000000000000000000"}' \
      prepaid-gas '100.0 Tgas' \
      attached-deposit '0 NEAR' \
      network-config testnet \
      sign-with-keychain send
    ```
  </TabItem>
  <TabItem value="hash" label="By Hash">

    ```bash
    near contract deploy <account-id> use-global-hash 3vaopJ7aRoivvzZLngPQRBEd8VJr2zPLTxQfnRCoFgNX \
      with-init-call \
      new_default_meta \
      json-args '{"owner_id": "<account-id>", "total_supply": "100000000000000000000000000000"}' \
      prepaid-gas '100.0 Tgas' \
      attached-deposit '0 NEAR' \
      network-config testnet \
      sign-with-keychain send
    ```
  </TabItem>
</Tabs>

:::note
Deploying by **hash** creates an immutable contract that never changes. Deploying by **account ID** creates an updatable contract that changes when the referenced account's contract is updated. Choose based on whether you want your FT contract to be updatable or permanent.
:::

---

## Querying Metadata
You can query the FT's metadata by calling the `ft_metadata`.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

  ```js
  import { Wallet } from './near-wallet';

  const TOKEN_CONTRACT_ADDRESS = 'token.v2.ref-finance.near';
  const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });

  await wallet.viewMethod({
    method: 'ft_metadata',
    args: {},
    contractId: TOKEN_CONTRACT_ADDRESS,
  });
  ```

  <details>
  <summary>Example response</summary>
  <p>

  ```json
  {
    "spec": "ft-1.0.0",
    "name": "Ref Finance Token",
    "symbol": "REF",
    "icon": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='16 24 248 248' style='background: %23000'%3E%3Cpath d='M164,164v52h52Zm-45-45,20.4,20.4,20.6-20.6V81H119Zm0,18.39V216h41V137.19l-20.6,20.6ZM166.5,81H164v33.81l26.16-26.17A40.29,40.29,0,0,0,166.5,81ZM72,153.19V216h43V133.4l-11.6-11.61Zm0-18.38,31.4-31.4L115,115V81H72ZM207,121.5h0a40.29,40.29,0,0,0-7.64-23.66L164,133.19V162h2.5A40.5,40.5,0,0,0,207,121.5Z' fill='%23fff'/%3E%3Cpath d='M189 72l27 27V72h-27z' fill='%2300c08b'/%3E%3C/svg%3E%0A",
    "reference": null,
    "reference_hash": null,
    "decimals": 18
  }
  ```

  </p>
  </details>

  _The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_
  
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

    ```bash
    near view token.v2.ref-finance.near ft_metadata
    ```

  <details>
  <summary>Example response</summary>
  <p>

    ```bash
    {
      spec: "ft-1.0.0",
      name: "Ref Finance Token",
      symbol: "REF",
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='16 24 248 248' style='background: %23000'%3E%3Cpath d='M164,164v52h52Zm-45-45,20.4,20.4,20.6-20.6V81H119Zm0,18.39V216h41V137.19l-20.6,20.6ZM166.5,81H164v33.81l26.16-26.17A40.29,40.29,0,0,0,166.5,81ZM72,153.19V216h43V133.4l-11.6-11.61Zm0-18.38,31.4-31.4L115,115V81H72ZM207,121.5h0a40.29,40.29,0,0,0-7.64-23.66L164,133.19V162h2.5A40.5,40.5,0,0,0,207,121.5Z' fill='%23fff'/%3E%3Cpath d='M189 72l27 27V72h-27z' fill='%2300c08b'/%3E%3C/svg%3E%0A",
      reference: null,
      reference_hash: null,
      decimals: 18
    }
    ```
  </p>
  </details>
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/query-ft-metadata.json" />
  </TabItem>
</Tabs>

---

## Checking Balance
To know how many coins a user has you will need to query the method `ft_balance_of`.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

  :::info
  Remember about fungible token precision. You may need this value to show a response of balance requests in an understandable-to-user way in your app. How to get precision value (decimals) you may find [here](#querying-metadata).
  :::

  ```js
  import { Wallet } from './near-wallet';

  const TOKEN_CONTRACT_ADDRESS = 'token.v2.ref-finance.near';
  const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });

  await wallet.viewMethod({
    method: 'ft_balance_of',
    args: {
      account_id: 'bob.near',
    },
    contractId: TOKEN_CONTRACT_ADDRESS,
  });
  ```

  <details>
  <summary>Example response</summary>
  <p>

  ```json
  "3479615037675962643842"
  ```

  </p>
  </details>

  _The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

  ```bash
  near view token.v2.ref-finance.near ft_balance_of '{"account_id": "bob.near"}'
  ```

  <details>
  <summary>Example response</summary>
  <p>

  ```bash
  '376224322825327177426'
  ```
  </p>
  </details>
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/check-ft-balance.json" />
  </TabItem>
</Tabs>

---

## Registering a User
In order for an user to own and transfer tokens they need to first **register** in the contract. This is done by calling `storage_deposit` and attaching 0.00125Ⓝ.

By calling this `storage_deposit` the user can register themselves or **register other users**.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

  ```js
  await wallet.callMethod({
    method: 'storage_deposit',
    args: {
      account_id: 'alice.near',
    },
    contractId: TOKEN_CONTRACT_ADDRESS,
    deposit: 1250000000000000000000,
  });
  ```

  _The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

  ```bash
  near call token.v2.ref-finance.near storage_deposit '{"account_id": "alice.near"}' --depositYocto 1250000000000000000000 --accountId bob.near
  ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/register-user.json" />
  </TabItem>
</Tabs>

:::info
You can make sure a user is registered by calling `storage_balance_of`.
:::

:::tip
After a user calls the `storage_deposit` the FT will appear in their Wallets.
:::

---

## Transferring Tokens
To send FT to another account you will use the `ft_transfer` method, indicating the receiver and the amount of FT you want to send.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    
  ```js
  import { Wallet } from './near-wallet';

  const TOKEN_CONTRACT_ADDRESS = 'token.v2.ref-finance.near';
  const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });

  await wallet.callMethod({
    method: 'ft_transfer',
    args: {
      receiver_id: 'alice.near',
      amount: '100000000000000000',
    },
    contractId: TOKEN_CONTRACT_ADDRESS,
    deposit: 1,
  });
  ```

  _The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

    ```bash
    near call token.v2.ref-finance.near ft_transfer '{"receiver_id": "alice.near", "amount": "100000000000000000"}' --depositYocto 1 --accountId bob.near
    ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/transfer-tokens.json" />
  </TabItem>
  <TabItem value="📄 Contract"  label="📄 Contract"  default>
    
  ```rust
  #[near]
  impl Contract {
    #[payable]
    pub fn send_tokens(&mut self, receiver_id: AccountId, amount: U128) -> Promise {
      assert_eq!(env::attached_deposit(), 1, "Requires attached deposit of exactly 1 yoctoNEAR");

      let promise = ext(self.ft_contract.clone())
        .with_attached_deposit(YOCTO_NEAR)
        .ft_transfer(receiver_id, amount, None);

      return promise.then( // Create a promise to callback query_greeting_callback
        Self::ext(env::current_account_id())
        .with_static_gas(Gas(30*TGAS))
        .external_call_callback()
      )
    }

    #[private] // Public - but only callable by env::current_account_id()
    pub fn external_call_callback(&self, #[callback_result] call_result: Result<(), PromiseError>) {
      // Check if the promise succeeded
      if call_result.is_err() {
        log!("There was an error contacting external contract");
      }
    }
  }
  ```

  _This snippet assumes that the contract is already holding some FTs and that you want to send them to another account._
  </TabItem>
</Tabs>

---

## Attaching FTs to a Call
Natively, only NEAR tokens (Ⓝ) can be attached to a function calls. However, the FT standard enables to attach fungible tokens in a call by using the FT-contract as intermediary. This means that, instead of you attaching tokens directly to the call, you ask the FT-contract to do both a transfer and a function call in your name.

Let's assume that you need to deposit FTs on Ref Finance.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

  ```js
  import { Wallet } from './near-wallet';

  const TOKEN_CONTRACT_ADDRESS = 'token.v2.ref-finance.near';
  const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });

  await wallet.callMethod({
    method: 'ft_transfer_call',
    args: {
      receiver_id: 'v2.ref-finance.near',
      amount: '100000000000000000',
      msg: '',
    },
    contractId: TOKEN_CONTRACT_ADDRESS,
    gas: 300000000000000,
    deposit: 1,
  });
  ```

  <details>
  <summary>Example response</summary>
  <p>

  ```json
  "100000000000000000"
  ```

  </p>
  </details>

  _The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

  ```bash
  near call token.v2.ref-finance.near ft_transfer_call '{"receiver_id": "v2.ref-finance.near", "amount": "100000000000000000", "msg": ""}' --gas 300000000000000 --depositYocto 1 --accountId bob.near
  ```

  <details>
  <summary>Example response</summary>
  <p>

  ```bash
  '100000000000000000'
  ```

  </p>
  </details>

  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/attach-ft-to-call.json" />
  </TabItem>
  <TabItem value="📄 Contract"  label="📄 Contract"  default>

  ```rust
  #[payable]
  pub fn call_with_attached_tokens(&mut self, receiver_id: AccountId, amount: U128) -> Promise {
    assert_eq!(env::attached_deposit(), 1, "Requires attached deposit of exactly 1 yoctoNEAR");

    let promise = ext(self.ft_contract.clone())
      .with_static_gas(Gas(150*TGAS))
      .with_attached_deposit(YOCTO_NEAR)
      .ft_transfer_call(receiver_id, amount, None, "".to_string());

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .with_static_gas(Gas(100*TGAS))
      .external_call_callback()
    )
  }
  ```
  </TabItem>
</Tabs>

How it works:

1. You call ft_transfer_call in the FT contract passing: the receiver, a message, and the amount.
2. The FT contract transfers the amount to the receiver.
3. The FT contract calls receiver.ft_on_transfer(sender, msg, amount)
4. The FT contract handles errors in the ft_resolve_transfer callback.
5. The FT contract returns you how much of the attached amount was actually used.

---

## Handling Deposits (Contract Only)

If you want your contract to handle deposit in FTs you have to implement the `ft_on_transfer` method. When executed, such method will know:

- Which FT was transferred, since it is the predecessor account.
- Who is sending the FT, since it is a parameter
- How many FT were transferred, since it is a parameter
- If there are any parameters encoded as a message

The `ft_on_transfer` must return how many FT tokens have to **be refunded**, so the FT contract gives them back to the sender.

```rust
// Implement the contract structure
#[near(contract_state)]
impl Contract {}

#[near]
impl FungibleTokenReceiver for Contract {
  // Callback on receiving tokens by this contract.
  // `msg` format is either "" for deposit or `TokenReceiverMessage`.
  fn ft_on_transfer(
    &mut self,
    sender_id: AccountId,
    amount: U128,
    msg: String,
  ) -> PromiseOrValue<U128> {
    let token_in = env::predecessor_account_id();

    assert!(token_in == self.ft_contract, "{}", "The token is not supported");
    assert!(amount >= self.price, "{}", "The attached amount is not enough");

    env::log_str(format!("Sender id: {:?}", sender_id).as_str());

    if msg.is_empty() {
      // Your internal logic here
      PromiseOrValue::Value(U128(0))
    } else {
      let message =
        serde_json::from_str::<TokenReceiverMessage>(&msg).expect("WRONG_MSG_FORMAT");
      match message {
        TokenReceiverMessage::Action {
          buyer_id,
        } => {
          let buyer_id = buyer_id.map(|x| x.to_string());
          env::log_str(format!("Target buyer id: {:?}", buyer_id).as_str());
          // Your internal business logic
          PromiseOrValue::Value(U128(0))
        }
      }
    }
  }
}
```

---

## Additional Resources

1. [NEP-141 and NEP-148 standards](https://github.com/near/NEPs/tree/master/neps/nep-0141.md)
2. [FT Event Standards](https://github.com/near/NEPs/blob/master/neps/nep-0300.md)
3. [FT reference implementation](https://github.com/near-examples/FT)
4. [Fungible Tokens 101](../tutorials/fts/0-intro.md) - a set of tutorials that cover how to create a FT contract using Rust.