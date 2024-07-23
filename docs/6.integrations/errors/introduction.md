---
id: introduction
title: Introduction
sidebar_label: Introduction
---

<blockquote className="info">
<strong>did you know?</strong><br /><br />

The [NEAR Platform overview](/concepts/basics/protocol) clarifies much of the language in this section.

</blockquote>

## The life of a transaction: {#the-life-of-a-transaction}

- A client creates a transaction, computes the transaction hash and signs this hash to get a signed transaction. Now this signed transaction can be sent to a node.
- The RPC interface receives the transaction and routes it to the correct physical node using `signer_id`.  Since the `signer_id` must be a NEAR Account ID which lives on a single shard, the account is mapped to a shard which is followed by at least one validator running at least one machine with an IP address.
- When a node receives a new signed transaction, it validates the transaction for signer, receiver, account balance, cost overflow, signature, etc. ([see here](https://nomicon.io/RuntimeSpec/Scenarios/FinancialTransaction.html#transaction-to-receipt)) and gossips it to all peers following the same shard. If a transaction has an invalid signature or would be invalid on the latest state, it is rejected quickly and returns an error to the original RPC call. 
- Valid transactions are added to the transaction pool (every validating node has its own independent copy of a transaction pool). The transaction pool maintains transactions that are not yet discarded and not yet included into the chain.
- A pool iterator is used to pick transactions from the pool one at a time, ordered from the smallest nonce to largest, until the pool is drained or some chunk limit is reached (max number of transactions per chunk or max gas burnt per chunk to process transactions).  Please refer to articles on the [pool iterator](https://nomicon.io/ChainSpec/Transactions.html?highlight=pool#pool-iterator) and [gas](/concepts/protocol/gas) for more details.
- To accommodate the distributed nature of a sharded blockchain, all transactions are subsequently returned to a segmented transaction pool having 3 distinct layers: accepted transactions (which will be processed on the next chunk), pending transactions (which exceeded the limits of the current chunk and will be included in a later round of processing) and invalid transactions (which will be rejected at the next available opportunity).
- Before producing a chunk, transactions are ordered and validated again. This is done to produce chunks with only valid transactions across a distributed system.
- While a transaction is being processed on to a chunk, any errors raised by the application of its actions are also returned via RPC.


## NEAR Platform Errors {#near-platform-errors}

Errors raised by the NEAR platform are implemented in the following locations in `nearcore`:

- [nearcore/core/primitives/src/errors.rs](https://github.com/near/nearcore/blob/master/core/primitives/src/errors.rs)
- [nearcore/runtime/near-vm-errors/src/lib.rs](https://github.com/near/nearcore/blob/master/runtime/near-vm-errors/src/lib.rs)

This page includes: 
- **RuntimeError and subtypes**: errors raised when a transaction is first received by the destination node and again before it's processed and applied to a chunk
- **TxExecutionError and subtypes**: errors raised while a transaction and its component action(s) are being validated and applied to a chunk
- **VMerror and subtypes**: errors raised during the execution of a Wasm contract by the NEAR VM

### RuntimeError and subtypes {#runtimeerror-and-subtypes}

```text
RuntimeError                                              Error returned from `Runtime::apply  
  StorageError                                            Unexpected error which is typically related to the node storage corruption.account
  BalanceMismatchError                                    An error happens if `check_balance` fails, which is likely an indication of an invalid state
  InvalidTxError                                          An error happened during TX verification and account charging
    InvalidAccessKeyError                                 Describes the error for validating access key
    ActionsValidationError                                Describes the error for validating a list of actions    
      TotalPrepaidGasExceeded                             The total prepaid gas (for all given actions) exceeded the limit.
      TotalNumberOfActionsExceeded                        The number of actions exceeded the given limit.
      AddKeyMethodNamesNumberOfBytesExceeded              The total number of bytes of the method names exceeded the limit in a Add Key action.
      AddKeyMethodNameLengthExceeded                      The length of some method name exceeded the limit in a Add Key action.
      IntegerOverflow                                     Integer overflow during a compute.
      InvalidAccountId                                    Invalid account ID.
      ContractSizeExceeded                                The size of the contract code exceeded the limit in a DeployContract action.
      FunctionCallMethodNameLengthExceeded                The length of the method name exceeded the limit in a Function Call action.
      FunctionCallArgumentsLengthExceeded                 The length of the arguments exceeded the limit in a Function Call action.
```

### TxExecutionError and subtypes {#txexecutionerror-and-subtypes}

```text
TxExecutionError                                          Error returned in the ExecutionOutcome in case of failure
  InvalidTxError                                          An error happened during Transaction execution
    InvalidAccessKeyError                                 Describes the error for validating access key
    ActionsValidationError                                Describes the error for validating a list of actions
      TotalPrepaidGasExceeded                             The total prepaid gas (for all given actions) exceeded the limit.
      TotalNumberOfActionsExceeded                        The number of actions exceeded the given limit.
      AddKeyMethodNamesNumberOfBytesExceeded              The total number of bytes of the method names exceeded the limit in a Add Key action.
      AddKeyMethodNameLengthExceeded                      The length of some method name exceeded the limit in a Add Key action.
      IntegerOverflow                                     Integer overflow during a compute.
      InvalidAccountId                                    Invalid account ID.
      ContractSizeExceeded                                The size of the contract code exceeded the limit in a DeployContract action.
      FunctionCallMethodNameLengthExceeded                The length of the method name exceeded the limit in a Function Call action.
      FunctionCallArgumentsLengthExceeded                 The length of the arguments exceeded the limit in a Function Call action.
  ActionError                                             An error happened during Acton execution
    ActionErrorKind                                       The kind of ActionError happened
      RuntimeCallError 
      ReceiptValidationError                              Describes the error for validating a receipt
        ActionsValidationError                            Describes the error for validating a list of actions    
          TotalPrepaidGasExceeded                         The total prepaid gas (for all given actions) exceeded the limit.
          TotalNumberOfActionsExceeded                    The number of actions exceeded the given limit.
          AddKeyMethodNamesNumberOfBytesExceeded          The total number of bytes of the method names exceeded the limit in a Add Key action.
          AddKeyMethodNameLengthExceeded                  The length of some method name exceeded the limit in a Add Key action.
          IntegerOverflow                                 Integer overflow during a compute.
          InvalidAccountId                                Invalid account ID.
          ContractSizeExceeded                            The size of the contract code exceeded the limit in a DeployContract action.
          FunctionCallMethodNameLengthExceeded            The length of the method name exceeded the limit in a Function Call action.
          FunctionCallArgumentsLengthExceeded             The length of the arguments exceeded the limit in a Function Call action.
```


### VMerror and subtypes {#vmerror-and-subtypes}

```text
VMerror                                                   An error that occurs in the NEAR virtual machine
  ExternalError                                           Serialized external error from External trait implementation
  InconsistentStateError                                  An error that is caused by an operation on an inconsistent state (ie. an integer overflow by using a value from the given context
    IntegerOverflow                                       Math operation with a value from the state resulted in a integer overflow
  FunctionCallError 
    LinkError 
    WasmTrap 
    MethodResolveError 
      MethodEmptyName 
      MethodUTF8Error 
      MethodNotFound 
      MethodInvalidSignature 
    HostError 
      BadUTF16                                            String encoding is bad UTF-16 sequence
      BadUTF8                                             String encoding is bad UTF-8 sequence
      GasExceeded                                         Exceeded the prepaid ga
      GasLimitExceeded                                    Exceeded the maximum amount of gas allowed to burn per contract
      BalanceExceeded                                     Exceeded the account balance
      EmptyMethodName                                     Tried to call an empty method nam
      GuestPanic                                          Smart contract panicked
      IntegerOverflow                                     IntegerOverflow happened during a contract execution
      InvalidPromiseIndex                                 `promise_idx` does not correspond to existing promises
      CannotAppendActionToJointPromise                    Actions can only be appended to non-joint promise.
      CannotReturnJointPromise                            Returning joint promise is currently prohibited
      InvalidPromiseResultIndex                           Accessed invalid promise result index
      InvalidRegisterId                                   Accessed invalid register id
      IteratorWasInvalidated                              Iterator `iterator_index` was invalidated after its creation by performing a mutable operation on trie
      MemoryAccessViolation                               Accessed memory outside the bounds
      InvalidReceiptIndex                                 VM Logic returned an invalid receipt index
      InvalidIteratorIndex                                Iterator index `iterator_index` does not exist
      InvalidAccountId                                    VM Logic returned an invalid account id
      InvalidMethodName                                   VM Logic returned an invalid method name
      InvalidPublicKey                                    VM Logic provided an invalid public key
      ProhibitedInView                                    `method_name` is not allowed in view calls
      NumberOfLogsExceeded                                The total number of logs will exceed the limit.
      KeyLengthExceeded                                   The storage key length exceeded the limit.
      ValueLengthExceeded                                 The storage value length exceeded the limit.
      TotalLogLengthExceeded                              The total log length exceeded the limit.
      NumberPromisesExceeded                              The maximum number of promises within a FunctionCall exceeded the limit.
      NumberInputDataDependenciesExceeded                 The maximum number of input data dependencies exceeded the limit.
      ReturnedValueLengthExceeded                         The returned value length exceeded the limit.
      ContractSizeExceeded                                The contract size for DeployContract action exceeded the limit.
    CompilationError 
      CodeDoesNotExist 
      WasmerCompileError 
      PrepareError                                        Error that can occur while preparing or executing Wasm smart-contract
        Serialization                                     Error happened while serializing the module
        Deserialization                                   Error happened while deserializing the module
        InternalMemoryDeclared                            Internal memory declaration has been found in the module
        GasInstrumentation                                Gas instrumentation failed.  This most likely indicates the module isn't valid
        StackHeightInstrumentation                        Stack instrumentation failed.  This  most likely indicates the module isn't valid
        Instantiate                                       Error happened during instantiation.  This might indicate that `start` function trapped, or module isn't instantiable and/or unlinkable
        Memory                                            Error creating memory
```

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol" target="_blank" rel="noopener noreferrer"> Ask it on StackOverflow! </a>
:::
