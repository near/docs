---
id: handling-tokens
title: How to Handle Tokens in a Smart Contract
description: "Learn how to manage native NEAR tokens in smart contracts, including receiving, tracking, and transferring them, illustrated with a donation example."
---

import {CodeTabs, Language, Github} from '@site/src/components/codetabs';

## Introduction to Handling Tokens in Smart Contracts

Smart contracts on NEAR can handle native NEAR tokens directly, as they are built into the protocol (unlike fungible tokens which follow NEP-141 standards). Key concepts include:

- **Payable Methods**: Methods that accept attached deposits (tokens sent with the call). Mark them with decorators like `@payable` in AssemblyScript or `#[payable]` in Rust.
- **Attached Deposit**: Access the sent amount via environment functions (e.g., `env.attached_deposit()` in AssemblyScript or `attached_deposit()` in Rust).
- **Transfers**: Use promises to send tokens to other accounts. This is asynchronous to handle potential failures.
- **Tracking**: Store donation/transfer data in contract storage (e.g., maps or sets) for transparency and querying.

In this tutorial, we use a donation contract as an example: users donate NEAR tokens, which are forwarded to a beneficiary while tracking totals per donor.

## Explaining the Concept: Receiving and Transferring Tokens

To receive tokens, declare a payable method. In the donation example, the `donate` method receives the attached deposit and records it:

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
            start="16" end="20" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
            start="17" end="25" />
  </Language>
</CodeTabs>

Here, the method checks the attached deposit and stores it in a map keyed by donor account ID.

To transfer tokens, create a promise:

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
            start="28" end="35" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
            start="36" end="42" />
  </Language>
</CodeTabs>

This forwards the tokens immediately to the beneficiary. Promises ensure the transfer happens after the current execution, allowing for callbacks if needed (e.g., on failure).

Query methods (non-payable) allow viewing donations without changing state:

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="contract.ts"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
            start="37" end="44" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/donation.rs"
            start="60" end="74" />
  </Language>
</CodeTabs>

## Trade-offs and Alternatives

- **Immediate vs. Accumulated Transfers**:
  - Immediate (as in this example): Ensures quick distribution but incurs gas for each donation. Trade-off: Higher costs for frequent small donations; simpler accounting.
  - Accumulated: Store tokens in the contract and add a withdrawal method (e.g., only beneficiary can call). Trade-off: Lower per-donation gas but introduces security risks (e.g., contract hacks) and requires access controls.

- **Native Tokens vs. Fungible Tokens (NEP-141)**:
  - Native: Simpler for basic transfers, no need for separate token contracts. Alternative: Use for protocol-level payments.
  - NEP-141: For custom tokens, use `ft_transfer` or `ft_transfer_call`. Trade-off: More flexible (e.g., callbacks) but requires approving transfers and handling storage deposits.

- **Error Handling**: Always check `attached_deposit > 0` to prevent zero-value calls. Use promise callbacks for revert-on-failure logic.

## How to Test Token Handling

- **Unit Tests**: Mock environment to simulate deposits and transfers. Verify storage updates and promise creations.
  - Example in JS: Use `near-sdk-sim` to test `donate` records the amount and initiates transfer.
  - In Rust: Use `near-sdk::test_utils` to assert balances post-transfer.

- **Sandbox/Integration Tests**: Use NEAR Workspaces to create test accounts, send deposits, and query results.
  - Simulate multiple donations, check totals match attached amounts, and verify beneficiary balance increases.

- **Edge Cases**: Test zero deposit (should fail), maximum deposit limits, and concurrent donations for storage consistency.

This focused approach ensures secure, transparent token handling in your contracts.

:::note
For full code, see the [donation example repository](https://github.com/near-examples/donation-examples).
:::
