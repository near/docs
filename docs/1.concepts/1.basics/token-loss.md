---
id: token-loss
title: Avoiding Token Loss
sidebar_label: Avoiding Token Loss
---

<blockquote class="danger">
  Careful! Losing tokens means losing money!
</blockquote>


Token loss is possible under multiple scenarios. These scenarios can be grouped into a few related classes:

1. Improper key management
2. Refunding deleted accounts
3. Failed function calls in batches

---

## Improper key management {#type-1-key-management}

Improper key management may lead to token loss. Mitigating such scenarios may be done by issuing backup keys 
allowing for recovery of accounts whose keys have been lost or deleted.

### Loss of `FullAccess` key {#scenario-1a-loss-of-fullaccess-key}

A user may lose their private key of a `FullAccess` key pair for an account which has no other keys. 
No one will be able to recover the funds.  Funds will remain locked in the account forever.

### Loss of `FunctionCall` access key {#scenario-1b-loss-of-functioncall-access-key}

An account may have its one and only `FunctionCall` access key deleted. 
No one will be able to recover the funds.  Funds will remain locked in the account forever.

---
## Refunding deleted accounts {#type-2-refunds}

When a refund receipt is issued for an account, if that account no longer exists, the funds will be dispersed among
validators proportional to their stake in the current epoch.

### Deleting account with non-existent beneficiary {#scenario-2a-delete-account-with-non-existent-beneficiary}

For an account to be deleted, a beneficiary must be assigned.
Once deleted, a transfer receipt is generated and sent to the beneficiary account.
If the beneficiary account does not exist, a refund receipt will be generated and sent back to the original account.
Since the original account has already been deleted, the funds will be dispersed among validators

### Account with zero balance is garbage-collected, just before it receives refund {#scenario-2b-account-with-zero-balance-receives-refund}

If an account `A` transfers all of its funds to another account `B` and account `B` does not exist,
a refund receipt will be generated for account `A`.  During the period of this round trip,
account `A` is vulnerable to deletion by garbage collection activities on the network.
If account `A` is in fact deleted before the refund receipt arrives, then the funds will be dispersed among validators.

---
## Failed function calls in batches {#type-3-function-calls}

If a contract function `f1` calls two or more other functions `f2` and `f3`,
and at least one of these functions `f2` and `f3` fails, then tokens will be returned from function(s)
which fail but tokens will be properly credited to the function(s) which succeed.

Depending on your use-case, the successful call may be considered as lost tokens, if one failure in the batch
is considered as a failure of the whole batch.

When designing smart contract you should always consider the asynchronous nature of NEAR Protocol.
