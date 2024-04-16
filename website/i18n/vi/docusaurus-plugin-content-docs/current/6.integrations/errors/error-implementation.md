---
id: error-implementation
title: Đánh Giá Source Code
sidebar_label: Đánh Giá Source Code
---

Bài viết này cung cấp một cái nhìn rất tổng quát về các loại lỗi và thông điệp tương ứng được thực hiện bởi nền tảng NEAR, đôi khi là "pseudocode".

Các lỗi do NEAR platform đưa ra được thực hiện ở các file sau trong `nearcore`:

- [nearcore/core/primitives/src/errors.rs](https://github.com/near/nearcore/blob/master/core/primitives/src/errors.rs)
- [nearcore/runtime/near-vm-errors/src/lib.rs](https://github.com/near/nearcore/blob/master/runtime/near-vm-errors/src/lib.rs)

---

## RuntimeError và các subtype {#runtimeerror-and-subtypes}

### RuntimeError {#runtimeerror}

#### Định nghĩa {#definition}

```rust
/// Lỗi được trả về từ `Runtime::apply`
pub enum RuntimeError {
    ///  Đã xảy ra lỗi tràn số integer không mong muốn. Vấn đề có thể là một state hoặc một quá trình chuyển đổi không hợp lệ.
    UnexpectedIntegerOverflow,
    /// Lỗi đã xảy ra trong quá trình xác thực TX và tính phí account. Có thể là chunk không hợp lệ.
    /// và cần được challenge.
    InvalidTxError(InvalidTxError),
    /// Lỗi không mong muốn thường liên quan đến lỗi storage của node.
    /// Đó có thể là input state không hợp lệ hoặc độc hại.
    StorageError(StorageError),
    /// Lỗi xảy ra nếu `check_balance` thất bại, nó có thể là dấu hiệu của một state không hợp lệ.
    BalanceMismatchError(BalanceMismatchError),
}
```

#### Thông Báo Lỗi {#error-messages}

- xem dưới đây: `InvalidTxError`, `StorageError` và `BalanceMismatchError`

### InvalidTxError {#invalidtxerror}

#### Định nghĩa {#definition-1}

```rust
/// Lỗi đã xảy ra trong quá trình thực thi TX
pub enum InvalidTxError {
    /// Xảy ra nếu sử dụng sai AccessKey hoặc AccessKey không có đủ permission.
    InvalidAccessKeyError(InvalidAccessKeyError),
    /// TX signer_id không có format hợp lệ hoặc không thỏa mãn các yêu cầu, xem thêm `near_core::primitives::utils::is_valid_account_id`
    InvalidSignerId { signer_id: AccountId },
    /// TX signer_id không được tìm thấy trong storage
    SignerDoesNotExist { signer_id: AccountId },
    /// Transaction nonce phải là account[access_key].nonce + 1
    InvalidNonce { tx_nonce: Nonce, ak_nonce: Nonce },
    /// TX receiver_id không có format hợp lệ hoặc không thỏa mãn các yêu cầu, xem thêm `near_core::primitives::utils::is_valid_account_id`
    InvalidReceiverId { receiver_id: AccountId },
    /// TX signature không hợp lệ
    InvalidSignature,
    /// Account không đủ số dư để trang trải chi phí TX
    NotEnoughBalance {
        signer_id: AccountId,
        balance: Balance,
        cost: Balance,
    },
    /// Signer account chưa trả tiền thuê
    RentUnpaid {
        /// Account được yêu cầu trả tiền thuê
        signer_id: AccountId,
        /// Số dư yêu cầu để trang trải cho tiền thuê của state
        amount: Balance,
    },
    /// Lỗi tràn số integer đã xảy ra trong quá trình ước tính chi phí của transaction.
    CostOverflow,
    /// Parent block hash của transaction không thuộc về chain hiện tại
    InvalidChain,
    /// Transaction đã hết hạn
    Expired,
    /// Lỗi đã xảy ra trong quá trình xác nhận các action của một Transaction.
    ActionsValidation(ActionsValidationError),
}
```


#### Thông Báo Lỗi {#error-messages-1}

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

#### Định nghĩa {#definition-2}

```rust
pub enum StorageError {
    /// Lỗi xảy ra bên trong của key-value db
    StorageInternalError,
    /// Storage là PartialStorage và yêu cầu một trie node bị thiếu
    TrieNodeMissing,
    /// State không hợp lệ hoặc key-value db bị lỗi.
    /// Đối với PartialStorage nó không thể bị lỗi.
    /// Thông báo lỗi không đáng tin cậy và chỉ dành cho mục đích debug. Nó cũng có thể ổn khi
    /// panic tại bất cứ nơi nào tạo ra lỗi này.
    /// Chúng ta có thể kiểm tra nếu db bị lỗi hay không bằng cách xác minh mọi thứ trong state trie.
    StorageInconsistentState(String),
}
```

### BalanceMismatchError {#balancemismatcherror}

#### Định nghĩa {#definition-3}

```rust
/// Xảy ra khi số dư đầu vào không khớp với số dư đầu ra khi áp dụng Runtime.
pub struct BalanceMismatchError {
    // Các số dư đầu vào
    pub incoming_validator_rewards: Balance,
    pub initial_accounts_balance: Balance,
    pub incoming_receipts_balance: Balance,
    pub processed_delayed_receipts_balance: Balance,
    pub initial_postponed_receipts_balance: Balance,
    // Các số dư đầu ra
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

#### Thông Báo Lỗi {#error-messages-2}

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

#### Định nghĩa {#definition-4}

```rust
pub enum InvalidAccessKeyError {
    /// Access key xác định bởi `public_key` không tồn tại với account
    AccessKeyNotFound { account_id: AccountId, public_key: PublicKey },
    /// `receiver_id` của transaction không khớp với receiver_id của access key
    ReceiverMismatch { tx_receiver: AccountId, ak_receiver: AccountId },
    /// Tên method của transaction không được cho phép bởi access key
    MethodNameMismatch { method_name: String },
    /// Transaction yêu cầu một full permission access key.
    RequiresFullAccess,
    /// Access Key không đủ khoản tiền cho phép để chi trả cho chi phí của transaction
    NotEnoughAllowance {
        account_id: AccountId,
        public_key: PublicKey,
        allowance: Balance,
        cost: Balance,
    },
    /// Có khoản tiền gửi trong một function call action không được cho phép với một function call access key.
    DepositWithFunctionCall,
}
```

#### Thông Báo Lỗi {#error-messages-3}

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

#### Định nghĩa {#definition-5}

```rust
/// Mô tả lỗi của việc xác nhận một danh sách các action.
pub enum ActionsValidationError {
    /// Tổng gas trả trước (của tất cả các action) đã vượt quá giới hạn.
    TotalPrepaidGasExceeded { total_prepaid_gas: Gas, limit: Gas },
    /// Số lượng các action vượt quá giới hạn cho trước.
    TotalNumberOfActionsExceeded { total_number_of_actions: u64, limit: u64 },
    /// Tổng số byte của các tên method đã vượt quá giới hạn trong action Add Key.
    AddKeyMethodNamesNumberOfBytesExceeded { total_number_of_bytes: u64, limit: u64 },
    /// Chiều dài của một số tên method đã vượt quá giới hạn trong action Add Key.
    AddKeyMethodNameLengthExceeded { length: u64, limit: u64 },
    /// Lỗi tràn số integer trong quá trình tính toán.
    IntegerOverflow,
    /// Account ID không hợp lệ.
    InvalidAccountId { account_id: AccountId },
    /// Kích thước code của contract đã vượt quá giới hạn trong action DeployContract.
    ContractSizeExceeded { size: u64, limit: u64 },
    /// Chiều dài của một số tên method đã vượt quá giới hạn trong action Function Call.
    FunctionCallMethodNameLengthExceeded { length: u64, limit: u64 },
    /// Chiều dài của các tham số đã vượt quá giới hạn trong action Function Call.
    FunctionCallArgumentsLengthExceeded { length: u64, limit: u64 },
}
```

#### Thông Báo Lỗi {#error-messages-4}

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

## TxExecutionError và các subtype {#txexecutionerror-and-subtypes}

### TxExecutionError {#txexecutionerror}

#### Định nghĩa {#definition-6}
```rust
/// Có lỗi trả về của ExecutionOutcome trong trường hợp thất bại
pub enum TxExecutionError {
    /// Lỗi đã xảy ra trong quá trình thực thi Action
    ActionError(ActionError),
    /// Lỗi đã xảy ra trong quá trình thực thi Transaction
    InvalidTxError(InvalidTxError),
}
```

### ActionError {#actionerror}

#### Định nghĩa {#definition-7}

```rust
ActionError
pub struct ActionError {
    /// Index của action thất bại trong transaction.
    /// Action index không được xác định nếu ActionError.kind là `ActionErrorKind::RentUnpaid`
    pub index: Option<u64>,
    /// Loại ActionError đã xảy ra
    pub kind: ActionErrorKind,
}
```

### ActionErrorKind {#actionerrorkind}

#### Định nghĩa {#definition-8}

```rust
pub enum ActionErrorKind {
    /// Xảy ra khi action CreateAccount cố gắng tạo account với account_id đã tồn tại trong storage
    AccountAlreadyExists { account_id: AccountId },
    /// Xảy ra khi receiver_id của TX không tồn tại (nhưng action không phải là Action::CreateAccount)
    AccountDoesNotExist { account_id: AccountId },
    /// Account mới vừa được tạo phải nằm dưới namespace của account người tạo
    CreateAccountNotAllowed { account_id: AccountId, predecessor_id: AccountId },
    /// Các action quản trị như `DeployContract`, `Stake`, `AddKey`, `DeleteKey`. chỉ có thể tiến hành nếu sender=receiver
    /// hoặc action đầu tiên của TX là action `CreateAccount`
    ActorNoPermission { account_id: AccountId, actor_id: AccountId },
    /// Account cố gắng xóa một access key không tồn tại
    DeleteKeyDoesNotExist { account_id: AccountId, public_key: PublicKey },
    /// Public key được dùng cho một access key đã tồn tại
    AddKeyAlreadyExists { account_id: AccountId, public_key: PublicKey },
    /// Account đang stake và không thể xóa được.
    DeleteAccountStaking { account_id: AccountId },
    /// Foreign sender (sender=!receiver) chỉ có thể xóa một account nếu account đó không có đủ token để trả phí thuê
    DeleteAccountHasRent {
        account_id: AccountId,
        balance: Balance,
    },
    /// ActionReceipt không thể được hoàn tất, bởi vì số dư còn lại không đủ để trả phí thuê.
    RentUnpaid {
        /// Account được yêu cầu để trả phí thuê
        account_id: AccountId,
        /// Phí thuê phải trả.
        amount: Balance,
    },
    /// Account không stake, nhưng cố gắng unstake
    TriesToUnstake { account_id: AccountId },
    /// Account không đủ số dư để tăng khoản tiền stake.
    TriesToStake {
        account_id: AccountId,
        stake: Balance,
        locked: Balance,
        balance: Balance,
    },
    /// Lỗi đã xảy ra trong Action `FunctionCall`.
    FunctionCallError(FunctionCallError),
    /// Lỗi xảy ra khi `ActionReceipt` mới được tạo bởi action `FunctionCall` thất bại
    /// trong quá trình xác nhận receipt.
    NewReceiptValidationError(ReceiptValidationError),
}
```

#### Thông Báo Lỗi {#error-messages-5}

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

#### Định nghĩa {#definition-9}

```rust
/// Mô tả lỗi cho quá trình xác nhận receipt.
pub enum ReceiptValidationError {
    /// `predecessor_id` của Receipt không hợp lệ.
    InvalidPredecessorId { account_id: AccountId },
    /// `receiver_id` của Receipt không hợp lệ.
    InvalidReceiverId { account_id: AccountId },
    /// `signer_id` của ActionReceipt không hợp lệ.
    InvalidSignerId { account_id: AccountId },
    /// `receiver_id` của DataReceiver nằm trong ActionReceipt không hợp lệ.
    InvalidDataReceiverId { account_id: AccountId },
    /// Chiều dài của dữ liệu trả về đã vượt quá giới hạn trong DataReceipt.
    ReturnedValueLengthExceeded { length: u64, limit: u64 },
    /// Số lượng các dependency của dữ liệu đầu vào đã vượt quá giới hạn trong ActionReceipt.
    NumberInputDataDependenciesExceeded { number_of_input_data_dependencies: u64, limit: u64 },
    /// Lỗi đã xảy ra trong quá trình xác nhận các action của một ActionReceipt.
    ActionsValidation(ActionsValidationError),
}
```

#### Thông Báo Lỗi {#error-messages-6}

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


## VMError và các subtype {#vmerror-and-subtypes}

### VMError {#vmerror}

#### Định nghĩa {#definition-10}

```rust
pub enum VMError {
    FunctionCallError(FunctionCallError),
    /// Lỗi bên ngoài từ việc thực hiện External trait được serialize.
    ExternalError(Vec<u8>),
    /// Lỗi xảy ra bởi hoạt động trên một state không đồng nhất.
    /// Ví dụ lỗi tràn số integer khi sử dụng một giá trị từ một context cho trước.
    InconsistentStateError(InconsistentStateError),
}
```

#### Thông Báo Lỗi {#error-messages-7}

```rust
VMError::ExternalError
  "Serialized ExternalError"
```

### FunctionCallError {#functioncallerror}

#### Định nghĩa {#definition-11}

```rust
pub enum FunctionCallError {
    CompilationError(CompilationError),
    LinkError { msg: String },
    MethodResolveError(MethodResolveError),
    WasmTrap { msg: String },
    HostError(HostError),
}
```

#### Thông Báo Lỗi {#error-messages-8}

```rust
FunctionCallError::WasmTrap
  "WebAssembly trap: {}"
```

### MethodResolveError {#methodresolveerror}

#### Định nghĩa {#definition-12}

```rust
pub enum MethodResolveError {
    MethodEmptyName,
    MethodUTF8Error,
    MethodNotFound,
    MethodInvalidSignature,
}
```

### CompilationError {#compilationerror}

#### Định nghĩa {#definition-13}

```rust
pub enum CompilationError {
    CodeDoesNotExist { account_id: String },
    PrepareError(PrepareError),
    WasmerCompileError { msg: String },
}
```
#### Thông Báo Lỗi {#error-messages-9}

```rust
CompilationError::CodeDoesNotExist
  "cannot find contract code for account {}"

CompilationError::PrepareError(p)
  "PrepareError: {}"

CompilationError::WasmerCompileError
  "Wasmer compilation error: {}"
```

### PrepareError {#prepareerror}

#### Định nghĩa {#definition-14}

```rust
/// Lỗi xảy ra khi chuẩn bị hoặc thực thi Wasm smart-contract.
pub enum PrepareError {
    /// Lỗi đã xảy ra trong khi serialize module.
    Serialization,
    /// Lỗi đã xảy ra trong khi deserialize module.
    Deserialization,
    /// Khai báo bộ nhớ bên trong đã được tìm thấy trong module.
    InternalMemoryDeclared,
    /// Thất bại trong việc đo đạc gas.
    ///
    /// Điều này cho thấy rất có thể module không hợp lệ.
    GasInstrumentation,
    /// Thất bại trong việc đo đạc stack.
    ///
    /// Điều này cho thấy rất có thể module không hợp lệ.
    StackHeightInstrumentation,
    /// Lỗi đã xảy ra trong quá trình khởi tạo.
    ///
    /// Điều này chỉ ra rằng có thể function `start` bị kẹt, hoặc module không
    /// thể khởi tạo và/hoặc không thể kết nối được.
    Instantiate,
    /// Lỗi khi tạo bộ nhớ.
    Memory,
}
```

#### Thông Báo Lỗi {#error-messages-10}

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

#### Định nghĩa {#definition-15}

```rust
pub enum HostError {
    /// String encoding không phải là một chuỗi UTF-16
    BadUTF16,
    /// String encoding không phải là một chuỗi UTF-8
    BadUTF8,
    /// Đã vượt quá lượng gas trả trước
    GasExceeded,
    /// Đã vượt quá số lượng gas tối đa được cho phép burn cho mỗi contract
    GasLimitExceeded,
    /// Đã vượt quá số dư của account
    BalanceExceeded,
    /// Đã cố gắng call tên method rỗng
    EmptyMethodName,
    /// Smart contract đã panic
    GuestPanic { panic_msg: String },
    /// IntegerOverflow đã xảy ra trong quá trình thực thi contract
    IntegerOverflow,
    /// `promise_idx` không tương ứng với các promise hiện có
    InvalidPromiseIndex { promise_idx: u64 },
    /// Các action chỉ có thể nối thêm với các non-joint promise.
    CannotAppendActionToJointPromise,
    /// Trả về joint promise đang bị cấm
    CannotReturnJointPromise,
    /// Đã truy cập vào index kết quả không hợp lệ của promise
    InvalidPromiseResultIndex { result_idx: u64 },
    /// Đã truy cập vào register id không hợp lệ
    InvalidRegisterId { register_id: u64 },
    /// Iterator `iterator_index` đã bị vô hiệu sau khi nó được tạo ra bằng cách thực thi một hành động mutable trên trie
    IteratorWasInvalidated { iterator_index: u64 },
    /// Đã truy cập ngoài vùng nhớ
    MemoryAccessViolation,
    /// VM Logic đã trả về một receipt index không hợp lệ
    InvalidReceiptIndex { receipt_index: u64 },
    /// Iterator index `iterator_index` không tồn tại
    InvalidIteratorIndex { iterator_index: u64 },
    /// VM Logic đã trả về account id không hợp lệ
    InvalidAccountId,
    /// VM Logic đã trả về tên method không hợp lệ
    InvalidMethodName,
    /// VM Logic đã cung cấp public key không hợp lệ
    InvalidPublicKey,
    /// `method_name` không được cho phép trong view call
    ProhibitedInView { method_name: String },
    /// Tổng số lượng log sẽ vượt quá giới hạn.
    NumberOfLogsExceeded { limit: u64 },
    /// Chiều dài của storage key đã vượt quá giới hạn.
    KeyLengthExceeded { length: u64, limit: u64 },
    /// Chiều dài của storage value đã vượt quá giới hạn.
    ValueLengthExceeded { length: u64, limit: u64 },
    /// Tổng số chiều dài của log đã vượt quá giới hạn.
    TotalLogLengthExceeded { length: u64, limit: u64 },
    /// Số lượng promise tối đa trong một FunctionCall đã vượt quá giới hạn.
    NumberPromisesExceeded { number_of_promises: u64, limit: u64 },
    /// Số lượng dependency tối đa của dữ liệu đầu vào đã vượt quá giới hạn.
    NumberInputDataDependenciesExceeded { number_of_input_data_dependencies: u64, limit: u64 },
    /// Chiều dài của giá trị trả về đã vượt quá giới hạn.
    ReturnedValueLengthExceeded { length: u64, limit: u64 },
    /// Kích thước contract cho action DeployContract đã vượt quá giới hạn.
    ContractSizeExceeded { size: u64, limit: u64 },
}
```
#### Thông Báo Lỗi {#error-messages-11}
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

#### Định nghĩa {#definition-16}

```rust
pub enum VMLogicError {
    HostError(HostError),
    /// Lỗi bên ngoài từ việc thực hiện External trait được serialize.
    ExternalError(Vec<u8>),
    /// Lỗi xảy ra bởi hoạt động trên một state không đồng nhất.
    InconsistentStateError(InconsistentStateError),
}
```

### InconsistentStateError {#inconsistentstateerror}

#### Định nghĩa {#definition-17}

```rust
pub enum InconsistentStateError {
    /// Hoạt động tính toán với giá trị từ state đã trả về một lỗi tràn số integer.
    IntegerOverflow,
}
```

#### Thông Báo Lỗi {#error-messages-12}
```rust
InconsistentStateError::IntegerOverflow
    "Math operation with a value from the state resulted in a integer overflow."
```


## RPC interface {#rpc-interface}

- tên lỗi
- (các) subtype của lỗi
- các thuộc tính của lỗi

### Schema của lỗi {#error-schema}

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
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
