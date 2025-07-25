---
id: actions
title: Transfers & Actions
description: "This page describes the different types of actions that a smart contract can perform on NEAR like transferring NEAR, calling other contracts, creating sub-accounts, and deploying contracts. It also explains how to add access keys to accounts."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes the different types of actions that a smart contract can perform on NEAR like transferring NEAR, calling other contracts, creating sub-accounts, and deploying contracts. It also explains how to add access keys to accounts.


Smart contracts can perform specific `Actions` such as transferring NEAR, or calling other contracts.

An important property of `Actions` is that they can be batched together when acting on the same contract. **Batched actions** act as a unit: they execute in the same [receipt](/protocol/transaction-execution#receipts--finality), and if **any fails**, then they **all get reverted**.

:::info
`Actions` can be batched only when they act on the **same contract**. You can batch calling two methods on a contract,
but **cannot** call two methods on different contracts.
:::

---

## Transfer NEAR Ⓝ

You can send $NEAR from your contract to any other account on the network. The Gas cost for transferring $NEAR is fixed and is based on the protocol's genesis config. Currently, it costs `~0.45 TGas`.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

```js
  import { NearBindgen, NearPromise, call } from 'near-sdk-js'
  import { AccountId } from 'near-sdk-js/lib/types'

  @NearBindgen({})
  class Contract{
    @call({})
    transfer({ to, amount }: { to: AccountId, amount: bigint }) {
      return NearPromise.new(to).transfer(amount);
    }
  }
```

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```rust
  use near_sdk::{near, AccountId, Promise, NearToken};

  #[near(contract_state)]
  #[derive(Default)]
  pub struct Contract { }

  #[near]
  impl Contract {
    pub fn transfer(&self, to: AccountId, amount: NearToken){
      Promise::new(to).transfer(amount);
    }
  }
```

</TabItem>

<TabItem value="python" label="🐍 Python">

```python
from near_sdk_py import call, Contract
from near_sdk_py.promises import Promise

class ExampleContract(Contract):
    @call
    def transfer(self, to, amount):
        """Transfers NEAR to another account"""
        # Create a promise to transfer NEAR
        return Promise.create_batch(to).transfer(amount)
```

</TabItem>

<TabItem value="go" label="🐹 GO">

```go
package main

import (
	contractBuilder "github.com/vlmoon99/near-sdk-go/contract"
	promiseBuilder "github.com/vlmoon99/near-sdk-go/promise"
	"github.com/vlmoon99/near-sdk-go/types"
)

//go:export ExampleTransferToken
func ExampleTransferToken() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		to, err := input.JSON.GetString("to")
		if err != nil {
			return err
		}
		rawAmount, err := input.JSON.GetString("amount")
		if err != nil {
			return err
		}

		amount, _ := types.U128FromString(rawAmount)

		promiseBuilder.CreateBatch(to).
			Transfer(amount)
		return nil
	})
}

```

</TabItem>

</Tabs>

:::tip Why is there no callback?
The only case where a transfer will fail is if the receiver account does **not** exist.
:::

:::caution
Remember that your balance is used to cover for the contract's storage. When sending money, make sure you always leave enough to cover for future storage needs.
:::

---

## Function Call

Your smart contract can call methods in another contract. In the snippet below we call a method
in a deployed [Hello NEAR](../quickstart.md) contract, and check if everything went
right in the callback.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

```js
  import { NearBindgen, near, call, bytes, NearPromise } from 'near-sdk-js'
  import { AccountId } from 'near-sdk-js/lib/types'

  const HELLO_NEAR: AccountId = "hello-nearverse.testnet";
  const NO_DEPOSIT: bigint = BigInt(0);
  const CALL_GAS: bigint = BigInt("10000000000000");

  @NearBindgen({})
  class Contract {
    @call({})
    call_method({}): NearPromise {
      const args = bytes(JSON.stringify({ message: "howdy" }))

      return NearPromise.new(HELLO_NEAR)
      .functionCall("set_greeting", args, NO_DEPOSIT, CALL_GAS)
      .then(
        NearPromise.new(near.currentAccountId())
        .functionCall("callback", bytes(JSON.stringify({})), NO_DEPOSIT, CALL_GAS)
      )
      .asReturn()
    }

    @call({privateFunction: true})
    callback({}): boolean {
      let result, success;

      try{ result = near.promiseResult(0); success = true }
      catch{ result = undefined; success = false }

      if (success) {
        near.log(`Success!`)
        return true
      } else {
        near.log("Promise failed...")
        return false
      }
    }
  }
```

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```rust
  use near_sdk::{near, env, log, Promise, Gas, PromiseError};
  use serde_json::json;

  #[near(contract_state)]
  #[derive(Default)]
  pub struct Contract { }

  const HELLO_NEAR: &str = "hello-nearverse.testnet";
  const NO_DEPOSIT: u128 = 0;
  const CALL_GAS: Gas = Gas(5_000_000_000_000);

  #[near]
  impl Contract {
    pub fn call_method(&self){
      let args = json!({ "message": "howdy".to_string() })
                .to_string().into_bytes().to_vec();

      Promise::new(HELLO_NEAR.parse().unwrap())
      .function_call("set_greeting".to_string(), args, NO_DEPOSIT, CALL_GAS)
      .then(
        Promise::new(env::current_account_id())
        .function_call("callback".to_string(), Vec::new(), NO_DEPOSIT, CALL_GAS)
      );
    }

    pub fn callback(&self, #[callback_result] result: Result<(), PromiseError>){
      if result.is_err(){
          log!("Something went wrong")
      }else{
          log!("Message changed")
      }
    }
  }
```

</TabItem>

<TabItem value="python" label="🐍 Python">

```python
from near_sdk_py import call, callback, Contract
from near_sdk_py.promises import CrossContract, Promise, PromiseResult
from near_sdk_py.constants import ONE_TGAS

# Constants
HELLO_NEAR = "hello-nearverse.testnet"
NO_DEPOSIT = 0
CALL_GAS = 10 * ONE_TGAS

class ExampleContract(Contract):
    @call
    def call_method(self):
        """Call a method on an external contract with a callback"""
        # Create a contract reference
        hello = CrossContract(HELLO_NEAR)
        
        # Call the external contract and use our callback to process the result
        return hello.call("set_greeting", {"message": "howdy"}).then("callback")
    
    @callback
    def callback(self, result: PromiseResult):
        """Handle the result of the external contract call"""
        # The @callback decorator automatically handles success/failure checking
        if not result.success:
            # The remote call failed
            self.log_error("Promise failed...")
            return False
        
        # The remote call succeeded
        self.log_info("Success!")
        return True
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

//go:export ExampleFunctionCall
func ExampleFunctionCall() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		gas := uint64(types.ONE_TERA_GAS * 10)
		accountId := "hello-nearverse.testnet"

		promiseBuilder.NewCrossContract(accountId).
			Gas(gas).
			Call("set_greeting", map[string]string{
				"message": "howdy",
			}).
			Then("ExampleFunctionCallCallback", map[string]string{})
		return nil
	})
}

//go:export ExampleFunctionCallCallback
func ExampleFunctionCallCallback() {
	contractBuilder.HandlePromiseResult(func(result *promiseBuilder.PromiseResult) error {
		if result.Success {
			env.LogString("Callback success")
			if len(result.Data) > 0 {
				env.LogString("Result: " + string(result.Data))
			}
		} else {
			env.LogString("Callback failed")
			if len(result.Data) > 0 {
				env.LogString("Error: " + string(result.Data))
			}
		}
		return nil
	})
}

```
</TabItem>

</Tabs>

:::warning
The snippet showed above is a low level way of calling other methods. We recommend make calls to other contracts as explained in the [Cross-contract Calls section](crosscontract.md).
:::

---

## Create a Sub Account
Your contract can create direct sub accounts of itself, for example, `user.near` can create `sub.user.near`.

Accounts do **NOT** have control over their sub-accounts, since they have their own keys.

Sub-accounts are simply useful for organizing your accounts (e.g. `dao.project.near`, `token.project.near`).


<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

```js
  import { NearBindgen, near, call, NearPromise } from 'near-sdk-js'

  const MIN_STORAGE: bigint = BigInt("1000000000000000000000") // 0.001Ⓝ

  @NearBindgen({})
  class Contract {
    @call({payableFunction:true})
    create({prefix}:{prefix: String}) {
      const account_id = `${prefix}.${near.currentAccountId()}`

      NearPromise.new(account_id)
      .createAccount()
      .transfer(MIN_STORAGE)
    }
  }
```

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```rust
  use near_sdk::{near, env, Promise, NearToken};

  #[near(contract_state)]
  #[derive(Default)]
  pub struct Contract { }

  const MIN_STORAGE: Balance = 1_000_000_000_000_000_000_000; //0.001Ⓝ

  #[near]
  impl Contract {
    pub fn create(&self, prefix: String){
      let account_id = prefix + "." + &env::current_account_id().to_string();
      Promise::new(account_id.parse().unwrap())
      .create_account()
      .transfer(MIN_STORAGE);
    }
  }
```

</TabItem>

<TabItem value="python" label="🐍 Python">

```python
from near_sdk_py import call, Contract
from near_sdk_py.promises import Promise
from near_sdk_py.constants import ONE_NEAR

# Minimum amount needed for storage
MIN_STORAGE = ONE_NEAR // 1000  # 0.001Ⓝ

class ExampleContract(Contract):
    @call
    def create(self, prefix):
        """Create a subaccount"""
        # Generate the new account ID
        account_id = f"{prefix}.{self.current_account_id}"
        
        # Create the new account and transfer some NEAR for storage
        return Promise.create_batch(account_id)\
            .create_account()\
            .transfer(MIN_STORAGE)
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

//go:export ExampleCreateSubaccount
func ExampleCreateSubaccount() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		prefix, err := input.JSON.GetString("prefix")
		if err != nil {
			return err
		}

		currentAccountId, _ := env.GetCurrentAccountId()
		subaccountId := prefix + "." + currentAccountId
		amount, _ := types.U128FromString("1000000000000000000000") //0.001Ⓝ

		promiseBuilder.CreateBatch(subaccountId).
			CreateAccount().
			Transfer(amount)
		return nil
	})
}

```
</TabItem>

</Tabs>

:::tip
  Notice that in the snippet we are transferring some money to the new account for storage
:::

:::caution

When you create an account from within a contract, it has no keys by default. If you don't explicitly [add keys](#add-keys) to it or [deploy a contract](#deploy-a-contract) on creation then it will be [locked](../../protocol/access-keys.md#locked-accounts).

:::

<hr className="subsection" />

#### Creating `.testnet` / `.near` Accounts

Accounts can only create immediate sub-accounts of themselves.

If your contract wants to create a `.mainnet` or `.testnet` account, then it needs to [call](#function-call)
the `create_account` method of `near` or `testnet` root contracts.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

```js
  import { NearBindgen, near, call, bytes, NearPromise } from 'near-sdk-js'

  const MIN_STORAGE: bigint = BigInt("1820000000000000000000"); //0.00182Ⓝ
  const CALL_GAS: bigint = BigInt("28000000000000");

  @NearBindgen({})
  class Contract {
    @call({})
    create_account({account_id, public_key}:{account_id: String, public_key: String}) {
      const args = bytes(JSON.stringify({
        "new_account_id": account_id,
        "new_public_key": public_key
      }))

      NearPromise.new("testnet")
      .functionCall("create_account", args, MIN_STORAGE, CALL_GAS);
    }
  }
```

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```rust
  use near_sdk::{near, Promise, Gas, NearToken };
  use serde_json::json;

  #[near(contract_state)]
  #[derive(Default)]
  pub struct Contract { }

  const CALL_GAS: Gas = Gas(28_000_000_000_000);
  const MIN_STORAGE: Balance = 1_820_000_000_000_000_000_000; //0.00182Ⓝ

  #[near]
  impl Contract {
    pub fn create_account(&self, account_id: String, public_key: String){
      let args = json!({
                  "new_account_id": account_id,
                  "new_public_key": public_key,
                }).to_string().into_bytes().to_vec();

      // Use "near" to create mainnet accounts
      Promise::new("testnet".parse().unwrap())
      .function_call("create_account".to_string(), args, MIN_STORAGE, CALL_GAS);
    }
  }
```

</TabItem>

<TabItem value="python" label="🐍 Python">

```python
from near_sdk_py import call, Contract
from near_sdk_py.promises import Promise
from near_sdk_py.constants import ONE_NEAR, ONE_TGAS

# Constants
MIN_STORAGE = int(1.82 * ONE_NEAR / 1000)  # 0.00182Ⓝ
CALL_GAS = 28 * ONE_TGAS

class ExampleContract(Contract):
    @call
    def create_account(self, account_id, public_key):
        """Create a testnet account by calling the testnet contract"""
        # Create the arguments for the create_account method
        args = {
            "new_account_id": account_id,
            "new_public_key": public_key
        }
        
        # Call the testnet contract to create the account
        return Promise.create_batch("testnet")\
            .function_call(
                "create_account",
                args,
                MIN_STORAGE,
                CALL_GAS
            )
```

</TabItem>
<TabItem value="go" label="🐹 GO">

```go
package main

import (
	contractBuilder "github.com/vlmoon99/near-sdk-go/contract"
	promiseBuilder "github.com/vlmoon99/near-sdk-go/promise"
	"github.com/vlmoon99/near-sdk-go/types"
)

//go:export ExampleCreateAccount
func ExampleCreateAccount() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		accountId, err := input.JSON.GetString("account_id")
		if err != nil {
			return err
		}

		publicKey, err := input.JSON.GetString("public_key")
		if err != nil {
			return err
		}

		amount, _ := types.U128FromString("2000000000000000000000") //0.002Ⓝ
		gas := uint64(200 * types.ONE_TERA_GAS)

		//publicKey (base58) - EG7JhmQybCXrbXiitxsCNStPoLwakvFjgHGCNf1Wwfnt (generate your own for testing)
		//accountId - nearsdkdocs.testnet (write your own for testing)

		createArgs := map[string]string{
			"new_account_id": accountId,
			"new_public_key": publicKey,
		}

		promiseBuilder.CreateBatch("testnet").
			FunctionCall("create_account", createArgs, amount, gas)
		return nil
	})
}

```

</TabItem>
</Tabs>

---

## Deploy a Contract

When creating an account you can also batch the action of deploying a contract to it. Note that for this, you will need to pre-load the byte-code you want to deploy in your contract.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

```rust
  use near_sdk::{near, env, Promise, NearToken};

  #[near(contract_state)]
  #[derive(Default)]
  pub struct Contract { }

  const MIN_STORAGE: Balance = 1_100_000_000_000_000_000_000_000; //1.1Ⓝ
  const HELLO_CODE: &[u8] = include_bytes!("./hello.wasm");

  #[near]
  impl Contract {
    pub fn create_hello(&self, prefix: String){
      let account_id = prefix + "." + &env::current_account_id().to_string();
      Promise::new(account_id.parse().unwrap())
      .create_account()
      .transfer(MIN_STORAGE)
      .deploy_contract(HELLO_CODE.to_vec());
    }
  }
```

</TabItem>

<TabItem value="python" label="🐍 Python">

```python
from near_sdk_py import call, Context, Contract
from near_sdk_py.promises import Promise 
from near_sdk_py.constants import ONE_NEAR

class ExampleContract(Contract):
    @call
    def deploy_contract(self, prefix):
        """Create an account and deploy a contract to it"""
        # This would require loading the contract bytes in Python
        # Load contract bytes - for example purposes only
        # In a real implementation, you'd need to read this from storage or include it
        contract_bytes = b'...'  # This should be actual WASM bytes
        
        MIN_STORAGE = 1.1 * ONE_NEAR  # 1.1Ⓝ
        
        # Generate the new account ID
        account_id = f"{prefix}.{self.current_account_id}"
        
        # Create batch of actions
        return Promise.create_batch(account_id)\
            .create_account()\
            .transfer(MIN_STORAGE)\
            .deploy_contract(contract_bytes)
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

//go:embed status_message_go.wasm
var contractWasm []byte

//go:export ExampleDeployContract
func ExampleDeployContract() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		prefix, err := input.JSON.GetString("prefix")
		if err != nil {
			return err
		}

		currentAccountId, _ := env.GetCurrentAccountId()
		subaccountId := prefix + "." + currentAccountId
		amount, _ := types.U128FromString("1100000000000000000000000") //1.1Ⓝ

		promiseBuilder.CreateBatch(subaccountId).
			CreateAccount().
			Transfer(amount).
			DeployContract(contractWasm)
		return nil
	})
}
```

</TabItem>
</Tabs>

:::tip
If an account with a contract deployed does **not** have any access keys, this is known as a locked contract. When the account is locked, it cannot sign transactions therefore, actions can **only** be performed from **within** the contract code.
:::

---

## Add Keys

When you use actions to create a new account, the created account does not have any [access keys](../../protocol/access-keys.md), meaning that it **cannot sign transactions** (e.g. to update its contract, delete itself, transfer money).

There are two options for adding keys to the account:
1. `add_access_key`: adds a key that can only call specific methods on a specified contract.
2. `add_full_access_key`: adds a key that has full access to the account.

<br/>

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

```js
  import { NearBindgen, near, call, NearPromise } from 'near-sdk-js'
  import { PublicKey } from 'near-sdk-js/lib/types'

  const MIN_STORAGE: bigint = BigInt("1000000000000000000000") // 0.001Ⓝ

  @NearBindgen({})
  class Contract {
    @call({})
    create_hello({prefix, public_key}:{prefix: String, public_key: PublicKey}) {
      const account_id = `${prefix}.${near.currentAccountId()}`

      NearPromise.new(account_id)
      .createAccount()
      .transfer(MIN_STORAGE)
      .addFullAccessKey(public_key)
    }
  }
```

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```rust
  use near_sdk::{near, env, Promise, Balance, PublicKey};

  #[near(serializers = [json, borsh])]
  #[derive(Default)]
  pub struct Contract { }

  const MIN_STORAGE: Balance = 1_100_000_000_000_000_000_000_000; //1.1Ⓝ
  const HELLO_CODE: &[u8] = include_bytes!("./hello.wasm");

  #[near]
  impl Contract {
    pub fn create_hello(&self, prefix: String, public_key: PublicKey){
      let account_id = prefix + "." + &env::current_account_id().to_string();
      Promise::new(account_id.parse().unwrap())
      .create_account()
      .transfer(MIN_STORAGE)
      .deploy_contract(HELLO_CODE.to_vec())
      .add_full_access_key(public_key);
    }
  }
```

</TabItem>

<TabItem value="python" label="🐍 Python">

```python
from near_sdk_py import call, Contract
from near_sdk_py.promises import Promise
from near_sdk_py.constants import ONE_NEAR

# Minimum amount needed for storage
MIN_STORAGE = ONE_NEAR // 1000  # 0.001Ⓝ

class ExampleContract(Contract):
    @call
    def create_with_key(self, prefix, public_key):
        """Create a subaccount with a full access key"""
        # Generate the new account ID
        account_id = f"{prefix}.{self.current_account_id}"
        
        # Create the new account, transfer some NEAR, and add a key
        return Promise.create_batch(account_id)\
            .create_account()\
            .transfer(MIN_STORAGE)\
            .add_full_access_key(public_key)
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

//go:export ExampleAddKeys
func ExampleAddKeys() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		prefix, err := input.JSON.GetString("prefix")
		if err != nil {
			return err
		}
		publicKey, err := input.JSON.GetString("public_key")
		if err != nil {
			return err
		}
		currentAccountId, _ := env.GetCurrentAccountId()
		subaccountId := prefix + "." + currentAccountId
		amount, _ := types.U128FromString("1000000000000000000000") //0.001Ⓝ

		promiseBuilder.CreateBatch(subaccountId).
			CreateAccount().
			Transfer(amount).
			AddFullAccessKey([]byte(publicKey), 0)
		return nil
	})
}

```
</TabItem>
</Tabs>

Notice that what you actually add is a "public key". Whoever holds its private counterpart, i.e. the private-key, will be able to use the newly access key.

:::tip
If an account with a contract deployed does **not** have any access keys, this is known as a locked contract. When the account is locked, it cannot sign transactions therefore, actions can **only** be performed from **within** the contract code.
:::

---

## Delete Account

There are two scenarios in which you can use the `delete_account` action:
1. As the **last** action in a chain of batched actions.
2. To make your smart contract delete its own account.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

```js
  import { NearBindgen, near, call, NearPromise } from 'near-sdk-js'
  import { AccountId } from 'near-sdk-js/lib/types'

  const MIN_STORAGE: bigint = BigInt("1000000000000000000000") // 0.001Ⓝ

  @NearBindgen({})
  class Contract {
    @call({})
    create_delete({prefix, beneficiary}:{prefix: String, beneficiary: AccountId}) {
      const account_id = `${prefix}.${near.currentAccountId()}`

      NearPromise.new(account_id)
      .createAccount()
      .transfer(MIN_STORAGE)
      .deleteAccount(beneficiary)
    }

    @call({})
    self_delete({beneficiary}:{beneficiary: AccountId}) {
      NearPromise.new(near.currentAccountId())
      .deleteAccount(beneficiary)
    }
  }
```

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```rust
  use near_sdk::{near, env, Promise, Neartoken, AccountId};

  #[near(contract_state)]
  #[derive(Default)]
  pub struct Contract { }

  const MIN_STORAGE: Balance = 1_000_000_000_000_000_000_000; //0.001Ⓝ

  #[near]
  impl Contract {
    pub fn create_delete(&self, prefix: String, beneficiary: AccountId){
      let account_id = prefix + "." + &env::current_account_id().to_string();
      Promise::new(account_id.parse().unwrap())
      .create_account()
      .transfer(MIN_STORAGE)
      .delete_account(beneficiary);
    }

    pub fn self_delete(beneficiary: AccountId){
      Promise::new(env::current_account_id())
      .delete_account(beneficiary);
    }
  }
```

</TabItem>

<TabItem value="python" label="🐍 Python">

```python
from near_sdk_py import call, Contract
from near_sdk_py.promises import Promise
from near_sdk_py.constants import ONE_NEAR

# Minimum amount needed for storage
MIN_STORAGE = ONE_NEAR // 1000  # 0.001Ⓝ

class ExampleContract(Contract):
    @call
    def create_delete(self, prefix, beneficiary):
        """Create an account and immediately delete it, sending funds to a beneficiary"""
        # Generate the new account ID
        account_id = f"{prefix}.{self.current_account_id}"
        
        # Create the account, transfer funds, then delete it
        return Promise.create_batch(account_id)\
            .create_account()\
            .transfer(MIN_STORAGE)\
            .delete_account(beneficiary)
    
    @call
    def self_delete(self, beneficiary):
        """Delete this contract's account"""
        # Delete the account and send remaining funds to beneficiary
        return Promise.create_batch(self.current_account_id)\
            .delete_account(beneficiary)
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

//go:export ExampleCreateDeleteAccount
func ExampleCreateDeleteAccount() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {
		prefix, err := input.JSON.GetString("prefix")
		if err != nil {
			return err
		}

		beneficiary, err := input.JSON.GetString("beneficiary")
		if err != nil {
			return err
		}
		currentAccountId, _ := env.GetCurrentAccountId()
		subaccountId := prefix + "." + currentAccountId
		amount, _ := types.U128FromString("1000000000000000000000") //0.001Ⓝ

		promiseBuilder.CreateBatch(subaccountId).
			CreateAccount().
			Transfer(amount).
			DeleteAccount(beneficiary)
		return nil
	})
}

//go:export ExampleSelfDeleteAccount
func ExampleSelfDeleteAccount() {
	contractBuilder.HandleClientJSONInput(func(input *contractBuilder.ContractInput) error {

		beneficiary, err := input.JSON.GetString("beneficiary")
		if err != nil {
			return err
		}
		currentAccountId, _ := env.GetCurrentAccountId()

		promiseBuilder.CreateBatch(currentAccountId).
			DeleteAccount(beneficiary)
		return nil
	})
}

```
</TabItem>
</Tabs>

:::warning Token Loss
If the beneficiary account does not exist the funds will be [**dispersed among validators**](../../protocol/network/token-loss.md).
:::

:::warning Token Loss
Do **not** use `delete` to try fund a new account. Since the account doesn't exist the tokens will be lost.
:::
