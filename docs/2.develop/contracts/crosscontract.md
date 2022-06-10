---
id: crosscontract
title: Cross-Contract Calls
#sidebar_label: 📞 Cross-Contract Calls
---
import {CodeBlock} from '@theme/CodeBlock'
import {CodeTabs, Language, Github} from "@site/components/codetabs"


Cross-contract calls allow you to interact with other deployed smart contracts. This is useful when you need to:

1. Query information from another contract
2. Execute a method in another contract

---

## Snippet: Querying Information

While making your contract it is very likely that you will want to query information from another deployed one. Bellow you can see a basic example in which we query the greeting message from our [Hello NEAR](../quickstart/hello-near.md) example.

<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-rs/contract/src/lib.rs"
            start="24" end="56" />
    <Github fname="external.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-rs/contract/src/external.rs" />
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-as/contract/assembly/index.ts"
            start="10" end="45" />
    <Github fname="external.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-as/contract/assembly/external.ts" />
  </Language>
</CodeTabs>

---

## Snippet: Calling Another Contract

Asking another contract to perform an action is another common scenario you will find. Bellow you can see a method that interacts with the [Hello NEAR](../quickstart/hello-near.md) example to changes its greeting message.

<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-rs/contract/src/lib.rs"
            start="58" end="85" />
    <Github fname="external.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-rs/contract/src/external.rs" />
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-as/contract/assembly/index.ts"
            start="47" end="79" />
    <Github fname="external.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-as/contract/assembly/external.ts" />
  </Language>
</CodeTabs>

---

## Promises
In order to make your contract interact with another you need to create two [Promises](broken):
1. A promise to execute code in the external contract (`ContractPromise.create`).
2. A promise to callback a **different** method in your contract with the result (`ContractPromise.then`).

Both promises take the same arguments:
<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <CodeBlock>
    external_trait::ext("external_address")
    .with_attached_deposit(DEPOSIT)
    .with_static_gas(GAS)
    .method(arguments);
    </CodeBlock>
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <CodeBlock> 
    ContractPromise.create(
      "external_address", "method", "encoded_arguments", GAS, DEPOSIT
    )
    </CodeBlock>
  </Language>
</CodeTabs>

   - The address of the contract you want to interact with
   - The method that you want to execute
   - The (**encoded**) arguments to pass to the method
   - The amount of GAS to use (deducted from the **attached Gas**)
   - The amount of NEAR to attach (deducted from **your contract’s balance**)

:::tip
Notice that the callback could be made to **any** contract. This means that, if you want, the result could be potentially handled by another contract.
:::

:::caution
The fact that you are creating a Promise means that both the cross-contract call and callback will **not execute immediately**. In fact:
- The cross-contract call will execute 1 or 2 blocks after your method finishes **correctly**.
- The callback will then execute 1 or 2 blocks after the **external** method finishes (**correctly or not**)
:::

---

## Callback Method
If your method finishes correctly, then eventually your callback method will execute. This will happen weather the external contract finishes **successfully or not**. We repeat, if your original method finishes correctly, then your callback will **always execute**.

In the callback method you will have access to the cross-call result, which contains two important arguments:
- `status`: Telling if the external method finished successfully or not
- `buffer`: Having the value returned by the external method (if any)

:::tip
The callback methods in your contract must be public, so it can be called when the second promise executes. However, they should be only callable by **your contract**. Always make sure to make it private by asserting that the `predecessor` is `current_account_id`. In rust this can be achieved using the `#[private]` decorator.
:::

### Checking Execution Status
<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-rs/contract/src/lib.rs"
            start="78" end="84" />
    <Github fname="external.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-rs/contract/src/external.rs"
            start="23" end="33"/>
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-as/contract/assembly/index.ts"
            start="70" end="78" />
    <Github fname="external.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-as/contract/assembly/external.ts"
            start="9" end="19"/>
  </Language>
</CodeTabs>

### Successful Execution
In case the cross-call finishes successfully the resulting object will have will have a `status` of 1, and the `buffer` will have the encoded result (if any). In order to recover the result you need to decode it from the resulting `buffer`:

<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="lib.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-rs/contract/src/lib.rs"
            start="49" end="53" />
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-hello-as/contract/assembly/index.ts"
            start="37" end="39" />
  </Language>
</CodeTabs>

### Failed Execution
If the external method fails (i.e. it panics), then your callback will **executed anyway**. Here you need to **manually rollback** any changes made in your contract during the original call. Particularly:

1. If you attached NEAR to the cross-contract call, they are now back in **your contract**. Make sure to return them to the user that made the original call.
2. If you made any state changes in the original method (i.e. changed or stored data), make sure to rollback them.

:::warning AGAIN
If your original method finishes correctly then the callback executes **even if the external method panics**.Your state will **not** rollback automatically, and the money will not be returned to the user automatically. Always make sure to check in the callback if the external method failed, and manually rollback any operation if necessary.
:::

---

## Security Concerns

While writing cross-contract calls there is a significant aspect to keep in mind: all the calls are **independent** and **asynchronous**. In other words:

- The method in which you make the call and method for the callback are **independent**.
- There is a **delay between the call and the callback**, in which people can still interact with the contract

This has important implications on how you should handle the callbacks. Particularly:

1. Make sure you don't leave the contract in a exploitable state between the call and the callback.
2. Manually rollback any changes to the state in the callback if the external call failed.

We have a whole [security section](./security/callbacks.md) dedicated to these specific errors, so please go and check it.

:::warning
Not following these basic security guidelines could expose your contract to exploits. Please check the [security section](./security/callbacks.md), and if still in doubt, [join us in Discord](https://near.chat).
:::


### &nbsp;
---
## 🎞️📚 Additional Resources
These educational resources could help you to better understand the subject
### Videos

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/971dTz6nM2g"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>

### Blog Posts

- [5 Things I Wish Someone Had Told Me While Learning To Make Smart Contracts](https://medium.com/near-devs/5-things-i-wish-someone-had-told-me-while-learning-to-make-smart-contracts-1b02441ee162)
