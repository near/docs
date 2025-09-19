---
id: crosscontract
title: Cross-Contract Calls
description: "Learn cross-contract calls on NEAR to interact asynchronously between contracts and handle callbacks."
---

import {CodeTabs, Language, Github} from '@site/src/components/codetabs'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Cross-contract calls are a powerful feature of NEAR smart contracts, allowing one contract to interact with another. This enables complex interactions and functionalities across different contracts, enhancing the ecosystem's capabilities.

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
from near_sdk_py import call, view, Contract, callback, PromiseResult, CrossContract, init

class CrossContractExample(Contract):
    # Contract we want to interact with
    hello_contract = "hello-near.testnet"
        
    @init
    def new(self):
        """Initialize the contract"""
        # Any initialization logic goes here
        pass
        
    @view
    def query_greeting_info(self):
        """View function showing how to make a cross-contract call"""
        # Create a reference to the Hello NEAR contract
        # This is a simple call that will execute in the current transaction
        hello = CrossContract(self.hello_contract)
        return hello.call("get_greeting").value()
    
    @call
    def query_greeting(self):
        """Calls Hello NEAR contract to get the greeting with a callback"""
        # Create a reference to the Hello NEAR contract
        hello = CrossContract(self.hello_contract)
        
        # Call get_greeting and chain a callback
        # The Promise API handles serialization and callback chaining
        promise = hello.call("get_greeting").then("query_greeting_callback")
        
        return promise.value()
    
    @callback
    def query_greeting_callback(self, result: PromiseResult):
        """Processes the greeting result from Hello NEAR contract"""
        # The @callback decorator automatically parses the promise result
        # result will have a data property and a success boolean
        if not result.success:
            return {"success": False, "message": "Failed to get greeting"}
            
        return {
            "success": True,
            "greeting": result.data,
            "message": f"Successfully got greeting: {result.data}"
        }
```
</Language>

<Language value="go" language="go">
```go
package main

import (
	contractBuilder "github.com/vlmoon99/near-sdk-go/contract"
	"github.com/vlmoon99/near-sdk-go/env"
	promiseBuilder "github.com/vlmoon99/near-sdk-go/promise"
	"github.com/vlmoon99/near-sdk-go/types"
)

//go:export ExampleQueryingGreetingInfo
func ExampleQueryingGreetingInfo() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		helloAccount := "hello-nearverse.testnet"
		gas := uint64(10 * types.ONE_TERA_GAS)

		promiseBuilder.NewCrossContract(helloAccount).
			Gas(gas).
			Call("get_greeting", map[string]string{}).
			Value()
		return nil
	})
}

//go:export ExampleQueryingInformation
func ExampleQueryingInformation() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		helloAccount := "hello-nearverse.testnet"
		gas := uint64(10 * types.ONE_TERA_GAS)

		promiseBuilder.NewCrossContract(helloAccount).
			Gas(gas).
			Call("get_greeting", map[string]string{}).
			Then("ExampleQueryingInformationResponse", map[string]string{})
		return nil
	})
}

//go:export ExampleQueryingInformationResponse
func ExampleQueryingInformationResponse() {
	contractBuilder.HandlePromiseResult(func(result *promiseBuilder.PromiseResult) error {
		if result.Success {
			env.LogString("State change completed successfully")
		} else {
			env.LogString("State change failed")
		}

		env.LogString("Promise result status: " + types.IntToString(int(result.StatusCode)))
		if len(result.Data) > 0 {
			env.LogString("Returned data: " + string(result.Data))
		} else {
			env.LogString("No return data from state change")
		}
		return nil
	})
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
from near_sdk_py import call, Contract, callback, PromiseResult, CrossContract

class CrossContractExample(Contract):
    # Contract we want to interact with
    hello_contract = "hello-near.testnet"
        
    @call
    def change_greeting(self, new_greeting):
        """Changes the greeting on the Hello NEAR contract"""
        # Create a reference to the Hello NEAR contract
        hello = CrossContract(self.hello_contract)
        
        # Create a promise to call set_greeting with the new greeting
        # Pass context data to the callback directly as kwargs
        promise = hello.call(
            "set_greeting", 
            message=new_greeting
        ).then(
            "change_greeting_callback",
            original_greeting=new_greeting  # Additional context passed to callback
        )
        
        return promise.value()
    
    @callback
    def change_greeting_callback(self, result: PromiseResult, original_greeting):
        """Processes the result of set_greeting"""
        # The original_greeting parameter is passed from the change_greeting method
        if not result.success:
            return {
                "success": False, 
                "message": f"Failed to set greeting to '{original_greeting}'"
            }
            
        return {
            "success": True,
            "message": f"Successfully set greeting to '{original_greeting}'",
            "result": result.data
        }
```
</Language>

<Language value="go" language="go">
```go
package main

import (
	contractBuilder "github.com/vlmoon99/near-sdk-go/contract"
	"github.com/vlmoon99/near-sdk-go/env"
	promiseBuilder "github.com/vlmoon99/near-sdk-go/promise"
	"github.com/vlmoon99/near-sdk-go/types"
)

//go:export ExampleSendingInformation
func ExampleSendingInformation() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		helloAccount := "hello-nearverse.testnet"
		gas := uint64(30 * types.ONE_TERA_GAS)

		args := map[string]string{
			"message": "New Greeting",
		}

		promiseBuilder.NewCrossContract(helloAccount).
			Gas(gas).
			Call("set_greeting", args).
			Then("ExampleChangeGreetingCallback", map[string]string{})
		return nil
	})
}

//go:export ExampleChangeGreetingCallback
func ExampleChangeGreetingCallback() {
	contractBuilder.HandlePromiseResult(func(result *promiseBuilder.PromiseResult) error {
		if result.Success {
			env.LogString("State change completed successfully")
		} else {
			env.LogString("State change failed")
		}

		env.LogString("Promise result status: " + types.IntToString(int(result.StatusCode)))
		if len(result.Data) > 0 {
			env.LogString("Returned data: " + string(result.Data))
		} else {
			env.LogString("No return data from state change")
		}
		return nil
	})
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
    from near_sdk_py import Contract, Context, ONE_TGAS
    
    # High-level Contract API (recommended)
    CrossContract("external_address").call(
        "function_name",  # Method to call
        arg1="value1",    # Keyword arguments for the method
        arg2="value2"
    ).then(
        "callback_name",  # Method name in this contract to use as callback
        context_data="saved_for_callback"  # Additional context data for the callback
    ).value()
    
    # Lower-level Promise API
    from near_sdk_py import Promise
    
    Promise.create_batch("external_address").function_call(
        "function_name", 
        {"arg1": "value1", "arg2": "value2"},  # Arguments as a dictionary
        amount=0,   # Deposit in yoctoNEAR
        gas=5 * ONE_TGAS  # Gas allowance
    ).then(
        Context.current_account_id()  # The contract to call for the callback
    ).function_call(
        "callback_name",  # Method name for callback
        {"context_data": "saved_for_callback"}  # Arguments for the callback
    ).value()
    ```

  </TabItem>
<TabItem value="go" label="🐹 GO">

```go
package main

import (
	contractBuilder "github.com/vlmoon99/near-sdk-go/contract"
	"github.com/vlmoon99/near-sdk-go/env"
	promiseBuilder "github.com/vlmoon99/near-sdk-go/promise"
	"github.com/vlmoon99/near-sdk-go/types"
)

//go:export ExampleCrossContractCall
func ExampleCrossContractCall() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		externalAccount := "hello-nearverse.testnet"
		gas := uint64(5 * types.ONE_TERA_GAS)

		args := map[string]string{
			"message": "New Greeting",
		}

		promiseBuilder.NewCrossContract(externalAccount).
			Gas(gas).
			Call("set_greeting", args).
			Then("ExampleCrossContractCallback", map[string]string{
				"context_data": "saved_for_callback",
			}).
			Value()
		return nil
	})
}

//go:export ExampleCrossContractCallback
func ExampleCrossContractCallback() {
	contractBuilder.HandlePromiseResult(func(result *promiseBuilder.PromiseResult) error {
		env.LogString("Executing callback")

		if result.Success {
			env.LogString("Cross-contract call executed successfully")
		} else {
			env.LogString("Cross-contract call failed")
		}
		return nil
	})
}

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
from near_sdk_py import callback, PromiseResult, Contract

class CrossContractExample(Contract):
    @callback
    def query_greeting_callback(self, result: PromiseResult, additional_context=None):
        """
        Process the result of a cross-contract call.
        The @callback decorator automatically:
        1. Reads the promise result data
        2. Handles serialization/deserialization 
        3. Provides proper error handling
        
        Parameters:
        - result: The PromiseResult object with status and data
        - additional_context: Optional context passed from the calling function
        """
        if not result.success:
            # This means the external call failed or returned nothing
            return {
                "success": False, 
                "message": "Failed to get greeting",
                "context": additional_context
            }
            
        # Process successful result
        return {
            "success": True,
            "greeting": result.data,
            "message": f"Successfully got greeting: {result.data}",
            "context": additional_context
        }
```
</Language>

<Language value="go" language="go">
```go
//go:export ExampleCrossContractCallback
func ExampleCrossContractCallback() {
	contractBuilder.HandlePromiseResult(func(result *promiseBuilder.PromiseResult) error {
		env.LogString("Executing callback")

		if result.Success {
			env.LogString("Cross-contract call executed successfully")
		} else {
			env.LogString("Cross-contract call failed")
		}
		return nil
	})
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

✅ Promises can be concatenate using the `.join` operator: `P1.join([P2, P3], "callback")`: `P1`, `P2`, and `P3` execute in parallel, after they finish, the callback will execute and have access to all their results

⛔ You cannot **return** a joint promise without a callback: `return P1.join([P2])` is invalid since it misses the callback parameter

✅ You can concatenate `then` promises: `P1.then("callback1").then("callback2")`: `P1` executes, then callback1 executes with the result of `P1`, then callback2 executes with the result of callback1

⛔ You cannot use a `join` within a `then`: `P1.then(P2.join([P3]))` is invalid

⛔ You cannot use a `then` within a `then`: `P1.then(P2.then("callback"))` is invalid

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
from near_sdk_py import call, Context, Contract, callback, PromiseResult, ONE_TGAS, CrossContract, init

class BatchCallsExample(Contract):
    # Contract we want to interact with
    hello_contract = "hello-near.testnet"
    
    @init
    def new(self):
        """Initialize the contract"""
        pass
        
    @call
    def call_multiple_methods(self, greeting1, greeting2):
        """Call multiple methods on the same contract in a batch"""
        # Create a contract instance
        hello = CrossContract(self.hello_contract)
        
        # Create a batch for the hello contract
        batch = hello.batch()
        
        # Add function calls to the batch
        batch.function_call("set_greeting", {"message": greeting1})
        batch.function_call("another_method", {"arg1": greeting2})
        
        # Add a callback to process the result
        promise = batch.then(Context.current_account_id()).function_call(
            "batch_callback", 
            {"original_data": [greeting1, greeting2]},
            gas=10 * ONE_TGAS
        )
        
        return promise.value()
        
    @callback
    def batch_callback(self, result: PromiseResult, original_data=None):
        """Process batch result - only gets the result of the last operation"""
        return {
            "success": result.success,
            "result": result.data,
            "original_data": original_data
        }
```

  </TabItem>
  <TabItem value="go" label="🐹 GO">

```go
package main

import (
	"strconv"

	contractBuilder "github.com/vlmoon99/near-sdk-go/contract"
	"github.com/vlmoon99/near-sdk-go/env"
	promiseBuilder "github.com/vlmoon99/near-sdk-go/promise"
	"github.com/vlmoon99/near-sdk-go/types"
)

//go:export ExampleBatchCallsSameContract
func ExampleBatchCallsSameContract() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		helloAccount := "hello-nearverse.testnet"
		gas := uint64(10 * types.ONE_TERA_GAS)
		amount, _ := types.U128FromString("0")
		promiseBuilder.NewCrossContract(helloAccount).
			Batch().
			Gas(gas).
			FunctionCall("set_greeting", map[string]string{
				"message": "Greeting One",
			}, amount, gas).
			FunctionCall("another_method", map[string]string{
				"arg1": "val1",
			}, amount, gas).
			Then(helloAccount).
			FunctionCall("ExampleBatchCallsCallback", map[string]string{
				"original_data": "[Greeting One, Greeting Two]",
			}, amount, gas)

		env.LogString("Batch call created successfully")
		return nil
	})
}

//go:export ExampleBatchCallsCallback
func ExampleBatchCallsCallback() {
	contractBuilder.HandlePromiseResult(func(result *promiseBuilder.PromiseResult) error {
		env.LogString("Processing batch call results")
		env.LogString("Batch call success: " + strconv.FormatBool(result.Success))
		if len(result.Data) > 0 {
			env.LogString("Batch call data: " + string(result.Data))
		}
		return nil
	})
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
from near_sdk_py import call, Contract, multi_callback, PromiseResult, CrossContract, init

class MultiContractExample(Contract):
    # Contract addresses we want to interact with
    contract_a = "contract-a.testnet"
    contract_b = "contract-b.testnet"
    
    @init
    def new(self):
        """Initialize the contract"""
        pass
        
    @call
    def call_multiple_contracts(self):
        """Calls multiple different contracts in parallel"""
        # Create promises for each contract
        contract_a = CrossContract(self.contract_a)
        promise_a = contract_a.call("method_a")
        
        contract_b = CrossContract(self.contract_b)  
        promise_b = contract_b.call("method_b")
        
        # Join the promises and add a callback
        # The first promise's join method can combine multiple promises
        combined_promise = promise_a.join(
            [promise_b],
            "multi_contract_callback",
            contract_ids=[self.contract_a, self.contract_b]  # Context data
        )
        
        return combined_promise.value()
        
    @multi_callback
    def multi_contract_callback(self, results, contract_ids=None):
        """Process results from multiple contracts"""
        # results is an array containing all promise results in order
        return {
            "contract_a": {
                "id": contract_ids[0],
                "result": results[0].data,
                "success": results[0].success
            },
            "contract_b": {
                "id": contract_ids[1],
                "result": results[1].data,
                "success": results[1].success
            },
            "success": all(result.success for result in results)
        }
```

  </TabItem>
  <TabItem value="go" label="🐹 GO">

```go
package main

import (
	"strconv"

	contractBuilder "github.com/vlmoon99/near-sdk-go/contract"
	"github.com/vlmoon99/near-sdk-go/env"
	promiseBuilder "github.com/vlmoon99/near-sdk-go/promise"
	"github.com/vlmoon99/near-sdk-go/types"
)

//go:export ExampleParallelCallsDifferentContracts
func ExampleParallelCallsDifferentContracts() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		contractA := "hello-nearverse.testnet"
		contractB := "statusmessage.neargocli.testnet"

		promiseA := promiseBuilder.NewCrossContract(contractA).
			Call("get_greeting", map[string]string{})

		promiseB := promiseBuilder.NewCrossContract(contractB).
			Call("SetStatus", map[string]string{"message": "Hello, World!"})

		// Join the promises and assign a callback
		promiseA.Join([]*promiseBuilder.Promise{promiseB}, "ExampleParallelContractsCallback", map[string]string{
			"contract_ids": contractA + "," + contractB,
		}).Value()

		env.LogString("Parallel contract calls initialized")
		return nil
	})
}

// Example 12: Handling Results from Parallel Calls
//
//go:export ExampleParallelContractsCallback
func ExampleParallelContractsCallback() {
	env.LogString("Processing results from multiple contracts")

	count := env.PromiseResultsCount()
	for i := uint64(0); i < count; i++ {
		contractBuilder.HandlePromiseResult(func(result *promiseBuilder.PromiseResult) error {
			env.LogString("Processing result " + types.IntToString(int(i)))
			env.LogString("Success: " + strconv.FormatBool(result.Success))
			if len(result.Data) > 0 {
				env.LogString("Data: " + string(result.Data))
			}
			return nil
		})
	}

	env.LogString("Processed " + types.IntToString(int(count)) + " contract responses")
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