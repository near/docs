---
id: using-fts
title: Using FTs
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

This section shows how to interact with an NFT smart contract.

---

## Get token metadata

<Tabs>
  <TabItem value="NEAR Component" label="NEAR Component" default>

    ```js
    const tokenContract = "token.v2.ref-finance.near";
    const tokenMetadata = Near.view(tokenContract, "ft_metadata", {});
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
  </TabItem>
  <TabItem value="Web App" label="Web App">

    ```js
    import { Wallet } from './near-wallet';

    const TOKEN_CONTRACT_ADDRESS = "token.v2.ref-finance.near";
    const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });
    
    await wallet.viewMethod({
      method: 'ft_metadata',
      args: {},
      contractId: TOKEN_CONTRACT_ADDRESS
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

    All the examples are using a `Wallet` object, which comes from our basic template:

    <Github fname="near-wallet.js"
      url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
      start="20" end="27" />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">

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
</Tabs>

---

## Check token balance

<Tabs>
  <TabItem value="NEAR Component" label="NEAR Component" default>

    Remember about fungible token precision. You may need this value to show a response of balance requests in an understandable-to-user way in your app. How to get precision value (decimals) you may find [above](#get-token-metadata).

    ```js
    const tokenContract = "token.v2.ref-finance.near";
    const userTokenBalance = Near.view(tokenContract, "ft_balance_of", {
      account_id: "bob.near",
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
  </TabItem>
  <TabItem value="Web App" label="Web App">

    Remember about fungible token precision. You may need this value to show a response of balance requests in an understandable-to-user way in your app. How to get precision value (decimals) you may find [above](#get-token-metadata).

    ```js
    import { Wallet } from './near-wallet';

    const TOKEN_CONTRACT_ADDRESS = "token.v2.ref-finance.near";
    const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });
    
    await wallet.viewMethod({
      method: 'ft_balance_of',
      args: {
        account_id: 'bob.near'
      },
      contractId: TOKEN_CONTRACT_ADDRESS
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
    All the examples are using a `Wallet` object, which comes from our basic template:

    <Github fname="near-wallet.js"
      url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
      start="20" end="27" />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">

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
</Tabs>

---

## Send token

<Tabs>
  <TabItem value="NEAR Component" label="NEAR Component" default>
  
    ```js
    const tokenContract = "token.v2.ref-finance.near";
    Near.call(
      tokenContract,
      "ft_transfer",
      {
        receiver_id: "alice.near",
        amount: "100000000000000000",
      },
      undefined,
      1
    );
    ```
  </TabItem>
  <TabItem value="Web App" label="Web App">

    ```js
    import { Wallet } from './near-wallet';

    const TOKEN_CONTRACT_ADDRESS = "token.v2.ref-finance.near";
    const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });
    
    await wallet.callMethod({
      method: 'ft_transfer',
      args: {
        receiver_id: 'alice.near',
        amount: '100000000000000000',
      },
      contractId: TOKEN_CONTRACT_ADDRESS,
      deposit: 1
    });
    ```

    All the examples are using a `Wallet` object, which comes from our basic template:

    <Github fname="near-wallet.js"
      url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
      start="20" end="27" />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">

    ```bash
    near call token.v2.ref-finance.near ft_transfer '{"receiver_id": "alice.near", "amount": "100000000000000000"}' --depositYocto 1 --accountId bob.near
    ```
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract" default>

    ```rust
    #[near_bindgen]
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

    See a full code example on GitHub:

    <Github fname="lib.rs"
      url="https://github.com/garikbesson/interact-with-near-ft-example/blob/main/src/lib.rs"
      start="20" end="27" />
  </TabItem>
</Tabs>

<hr class="subsection" />

### Register user

In order to transfer FTs to another account receiver account have to be registered in the token contract and make storage deposit. User can register their account or another account can do it for them.

<Tabs>
  <TabItem value="NEAR Component" label="NEAR Component" default>

    How to check storage balance:

    ```js
    const aliceStorageBalance = Near.view(tokenContract, "storage_balance_of", {
      account_id: "alice.near",
    });
    ```

    <details>
    <summary>Example response</summary>
    <p>

    It returns `null` if account is not registered.

    ```json
    {
      "available": "0",
      "total": "1250000000000000000000"
    }
    ```

    </p>

    </details>

    How to register another account:

    ```js
    const newAliceStorageBalance = Near.call(
      tokenContract,
      "storage_deposit",
      { account_id: "alice.near" },
      undefined,
      1250000000000000000000
    );
    ```

    If you need to register your own account just pass `{}` as arguments to call.

    <details>
    <summary>Example response</summary>
    <p>

    ```json
    {
      "available": "0",
      "total": "1250000000000000000000"
    }
    ```

    </p>

    </details>
  </TabItem>
  <TabItem value="Web App" label="Web App">

    How to check storage balance:

    ```js
    const balance = await wallet.viewMethod({
      method: 'storage_balance_of',
      args: {
        account_id: 'alice.near'
      },
      contractId: TOKEN_CONTRACT_ADDRESS
    });
    ```

    **Example response:**

    It returns `null` if account is not registered.

    ```json
    {
      "available": "0",
      "total": "1250000000000000000000"
    }
    ```


    How to register another account:

    ```js
    const newAliceStorageBalance = await wallet.callMethod({
      method: 'storage_deposit',
      args: {
        receiver_id: 'alice.near',
        amount: '100000000000000000',
      },
      contractId: TOKEN_CONTRACT_ADDRESS,
      deposit: 1250000000000000000000
    });
    ```

    If you need to register your own account just pass `{}` as arguments to call.

    <details>
    <summary>Example response</summary>
    <p>

    ```json
    {
      "available": "0",
      "total": "1250000000000000000000"
    }
    ```

    </p>

    </details>
    All the examples are using a `Wallet` object, which comes from our basic template:

    <Github fname="near-wallet.js"
      url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
      start="20" end="27" />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">

    How to check storage balance:

    ```bash
    near view token.v2.ref-finance.near storage_balance_of '{"account_id": "alice.near"}'
    ```

    <details>
    <summary>Example response</summary>
    <p>

    It returns `null` if account is not registered.

    ```bash
    {
      available: '0',
      total: '1250000000000000000000'
    }
    ```

    </p>

    </details>

    How to register another account:

    ```bash
    near call token.v2.ref-finance.near storage_deposit '{"account_id": "alice.near"}' --depositYocto 1250000000000000000000 --accountId bob.near
    ```

    If you need to register your own account just pass `{}` as arguments to call.

    <details>
    <summary>Example response</summary>
    <p>

    ```bash
    {
      available: '0',
      total: '1250000000000000000000'
    }
    ```

    </p>

    </details>
  </TabItem>
</Tabs>

---

## Attaching FTs to a Call

Natively, only NEAR tokens (Ⓝ) can be attached to a method calls. However, the FT standard enables to attach fungible tokens in a call by using the FT-contract as intermediary. This means that, instead of you attaching tokens directly to the call, you ask the FT-contract to do both a transfer and a method call in your name.

Let's assume that you need to deposit FTs on Ref Finance.

<Tabs>
  <TabItem value="NEAR Component" label="NEAR Component" default>
    ```js
    const tokenContract = "token.v2.ref-finance.near";
    const result = Near.call(
      tokenContract,
      "ft_transfer_call",
      {
        receiver_id: "v2.ref-finance.near",
        amount: "100000000000000000",
        msg: "",
      },
      300000000000000,
      1
    );
    ```

    <details>
    <summary>Example response</summary>
    <p>

    ```json
    '100000000000000000'
    ```

    </p>

    </details>
  </TabItem>
  <TabItem value="Web App" label="Web App">

    ```js
    import { Wallet } from './near-wallet';

    const TOKEN_CONTRACT_ADDRESS = "token.v2.ref-finance.near";
    const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });
    
    await wallet.callMethod({
      method: 'ft_transfer_call',
      args: {
        receiver_id: "v2.ref-finance.near",
        amount: "100000000000000000",
        msg: "",
      },
      contractId: TOKEN_CONTRACT_ADDRESS,
      gas: 300000000000000,
      deposit: 1
    });
    ```

    <details>
    <summary>Example response</summary>
    <p>

    ```json
    '100000000000000000'
    ```

    </p>

    </details>

    All the examples are using a `Wallet` object, which comes from our basic template:

    <Github fname="near-wallet.js"
      url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
      start="20" end="27" />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">

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
  <TabItem value="Smart Contract" label="Smart Contract" default>

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

    See a full code example on GitHub:

    <Github fname="lib.rs"
      url="https://github.com/garikbesson/interact-with-near-ft-example/blob/main/src/lib.rs"
      start="20" end="27" />
  </TabItem>
</Tabs>

How it works:

1. You call ft_transfer_call in the FT contract passing: the receiver, a message, and the amount.
2. The FT contract transfers the amount to the receiver.
3. The FT contract calls receiver.ft_on_transfer(sender, msg, amount)
4. The FT contract handles errors in the ft_resolve_transfer callback.
5. The FT contract returns you how much of the attached amount was actually used.

---

## Creating FT

For creating our own FT we will use [Token Farm](https://tkn.farm/). You can use it from GUI in your browser, but we will look at how to use its smart contracts to create a token.

First of all, you need to calculate how much creating a token will cost you.

<Tabs>
  <TabItem value="NEAR Component" label="NEAR Component" default>

    ```js
    const contract = "tkn.near";
    const args = {
      args: {
        owner_id: "bob.near",
        total_supply: "1000000000",
        metadata: {
          spec: "ft-1.0.0",
          name: "Test Token",
          symbol: "test",
          icon: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          decimals: 18,
        },
      },
      account_id: "bob.near",
    };
    const requiredStorageDeposit = Near.view(
      contract,
      "get_required_deposit",
      args
    );
    ```

    <details>
    <summary>Example response</summary>
    <p>

    ```json
    '2234830000000000000000000'
    ```

    </p>

    </details>

    Then you can create a token.

    ```js
    Near.call(contract, "create_token", args, 300000000000000, requiredStorageDeposit);
    ```
  </TabItem>
  <TabItem value="Web App" label="Web App">

    ```js
    import { Wallet } from './near-wallet';

    const CONTRACT_ADDRESS = "tkn.near";
    const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

    const args = {
      args: {
        owner_id: "bob.near",
        total_supply: "1000000000",
        metadata: {
          spec: "ft-1.0.0",
          name: "Test Token",
          symbol: "test",
          icon: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          decimals: 18,
        },
      },
      account_id: "bob.near",
    };

    const requiredStorageDeposit = await wallet.viewMethod({
      method: 'get_required_deposit',
      args,
      contractId: CONTRACT_ADDRESS
    });
    ```

    <details>
    <summary>Example response</summary>
    <p>

    ```json
    '2234830000000000000000000'
    ```

    </p>

    </details>

    Then you can create a token.

    ```js
    await wallet.callMethod({
      method: 'create_token',
      args,
      contractId: CONTRACT_ADDRESS,
      gas: 300000000000000,
      deposit: requiredStorageDeposit
    });
    ```

    All the examples are using a `Wallet` object, which comes from our basic template:

    <Github fname="near-wallet.js"
      url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
      start="20" end="27" />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">

    ```bash
    near view tkn.near get_required_deposit '{"args":{"owner_id": "bob.near","total_supply": "1000000000","metadata":{"spec": "ft-1.0.0","name": "Test Token","symbol": "TTTEST","icon": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7","decimals": 18}},"account_id": "bob.near"}' 
    ```

    <details>
    <summary>Example response</summary>
    <p>

    ```bash
    '2234830000000000000000000'
    ```

    </p>

    </details>

    And then you can create a token.

    ```bash
    near call tkn.near create_token '{"args":{"owner_id": "bob.near","total_supply": "1000000000","metadata":{"spec": "ft-1.0.0","name": "Test Token","symbol": "TTTEST","icon": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7","decimals": 18}},"account_id": "bob.near"}' --gas 300000000000000 --depositYocto 2234830000000000000000000 --accountId bob.near
    ```
  </TabItem>
</Tabs>

Contract of your token will have an address which looks like `<your_token_symbol>.tkn.near` (in the case above `test.tkn.near`).

After creating a token you can [send it](#send-tokens) to anyone.

---

## Handle a deposit

<Tabs>
  <TabItem value="Smart Contract" label="Smart Contract" default>

    If you want your contract to handle deposit in FTs you have to implement the `ft_on_transfer` method. When executed, such method will know:

    - Which FT was transferred, since it is the predecessor account.
    - Who is sending the FT, since it is a parameter
    - How many FT were transferred, since it is a parameter
    - If there are any parameters encoded as a message

    The `ft_on_transfer` must return how many FT tokens have to **be refunded**, so the FT contract gives them back to the sender.

    ```rust
    // Implement the contract structure
    #[near_bindgen]
    impl Contract {}

    #[near_bindgen]
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

    See a full code example on GitHub:

    <Github fname="lib.rs"
      url="https://github.com/garikbesson/interact-with-near-ft-example/blob/main/src/lib.rs"
      start="20" end="27" />
  </TabItem>
</Tabs>