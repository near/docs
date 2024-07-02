---
id: error-implementation
title: Source Code Survey
sidebar_label: Source Code Survey
---

This page provides a very high level, sometimes "pseudocode", view of error types and related messages as implemented by the NEAR platform.

Errors raised by the NEAR platform are implemented in the following locations in `nearcore`:

- [nearcore/core/primitives/src/errors.rs](https://github.com/near/nearcore/blob/master/core/primitives/src/errors.rs)
- [nearcore/runtime/near-vm-errors/src/lib.rs](https://github.com/near/nearcore/blob/master/runtime/near-vm-errors/src/lib.rs)

---

## RuntimeError and subtypes {#runtimeerror-and-subtypes}

### RuntimeError {#runtimeerror}

#### Definition {#definition}

```rust
/// Error returned from `Runtime::apply`
pub enum RuntimeError {
    /// An unexpected integer overflow occurred. The likely issue is an invalid state or the transition.
    UnexpectedIntegerOverflow,
    /// An error happened during TX verification and account charging. It's likely the chunk is invalid.
    /// and should be challenged.
    InvalidTxError(InvalidTxError),
    /// Unexpected error which is typically related to the node storage corruption.account
    /// That it's possible the input state is invalid or malicious.
    StorageError(StorageError),
    /// An error happens if `check_balance` fails, which is likely an indication of an invalid state.
    BalanceMismatchError(BalanceMismatchError),
}
```

#### Error Messages {#error-messages}

- see below: `InvalidTxError`, `StorageError` and `BalanceMismatchError`

### InvalidTxError {#invalidtxerror}

#### Definition {#definition-1}

```rust
/// An error happened during TX execution
pub enum InvalidTxError {
    /// Happens if a wrong AccessKey used or AccessKey has not enough permissions
    InvalidAccessKeyError(InvalidAccessKeyError),
    /// TX signer_id is not in a valid format or not satisfy requirements see `near_core::primitives::utils::is_valid_account_id`
    InvalidSignerId { signer_id: AccountId },
    /// TX signer_id is not found in a storage
    SignerDoesNotExist { signer_id: AccountId },
    /// Transaction nonce must be account[access_key].nonce + 1
    InvalidNonce { tx_nonce: Nonce, ak_nonce: Nonce },
    /// TX receiver_id is not in a valid format or not satisfy requirements see `near_core::primitives::utils::is_valid_account_id`
    InvalidReceiverId { receiver_id: AccountId },
    /// TX signature is not valid
    InvalidSignature,
    /// Account does not have enough balance to cover TX cost
    NotEnoughBalance {
        signer_id: AccountId,
        balance: Balance,
        cost: Balance,
    },
    /// Signer account rent is unpaid
    RentUnpaid {
        /// An account which is required to pay the rent
        signer_id: AccountId,
        /// Required balance to cover the state rent
        amount: Balance,
    },
    /// An integer overflow occurred during transaction cost estimation.
    CostOverflow,
    /// Transaction parent block hash doesn't belong to the current chain
    InvalidChain,
    /// Transaction has expired
    Expired,
    /// An error occurred while validating actions of a Transaction.
    ActionsValidation(ActionsValidationError),
}
```


#### Error Messages {#error-messages-1}

```rust
InvalidTxError::InvalidSignerId { signer_id }
    "Invalid signer account ID {:?} according to requirements"

InvalidTxError::SignerDoesNotExist { signer_id }
    "Signer {:?} does not exist"

InvalidTxError::InvalidAccessKeyError(access_key_error)

InvalidTxError::InvalidNonce { tx_nonce, ak_nonce }
    "Transaction nonce {} must be larger than nonce of the used access key {}"

InvalidTxError::InvalidReceiverId { receiver_id }
    "Invalid receiver account ID {:?} according to requirements"

InvalidTxError::InvalidSignature
    "Transaction is not signed with the given public key"

InvalidTxError::NotEnoughBalance { signer_id, balance, cost }
    "Sender {:?} does not have enough balance {} for operation costing {}"

InvalidTxError::RentUnpaid { signer_id, amount }
    "Failed to execute, because the account {:?} wouldn't have enough to pay required rent {}" 

InvalidTxError::CostOverflow
    "Transaction gas or balance cost is too high"

InvalidTxError::InvalidChain
    "Transaction parent block hash doesn't belong to the current chain"

InvalidTxError::Expired
    "Transaction has expired"

InvalidTxError::ActionsValidation(error)
    "Transaction actions validation error: {}"
```

### StorageError {#storageerror}

#### Definition {#definition-2}

```rust
pub enum StorageError {
    /// Key-value db internal failure
    StorageInternalError,
    /// Storage is PartialStorage and requested a missing trie node
    TrieNodeMissing,
    /// Either invalid state or key-value db is corrupted.
    /// For PartialStorage it cannot be corrupted.
    /// Error message is unreliable and for debugging purposes only. It's also probably ok to
    /// panic in every place that produces this error.
    /// We can check if db is corrupted by verifying everything in the state trie.
    StorageInconsistentState(String),
}
```

### BalanceMismatchError {#balancemismatcherror}

#### Definition {#definition-3}

```rust
/// Happens when the input balance doesn't match the output balance in Runtime apply.
pub struct BalanceMismatchError {
    // Input balances
    pub incoming_validator_rewards: Balance,
    pub initial_accounts_balance: Balance,
    pub incoming_receipts_balance: Balance,
    pub processed_delayed_receipts_balance: Balance,
    pub initial_postponed_receipts_balance: Balance,
    // Output balances
    pub final_accounts_balance: Balance,
    pub outgoing_receipts_balance: Balance,
    pub new_delayed_receipts_balance: Balance,
    pub final_postponed_receipts_balance: Balance,
    pub total_rent_paid: Balance,
    pub total_validator_reward: Balance,
    pub total_balance_burnt: Balance,
    pub total_balance_slashed: Balance,
}
```

#### Error Messages {#error-messages-2}

```rust
"Balance Mismatch Error. The input balance {} doesn't match output balance {}\n\
Inputs:\n\
    \tIncoming validator rewards sum: {}\n\
    \tInitial accounts balance sum: {}\n\
    \tIncoming receipts balance sum: {}\n\
    \tProcessed delayed receipts balance sum: {}\n\
    \tInitial postponed receipts balance sum: {}\n\
Outputs:\n\
    \tFinal accounts balance sum: {}\n\
    \tOutgoing receipts balance sum: {}\n\
    \tNew delayed receipts balance sum: {}\n\
    \tFinal postponed receipts balance sum: {}\n\
    \tTotal rent paid: {}\n\
    \tTotal validators reward: {}\n\
    \tTotal balance burnt: {}\n\
    \tTotal balance slashed: {}",
```

### InvalidAccessKeyError {#invalidaccesskeyerror}

#### Definition {#definition-4}

```rust
pub enum InvalidAccessKeyError {
    /// The access key identified by the `public_key` doesn't exist for the account
    AccessKeyNotFound { account_id: AccountId, public_key: PublicKey },
    /// Transaction `receiver_id` doesn't match the access key receiver_id
    ReceiverMismatch { tx_receiver: AccountId, ak_receiver: AccountId },
    /// Transaction method name isn't allowed by the access key
    MethodNameMismatch { method_name: String },
    /// Transaction requires a full permission access key.
    RequiresFullAccess,
    /// Access Key does not have enough allowance to cover transaction cost
    NotEnoughAllowance {
        account_id: AccountId,
        public_key: PublicKey,
        allowance: Balance,
        cost: Balance,
    },
    /// Having a deposit with a function call action is not allowed with a function call access key.
    DepositWithFunctionCall,
}
```

#### Error Messages {#error-messages-3}

```rust
InvalidAccessKeyError::AccessKeyNotFound { account_id, public_key }
    "Signer {:?} doesn't have access key with the given public_key {}"

InvalidAccessKeyError::ReceiverMismatch { tx_receiver, ak_receiver }
    "Transaction receiver_id {:?} doesn't match the access key receiver_id {:?}"

InvalidAccessKeyError::MethodNameMismatch { method_name }
    "Transaction method name {:?} isn't allowed by the access key"

InvalidAccessKeyError::RequiresFullAccess
    "The transaction contains more then one action, but it was signed \
     with an access key which allows transaction to apply only one specific action. \
     To apply more then one actions TX must be signed with a full access key"

InvalidAccessKeyError::NotEnoughAllowance { account_id, public_key, allowance, cost }
    "Access Key {:?}:{} does not have enough balance {} for transaction costing {}"

InvalidAccessKeyError::DepositWithFunctionCall
    "Having a deposit with a function call action is not allowed with a function call access key."
```

### ActionsValidationError {#actionsvalidationerror}

#### Definition {#definition-5}

```rust
/// Describes the error for validating a list of actions.
pub enum ActionsValidationError {
    /// The total prepaid gas (for all given actions) exceeded the limit.
    TotalPrepaidGasExceeded { total_prepaid_gas: Gas, limit: Gas },
    /// The number of actions exceeded the given limit.
    TotalNumberOfActionsExceeded { total_number_of_actions: u64, limit: u64 },
    /// The total number of bytes of the method names exceeded the limit in a Add Key action.
    AddKeyMethodNamesNumberOfBytesExceeded { total_number_of_bytes: u64, limit: u64 },
    /// The length of some method name exceeded the limit in a Add Key action.
    AddKeyMethodNameLengthExceeded { length: u64, limit: u64 },
    /// Integer overflow during a compute.
    IntegerOverflow,
    /// Invalid account ID.
    InvalidAccountId { account_id: AccountId },
    /// The size of the contract code exceeded the limit in a DeployContract action.
    ContractSizeExceeded { size: u64, limit: u64 },
    /// The length of the method name exceeded the limit in a Function Call action.
    FunctionCallMethodNameLengthExceeded { length: u64, limit: u64 },
    /// The length of the arguments exceeded the limit in a Function Call action.
    FunctionCallArgumentsLengthExceeded { length: u64, limit: u64 },
}
```

#### Error Messages {#error-messages-4}

```rust
ActionsValidationError::TotalPrepaidGasExceeded     { total_prepaid_gas, limit }
     "The total prepaid gas {} exceeds the limit {}"
     
ActionsValidationError::TotalNumberOfActionsExceeded {total_number_of_actions, limit }
     "The total number of actions {} exceeds the limit {}"
     
ActionsValidationError::AddKeyMethodNamesNumberOfBytesExceeded { total_number_of_bytes, limit }
     "The total number of bytes in allowed method names {} exceeds the maximum allowed number {} in a AddKey action"
     
ActionsValidationError::AddKeyMethodNameLengthExceeded { length, limit }
     "The length of some method name {} exceeds the maximum allowed length {} in a AddKey action"
     
ActionsValidationError::IntegerOverflow
     "Integer overflow during a compute"
     
ActionsValidationError::InvalidAccountId { account_id }
     "Invalid account ID `{}`"
     
ActionsValidationError::ContractSizeExceeded { size, limit }
     "The length of the contract size {} exceeds the maximum allowed size {} in a DeployContract action"
     
ActionsValidationError::FunctionCallMethodNameLengthExceeded { length, limit }
     "The length of the method name {} exceeds the maximum allowed length {} in a FunctionCall action"
     
ActionsValidationError::FunctionCallArgumentsLengthExceeded { length, limit }
     "The length of the arguments {} exceeds the maximum allowed length {} in a FunctionCall action"
     
```

## TxExecutionError and subtypes {#txexecutionerror-and-subtypes}

### TxExecutionError {#txexecutionerror}

#### Definition {#definition-6}
```rust
/// Error returned in the ExecutionOutcome in case of failure
pub enum TxExecutionError {
    /// An error happened during Acton execution
    ActionError(ActionError),
    /// An error happened during Transaction execution
    InvalidTxError(InvalidTxError),
}
```

### ActionError {#actionerror}

#### Definition {#definition-7}

```rust
ActionError
pub struct ActionError {
    /// Index of the failed action in the transaction.
    /// Action index is not defined if ActionError.kind is `ActionErrorKind::RentUnpaid`
    pub index: Option<u64>,
    /// The kind of ActionError happened
    pub kind: ActionErrorKind,
}
```

### ActionErrorKind {#actionerrorkind}

#### Definition {#definition-8}

```rust
pub enum ActionErrorKind {
    /// Happens when CreateAccount action tries to create an account with account_id which is already exists in the storage
    AccountAlreadyExists { account_id: AccountId },
    /// Happens when TX receiver_id doesn't exist (but action is not Action::CreateAccount)
    AccountDoesNotExist { account_id: AccountId },
    /// A newly created account must be under a namespace of the creator account
    CreateAccountNotAllowed { account_id: AccountId, predecessor_id: AccountId },
    /// Administrative actions like `DeployContract`, `Stake`, `AddKey`, `DeleteKey`. can be proceed only if sender=receiver
    /// or the first TX action is a `CreateAccount` action
    ActorNoPermission { account_id: AccountId, actor_id: AccountId },
    /// Account tries to remove an access key that doesn't exist
    DeleteKeyDoesNotExist { account_id: AccountId, public_key: PublicKey },
    /// The public key is already used for an existing access key
    AddKeyAlreadyExists { account_id: AccountId, public_key: PublicKey },
    /// Account is staking and can not be deleted
    DeleteAccountStaking { account_id: AccountId },
    /// Foreign sender (sender=!receiver) can delete an account only if a target account hasn't enough tokens to pay rent
    DeleteAccountHasRent {
        account_id: AccountId,
        balance: Balance,
    },
    /// ActionReceipt can't be completed, because the remaining balance will not be enough to pay rent.
    RentUnpaid {
        /// An account which is required to pay the rent
        account_id: AccountId,
        /// Rent due to pay.
        amount: Balance,
    },
    /// Account is not yet staked, but tries to unstake
    TriesToUnstake { account_id: AccountId },
    /// The account doesn't have enough balance to increase the stake.
    TriesToStake {
        account_id: AccountId,
        stake: Balance,
        locked: Balance,
        balance: Balance,
    },
    /// An error occurred during a `FunctionCall` Action.
    FunctionCallError(FunctionCallError),
    /// Error occurs when a new `ActionReceipt` created by the `FunctionCall` action fails
    /// receipt validation.
    NewReceiptValidationError(ReceiptValidationError),
}
```

#### Error Messages {#error-messages-5}

```rust
ActionErrorKind::AccountAlreadyExists { account_id } 
"Can't create a new account {:?}, because it already exists"

ActionErrorKind::AccountDoesNotExist { account_id } 
"Can't complete the action because account {:?} doesn't exist"

ActionErrorKind::ActorNoPermission { actor_id, account_id } 
"Actor {:?} doesn't have permission to account {:?} to complete the action"

ActionErrorKind::RentUnpaid { account_id, amount } 
"The account {} wouldn't have enough balance to pay required rent {}"

ActionErrorKind::TriesToUnstake { account_id } 
"Account {:?} is not yet staked, but tries to unstake"

ActionErrorKind::TriesToStake { account_id, stake, locked, balance } 
"Account {:?} tries to stake {}, but has staked {} and only has {}"

ActionErrorKind::CreateAccountNotAllowed { account_id, predecessor_id } 
"The new account_id {:?} can't be created by {:?}"

ActionErrorKind::DeleteKeyDoesNotExist { account_id, .. } 
"Account {:?} tries to remove an access key that doesn't exist"

ActionErrorKind::AddKeyAlreadyExists { public_key, .. } 
"The public key {:?} is already used for an existing access key"

ActionErrorKind::DeleteAccountStaking { account_id }
"Account {:?} is staking and can not be deleted"

ActionErrorKind::DeleteAccountHasRent { account_id, balance } 
"Account {:?} can't be deleted. It has {}, which is enough to cover the rent"

ActionErrorKind::FunctionCallError(s) 

ActionErrorKind::NewReceiptValidationError(e) 
"An new action receipt created during a FunctionCall is not valid: {}"
```


### ReceiptValidationError {#receiptvalidationerror}

#### Definition {#definition-9}

```rust
/// Describes the error for validating a receipt.
pub enum ReceiptValidationError {
    /// The `predecessor_id` of a Receipt is not valid.
    InvalidPredecessorId { account_id: AccountId },
    /// The `receiver_id` of a Receipt is not valid.
    InvalidReceiverId { account_id: AccountId },
    /// The `signer_id` of an ActionReceipt is not valid.
    InvalidSignerId { account_id: AccountId },
    /// The `receiver_id` of a DataReceiver within an ActionReceipt is not valid.
    InvalidDataReceiverId { account_id: AccountId },
    /// The length of the returned data exceeded the limit in a DataReceipt.
    ReturnedValueLengthExceeded { length: u64, limit: u64 },
    /// The number of input data dependencies exceeds the limit in an ActionReceipt.
    NumberInputDataDependenciesExceeded { number_of_input_data_dependencies: u64, limit: u64 },
    /// An error occurred while validating actions of an ActionReceipt.
    ActionsValidation(ActionsValidationError),
}
```

#### Error Messages {#error-messages-6}

```rust
ReceiptValidationError::InvalidPredecessorId { account_id } 
"The predecessor_id `{}` of a Receipt is not valid."

ReceiptValidationError::InvalidReceiverId { account_id } 
"The receiver_id `{}` of a Receipt is not valid."

ReceiptValidationError::InvalidSignerId { account_id } 
"The signer_id `{}` of an ActionReceipt is not valid."

ReceiptValidationError::InvalidDataReceiverId { account_id } 
"The receiver_id `{}` of a DataReceiver within an ActionReceipt is not valid."

ReceiptValidationError::ReturnedValueLengthExceeded { length, limit } 
"The length of the returned data {} exceeded the limit {} in a DataReceipt"

ReceiptValidationError::NumberInputDataDependenciesExceeded { number_of_input_data_dependencies, limit } 
"The number of input data dependencies {} exceeded the limit {} in an ActionReceipt"

ReceiptValidationError::ActionsValidation(e) 
```


## VMError and subtypes {#vmerror-and-subtypes}

### VMError {#vmerror}

#### Definition {#definition-10}

```rust
pub enum VMError {
    FunctionCallError(FunctionCallError),
    /// Serialized external error from External trait implementation.
    ExternalError(Vec<u8>),
    /// An error that is caused by an operation on an inconsistent state.
    /// E.g. an integer overflow by using a value from the given context.
    InconsistentStateError(InconsistentStateError),
}
```

#### Error Messages {#error-messages-7}

```rust
VMError::ExternalError
  "Serialized ExternalError"
```

### FunctionCallError {#functioncallerror}

#### Definition {#definition-11}

```rust
pub enum FunctionCallError {
    CompilationError(CompilationError),
    LinkError { msg: String },
    MethodResolveError(MethodResolveError),
    WasmTrap { msg: String },
    HostError(HostError),
}
```

#### Error Messages {#error-messages-8}

```rust
FunctionCallError::WasmTrap
  "WebAssembly trap: {}"
```

### MethodResolveError {#methodresolveerror}

#### Definition {#definition-12}

```rust
pub enum MethodResolveError {
    MethodEmptyName,
    MethodUTF8Error,
    MethodNotFound,
    MethodInvalidSignature,
}
```

### CompilationError {#compilationerror}

#### Definition {#definition-13}

```rust
pub enum CompilationError {
    CodeDoesNotExist { account_id: String },
    PrepareError(PrepareError),
    WasmerCompileError { msg: String },
}
```
#### Error Messages {#error-messages-9}

```rust
CompilationError::CodeDoesNotExist
  "cannot find contract code for account {}"

CompilationError::PrepareError(p)
  "PrepareError: {}"

CompilationError::WasmerCompileError
  "Wasmer compilation error: {}"
```

### PrepareError {#prepareerror}

#### Definition {#definition-14}

```rust
/// Error that can occur while preparing or executing Wasm smart-contract.
pub enum PrepareError {
    /// Error happened while serializing the module.
    Serialization,
    /// Error happened while deserializing the module.
    Deserialization,
    /// Internal memory declaration has been found in the module.
    InternalMemoryDeclared,
    /// Gas instrumentation failed.
    ///
    /// This most likely indicates the module isn't valid.
    GasInstrumentation,
    /// Stack instrumentation failed.
    ///
    /// This  most likely indicates the module isn't valid.
    StackHeightInstrumentation,
    /// Error happened during instantiation.
    ///
    /// This might indicate that `start` function trapped, or module isn't
    /// instantiable and/or unlinkable.
    Instantiate,
    /// Error creating memory.
    Memory,
}
```

#### Error Messages {#error-messages-10}

```rust
Serialization
  "Error happened while serializing the module."

Deserialization
  "Error happened while deserializing the module."

InternalMemoryDeclared
  "Internal memory declaration has been found in the module."

GasInstrumentation
  "Gas instrumentation failed."

StackHeightInstrumentation
  "Stack instrumentation failed."

Instantiate
  "Error happened during instantiation."

Memory
  "Error creating memory"
```

### HostError {#hosterror}

#### Definition {#definition-15}

```rust
pub enum HostError {
    /// String encoding is bad UTF-16 sequence
    BadUTF16,
    /// String encoding is bad UTF-8 sequence
    BadUTF8,
    /// Exceeded the prepaid gas
    GasExceeded,
    /// Exceeded the maximum amount of gas allowed to burn per contract
    GasLimitExceeded,
    /// Exceeded the account balance
    BalanceExceeded,
    /// Tried to call an empty method name
    EmptyMethodName,
    /// Smart contract panicked
    GuestPanic { panic_msg: String },
    /// IntegerOverflow happened during a contract execution
    IntegerOverflow,
    /// `promise_idx` does not correspond to existing promises
    InvalidPromiseIndex { promise_idx: u64 },
    /// Actions can only be appended to non-joint promise.
    CannotAppendActionToJointPromise,
    /// Returning joint promise is currently prohibited
    CannotReturnJointPromise,
    /// Accessed invalid promise result index
    InvalidPromiseResultIndex { result_idx: u64 },
    /// Accessed invalid register id
    InvalidRegisterId { register_id: u64 },
    /// Iterator `iterator_index` was invalidated after its creation by performing a mutable operation on trie
    IteratorWasInvalidated { iterator_index: u64 },
    /// Accessed memory outside the bounds
    MemoryAccessViolation,
    /// VM Logic returned an invalid receipt index
    InvalidReceiptIndex { receipt_index: u64 },
    /// Iterator index `iterator_index` does not exist
    InvalidIteratorIndex { iterator_index: u64 },
    /// VM Logic returned an invalid account id
    InvalidAccountId,
    /// VM Logic returned an invalid method name
    InvalidMethodName,
    /// VM Logic provided an invalid public key
    InvalidPublicKey,
    /// `method_name` is not allowed in view calls
    ProhibitedInView { method_name: String },
    /// The total number of logs will exceed the limit.
    NumberOfLogsExceeded { limit: u64 },
    /// The storage key length exceeded the limit.
    KeyLengthExceeded { length: u64, limit: u64 },
    /// The storage value length exceeded the limit.
    ValueLengthExceeded { length: u64, limit: u64 },
    /// The total log length exceeded the limit.
    TotalLogLengthExceeded { length: u64, limit: u64 },
    /// The maximum number of promises within a FunctionCall exceeded the limit.
    NumberPromisesExceeded { number_of_promises: u64, limit: u64 },
    /// The maximum number of input data dependencies exceeded the limit.
    NumberInputDataDependenciesExceeded { number_of_input_data_dependencies: u64, limit: u64 },
    /// The returned value length exceeded the limit.
    ReturnedValueLengthExceeded { length: u64, limit: u64 },
    /// The contract size for DeployContract action exceeded the limit.
    ContractSizeExceeded { size: u64, limit: u64 },
}
```
#### Error Messages {#error-messages-11}
```rust
BadUTF8 
  "String encoding is bad UTF-8 sequence."

BadUTF16 
  "String encoding is bad UTF-16 sequence."

GasExceeded 
  "Exceeded the prepaid gas."

GasLimitExceeded 
  "Exceeded the maximum amount of gas allowed to burn per contract."

BalanceExceeded 
  "Exceeded the account balance."

EmptyMethodName 
  "Tried to call an empty method name."

GuestPanic { panic_msg } 
  "Smart contract panicked: {}"

IntegerOverflow 
  "Integer overflow."

InvalidIteratorIndex { iterator_index } 
  "Iterator index {:?} does not exist"

InvalidPromiseIndex { promise_idx } 
  "{:?} does not correspond to existing promises"

CannotAppendActionToJointPromise 
  "Actions can only be appended to non-joint promise."

CannotReturnJointPromise 
  "Returning joint promise is currently prohibited."

InvalidPromiseResultIndex { result_idx } 
  "Accessed invalid promise result index: {:?}"

InvalidRegisterId { register_id } 
  "Accessed invalid register id: {:?}"

IteratorWasInvalidated { iterator_index } 
  "Iterator {:?} was invalidated after its creation by performing a mutable operation on trie"

MemoryAccessViolation 
  "Accessed memory outside the bounds."

InvalidReceiptIndex { receipt_index } 
  "VM Logic returned an invalid receipt index: {:?}"

InvalidAccountId 
  "VM Logic returned an invalid account id"

InvalidMethodName 
  "VM Logic returned an invalid method name"

InvalidPublicKey 
  "VM Logic provided an invalid public key"

ProhibitedInView { method_name } 
  "{} is not allowed in view calls"

NumberOfLogsExceeded { limit } 
  "The number of logs will exceed the limit {}"

KeyLengthExceeded { length, limit } 
  "The length of a storage key {} exceeds the limit {}"

ValueLengthExceeded { length, limit } 
  "The length of a storage value {} exceeds the limit {}"

TotalLogLengthExceeded{ length, limit } 
  "The length of a log message {} exceeds the limit {}"

NumberPromisesExceeded { number_of_promises, limit } 
  "The number of promises within a FunctionCall {} exceeds the limit {}"

NumberInputDataDependenciesExceeded { number_of_input_data_dependencies, limit } 
  "The number of input data dependencies {} exceeds the limit {}"

ReturnedValueLengthExceeded { length, limit } 
  "The length of a returned value {} exceeds the limit {}"

ContractSizeExceeded { size, limit } 
  "The size of a contract code in DeployContract action {} exceeds the limit {}"

```


### VMLogicError {#vmlogicerror}

#### Definition {#definition-16}

```rust
pub enum VMLogicError {
    HostError(HostError),
    /// Serialized external error from External trait implementation.
    ExternalError(Vec<u8>),
    /// An error that is caused by an operation on an inconsistent state.
    InconsistentStateError(InconsistentStateError),
}
```

### InconsistentStateError {#inconsistentstateerror}

#### Definition {#definition-17}

```rust
pub enum InconsistentStateError {
    /// Math operation with a value from the state resulted in a integer overflow.
    IntegerOverflow,
}
```

#### Error Messages {#error-messages-12}
```rust
InconsistentStateError::IntegerOverflow
    "Math operation with a value from the state resulted in a integer overflow."
```


## RPC interface {#rpc-interface}

- error name
- error subtype(s)
- error properties

### Error Schema {#error-schema}

```json
{
  "schema": {
    "BadUTF16": {
      "name": "BadUTF16",
      "subtypes": [],
      "props": {}
    },
    "BadUTF8": {
      "name": "BadUTF8",
      "subtypes": [],
      "props": {}
    },
    "BalanceExceeded": {
      "name": "BalanceExceeded",
      "subtypes": [],
      "props": {}
    },
    "CannotAppendActionToJointPromise": {
      "name": "CannotAppendActionToJointPromise",
      "subtypes": [],
      "props": {}
    },
    "CannotReturnJointPromise": {
      "name": "CannotReturnJointPromise",
      "subtypes": [],
      "props": {}
    },
    "CodeDoesNotExist": {
      "name": "CodeDoesNotExist",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "CompilationError": {
      "name": "CompilationError",
      "subtypes": [
        "CodeDoesNotExist",
        "PrepareError",
        "WasmerCompileError"
      ],
      "props": {}
    },
    "ContractSizeExceeded": {
      "name": "ContractSizeExceeded",
      "subtypes": [],
      "props": {
        "limit": "",
        "size": ""
      }
    },
    "Deserialization": {
      "name": "Deserialization",
      "subtypes": [],
      "props": {}
    },
    "EmptyMethodName": {
      "name": "EmptyMethodName",
      "subtypes": [],
      "props": {}
    },
    "FunctionCallError": {
      "name": "FunctionCallError",
      "subtypes": [
        "CompilationError",
        "LinkError",
        "MethodResolveError",
        "WasmTrap",
        "HostError"
      ],
      "props": {}
    },
    "GasExceeded": {
      "name": "GasExceeded",
      "subtypes": [],
      "props": {}
    },
    "GasInstrumentation": {
      "name": "GasInstrumentation",
      "subtypes": [],
      "props": {}
    },
    "GasLimitExceeded": {
      "name": "GasLimitExceeded",
      "subtypes": [],
      "props": {}
    },
    "GuestPanic": {
      "name": "GuestPanic",
      "subtypes": [],
      "props": {
        "panic_msg": ""
      }
    },
    "HostError": {
      "name": "HostError",
      "subtypes": [
        "BadUTF16",
        "BadUTF8",
        "GasExceeded",
        "GasLimitExceeded",
        "BalanceExceeded",
        "EmptyMethodName",
        "GuestPanic",
        "IntegerOverflow",
        "InvalidPromiseIndex",
        "CannotAppendActionToJointPromise",
        "CannotReturnJointPromise",
        "InvalidPromiseResultIndex",
        "InvalidRegisterId",
        "IteratorWasInvalidated",
        "MemoryAccessViolation",
        "InvalidReceiptIndex",
        "InvalidIteratorIndex",
        "InvalidAccountId",
        "InvalidMethodName",
        "InvalidPublicKey",
        "ProhibitedInView",
        "NumberOfLogsExceeded",
        "KeyLengthExceeded",
        "ValueLengthExceeded",
        "TotalLogLengthExceeded",
        "NumberPromisesExceeded",
        "NumberInputDataDependenciesExceeded",
        "ReturnedValueLengthExceeded",
        "ContractSizeExceeded"
      ],
      "props": {}
    },
    "Instantiate": {
      "name": "Instantiate",
      "subtypes": [],
      "props": {}
    },
    "IntegerOverflow": {
      "name": "IntegerOverflow",
      "subtypes": [],
      "props": {}
    },
    "InternalMemoryDeclared": {
      "name": "InternalMemoryDeclared",
      "subtypes": [],
      "props": {}
    },
    "InvalidAccountId": {
      "name": "InvalidAccountId",
      "subtypes": [],
      "props": {}
    },
    "InvalidIteratorIndex": {
      "name": "InvalidIteratorIndex",
      "subtypes": [],
      "props": {
        "iterator_index": ""
      }
    },
    "InvalidMethodName": {
      "name": "InvalidMethodName",
      "subtypes": [],
      "props": {}
    },
    "InvalidPromiseIndex": {
      "name": "InvalidPromiseIndex",
      "subtypes": [],
      "props": {
        "promise_idx": ""
      }
    },
    "InvalidPromiseResultIndex": {
      "name": "InvalidPromiseResultIndex",
      "subtypes": [],
      "props": {
        "result_idx": ""
      }
    },
    "InvalidPublicKey": {
      "name": "InvalidPublicKey",
      "subtypes": [],
      "props": {}
    },
    "InvalidReceiptIndex": {
      "name": "InvalidReceiptIndex",
      "subtypes": [],
      "props": {
        "receipt_index": ""
      }
    },
    "InvalidRegisterId": {
      "name": "InvalidRegisterId",
      "subtypes": [],
      "props": {
        "register_id": ""
      }
    },
    "IteratorWasInvalidated": {
      "name": "IteratorWasInvalidated",
      "subtypes": [],
      "props": {
        "iterator_index": ""
      }
    },
    "KeyLengthExceeded": {
      "name": "KeyLengthExceeded",
      "subtypes": [],
      "props": {
        "length": "",
        "limit": ""
      }
    },
    "LinkError": {
      "name": "LinkError",
      "subtypes": [],
      "props": {
        "msg": ""
      }
    },
    "Memory": {
      "name": "Memory",
      "subtypes": [],
      "props": {}
    },
    "MemoryAccessViolation": {
      "name": "MemoryAccessViolation",
      "subtypes": [],
      "props": {}
    },
    "MethodEmptyName": {
      "name": "MethodEmptyName",
      "subtypes": [],
      "props": {}
    },
    "MethodInvalidSignature": {
      "name": "MethodInvalidSignature",
      "subtypes": [],
      "props": {}
    },
    "MethodNotFound": {
      "name": "MethodNotFound",
      "subtypes": [],
      "props": {}
    },
    "MethodResolveError": {
      "name": "MethodResolveError",
      "subtypes": [
        "MethodEmptyName",
        "MethodUTF8Error",
        "MethodNotFound",
        "MethodInvalidSignature"
      ],
      "props": {}
    },
    "MethodUTF8Error": {
      "name": "MethodUTF8Error",
      "subtypes": [],
      "props": {}
    },
    "NumberInputDataDependenciesExceeded": {
      "name": "NumberInputDataDependenciesExceeded",
      "subtypes": [],
      "props": {
        "limit": "",
        "number_of_input_data_dependencies": ""
      }
    },
    "NumberOfLogsExceeded": {
      "name": "NumberOfLogsExceeded",
      "subtypes": [],
      "props": {
        "limit": ""
      }
    },
    "NumberPromisesExceeded": {
      "name": "NumberPromisesExceeded",
      "subtypes": [],
      "props": {
        "limit": "",
        "number_of_promises": ""
      }
    },
    "PrepareError": {
      "name": "PrepareError",
      "subtypes": [
        "Serialization",
        "Deserialization",
        "InternalMemoryDeclared",
        "GasInstrumentation",
        "StackHeightInstrumentation",
        "Instantiate",
        "Memory"
      ],
      "props": {}
    },
    "ProhibitedInView": {
      "name": "ProhibitedInView",
      "subtypes": [],
      "props": {
        "method_name": ""
      }
    },
    "ReturnedValueLengthExceeded": {
      "name": "ReturnedValueLengthExceeded",
      "subtypes": [],
      "props": {
        "length": "",
        "limit": ""
      }
    },
    "Serialization": {
      "name": "Serialization",
      "subtypes": [],
      "props": {}
    },
    "StackHeightInstrumentation": {
      "name": "StackHeightInstrumentation",
      "subtypes": [],
      "props": {}
    },
    "TotalLogLengthExceeded": {
      "name": "TotalLogLengthExceeded",
      "subtypes": [],
      "props": {
        "length": "",
        "limit": ""
      }
    },
    "ValueLengthExceeded": {
      "name": "ValueLengthExceeded",
      "subtypes": [],
      "props": {
        "length": "",
        "limit": ""
      }
    },
    "WasmTrap": {
      "name": "WasmTrap",
      "subtypes": [],
      "props": {
        "msg": ""
      }
    },
    "WasmerCompileError": {
      "name": "WasmerCompileError",
      "subtypes": [],
      "props": {
        "msg": ""
      }
    },
    "AccessKeyNotFound": {
      "name": "AccessKeyNotFound",
      "subtypes": [],
      "props": {
        "account_id": "",
        "public_key": ""
      }
    },
    "AccountAlreadyExists": {
      "name": "AccountAlreadyExists",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "AccountDoesNotExist": {
      "name": "AccountDoesNotExist",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "ActionError": {
      "name": "ActionError",
      "subtypes": [
        "AccountAlreadyExists",
        "AccountDoesNotExist",
        "CreateAccountNotAllowed",
        "ActorNoPermission",
        "DeleteKeyDoesNotExist",
        "AddKeyAlreadyExists",
        "DeleteAccountStaking",
        "DeleteAccountHasRent",
        "RentUnpaid",
        "TriesToUnstake",
        "TriesToStake",
        "FunctionCallError",
        "NewReceiptValidationError"
      ],
      "props": {
        "index": ""
      }
    },
    "ActorNoPermission": {
      "name": "ActorNoPermission",
      "subtypes": [],
      "props": {
        "account_id": "",
        "actor_id": ""
      }
    },
    "AddKeyAlreadyExists": {
      "name": "AddKeyAlreadyExists",
      "subtypes": [],
      "props": {
        "account_id": "",
        "public_key": ""
      }
    },
    "BalanceMismatchError": {
      "name": "BalanceMismatchError",
      "subtypes": [],
      "props": {
        "final_accounts_balance": "",
        "final_postponed_receipts_balance": "",
        "incoming_receipts_balance": "",
        "incoming_validator_rewards": "",
        "initial_accounts_balance": "",
        "initial_postponed_receipts_balance": "",
        "new_delayed_receipts_balance": "",
        "outgoing_receipts_balance": "",
        "processed_delayed_receipts_balance": "",
        "total_balance_burnt": "",
        "total_balance_slashed": "",
        "total_rent_paid": "",
        "total_validator_reward": ""
      }
    },
    "CostOverflow": {
      "name": "CostOverflow",
      "subtypes": [],
      "props": {}
    },
    "CreateAccountNotAllowed": {
      "name": "CreateAccountNotAllowed",
      "subtypes": [],
      "props": {
        "account_id": "",
        "predecessor_id": ""
      }
    },
    "DeleteAccountHasRent": {
      "name": "DeleteAccountHasRent",
      "subtypes": [],
      "props": {
        "account_id": "",
        "balance": ""
      }
    },
    "DeleteAccountStaking": {
      "name": "DeleteAccountStaking",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "DeleteKeyDoesNotExist": {
      "name": "DeleteKeyDoesNotExist",
      "subtypes": [],
      "props": {
        "account_id": "",
        "public_key": ""
      }
    },
    "DepositWithFunctionCall": {
      "name": "DepositWithFunctionCall",
      "subtypes": [],
      "props": {}
    },
    "Expired": {
      "name": "Expired",
      "subtypes": [],
      "props": {}
    },
    "InvalidAccessKeyError": {
      "name": "InvalidAccessKeyError",
      "subtypes": [
        "AccessKeyNotFound",
        "ReceiverMismatch",
        "MethodNameMismatch",
        "RequiresFullAccess",
        "NotEnoughAllowance",
        "DepositWithFunctionCall"
      ],
      "props": {}
    },
    "InvalidChain": {
      "name": "InvalidChain",
      "subtypes": [],
      "props": {}
    },
    "InvalidNonce": {
      "name": "InvalidNonce",
      "subtypes": [],
      "props": {
        "ak_nonce": "",
        "tx_nonce": ""
      }
    },
    "InvalidReceiverId": {
      "name": "InvalidReceiverId",
      "subtypes": [],
      "props": {
        "receiver_id": ""
      }
    },
    "InvalidSignature": {
      "name": "InvalidSignature",
      "subtypes": [],
      "props": {}
    },
    "InvalidSignerId": {
      "name": "InvalidSignerId",
      "subtypes": [],
      "props": {
        "signer_id": ""
      }
    },
    "InvalidTxError": {
      "name": "InvalidTxError",
      "subtypes": [
        "InvalidAccessKeyError",
        "InvalidSignerId",
        "SignerDoesNotExist",
        "InvalidNonce",
        "InvalidReceiverId",
        "InvalidSignature",
        "NotEnoughBalance",
        "RentUnpaid",
        "CostOverflow",
        "InvalidChain",
        "Expired",
        "ActionsValidation"
      ],
      "props": {}
    },
    "MethodNameMismatch": {
      "name": "MethodNameMismatch",
      "subtypes": [],
      "props": {
        "method_name": ""
      }
    },
    "NotEnoughAllowance": {
      "name": "NotEnoughAllowance",
      "subtypes": [],
      "props": {
        "account_id": "",
        "allowance": "",
        "cost": "",
        "public_key": ""
      }
    },
    "NotEnoughBalance": {
      "name": "NotEnoughBalance",
      "subtypes": [],
      "props": {
        "balance": "",
        "cost": "",
        "signer_id": ""
      }
    },
    "ReceiverMismatch": {
      "name": "ReceiverMismatch",
      "subtypes": [],
      "props": {
        "ak_receiver": "",
        "tx_receiver": ""
      }
    },
    "RentUnpaid": {
      "name": "RentUnpaid",
      "subtypes": [],
      "props": {
        "account_id": "",
        "amount": ""
      }
    },
    "RequiresFullAccess": {
      "name": "RequiresFullAccess",
      "subtypes": [],
      "props": {}
    },
    "SignerDoesNotExist": {
      "name": "SignerDoesNotExist",
      "subtypes": [],
      "props": {
        "signer_id": ""
      }
    },
    "TriesToStake": {
      "name": "TriesToStake",
      "subtypes": [],
      "props": {
        "account_id": "",
        "balance": "",
        "locked": "",
        "stake": ""
      }
    },
    "TriesToUnstake": {
      "name": "TriesToUnstake",
      "subtypes": [],
      "props": {
        "account_id": ""
      }
    },
    "TxExecutionError": {
      "name": "TxExecutionError",
      "subtypes": [
        "ActionError",
        "InvalidTxError"
      ],
      "props": {}
    },
    "Closed": {
      "name": "Closed",
      "subtypes": [],
      "props": {}
    },
    "ServerError": {
      "name": "ServerError",
      "subtypes": [
        "TxExecutionError",
        "Timeout",
        "Closed"
      ],
      "props": {}
    },
    "Timeout": {
      "name": "Timeout",
      "subtypes": [],
      "props": {}
    }
  }
}
```

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol" target="_blank" rel="noopener noreferrer"> Ask it on StackOverflow! </a>
:::
