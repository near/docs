---
id: advanced-xcc
title: Complex Cross Contract Call
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

This example presents 3 instances of complex cross-contract calls. Particularly, it shows:
1. How to batch multiple function calls to a same contract.
2. How to call multiple contracts in parallel, each returning a different type.
3. Different ways of handling the responses in the callback.

---

## Batch Actions

You can aggregate multiple actions directed towards one same contract into a batched transaction.
Methods called this way are executed sequentially, with the added benefit that, if one fails then
they **all get reverted**.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="batch_actions.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/batch_actions.rs"
            start="7" end="19" />
  </Language>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts"
          url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
          start="37" end="40" />
    <Github fname="batch_actions.js"
          url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/batch_actions.ts"
          start="5" end="17" />
  </Language>
</CodeTabs>

#### Getting the Last Response
In this case, the callback has access to the value returned by the **last
action** from the chain.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="batch_actions.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/batch_actions.rs"
            start="21" end="34" />
  </Language>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="42" end="45" />
    <Github fname="batch_actions.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/batch_actions.ts"
      start="19" end="29" />
    <Github fname="utils.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/utils.ts"
      start="3" end="20" />
  </Language>
</CodeTabs>

---

## Calling Multiple Contracts

A contract can call multiple other contracts. This creates multiple transactions that execute
all in parallel. If one of them fails the rest **ARE NOT REVERTED**.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="multiple_contracts.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/multiple_contracts.rs"
            start="18" end="56" />
  </Language>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="47" end="50" />
    <Github fname="multiple_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/multiple_contracts.ts"
      start="6" end="21" />
  </Language>
</CodeTabs>

#### Getting All Responses
In this case, the callback has access to an **array of responses**, which have either the
value returned by each call, or an error message.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="multiple_contracts.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/multiple_contracts.rs"
            start="58" end="92" />
  </Language>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="52" end="55" />
    <Github fname="multiple_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/multiple_contracts.ts"
      start="24" end="41" />
    <Github fname="utils.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/utils.ts"
      start="3" end="20" />
  </Language>
</CodeTabs>

---

## Multiple Calls - Same Result Type 

This example is a particular case of the previous one ([2. Calling Multiple Contracts](#2-calling-multiple-contracts)).
It simply showcases a different way to check the results by directly accessing the `promise_result` array.

In this case, we call multiple contracts that will return the same type:

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="similar_contracts.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/similar_contracts.rs"
            start="7" end="30" />
  </Language>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="57" end="60" />
    <Github fname="similar_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/similar_contracts.ts"
      start="6" end="35" />
  </Language>
</CodeTabs>

#### Getting All Responses
In this case, the callback again has access to an **array of responses**, which we can iterate checking the
results.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="similar_contracts.rs"
            url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/similar_contracts.rs"
            start="32" end="57" />
  </Language>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="62" end="65" />
    <Github fname="similar_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/similar_contracts.ts"
      start="37" end="54" />
    <Github fname="utils.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/utils.ts"
      start="3" end="20" />
  </Language>
</CodeTabs>