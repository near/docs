---
id: advanced-xcc
title: Complex Cross Contract Call
---



This example presents 3 instances of complex cross-contract calls. Particularly, it shows:

1. How to batch multiple function calls to a same contract.
2. How to call multiple contracts in parallel, each returning a different type.
3. Different ways of handling the responses in the callback.

:::info Simple Cross-Contract Calls

Check the tutorial on how to use [simple cross-contract calls](xcc.md)

:::

---

## Obtaining the Cross Contract Call Example

You have two options to start the Donation Example:

1. You can use the app through `Github Codespaces`, which will open a web-based interactive environment.
2. Clone the repository locally and use it from your computer.

| Codespaces                                                                                                                      | Clone locally                                               |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/near-examples/cross-contract-calls?quickstart=1) | 🌐 `https://github.com/near-examples/cross-contract-calls` |

---

## Structure of the Example

The smart contract is available in two flavors: Rust and JavaScript

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

```bash
┌── sandbox-ts # sandbox testing
│    ├── external-contracts
│    │    ├── counter.wasm
│    │    ├── guest-book.wasm
│    │    └── hello-near.wasm
│    └── main.ava.ts
├── src # contract's code
│    ├── internal
│    │    ├── batch_actions.ts
│    │    ├── constants.ts
│    │    ├── multiple_contracts.ts
│    │    ├── similar_contracts.ts
│    │    └── utils.ts
│    └── contract.ts
├── package.json
├── README.md
└── tsconfig.json
```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

```bash
┌── tests # sandbox testing
│    ├── external-contracts
│    │    ├── counter.wasm
│    │    ├── guest-book.wasm
│    │    └── hello-near.wasm
│    └── main.ava.ts
├── src # contract's code
│    ├── batch_actions.rs
│    ├── lib.rs
│    ├── multiple_contracts.rs
│    └── similar_contracts.rs
├── Cargo.toml # package manager
├── README.md
└── rust-toolchain.toml
```

  </TabItem>

</Tabs>

---

## Smart Contract

### Batch Actions

You can aggregate multiple actions directed towards one same contract into a batched transaction.
Methods called this way are executed sequentially, with the added benefit that, if one fails then
they **all get reverted**.

<CodeTabs>
  <Language value="js" language="js">
    ```
  @call({})
  batch_actions(): NearPromise {
    return internal_batch_actions(this.hello_account);
  }

```
    ```
export function batch_actions(accountId: AccountId) {

  const promise = NearPromise.new(accountId)
    .functionCall("set_greeting", JSON.stringify({ greeting: 'hi' }), NO_DEPOSIT, TEN_TGAS)
    .functionCall("get_greeting", NO_ARGS, NO_DEPOSIT, TEN_TGAS)
    .functionCall("set_greeting", JSON.stringify({ greeting: 'bye' }), NO_DEPOSIT, TEN_TGAS)
    .functionCall("get_greeting", NO_ARGS, NO_DEPOSIT, TEN_TGAS)
    .then(
      NearPromise.new(near.currentAccountId())
      .functionCall("batch_actions_callback", NO_ARGS, NO_DEPOSIT, TEN_TGAS)
    )
    return promise.asReturn();
};

```
  </Language>
  <Language value="rust" language="rust">
    ```
    pub fn batch_actions(&mut self) -> Promise {
        let hi = json!({ "greeting": "hi" }).to_string().into_bytes();
        let bye = json!({ "greeting": "bye" }).to_string().into_bytes();

        // You can create one transaction calling multiple methods
        // on a same contract
        Promise::new(self.hello_account.clone())
            .function_call("set_greeting".to_owned(), hi, NO_DEPOSIT, XCC_GAS)
            .function_call("get_greeting".to_owned(), NO_ARGS, NO_DEPOSIT, XCC_GAS)
            .function_call("set_greeting".to_owned(), bye, NO_DEPOSIT, XCC_GAS)
            .function_call("get_greeting".to_owned(), NO_ARGS, NO_DEPOSIT, XCC_GAS)
            .then(Self::ext(env::current_account_id()).batch_actions_callback())
    }

```
  </Language>
</CodeTabs>

#### Getting the Last Response

In this case, the callback has access to the value returned by the **last
action** from the chain.

<CodeTabs>
  <Language value="js" language="js">
    ```
  @call({ privateFunction: true })
  batch_actions_callback(): string {
    return internal_batch_actions_callback();
  }

```
    ```
export function batch_actions_callback() {
  let { success, result } = promiseResult(0);

  if (success) {
    near.log(`Success! Result: ${result}`);
    return result;
  } else {
    near.log("Promise failed...");
    return "";
  }
};

```
    ```
export function promiseResult(index: number): { result: string, success: boolean } {
  let result, success;
  
  try {
    result = near.promiseResult(index);
    success = true;
  } catch (err){
    near.log(err.message);
    throw err;
    result = undefined;
    success = false;
  }
  
  return {
    result,
    success,
  }
}
```
  </Language>
  <Language value="rust" language="rust">
    ```
    #[private]
    pub fn batch_actions_callback(
        &self,
        #[callback_result] last_result: Result<String, PromiseError>,
    ) -> String {
        // The callback only has access to the last action's result
        if let Ok(result) = last_result {
            log!("The last result is {result}");
            result
        } else {
            log!("The batch call failed and all calls got reverted");
            "".to_string()
        }
    }
}
```
  </Language>
</CodeTabs>

---

### Calling Multiple Contracts

A contract can call multiple other contracts. This creates multiple transactions that execute
all in parallel. If one of them fails the rest **ARE NOT REVERTED**.

<CodeTabs>
  <Language value="js" language="js">
    ```
  @call({})
  multiple_contracts(): NearPromise {
    return internal_multiple_contracts(this);
  }

```
    ```
export function multiple_contracts(contract: CrossContractCall) {
  const promise1 = NearPromise.new(contract.hello_account)
    .functionCall("get_greeting", NO_ARGS, NO_DEPOSIT, TEN_TGAS)
  const promise2 = NearPromise.new(contract.counter_account)
    .functionCall("get_num", NO_ARGS, NO_DEPOSIT, TEN_TGAS)
  const promise3 = NearPromise.new(contract.guestbook_account)
    .functionCall("get_messages", NO_ARGS, NO_DEPOSIT, TEN_TGAS)

  return promise1
    .and(promise2)
    .and(promise3)
    .then(
      NearPromise.new(near.currentAccountId())
      .functionCall("multiple_contracts_callback", JSON.stringify({ number_promises: 3 }), NO_DEPOSIT, TEN_TGAS)
    )
};

```
  </Language>
  <Language value="rust" language="rust">
    ```
    /// A method which calls different contracts via cross contract function calls.
    pub fn multiple_contracts(&mut self) -> Promise {
        // We create a promise that calls the `get_greeting` function on the HELLO_CONTRACT
        let hello_promise = Promise::new(self.hello_account.clone()).function_call(
            "get_greeting".to_owned(),
            NO_ARGS,
            NO_DEPOSIT,
            XCC_GAS,
        );

        // We create a promise that calls the `get_num` function on the COUNTER_CONTRACT
        let counter_promise = Promise::new(self.counter_account.clone()).function_call(
            "get_num".to_owned(),
            NO_ARGS,
            NO_DEPOSIT,
            XCC_GAS,
        );

        // We create a promise that calls the `get_messages` function on the GUESTBOOK_CONTRACT
        let args = json!({ "from_index": "0", "limit": 2 })
            .to_string()
            .into_bytes();

        let guestbook_promise = Promise::new(self.guestbook_account.clone()).function_call(
            "get_messages".to_owned(),
            args,
            NO_DEPOSIT,
            XCC_GAS,
        );

        // We join all promises and chain a callback to collect their results.
        hello_promise
            .and(counter_promise)
            .and(guestbook_promise)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(XCC_GAS)
                    .multiple_contracts_callback(),
            )
    }

```
  </Language>
</CodeTabs>

#### Getting All Responses

In this case, the callback has access to an **array of responses**, which have either the
value returned by each call, or an error message.

<CodeTabs>
  <Language value="js" language="js">
    ```
  @call({ privateFunction: true })
  multiple_contracts_callback(
    { number_promises }: { number_promises: number },
  ): string[] {
    return internal_multiple_contracts_callback(number_promises);
  }

```
    ```
export function multiple_contracts_callback(number_promises: number): string[] {
  const allResults = [];
    
  for (let i = 0; i < number_promises; i++) {
    near.log(`Get index result: ${i}`);
    let { success, result } = promiseResult(i);

    if (success) {
      allResults.push(result);
      near.log(`Success! Index: ${i}, Result: ${result}`);
    } else {
      near.log("Promise failed...");
      return [];
    }
  }

  return allResults;
};

```
    ```
export function promiseResult(index: number): { result: string, success: boolean } {
  let result, success;
  
  try {
    result = near.promiseResult(index);
    success = true;
  } catch (err){
    near.log(err.message);
    throw err;
    result = undefined;
    success = false;
  }
  
  return {
    result,
    success,
  }
}
```
  </Language>
  <Language value="rust" language="rust">
    ```
    pub fn multiple_contracts_callback(
        &self,
        #[callback_result] hello_result: Result<String, PromiseError>,
        #[callback_result] counter_result: Result<i8, PromiseError>,
        #[callback_result] guestbook_result: Result<Vec<PostedMessage>, PromiseError>,
    ) -> (String, i8, Vec<PostedMessage>) {
        // The callback has access to the result of the 3 calls
        let greeting = if let Ok(result) = hello_result {
            log!("HelloNear says {result}");
            result
        } else {
            log!("The call to HelloNear failed");
            "".to_string()
        };

        let counter = if let Ok(result) = counter_result {
            log!("Counter is {result}");
            result
        } else {
            log!("The call to Counter failed");
            0
        };

        let messages = if let Ok(result) = guestbook_result {
            log!("The messages are {result:?}");
            result
        } else {
            log!("The call to GuestBook failed");
            vec![]
        };

        (greeting, counter, messages)
    }
}

```
  </Language>
</CodeTabs>

---

### Multiple Calls - Same Result Type

This example is a particular case of the previous one ([Calling Multiple Contracts](#calling-multiple-contracts)).
It simply showcases a different way to check the results by directly accessing the `promise_result` array.

In this case, we call multiple contracts that will return the same type:

<CodeTabs>
  <Language value="js" language="js">
    ```
  @call({ privateFunction: true })
  similar_contracts_callback(
    { number_promises }: { number_promises: number },
  ): string[] {
    return internal_similar_contracts_callback(number_promises);
  }
}
```
    ```
function promise_set_get(contract: CrossContractCall, message: string) {
  return NearPromise.new(contract.hello_account)
    .functionCall(
      "set_greeting",
      JSON.stringify({ greeting: message }),
      NO_DEPOSIT,
      TEN_TGAS
    )
    .functionCall("get_greeting", NO_ARGS, NO_DEPOSIT, TEN_TGAS);
}



export function similar_contracts(contract: CrossContractCall) {
  const hello_one = promise_set_get(contract,"hi");
  const hello_two = promise_set_get(contract,"howdy");
  const hello_three = promise_set_get(contract,"bye");

  return hello_one
    .and(hello_two)
    .and(hello_three)
    .then(
      NearPromise.new(near.currentAccountId()).functionCall(
        "multiple_contracts_callback",
        JSON.stringify({ number_promises: 3 }),
        NO_DEPOSIT,
        TEN_TGAS
      )
    );
}

```
  </Language>
  <Language value="rust" language="rust">
    ```
    fn promise_set_get(&self, message: &str) -> Promise {
        // Aux method to create a batch transaction calling
        // set_message and get_message in the HELLO CONTRACT
        let args = json!({ "greeting": message }).to_string().into_bytes();

        Promise::new(self.hello_account.clone())
            .function_call("set_greeting".to_owned(), args, NO_DEPOSIT, XCC_GAS)
            .function_call("get_greeting".to_owned(), NO_ARGS, NO_DEPOSIT, XCC_GAS)
    }

    pub fn similar_contracts(&mut self) -> Promise {
        // Create promises to call 3 contracts that return the same type
        // For simplicity here we call the same contract
        let hello_one = self.promise_set_get("hi");
        let hello_two = self.promise_set_get("howdy");
        let hello_three = self.promise_set_get("bye");

        // Join all promises and chain a callback to collect their results.
        hello_one.and(hello_two).and(hello_three).then(
            Self::ext(env::current_account_id())
                .with_static_gas(XCC_GAS)
                .similar_contracts_callback(3),
        )
    }

```
  </Language>
</CodeTabs>

#### Getting All Responses

In this case, the callback again has access to an **array of responses**, which we can iterate checking the
results.

<CodeTabs>
  <Language value="js" language="js">
    ```
    return internal_similar_contracts(this);
  }

  @call({ privateFunction: true })
  similar_contracts_callback(
```
    ```
export function similar_contracts_callback(number_promises: number): string[] {
  const allResults = [];
    
  for (let i = 0; i < number_promises; i++) {
    near.log(`Get index result: ${i}`);
    let { success, result } = promiseResult(i);

    if (success) {
      allResults.push(result);
      near.log(`Success! Index: ${i}, Result: ${result}`);
    } else {
      near.log("Promise failed...");
      return [];
    }
  }

  return allResults;
};
  
```
    ```
export function promiseResult(index: number): { result: string, success: boolean } {
  let result, success;
  
  try {
    result = near.promiseResult(index);
    success = true;
  } catch (err){
    near.log(err.message);
    throw err;
    result = undefined;
    success = false;
  }
  
  return {
    result,
    success,
  }
}
```
  </Language>
  <Language value="rust" language="rust">
    ```

    #[private]
    pub fn similar_contracts_callback(&self, number_promises: u64) -> Vec<String> {
        (0..number_promises)
            .filter_map(|index| {
                // env::promise_result(i) has the result of the i-th call
                let result = env::promise_result(index);

                match result {
                    PromiseResult::Failed => {
                        log!("Promise number {index} failed.");
                        None
                    }
                    PromiseResult::Successful(value) => {
                        if let Ok(message) = near_sdk::serde_json::from_slice::<String>(&value) {
                            log!("Call {index} returned: {message}");
                            Some(message)
                        } else {
                            log!("Error deserializing call {index} result.");
                            None
                        }
                    }
                }
            })
            .collect()
    }
}
```
  </Language>
</CodeTabs>

---

### Testing the Contract

The contract readily includes a set of unit and sandbox testing to validate its functionality. To execute the tests, run the following commands:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

  ```bash
  cd contract-advanced-ts
  yarn
  yarn test
  ```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  
  ```bash
  cd contract-advanced-rs
  cargo test
  ```

  </TabItem>

</Tabs>

:::tip
The `integration tests` use a sandbox to create NEAR users and simulate interactions with the contract.
:::

<hr class="subsection" />

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

Go into the directory containing the smart contract (`cd contract-advanced-ts` or `cd contract-advanced-rs`), build and deploy it:

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">

    ```bash
    npm run build
    near deploy <accountId> ./build/cross_contract.wasm --initFunction new --initArgs '{"hello_account":"hello.near-example.testnet","guestbook_account":"guestbook_account.near-example.testnet","counter_account":"counter_account.near-example.testnet"}'
    ```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
  
  ```bash
  cargo near deploy build-non-reproducible-wasm <accountId> with-init-call new json-args '{"hello_account":"hello.near-example.testnet","guestbook_account":"guestbook_account.near-example.testnet","counter_account":"counter_account.near-example.testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
  ```

  </TabItem>

</Tabs>

<hr class="subsection" />

### CLI: Interacting with the Contract

To interact with the contract through the console, you can use the following commands:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">
  
  ```bash
  # Execute contracts sequentially
  # Replace <accountId> with your account ID
  near call <accountId> batch_actions --accountId <accountId> --gas 300000000000000   

  # Execute contracts in parallel
  # Replace <accountId> with your account ID
  near call <accountId>  multiple_contracts --accountId <accountId> --gas 300000000000000   

  # Execute multiple instances of the same contract in parallel
  # Replace <accountId> with your account ID
  near call <accountId> similar_contracts --accountId <accountId> --gas 300000000000000
  ```
  </TabItem>

  <TabItem value="full" label="Full">
  
  ```bash
  # Execute contracts sequentially
  # Replace <accountId> with your account ID
  near contract call-function as-transaction <accountId> batch_actions json-args '{}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send

  # Execute contracts in parallel
  # Replace <accountId> with your account ID
  near contract call-function as-transaction <accountId> multiple_contracts json-args '{}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send

  # Execute multiple instances of the same contract in parallel
  # Replace <accountId> with your account ID
  near contract call-function as-transaction <accountId> similar_contracts json-args '{}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>


:::info
If at some point you get an "Exceeded the prepaid gas" error, try to increase the gas amount used within the functions when calling other contracts
:::

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1`
- rustc: `1.77.0`

:::
