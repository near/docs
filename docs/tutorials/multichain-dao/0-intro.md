---
id: introduction
title: Near Multi-Chain DAO Governance
sidebar_label: Introduction
description: "Learn how Abstract DAO enables a single vote on NEAR to execute actions across multiple EVM chains."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Many multi-chain organizations deploy copies of the same smart contract across multiple EVM chains, which need to be kept in sync.

Generally, this is tackled by handling multiple DAOs - one per chain - where the same action is voted simultaneously, a process that is not only time-consuming, but also very expensive and error-prone.

![multi chain flow](/docs/assets/tutorials/abstract-dao/multi-dao-flow.png)

To solve this, we have built the [Abstract DAO](https://github.com/nearuaguild/abstract-dao), which enables organizations to **vote once** in NEAR, and then **execute the same action** across **multiple chains**.

![multi chain flow](/docs/assets/tutorials/abstract-dao/near-dao-flow.png)

:::warning
Abstract DAO is an example, and as such it has not been audited, use it at your own risk.
:::

---

### How It Works?

The [Abstract DAO](https://github.com/nearuaguild/abstract-dao) acts as an intermediary between NEAR DAOs and the EVM chains.

The process of voting and executing an action looks like this:

1. **Craft an EIP-1559 Payload**: You create the transaction that will execute across all chain, specifying the recipient address, nonce, value, and transaction data. Only the gas parameters are not set, as they will vary across chains.

2. **Choose a Single Allowed Account**: As part of the voting process, your organization chooses an "allowed account," which is the member who will be responsible to setup gas parameters, and generate signatures for all the chains.

3. **Vote on the Request**: Your decentralized organization votes once on NEAR to approve this request. Each member can review the transaction, then cast their vote to confirm or reject it.

4. **Generate Signatures**: Once the request has enough confirmations, the transaction is approved. The "allowed account" can now interact with the [Abstract DAO](https://github.com/nearuaguild/abstract-dao) to generate signatures for as many EVM-compatible chains as needed.

The result is a drastically simplified governance process (one vote, one confirmation) and the ability to sign and execute transactions across multiple chains in a coordinated manner.

:::tip Handling Gas
Since Gas prices can vary widely across chains, the transaction's gas price is not set until the signatures are generated.

This means that the "allowed account" will be in charge of setting the gas price for each transaction being signed.
:::


---

## Prerequisites

To complete this tutorial successfully, you will need [Near CLI](../../tools/cli.md#installation) to be installed, and have a general understanding of how [Chain Signatures](../../chain-abstraction/chain-signatures/getting-started.md) work.

---

## Next steps

Ready to start? Let's jump to the first step, in which we will understand how the Abstract DAO contract works.

---

:::note Versioning for this article

- near-cli: `0.12.0`
- rustc: `1.78.0`
- cargo: `1.80.1`
- cargo-near: `0.6.2`
- rustc: `1.78.0`
- node: `21.6.1`

:::
