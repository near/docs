---
id: advanced-xcc
title: Advanced Cross-Contract Calls
description: "Learn how to interact with multiple contracts on NEAR, handle asynchronous results, and master callbacks for reliable inter-contract logic."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

---

# Advanced Cross-Contract Calls on NEAR

Cross-contract calls are the beating heart of composability on NEAR. They let one smart contract talk to another, enabling powerful multi-contract workflows.  

In this tutorial, you’ll learn not just *how* to use advanced cross-contract calls (XCC), but also *why* they matter, what trade-offs to consider, and how to test your calls safely. By the end, you’ll be able to:  

- Batch multiple actions into one atomic call  
- Call multiple contracts in parallel and handle their responses  
- Manage callbacks and error handling cleanly  

If you’ve already read the [Simple Cross-Contract Calls](xcc.md) tutorial, this builds directly on that foundation.  

---

## What Are Cross-Contract Calls?

Think of a cross-contract call as one smart contract sending a “message” to another.  
- On NEAR, these calls are **asynchronous**: the calling contract does not immediately get the result. Instead, it registers a **promise** to handle the response later.  
- This async model ensures scalability but requires you to design carefully with callbacks.  

Cross-contract calls let you compose services: a **DAO contract** can call a **token contract** to transfer tokens, a **marketplace contract** can call multiple **NFT contracts**, and so on.  

---

## Key Patterns of Advanced Cross-Contract Calls

NEAR offers a few distinct ways to structure your inter-contract logic. Let’s explore them.

### 1. Batch Actions (Atomic Execution)

Batching lets you send multiple actions to a single contract in one transaction.  
- **Benefit:** All actions either succeed together or fail together.  
- **Trade-off:** If one action fails, the entire batch reverts.  

A typical use case: updating multiple fields in a single contract where consistency is crucial.  

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="batch_actions.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/batch_actions.ts"
      start="5" end="17" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="batch_actions.rs"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/batch_actions.rs"
      start="8" end="20" />
  </Language>
</CodeTabs>

Callbacks here can fetch the **last response** from the sequence to confirm success.  

---

### 2. Calling Multiple Contracts (Parallel Execution)

Sometimes you want to talk to several contracts in parallel. For example:  
- A dashboard contract queries balances across multiple token contracts.  
- A marketplace requests data from different NFT contracts at once.  

- **Benefit:** Calls run in parallel, so failure in one doesn’t revert the others.  
- **Trade-off:** You must handle partial failures gracefully in your callback.  

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="multiple_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/multiple_contracts.ts"
      start="6" end="21" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="multiple_contracts.rs"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/multiple_contracts.rs"
      start="16" end="55" />
  </Language>
</CodeTabs>

The callback receives an **array of results**, one for each call. You can then iterate through them, checking for success or failure.  

---

### 3. Multiple Calls, Same Result Type

This is a special case of the previous pattern: you’re calling several contracts but expect the **same type of response** (e.g., querying balances from multiple tokens).  

- **Benefit:** Simplifies parsing, since the result array has uniform types.  
- **Trade-off:** You still need to handle errors for individual calls.  

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="similar_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/similar_contracts.ts"
      start="6" end="35" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="similar_contracts.rs"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/similar_contracts.rs"
      start="8" end="31" />
  </Language>
</CodeTabs>

---

## Trade-offs and Alternatives

When designing with XCC, keep in mind:  

- **Async complexity:** Unlike synchronous systems (e.g. Ethereum function calls), NEAR’s async model means you need callbacks for every cross-contract result.  
- **Gas usage:** Each call and callback consumes gas. Parallel calls may require careful gas budgeting.  
- **Error handling:** Decide whether a failure should break everything (batch) or just one part (parallel).  

**Alternatives:**  
- For simple needs, you might rely on off-chain orchestration (frontend calls multiple contracts).  
- But on-chain orchestration (this tutorial) ensures trustless execution and atomicity when required.  

---

## Testing Cross-Contract Calls

You can (and should) test cross-contract calls locally. Both the Rust and JS examples come with sandbox tests:  

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    cd contract-advanced-ts
    yarn
    yarn test
  </TabItem> 
  <TabItem value="rust" label="🦀 Rust">
    cd contract-advanced-rs
    cargo test
  </TabItem> 
</Tabs>


The sandbox simulates multiple contracts interacting, so you can test:

Sequential batch reverts

Partial failures in parallel calls

Callbacks collecting results

Practical Tips
Start small: test one batch call before chaining many.

Always log callback results for debugging.

Watch gas: failed callbacks often trace back to insufficient gas.

Document assumptions: what should happen if one contract is unavailable?

Wrapping Up
Advanced cross-contract calls unlock NEAR’s power to compose many services together. You now know:

How to batch multiple calls atomically

How to run calls in parallel across different contracts

How to handle responses and trade-offs

From DAOs to marketplaces, any complex dApp will rely on these patterns. With careful design and testing, you can build reliable multi-contract systems that scale with NEAR.

At the time of writing, this tutorial works with:

near-cli: 4.0.13

node: 18.19.1

rustc: 1.77.0

yaml
Copy code

---
