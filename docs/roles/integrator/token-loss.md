---
id: token-loss
title: Token Loss
sidebar_label: Token Loss
---

Token loss is possible under multiple scenarios. These scenarios can be grouped into a few related classes:

1. Key Management
2. Refunds
3. Function Calls

---

## Key Management {#type-1-key-management}

There is a class of token loss scenarios related to key management.  Proper key management is one way to avoid this class of errors.  Another way is for designers of smart contracts to implement logic which issues new keys allowing for recovery of accounts whose keys have been lost or deleted.

### Loss of `FullAccess` key {#scenario-1a-loss-of-fullaccess-key}

A user may lose their private key of a `FullAccess` key pair for an account which has no other keys.  No one will be able to recover the funds.  Funds will remain locked in the account forever.

### Loss of `FunctionCall` access key {#scenario-1b-loss-of-functioncall-access-key}

An account may have its one and only `FunctionCall` access key deleted.  No one will be able to recover the funds.  Funds will remain locked in the account forever.

---
## Refunds {#type-2-refunds}

There is a class of token loss scenarios related to refund receipts.  When a receipt is issued for an account, if that account no longer exists, the funds will be dispersed among validators proportional to their stake in the current epoch.

### Delete account with non-existent beneficiary {#scenario-2a-delete-account-with-non-existent-beneficiary}

For an account to be deleted, a beneficiary must be assigned.  Once deleted, a transfer receipt is generated and sent to the beneficiary account.  If the beneficiary account does not exist, a refund receipt will be generated and sent back to the original account.  Since the original account has already been deleted, the funds will be dispersed among validators

### Account with zero balance receives refund {#scenario-2b-account-with-zero-balance-receives-refund}

If an account `A` transfers all of its funds to another account `B` and account `B` does not exist, a refund receipt will be generated for account `A`.  During the period of this round trip, account `A` is vulnerable to deletion by garbage collection activities on the network. If account `A` is in fact deleted before the refund receipt arrives, then the funds will be dispersed among validators.

---
## Function Calls {#type-3-function-calls}

There is a class of token loss scenarios related to the failure of function calls.

### Successful calls in a failed batch {#scenario-3a-successful-calls-in-a-failed-batch}

If a contract function `f1` calls two or more other functions `f2` and `f3`, and at least one of these functions `f2` and `f3` fails, then tokens will be returned from function(s) which fail but tokens will be lost to the function(s) which succeed.