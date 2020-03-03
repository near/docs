---
id: map-method-to-error
title: Method -> Error
sidebar_label: Method -> Error
---


Key points where errors are thrown

## Runtime Verification

### `verify_and_charge_transaction()`

Verifies the signed transaction on top of given state, charges the rent and transaction fees and balances, and updates the state for the used account and access keys.

- `InvalidTxError`: An error happened during TX execution
  - `InvalidAccessKeyError`: Happens if a wrong AccessKey used or AccessKey has not enough permissions
    - `AccessKeyNotFound`: The access key identified by the `public_key` doesn't exist for the account
    - `ReceiverMismatch`:  Transaction `receiver_id` doesn't match the access key `receiver_id`
    - `MethodNameMismatch`: Transaction method name isn't allowed by the access key
    - `RequiresFullAccess`: Transaction requires a full permission access key
    - `NotEnoughAllowance`: Access Key does not have enough allowance to cover transaction cost
    - `DepositWithFunctionCall`: Having a deposit with a function call action is not allowed with a function call access key
  - `InvalidSignerId`: TX `signer_id` is not in a valid format or not satisfy requirements (see `near_core::primitives::utils::is_valid_account_id`)
  - `SignerDoesNotExist`: TX `signer_id` is not found in a storage
  - `InvalidNonce`: Transaction nonce must be `account[access_key].nonce + 1`
  - `InvalidReceiverId`: TX `receiver_id` is not in a valid format or not satisfy requirements (see `near_core::primitives::utils::is_valid_account_id`)
  - `InvalidSignature`: TX signature is not valid
  - `NotEnoughBalance`: Account does not have enough balance to cover TX cost
  - `CostOverflow`: An integer overflow occurred during transaction cost estimation

### `validate_add_key_action()`

Validates `AddKeyAction`. If the access key permission is `FunctionCall` checks that the `receiver_id` is a valid account ID, checks the total number of bytes of the method names doesn't exceed the limit and every method name length doesn't exceed the limit.

- `ActionsValidationError::InvalidAccountId`


<blockquote class="warning">
<strong>work in progress</strong> <span>This page maps method calls to errors they throw</span><br><br>

One possible view into errors is a case-by-case clarification of which methods actually throw errors and why.  This page intends to do that.

</blockquote>