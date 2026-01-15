---
id: crosscontract
title: Cross-Contract Calls
description: "Contract can interact with other contracts on the network"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from '@site/src/components/UI/Codetabs'
import Card from '@site/src/components/UI/Card';

NEAR contracts can interact with other deployed contracts, querying information and executing functions on them through cross-contract calls.

Since NEAR is a sharded blockchain, its cross-contract calls behave differently than in other chains. In NEAR, cross-contract calls are **asynchronous** and **independent**.

:::tip Asynchronous 
The **calling function** and the **callback** execute in **different blocks** (typically 1-2 blocks apart). During this time, the contract remains active and can receive other calls.
:::

:::tip Independent

Each function — the one making the call, the external function, and the callback — executes in its own context. If the external call fails, the calling function has already completed successfully; there's no automatic rollback. You must handle failures explicitly in the callback.

:::

---

## Snippet: Querying Information

While making your contract, it is likely that you will want to query information from another contract. Below, you can see a basic example in which we query the greeting message from our [Hello NEAR](../quickstart.md) example.

<Tabs>
  <TabItem value="rs" label="🦀 Rust">
    <Tabs>
      <TabItem value="low_level.rs" label="low_level.rs">
        <Github fname="low_level.rs" language="rust"
                url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/low_level.rs"
                start="7" end="39" />
      </TabItem>
      <TabItem value="high_level.rs" label="high_level.rs">
        <Github fname="high_level.rs" language="rust"
                url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/high_level.rs"
                start="8" end="37" />
        The high level API makes use of the interface defined in the [ext_contract.rs](https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/external_contract.rs)
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/src/contract.ts"
            start="18" end="52" />
  </TabItem>

  <TabItem value="python" label="🐍 Python">
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
  </TabItem>

  <TabItem value="go" label="🐹 GO">
```go
package main

import (
	"github.com/vlmoon99/near-sdk-go/env"
	"github.com/vlmoon99/near-sdk-go/promise"
	"github.com/vlmoon99/near-sdk-go/types"
)

// @contract:state
type Contract struct{}

// @contract:payable min_deposit=0.001NEAR
func (c *Contract) ExampleQueryingGreetingInfo() {
	helloAccount := "hello-nearverse.testnet"
	gas := uint64(10 * types.ONE_TERA_GAS)

	promise.NewCrossContract(helloAccount).
		Gas(gas).
		Call("get_greeting", map[string]string{}).
		Value()
}

// @contract:payable min_deposit=0.001NEAR
func (c *Contract) ExampleQueryingInformation() {
	helloAccount := "hello-nearverse.testnet"
	gas := uint64(10 * types.ONE_TERA_GAS)

	promise.NewCrossContract(helloAccount).
		Gas(gas).
		Call("get_greeting", map[string]string{}).
		Then("example_querying_information_response", map[string]string{})
}

// @contract:view
// @contract:promise_callback
func (c *Contract) ExampleQueryingInformationResponse(result promise.PromiseResult) {

	if result.Success {
		env.LogString("State change/Query completed successfully")
	} else {
		env.LogString("State change/Query failed")
	}

	env.LogString("Promise result status: " + types.IntToString(result.StatusCode))
	if len(result.Data) > 0 {
		env.LogString("Returned data: " + string(result.Data))
	} else {
		env.LogString("No return data")
	}
}
```
  </TabItem>
</Tabs>

---

## Snippet: Sending Information
Calling another contract passing information is also a common scenario. Below you can see a function that interacts with the [Hello NEAR](../quickstart.md) example to change its greeting message.

<Tabs>
  <TabItem value="rs" label="🦀 Rust">
    <Tabs>
      <TabItem value="low_level.rs" label="low_level.rs">
        <Github fname="low_level.rs" language="rust"
                url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/low_level.rs"
                start="41" end="72" />
      </TabItem>
      <TabItem value="high_level.rs" label="high_level.rs">
        <Github fname="high_level.rs" language="rust"
                url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/high_level.rs"
                start="39" end="66" />

        The high level API makes use of the interface defined in the [ext_contract.rs](https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/external_contract.rs)
      </TabItem>
    </Tabs>
  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/src/contract.ts"
            start="54" end="87" />
  </TabItem>

  <TabItem value="python" label="🐍 Python">
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
  </TabItem>

  <TabItem value="go" label="🐹 GO">
```go
package main

import (
	"github.com/vlmoon99/near-sdk-go/env"
	"github.com/vlmoon99/near-sdk-go/promise"
	"github.com/vlmoon99/near-sdk-go/types"
)

// @contract:state
type Contract struct{}

// @contract:payable min_deposit=0.00001NEAR
func (c *Contract) ExampleSendingInformation() {
	helloAccount := "hello-nearverse.testnet"
	gas := uint64(30 * types.ONE_TERA_GAS)

	args := map[string]string{
		"message": "New Greeting",
	}

	promise.NewCrossContract(helloAccount).
		Gas(gas).
		Call("set_greeting", args).
		Then("example_change_greeting_callback", map[string]string{})
}

// @contract:view
// @contract:promise_callback
func (c *Contract) ExampleChangeGreetingCallback(result promise.PromiseResult) {
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
}
```
  </TabItem>
</Tabs>

---

## Promises
Cross-contract calls work by creating two promises in the network:
1. A promise to execute code in the external contract - `Promise.create`
2. **Optional**: A promise to call another function with the result - `Promise.then`

Both promises will contain the following information:

- The **address** of the contract you want to interact with
- The **function** that you want to execute
- The arguments to pass to the function
- The amount of **GAS** to use (deducted from the **attached Gas**)
- The NEAR **deposit** to attach (deducted from **your contract's balance**)

:::tip

The callback can be made to **any** contract. Meaning that the result could potentially be handled by another contract

:::

---

## Creating a Cross Contract Call

To create a cross-contract call with a callback, create two promises and use the `.then` method to link them:

<Tabs>
  <TabItem value="rs" label="🦀 Rust">
    <Tabs>
        <TabItem value="high_level" label="High Level API">

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

        </TabItem>
        <TabItem value="low_level" label="Low Level API">

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
        </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

    ```ts
    NearPromise.new("external_address").functionCall("function_name", JSON.stringify(arguments), DEPOSIT, GAS)
    .then(
      // this function is the callback
      NearPromise.new(near.currentAccountId()).functionCall("callback_name", JSON.stringify(arguments), DEPOSIT, GAS)
    );
      ```
  
  </TabItem>
  <TabItem value="go" label="🐹 GO">
  
  ```go
  package main
  
  import (
      "github.com/vlmoon99/near-sdk-go/env"
      "github.com/vlmoon99/near-sdk-go/promise"
      "github.com/vlmoon99/near-sdk-go/types"
  )
  
  // @contract:state
  type Contract struct{}
  
  type PromiseCallbackInputData struct {
      Data string `json:"data"`
  }
  
  // @contract:payable min_deposit=0.00001NEAR
  func (c *Contract) ExampleCrossContractCall() {
      externalAccount := "hello-nearverse.testnet"
      gas := uint64(5 * types.ONE_TERA_GAS)
  
      args := map[string]string{
          "message": "New Greeting",
      }
      callback_args := map[string]string{
          "data": "saved_for_callback",
      }
      promise.NewCrossContract(externalAccount).
          Gas(gas).
          Call("set_greeting", args).
          Then("example_cross_contract_callback", callback_args).
          Value()
  }
  
  // @contract:view
  // @contract:promise_callback
  func (c *Contract) ExampleCrossContractCallback(input PromiseCallbackInputData, result promise.PromiseResult) {
      env.LogString("Executing callback")
  
      env.LogString("Input CrossContractCallback : " + input.Data)
  
      if result.Success {
          env.LogString("Cross-contract call executed successfully")
      } else {
          env.LogString("Cross-contract call failed")
      }
  }
  ```
  </TabItem>

</Tabs>
  
<details>

<summary> Concatenating Promises </summary>

✅ You can concatenate promises: `P1.then(P2).then(P3)`: `P1` executes, then `P2` executes with the result of `P1`, then `P3` executes with the result of `P2`

✅ You can join promises: `(P1.and(P2)).then(P3)`: `P1` and `P2` execute in parallel, after they finish `P3` will execute and have access to **both their results**

⛔ You cannot **return** a joint promise without a callback: `return P1.and(P2)` is invalid, you need to add a `.then()`

⛔ You cannot join promises within a `then`: `P1.then(P2.join([P3]))` is invalid

⛔ You cannot use a `then` within a `then`: `P1.then(P2.then(P3))` is invalid


</details>

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

<Tabs>
  <TabItem value="rs" label="🦀 Rust">
    <Github fname="high_level.rs" language="rust"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-rs/src/high_level.rs"
            start="23" end="37" />
  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-simple-ts/src/contract.ts"
            start="42" end="53" />
  </TabItem>

  <TabItem value="python" label="🐍 Python">
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
  </TabItem>

  <TabItem value="go" label="🐹 GO">
```go
type PromiseCallbackInputData struct {
	Data string `json:"data"`
}

// @contract:view
// @contract:promise_callback
func (c *Contract) ExampleCrossContractCallback(input PromiseCallbackInputData, result promise.PromiseResult) {
	env.LogString("Executing callback")

	env.LogString("Input CrossContractCallback : " + input.Data)

	if result.Success {
		env.LogString("Cross-contract call executed successfully")
	} else {
		env.LogString("Cross-contract call failed")
	}
}
```
  </TabItem>
</Tabs>

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

## Calling Multiple Functions on the Same Contract

You can call multiple functions in the same external contract, which is known as a **batch call**.

An important property of batch calls is that they **act as a unit**: they execute in the same [receipt](/protocol/transaction-execution#receipts--finality), and if **any function fails**, then they **all get reverted**.

<Tabs>
  <TabItem value="rs" label="🦀 Rust">

  <Github fname="lib.ts" language="rust"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/batch_actions.rs"
        start="8" end="20" />

  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">

  <Github fname="batch_actions" language="js"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/batch_actions.ts"
        start="5" end="17" />

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

	"github.com/vlmoon99/near-sdk-go/env"
	"github.com/vlmoon99/near-sdk-go/promise"
	"github.com/vlmoon99/near-sdk-go/types"
)

// @contract:state
type Contract struct{}

type PromiseCallbackInputData struct {
	Data string `json:"data"`
}

// @contract:payable min_deposit=0.00001NEAR
func (c *Contract) ExampleBatchCallsSameContract() {
	helloAccount := "hello-nearverse.testnet"
	gas := uint64(10 * types.ONE_TERA_GAS)
	amount, _ := types.U128FromString("0")
	callback_args := map[string]string{
		"data": "[Greeting One, Greeting Two]",
	}

	promise.NewCrossContract(helloAccount).
		Batch().
		Gas(gas).
		FunctionCall("set_greeting", map[string]string{
			"message": "Greeting One",
		}, amount, gas).
		FunctionCall("another_method", map[string]string{
			"arg1": "val1",
		}, amount, gas).
		Then(helloAccount).
		FunctionCall("example_batch_calls_callback", callback_args, amount, gas)

	env.LogString("Batch call created successfully")
}

// @contract:view
// @contract:promise_callback
func (c *Contract) ExampleBatchCallsCallback(input PromiseCallbackInputData, result promise.PromiseResult) {
	env.LogString("Processing batch call results")
	env.LogString("Input CrossContractCallback : " + input.Data)

	env.LogString("Batch call success: " + strconv.FormatBool(result.Success))
	if len(result.Data) > 0 {
		env.LogString("Batch call data: " + string(result.Data))
	}
}
```
</TabItem>

</Tabs>

:::tip

Callbacks only have access to the result of the **last function** in a batch call

:::

---

## Calling Multiple Functions on Different Contracts

You can also call multiple functions in **different contracts**. These functions will be executed in parallel, and do not impact each other. This means that, if one fails, the others **will execute, and NOT be reverted**.

<Tabs>
  <TabItem value="rs" label="🦀 Rust">
      <Github fname="lib.rs" language="rust"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/multiple_contracts.rs"
        start="17" end="55" />
  </TabItem>
  <TabItem value="js" label="🌐 JavaScript">
      <Github fname="lib.ts" language="js"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/multiple_contracts.ts"
        start="6" end="21" />
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

	"github.com/vlmoon99/near-sdk-go/env"
	"github.com/vlmoon99/near-sdk-go/promise"
	"github.com/vlmoon99/near-sdk-go/types"
)

// @contract:state
type Contract struct{}

type PromiseCallbackInputData struct {
	Data string `json:"data"`
}

// @contract:payable min_deposit=0.00001NEAR
func (c *Contract) ExampleParallelCallsDifferentContracts() {
	contractA := "hello-nearverse.testnet"
	contractB := "child.neargopromises1.testnet"

	promiseA := promise.NewCrossContract(contractA).
		Call("get_greeting", map[string]string{})

	promiseB := promise.NewCrossContract(contractB).
		Call("SetStatus", map[string]string{"message": "Hello, World!"})

	promiseA.Join([]*promise.Promise{promiseB}, "example_parallel_contracts_callback", map[string]string{
		"data": contractA + "," + contractB,
	}).Value()

	env.LogString("Parallel contract calls initialized")
}

// @contract:view
// @contract:promise_callback
func (c *Contract) ExampleParallelContractsCallback(input PromiseCallbackInputData, results []promise.PromiseResult) {
	env.LogString("Processing results from multiple contracts")
	env.LogString("Input CrossContractCallback : " + input.Data)

	for i, result := range results {
		env.LogString("Processing result " + types.IntToString(i))
		env.LogString("Success: " + strconv.FormatBool(result.Success))
		if len(result.Data) > 0 {
			env.LogString("Data: " + string(result.Data))
		}
	}

	env.LogString("Processed " + types.IntToString(len(results)) + " contract responses")
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