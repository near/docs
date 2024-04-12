---
id: introduction
title: 소개
sidebar_label: 소개
---

<blockquote className="info">
<strong>알고 계셨나요?</strong><br /><br />

[NEAR 플랫폼 개요](/concepts/welcome)는 이 섹션의 언어 대부분을 명확하게 설명합니다.

</blockquote>

## 트랜잭션 수명: {#the-life-of-a-transaction}

- 클라이언트는 트랜잭션을 생성하고, 트랜잭션 해시를 계산하며 이 해시에 서명하여 서명된 트랜잭션을 얻습니다. 이제 이 서명된 트랜잭션을 노드로 보낼 수 있습니다.
- RPC 인터페이스는 트랜잭션을 수신하고, `signer_id`를 사용하여 올바른 물리적 노드로 라우팅합니다.  `signer_id`는 단일 샤드에 있는 NEAR 계정 ID이여야 하므로, 계정은 샤드에 매핑되며, 그 뒤에 IP 주소로 하나 이상의 시스템을 실행하는 하나 이상의 밸리데이터가 뒤따릅니다.
- 노드가 서명된 새 트랜잭션을 수신하면, 서명자, 수신자, 계정 잔액, 비용 오버플로우, 서명 등에 대한 트랜잭션의 유효성을 검사하고([여기](https://nomicon.io/RuntimeSpec/Scenarios/FinancialTransaction.html#transaction-to-receipt) 참조), 동일한 샤드를 따르는 모든 피어 노드에 이를 전달합니다. 트랜잭션에 유효하지 않은 서명이 있거나, 최신 상태에서 유효하지 않을 경우, 트랜잭션은 신속하게 거부되고 원래 RPC 호출에 오류가 반환됩니다.
- 유효한 트랜잭션이 트랜잭션 풀에 추가됩니다(모든 밸리데이터 노드에는 고유한 트랜잭션 풀의 독립적인 복사본이 있음). 트랜잭션 풀은 아직 폐기되지 않았지만 체인에 포함되지 않은 트랜잭션들을 유지 관리합니다.
- 풀 반복자는 풀이 고갈되거나 일부 청크 제한(청크당 최대 트랜잭션 수 또는 처리할 청크당 최대 가스 소각)에 도달할 때까지, 가장 작은 논스에서 가장 큰 순서로 풀에서 트랜잭션을 한 번에 하나씩 선택하는 데 사용됩니다.  Please refer to articles on the [pool iterator](https://nomicon.io/ChainSpec/Transactions.html?highlight=pool#pool-iterator) and [gas](/concepts/protocol/gas) for more details.
- 샤딩된 블록체인의 분산된 특성을 수용하기 위해, 모든 트랜잭션은 3개의 개별 레이어가 있는 분리된 트랜잭션 풀로 반환됩니다. 이는 수락된 트랜잭션(다음 청크에서 처리될 예정), 보류 중인 트랜잭션(현재 청크의 한도를 초과한 트랜잭션. 차후 처리 라운드에 포함될 예정) 및 유효하지 않은 트랜잭션(다음 번에 거부될 예정)으로 구성됩니다.
- 청크가 생성되기 전에, 트랜잭션이 다시 정렬되고 유효성이 검사됩니다. 이는 분산 시스템 전체에서 유효한 트랜잭션만으로 구성된 청크를 생성하기 위함입니다.
- 트랜잭션이 청크에서 처리되는 동안, 트랜잭션 내 Action 적용으로 인해 발생한 오류도 RPC를 통해 반환됩니다.

## NEAR 플랫폼 오류 {#near-platform-errors}

NEAR 플랫폼에서 발생한 오류는 `nearcore` 내 다음 위치에서 구현됩니다.

- [nearcore/core/primitives/src/errors.rs](https://github.com/near/nearcore/blob/master/core/primitives/src/errors.rs)
- [nearcore/runtime/near-vm-errors/src/lib.rs](https://github.com/near/nearcore/blob/master/runtime/near-vm-errors/src/lib.rs)

이 페이지는 다음을 포함합니다.

- **RuntimeError 및 하위 유형**: 트랜잭션이 대상 노드에서 처음 수신되고 처리되어 청크에 적용되기 전에 다시 발생하는 오류입니다.
- **TxExecutionError 및 하위 유형**: 트랜잭션 및 포함된 Action의 유효성을 검사하고 청크에 적용하는 동안 발생하는 오류입니다.
- **VMerror 및 하위 유형**: NEAR VM이 Wasm 컨트랙트를 실행하는 동안 발생하는 오류입니다.

### RuntimeError 및 하위 유형 {#runtimeerror-and-subtypes}

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

### TxExecutionError 및 하위 유형 {#txexecutionerror-and-subtypes}

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

### VMerror 및 하위 유형 {#vmerror-and-subtypes}

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

:::tip 질문이 있으신가요? <a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
