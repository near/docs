---
id: frontend-multiple-contracts
title: Interacting with Multiple Contracts from a Frontend
sidebar_label: Interact with Multiple Contracts
description: "A guide to connecting your frontend to multiple NEAR smart contracts, querying data, and calling methods on them."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

### Introduction

In the NEAR protocol, a frontend application can seamlessly interact with multiple smart contracts. This enables building decentralized apps that compose functionality from various on-chain components without restrictions.

#### Key Concept
Frontends connect to the NEAR network via libraries like near-api-js. View methods (read-only) can be queried from any contract using a shared connection, as they require no signing. Change methods (that modify state) are executed via signed transactions targeted to specific contracts using a wallet (e.g., via @near-wallet-selector).

This setup allows parallel or sequential interactions with different contracts, leveraging NEAR's account-based model where each contract has its own address.

#### Trade-offs and Alternatives
- **Trade-offs**: Querying multiple contracts is efficient and low-cost, but calling change methods across contracts lacks built-in atomicity—if one transaction fails, others proceed without rollback. This can lead to partial states if not handled carefully.
- **Alternatives**: For atomic operations across contracts, implement cross-contract calls on the backend (in the smart contracts themselves), where one contract invokes another within a single transaction. This ensures all-or-nothing execution on-chain, reducing frontend complexity.
- Dispatching multiple independent transactions improves user experience (single wallet approval), but for related actions on the same contract, prefer batching (see below) for true atomicity.

#### Testing Tips
Test by deploying sample contracts (e.g., a greeting contract and a guest book) to testnet. Use tools like NEAR Explorer to verify query results and transaction outcomes. Simulate failures (e.g., insufficient gas) to check independence of multi-transaction calls. Focus on edge cases like network latency affecting query order.

---

### Querying Data from Multiple Contracts

Querying involves making view calls to different contract addresses using a shared NEAR connection.

1. Establish a connection to the network.
2. For each contract, either create a Contract instance or directly use `account.viewFunction(contractId, methodName, args)`.
3. Await and handle the results independently.

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="index.js"
          url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
          start="70" end="76" />
  </Language>
</CodeTabs>

This code fetches greetings from two separate contracts concurrently, demonstrating non-blocking queries.

---

### Dispatching Transactions to Multiple Contracts

To execute change methods on multiple contracts, prepare and sign multiple transactions at once. The wallet handles approval in one step, but executions are independent (no cross-contract rollback).

1. Define each transaction with its receiver (contract ID) and actions (e.g., FunctionCall).
2. Use `wallet.signAndSendTransactions({ transactions })` to dispatch them.

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="index.js"
            url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
            start="35" end="62" />
  </Language>
</CodeTabs>

Here, the user sets a greeting on one contract and adds a message to another. If one fails (e.g., due to gas), the other still succeeds.

:::caution
Transactions are independent: failure in one does not revert others. Design your app to handle partial successes gracefully.
:::

---

### Batching Actions on a Single Contract

For multiple actions on the **same** contract, batch them into one transaction for sequential, atomic execution (all succeed or all revert).

1. Create a transaction with an array of actions.
2. Include gas and deposit as needed per action.

```js
// Register a user and transfer them FT in one transaction
const REGISTER_DEPOSIT = "1250000000000000000000";

const ftTx = {
  receiverId: FT_ADDRESS,
  actions: [
    {
      type: 'FunctionCall',
      params: {
        methodName: 'storage_deposit',
        args: { account_id: "<receiver-account>" },
        gas: THIRTY_TGAS, deposit: REGISTER_DEPOSIT
      }
    },
    {
      type: 'FunctionCall',
      params: {
        methodName: 'ft_transfer',
        args: { receiver_id: "<receiver-account>", amount: amount_in_yocto },
        gas: THIRTY_TGAS, deposit: 1
      }
    }
  ]
}

// Dispatch the batched transaction
await wallet.signAndSendTransactions({ transactions: [ ftTx ] })
