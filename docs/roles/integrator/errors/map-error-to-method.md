---
id: map-error-to-method
title: Error -> Method
sidebar_label: Error -> Method
---


Errors and where they are called

## InvalidTxError

### InvalidTxError::InvalidSignerId

- raised by `verify_and_charge_transaction()` in `runtime/verifiers`
 
  Verifies the signed transaction on top of given state, charges the rent and transaction fees and balances, and updates the state for the used account and access keys.


- raised by `process_transaction()`

  Takes one signed transaction, verifies it and converts it to a receipt. Add this receipt either to the new local receipts if the signer is the same as receiver or to the new outgoing receipts.
  
  When transaction is converted to a receipt, the account is charged for the full value of the generated receipt. Also the account is charged with the rent for storage and short name.
  
  In case of successful verification (expected for valid chunks), returns the receipt and `ExecutionOutcomeWithId` for the transaction.
  
  In case of an error, returns either `InvalidTxError` if the transaction verification failed or a `StorageError` wrapped into `RuntimeError`.


<blockquote class="warning">
<strong>work in progress</strong> <span>This page maps errors to their call sites</span><br><br>

One possible view into errors is a case-by-case clarification of where they are thrown and why.  This page intends to do that.

</blockquote>