---
id: crosscontract
title: Cross-Contract Calls
sidebar_label: 📞 Cross-Contract Calls
---
import {CodeBlock} from '@theme/CodeBlock'
import {CodeTabs, Language, Github} from "@site/components/codetabs"


Cross-contract calls allow you to interact with other deployed smart contracts. This is useful when you need to:

1. Execute a method in another contract
2. Query information from another contract

---

## Snippet: Calling Another Contract

Asking another contract to perform an action is a common scenario. Let's take a look to a method that receives NEARs, and stakes them in a validator. This code is a modification of the `donation` method showcased in [Anatomy of a Contract](../anatomy/anatomy.md). Instead of forwarding the money to the beneficiary, we *stake* it. The beneficiary will then be able later to call *unstake* and *withdraw* in our contract to retrieve the donations.

<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-as/contract/assembly/index.ts"
            start="14" end="56" />
    <Github fname="model.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/model.rs" />
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-as/contract/assembly/index.ts"
            start="14" end="56" />
    <Github fname="external.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-as/contract/assembly/external.ts" />
    <Github fname="model.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-as/contract/assembly/model.ts" />
  </Language>
</CodeTabs>

## Snippet: Querying Information

Querying information from another contract is also a common scenario. Continuing with the previous example, lets now write a method in which our contract checks how much NEARs it has staked in the validator.

<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-as/contract/assembly/index.ts"
            start="14" end="56" />
    <Github fname="model.rs"
            url="https://github.com/near-examples/docs-examples/blob/main/donation-rs/contract/src/model.rs" />
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-as/contract/assembly/index.ts"
            start="59" end="97" />
    <Github fname="external.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-as/contract/assembly/external.ts" />
    <Github fname="model.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-as/contract/assembly/model.ts" />
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
    <CodeBlock> asd </CodeBlock>
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <CodeBlock> 
    ContractPromise.create(
      "external_address", "method_name", "args_encoded", GAS, DEPOSIT
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
If you method finishes, then the external contract will be called. Once the external contract finishes, the callback method you specified will be called. This will happen weather the external contract finishes **successfully or not**. We repeat, if your original method finishes correctly, then your callback will **always execute**.

In the callback method you will have access to the cross-call result, which is an object with two fields:
- `status`: Telling if the external method finished successfully or not
- `buffer`: Having the value returned by the external method (if any)

:::tip
The callback methods in your contract must be public, so it can be called when the second promise executes. However, they should be only callable by **your contract**. Always make sure to make it private by asserting that the `predecessor` is `current_account_id`. In rust this is done automatically by adding the `#[private]` decorator.
:::

### Successful Execution
In case the cross-call finishes successfully the result object will have will have a `status` of 1, and the `buffer` will have the encoded result (if any). In order to recover the result you need to decode it from the resulting `buffer`:
<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <CodeBlock>
      [#private]
    </CodeBlock>
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-as/contract/assembly/index.ts"
            start="82" end="97" />
    <Github fname="external.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-as/contract/assembly/external.ts" />
  </Language>
</CodeTabs>

### Failed Execution
If the cross-call panics (i.e. it fails), then your callback is **executed anyway**. Here you manually need to rollback any changes made in your contract during the original call. Particularly:

1. If you attached NEAR to the cross-contract call, they are now back in **your contract**. Make sure to return them to the user that made the original call.
2. If you made any state changes in the original method (i.e. changed or stored data), make sure to rollback them.

<CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <CodeBlock>
      [#private]
    </CodeBlock>
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="index.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-as/contract/assembly/index.ts"
            start="41" end="56" />
    <Github fname="external.ts"
            url="https://github.com/near-examples/docs-examples/blob/main/cross-contract-as/contract/assembly/external.ts" />
  </Language>
</CodeTabs>

:::warning AGAIN
If your original method finishes correctly then the callback executes **even if the external method panics**.Your state will **not** rollback automatically, and the money will not be returned to the user automatically. Always make sure to check in the callback if the external method failed, and manually rollback any operation if necessary.
:::

---

## Security Concerns

While writing cross-contract calls there is a significant aspect to keep in mind: all the calls are **independent** and **asynchronous**. In other words:

- The method in which you make the call and method for the callback are **independent**.
- Between the call and the callback people could interact with the contract

This has important implications on how you should handle the callbacks. Particularly:

1. Make sure you don't leave the contract in a exploitable state between the call and the callback.
2. Manually rollback any changes to the state in the callback if the external call failed.
3. Your callback method needs to be public, but you want to make sure only your contract can call it.

We have a whole [security section](../security/callbacks.md) dedicated to these specific errors, so please go and check it.

:::warning
Not following this basic security guidelines could expose your contract to exploits. Please check the [security section](../security/callbacks.md), and if still in doubt, [join us in Discord](https://near.chat).
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
