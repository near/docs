---
id: token-loss
title: Avoiding Token Loss
sidebar_label: Avoiding Token Loss
---

NEAR Protocol is designed to be secure and user-friendly, but there are still scenarios where users can lose their tokens. This document outlines the common causes of token loss and how to avoid them.

:::warning
Careful! Losing tokens means losing money!
:::


Token loss is possible under multiple scenarios. These scenarios can be grouped into a few related classes:

1. Improper key management
2. Refunding deleted accounts
3. Failed function calls in batches

---

## Improper key management

Improper key management may lead to token loss. Mitigating such scenarios may be done by issuing backup keys
allowing for recovery of accounts whose keys have been lost or deleted.

### Loss of `FullAccess` key

A user may lose their private key of a `FullAccess` key pair for an account with no other keys.
No one will be able to recover the funds. Funds will remain locked in the account forever.

### Loss of `FunctionCall` access key

An account may have its one and only `FunctionCall` access key deleted.
No one will be able to recover the funds. Funds will remain locked in the account forever.

---
## Refunding deleted accounts

When a refund receipt is issued for an account, if that account no longer exists, the funds will be dispersed among
validators proportional to their stake in the current epoch.

### Deleting account with non-existent beneficiary

When you delete an account, you must assign a beneficiary.
Once deleted, a transfer receipt is generated and sent to the beneficiary account.
If the beneficiary account does not exist, a refund receipt will be generated and sent back to the original account.
Since the original account has already been deleted, the funds will be dispersed among validators.

### Account with zero balance is garbage-collected, just before it receives refund

If an account `A` transfers all of its funds to another account `B` and account `B` does not exist,
a refund receipt will be generated for account `A`. During the period of this round trip,
account `A` is vulnerable to deletion by garbage collection activities on the network.
If account `A` is deleted before the refund receipt arrives, the funds will be dispersed among validators.

---
## Failed function calls in batches

:::warning
When designing a smart contract, you should always consider the asynchronous nature of NEAR Protocol.
:::

If a contract function `f1` calls two (or more) other functions `f2` and `f3`, and at least one of these functions, `f2` and `f3` fails, then tokens will be refunded from the function that failed, but tokens will be appropriately credited to the function(s) which succeed.

The successful call's tokens may be considered lost depending on your use case if a single failure in the batch means the whole batch failed.

