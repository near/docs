---
id: crosscontract
title: Cross-Contract Calls
---

import {CodeTabs, Language, Github} from '@site/src/components/codetabs'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Your contract can interact with other deployed contracts, **querying** information and **executing functions** on them.

Since NEAR is a sharded blockchain, its cross-contract calls behave differently than calls do in other chains. In NEAR. cross-contract calls are asynchronous and independent.

:::info Cross-Contract Calls are **Independent**

You will need two independent functions: one to make the call, and another to receive the result

:::

:::info Cross-Contract Calls are **Asynchronous**

There is a delay between the call and the callback execution, usually of **1 or 2 blocks**. During this time, the contract is still active and can receive other calls.

:::

---

## Snippet: Querying Information

While making your contract, it is likely that you will want to query information from another contract. Below, you can see a basic example in which we query the greeting message from our [Hello NEAR](../quickstart.md) example.

<CodeTabs>
<Language value="js" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/src/contract.ts"
            start="18" end="52" />

</Language>

<Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/lib.rs"
            start="1" end="29" />
    <Github fname="external_contract.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/external_contract.rs"
            start="1" end="8" />
    <Github fname="high_level.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/high_level.rs"
            start="8" end="37" />
    <Github fname="low_level.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/low_level.rs"
            start="7" end="39" />

</Language>

<Language value="python" language="python">
```python
from near_sdk_py import call, view, Context
from near_sdk_py.promises import Contract, Promise, callback

class CrossContractExample:
    def __init__(self):
        # Contract we want to interact with
        self.hello_contract = "hello-near.testnet"
        
    @view
    def query_greeting_info(self):
        """View function showing how to make a cross-contract call"""
        # Create a reference to the Hello NEAR contract
        # This is a simple call that will execute in the current transaction
        return Contract(self.hello_contract).call("get_greeting")
    
    @call
    def query_greeting(self):
        """Calls Hello NEAR contract to get the greeting with a callback"""
        # Create a reference to the token contract
        hello = Contract(self.hello_contract)
        
        # Call get_greeting and chain a callback
        # The Promise API handles serialization and callback chaining
        return hello.call("get_greeting").then(
            "query_greeting_callback"
        )
    
    @callback
    def query_greeting_callback(self, greeting):
        """Processes the greeting result from Hello NEAR contract"""
        # The @callback decorator automatically parses the promise result
        # greeting will already be the parsed value, not raw bytes
        if greeting is None:
            return {"success": False, "message": "Failed to get greeting"}
            
        return {
            "success": True,
            "greeting": greeting,
            "message": f"Successfully got greeting: {greeting}"
        }
```
</Language>

</CodeTabs>

---

## Snippet: Sending Information
Calling another contract passing information is also a common scenario. Below you can see a function that interacts with the [Hello NEAR](../quickstart.md) example to change its greeting message.

<CodeTabs>
<Language value="js" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/src/contract.ts"
            start="54" end="87" />

</Language>

<Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/lib.rs"
            start="1" end="29" />
    <Github fname="external_contract.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/external_contract.rs"
            start="1" end="8" />
    <Github fname="high_level.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/high_level.rs"
            start="39" end="66" />
    <Github fname="low_level.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/low_level.rs"
            start="41" end="72" />

</Language>

<Language value="python" language="python">
```python
from near_sdk_py import call, Context
from near_sdk_py.promises import Contract, Promise, callback

class CrossContractExample:
    def __init__(self):
        # Contract we want to interact with
        self.hello_contract = "hello-near.testnet"
        
    @call
    def change_greeting(self, new_greeting):
        """Changes the greeting on the Hello NEAR contract"""
        # Create a reference to the Hello NEAR contract
        hello = Contract(self.hello_contract)
        
        # Create a promise to call set_greeting with the new greeting
        # Pass context data to the callback directly as kwargs
        return hello.call(
            "set_greeting", 
            message=new_greeting
        ).then(
            "change_greeting_callback",
            original_greeting=new_greeting  # Additional context passed to callback
        )
    
    @callback
    def change_greeting_callback(self, result, original_greeting):
        """Processes the result of set_greeting"""
        # The original_greeting parameter is passed from the change_greeting method
        if result is None:
            return {
                "success": False, 
                "message": f"Failed to set greeting to '{original_greeting}'"
            }
            
        return {
            "success": True,
            "message": f"Successfully set greeting to '{original_greeting}'",
            "result": result
        }
```
</Language>

</CodeTabs>

---

## Promises
Cross-contract calls work by creating two promises in the network:
1. A promise to execute code in the external contract (`Promise.create`)
2. Optional: A promise to call another function with the result (`Promise.then`)

Both promises will contain the following information:

- The address of the contract you want to interact with
- The function that you want to execute
- The (**encoded**) arguments to pass to the function
- The amount of GAS to use (deducted from the **attached Gas**)
- The amount of NEAR to attach (deducted from **your contract's balance**)

:::tip

The callback can be made to **any** contract. Meaning that the result could potentially be handled by another contract

:::


<hr class="subsection" />

### Creating a Cross Contract Call

To create a cross-contract call with a callback, create two promises and use the `.then` method to link them:


<Tabs>
  <TabItem value="js" label="🌐 JavaScript">

    ```ts
    NearPromise.new("external_address").functionCall("function_name", JSON.stringify(arguments), DEPOSIT, GAS)
    .then(
      // this function is the callback
      NearPromise.new(near.currentAccountId()).functionCall("callback_name", JSON.stringify(arguments), DEPOSIT, GAS)
    );
    ```

  </TabItem>
  <TabItem value="rs" label="🦀 Rust">

    There is a helper macro that allows you to make cross-contract calls with the syntax `#[ext_contract(...)]`. It takes a Rust Trait and converts it to a module with static methods. Each of these static methods takes positional arguments defined by the Trait, then the `receiver_id`, the attached deposit and the amount of gas and returns a new `Promise`. *That's the high-level way to make cross-contract calls.*

    ```rust
    #[ext_contract(external_trait)]
    trait Contract {
        fn function_name(&self, param1: T, param2: T) -> T;
    }

    external_trait::ext("external_address")
    .with_attached_deposit(DEPOSIT)
    .with_static_gas(GAS)
    .function_name(arguments)
    .then(
      // this is the callback
      Self::ext(env::current_account_id())
      .with_attached_deposit(DEPOSIT)
      .with_static_gas(GAS)
      .callback_name(arguments)
    );

    ```

    <hr class="subsection" />

    There is another way to achieve the same result. You can create a new `Promise` without using a helper macro. *It's the low-level way to make cross-contract calls.*

    ```rust
    let arguments = json!({ "foo": "bar" })
        .to_string()
        .into_bytes();

    let promise = Promise::new("external_address").function_call(
        "function_name".to_owned(),
        arguments,
        DEPOSIT,
        GAS
    );

    promise.then(
        // Create a promise to callback query_greeting_callback
        Self::ext(env::current_account_id())
            .with_static_gas(GAS)
            .callback_name(),
    );

    ```

<details>
<summary> Gas </summary>

You can attach an unused GAS weight by specifying the `.with_unused_gas_weight()` method but it is defaulted to 1. The unused GAS will be split amongst all the functions in the current execution depending on their weights. If there is only 1 function, any weight above 1 will result in all the unused GAS being attached to that function. If you specify a weight of 0, however, the unused GAS will **not** be attached to that function. If you have two functions, one with a weight of 3, and one with a weight of 1, the first function will get `3/4` of the unused GAS and the other function will get `1/4` of the unused GAS.

</details>

  </TabItem>
  
  <TabItem value="python" label="🐍 Python">

    ```python
    from near_sdk_py.promises import Contract, Promise
    from near_sdk_py import Context
    
    # High-level Contract API (recommended)
    Contract("external_address").call(
        "function_name",  # Method to call
        arg1="value1",    # Keyword arguments for the method
        arg2="value2"
    ).then(
        "callback_name",  # Method name in this contract to use as callback
        context_data="saved_for_callback"  # Additional context data for the callback
    )
    
    # Lower-level Promise API
    Promise.create_batch("external_address").function_call(
        "function_name", 
        {"arg1": "value1", "arg2": "value2"},  # Arguments as a dictionary
        amount=0,   # Deposit in yoctoNEAR
        gas=5 * ONE_TGAS  # Gas allowance
    ).then(
        # Method name for callback
        "callback_name",
        # Additional context data
        context_data="saved_for_callback"
    )
    ```

  </TabItem>
</Tabs>

:::info

If a function returns a promise, then it will delegate the return value and status of transaction execution, but if you return a value or nothing, then the `Promise` result will not influence the transaction status

:::

:::caution

The Promises you are creating will **not execute immediately**. In fact, they will be queued in the network an:
- The cross-contract call will execute 1 or 2 blocks after your function finishes **correctly**.

:::

---

## Callback Function
If your function finishes correctly, then eventually your callback function will execute. This will happen whether the **external contract fails or not**.

In the callback function you will have access to the result, which will contain the status of the external function (if it worked or not), and the values in case of success.

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/src/contract.ts"
            start="42" end="53" />

</Language>

<Language value="rust" language="rust">

  <Github fname="high_level.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/high_level.rs"
            start="23" end="37" />

</Language>

<Language value="python" language="python">
```python
from near_sdk_py import callback

class CrossContractExample:
    @callback
    def query_greeting_callback(self, greeting_result, additional_context=None):
        """
        Process the result of a cross-contract call.
        The @callback decorator automatically:
        1. Reads the promise result data
        2. Handles serialization/deserialization 
        3. Provides proper error handling
        
        Parameters:
        - greeting_result: The automatically parsed result 
        - additional_context: Optional context passed from the calling function
        """
        if greeting_result is None:
            # This means the external call failed or returned nothing
            return {
                "success": False, 
                "message": "Failed to get greeting",
                "context": additional_context
            }
            
        # Process successful result
        return {
            "success": True,
            "greeting": greeting_result,
            "message": f"Successfully got greeting: {greeting_result}",
            "context": additional_context
        }
```
</Language>

</CodeTabs>

:::info Callback with always execute

We repeat, if your function finishes correctly, then your callback will **always execute**. This will happen no matter if the external function finished correctly or not

:::

:::warning

Always make sure to have enough Gas for your callback function to execute

:::

:::tip

Remember to mark your callback function as private using macros/decorators, so it can only be called by the contract itself

:::

<hr class="subsection" />

### What happens if the function I call fails?
If the external function fails (i.e. it panics), then your callback will be **executed anyway**. Here you need to **manually rollback** any changes made in your
contract during the original call. Particularly:

1. **Refund the predecessor** if needed: If the contract attached NEAR to the call, the funds are now back in **the contract's account**
2. **Revert any state changes**: If the original function made any state changes (i.e. changed or stored data), you need to manually roll them back. **They won't revert automatically**

:::warning
If your original function finishes correctly then the callback executes **even if the external function panics**. Your state will **not** rollback automatically,
and $NEAR will **not** be returned to the signer automatically. Always make sure to check in the callback if the external function failed, and manually rollback any
operation if necessary.
:::

---

## Concatenating Functions and Promises

✅ Promises can be concatenate using the `.and` operator: `P1.and(P2).and(P3).then(P4)`: `P1`, `P2`, and `P3` execute in parallel, after they finish, `P4` will execute and have access to all their results

⛔ You cannot **return** a joint promise without a callback: `return P1.and(P2)` is invalid since it misses the `then`

✅ You can concatenate `then` promises: `P1.then(P2).then(P3)`: `P1` executes, then `P2` executes with the result of `P1`, then `P3` executes with the result of `P2`

⛔ You cannot use an `and` within a `then`: `P1.then(P2.and(P3))` is invalid

⛔ You cannot use a `then` within a `then`: `P1.then(P2.then(P3))` is invalid

<hr class="subsection" />

### Multiple Functions, Same Contract

You can call multiple functions in the same external contract, which is known as a **batch call**.

An important property of batch calls is that they **act as a unit**: they execute in the same [receipt](/protocol/transaction-execution#receipts--finality), and if **any function fails**, then they **all get reverted**.

<Tabs>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="batch_actions" language="js"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/batch_actions.ts"
        start="5" end="17" />

  </TabItem>
  <TabItem value="rs" label="🦀 Rust">

  <Github fname="lib.ts" language="rust"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/batch_actions.rs"
        start="8" end="20" />

  </TabItem>
  
  <TabItem value="python" label="🐍 Python">

```python
from near_sdk_py import call, Context
from near_sdk_py.promises import Contract, callback
from near_sdk_py.constants import ONE_TGAS

class BatchCallsExample:
    def __init__(self):
        self.hello_contract = "hello-near.testnet"
        
    @call
    def call_multiple_methods(self, greeting1, greeting2):
        """Call multiple methods on the same contract in a batch"""
        # Create a batch for the hello contract
        # Using the fluent batch API
        return Contract(self.hello_contract).batch()\
            .function_call("set_greeting", message=greeting1)\
            .function_call("another_method", arg1=greeting2)\
            .then("batch_callback", original_data=[greeting1, greeting2])
        
    @callback
    def batch_callback(self, result, original_data=None):
        """Process batch result - only gets the result of the last operation"""
        return {
            "success": result is not None,
            "result": result,
            "original_data": original_data
        }
```

  </TabItem>
</Tabs>

:::tip

Callbacks only have access to the result of the **last function** in a batch call

:::

---

### Multiple Functions: Different Contracts

You can also call multiple functions in **different contracts**. These functions will be executed in parallel, and do not impact each other. This means that, if one fails, the others **will execute, and NOT be reverted**.

<Tabs>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="lib.ts" language="js"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/multiple_contracts.ts"
        start="6" end="21" />

  </TabItem>
  <TabItem value="rs" label="🦀 Rust">

  <Github fname="lib.rs" language="rust"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/multiple_contracts.rs"
        start="17" end="55" />

  </TabItem>
  
  <TabItem value="python" label="🐍 Python">

```python
from near_sdk_py import call
from near_sdk_py.promises import Contract, Promise, callback

class MultiContractExample:
    def __init__(self):
        self.contract_a = "contract-a.testnet"
        self.contract_b = "contract-b.testnet"
        
    @call
    def call_multiple_contracts(self):
        """Calls multiple different contracts in parallel"""
        # Create promises for each contract
        promise_a = Contract(self.contract_a).call("method_a")
        promise_b = Contract(self.contract_b).call("method_b")
        
        # Join the promises and add a callback
        # The first promise's join method can combine multiple promises
        return promise_a.join(
            [promise_b],
            "multi_contract_callback",
            contract_ids=[self.contract_a, self.contract_b]  # Context data
        )
        
    @callback
    def multi_contract_callback(self, results, contract_ids=None):
        """Process results from multiple contracts"""
        # results is an array containing all promise results in order
        return {
            "contract_a": {
                "id": contract_ids[0],
                "result": results[0]
            },
            "contract_b": {
                "id": contract_ids[1],
                "result": results[1]
            },
            "success": all(result is not None for result in results)
        }
```

  </TabItem>
</Tabs>

:::tip

Callbacks have access to the result of **all functions** in a parallel call

:::


---

## Security Concerns

While writing cross-contract calls there is a significant aspect to keep in mind: all the calls are **independent** and **asynchronous**. In other words:

- The function in which you make the call and function for the callback are **independent**.
- There is a **delay between the call and the callback**, in which people can still interact with the contract

This has important implications on how you should handle the callbacks. Particularly:

1. Make sure you don't leave the contract in a exploitable state between the call and the callback.
2. Manually rollback any changes to the state in the callback if the external call failed.

We have a whole [security section](../security/callbacks.md) dedicated to these specific errors, so please go and check it.

:::warning
Not following these basic security guidelines could expose your contract to exploits. Please check the [security section](../security/callbacks.md), and if still in doubt, [join us in Discord](https://near.chat).
:::
