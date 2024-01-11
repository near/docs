---
id: introduction
title: Giới thiệu
sidebar_label: Giới thiệu
---

<blockquote class="info">
<strong>did you know?</strong><br /><br />

The [NEAR Platform overview](/concepts/welcome) clarifies much of the language in this section.

</blockquote>

## Vòng đời của một transaction: {#the-life-of-a-transaction}

- Một client tạo ra transaction, tính toán transaction hash và sign hash này để có được một transaction đã sign. Bây giờ transaction đã sign này có thể được gửi đến một node.
- RPC interface nhận transaction này và điều hướng nó tới chính xác một node vật lý thông qua `signer_id`.  Bởi vì `signer_id` phải là một NEAR Account ID, nằm trên một shard duy nhất, account này được ánh xạ tới một shard theo sau bởi tối thiểu một validator đang chạy tối thiểu một máy với một địa chỉ IP.
- Khi một node nhận một transaction đã sign mới, nó sẽ xác nhận transaction này với các thông số signer, receiver, số dư tài khoản, cost overflow, signature, v.v. ([xem tại đây](https://nomicon.io/RuntimeSpec/Scenarios/FinancialTransaction.html#transaction-to-receipt)) và đưa nó cho tất cả các peer theo cùng một shard. Nếu một transaction có signature không hợp lệ hoặc state mới nhất không hợp lệ, nó sẽ nhanh chóng bị từ chối và trả về lỗi cho RPC call ban đầu.
- Các transaction hợp lệ được thêm vào một transaction pool (mọi node xác thực đều có một bản sao độc lập riêng của transaction pool). Transaction pool duy trì các transaction chưa được loại bỏ và chưa được đưa vào chain.
- Tại một thời điểm, một pool iterator được dùng để chọn các transaction từ một pool, theo thứ tự từ nonce nhỏ nhất đến lớn nhất, cho đến khi hết pool hoặc đạt đến một số giới hạn của chunk (số lượng transaction tối đa mỗi chunk hoặc số gas tối đa được đốt mỗi chunk để xử lý các transaction này).  Please refer to articles on the [pool iterator](https://nomicon.io/ChainSpec/Transactions.html?highlight=pool#pool-iterator) and [gas](/concepts/basics/transactions/gas) for more details.
- Để phù hợp với bản chất phân tán của một sharded blockchain, tất cả các transaction được trả về lần lượt cho một phân đoạn transaction pool có 3 lớp riêng biệt: các transaction được chấp nhận (sẽ được xử lý trên chunk tiếp theo), các transaction đang chờ xử lý (đã vượt quá các giới hạn của chunk hiện tại và sẽ được thêm vào chu trình xử lý sau) và các transaction không hợp lệ (sẽ bị từ chối tại thời điểm khả dụng tiếp theo).
- Trước khi tạo một chunk, các transaction được sắp xếp và xác nhận lại một lần nữa. Điều này được thực hiện để tạo ra các chunk chỉ có các transaction hợp lệ trên toàn hệ thống phân tán.
- Trong khi một transaction đang được xử lý trên một chunk, bất kì lỗi nào phát sinh từ các action của ứng dụng cũng được trả về thông qua RPC.


## Các lỗi của nền tảng NEAR {#near-platform-errors}

Các lỗi do nền tảng NEAR đưa ra được thực hiện ở các file sau trong `nearcore`:

- [nearcore/core/primitives/src/errors.rs](https://github.com/near/nearcore/blob/master/core/primitives/src/errors.rs)
- [nearcore/runtime/near-vm-errors/src/lib.rs](https://github.com/near/nearcore/blob/master/runtime/near-vm-errors/src/lib.rs)

Trang này bao gồm:
- **RuntimeError và các subtype**: các lỗi phát sinh khi một transaction được node đích nhận được đầu tiên và một lần nữa, trước khi nó được xử lý và áp dụng cho một chunk
- **TxExecutionError và các subtype**: các lỗi phát sinh khi một transaction và (các) component action của nó đang được xác nhận và áp dụng cho một chunk
- **VMerror and và các subtype**: các lỗi phát sinh trong quá trình thực thi Wasm contract bởi NEAR VM

### RuntimeError và các subtype {#runtimeerror-and-subtypes}

```text
RuntimeError                                              Lỗi được trả về từ `Runtime::apply  
  StorageError                                            Lỗi không mong muốn thường liên quan đến lỗi storage của node.
  BalanceMismatchError                                    Lỗi xảy ra nếu `check_balance` thất bại, nó có thể là dấu hiệu của một state không hợp lệ
  InvalidTxError                                          Lỗi đã xảy ra trong quá trình xác thực TX và tính phí account
    InvalidAccessKeyError                                 Mô tả lỗi cho việc xác nhận access key
    ActionsValidationError                                Mô tả lỗi cho việc xác nhận một danh sách các action    
      TotalPrepaidGasExceeded                             Tổng gas trả trước (cho tất cả các action cho trước) đã vượt quá giới hạn.
      TotalNumberOfActionsExceeded                        Số lượng các action đã vượt quá giới hạn cho trước.
      AddKeyMethodNamesNumberOfBytesExceeded              Tổng số byte của các tên method đã vượt quá giới hạn trong một action Add Key.
      AddKeyMethodNameLengthExceeded                      Chiều dài của một số tên method đã vượt quá giới hạn trong một action Add Key.
      IntegerOverflow                                     Lỗi tràn số integer trong quá trình tính toán.
      InvalidAccountId                                    Account ID không hợp lệ.
      ContractSizeExceeded                                Kích thước code của contract đã vượt quá giới hạn trong một action DeployContract.
      FunctionCallMethodNameLengthExceeded                Chiều dài của tên method đã vượt quá giới hạn trong một action Function Call.
      FunctionCallArgumentsLengthExceeded                 Chiều dài của các tham số đã vượt quá giới hạn trong một action Function Call.
```

### TxExecutionError và các subtype {#txexecutionerror-and-subtypes}

```text
TxExecutionError                                          Lỗi trả về của ExecutionOutcome trong trường hợp thất bại
  InvalidTxError                                          Lỗi xảy ra trong quá trình thực thi Transaction
    InvalidAccessKeyError                                 Mô tả lỗi cho việc xác nhận access key
    ActionsValidationError                                Mô tả lỗi cho việc xác nhận danh sách các action
      TotalPrepaidGasExceeded                             Tổng gas trả trước (cho tất cả các action cho trước) đã vượt quá giới hạn.
      TotalNumberOfActionsExceeded                        Số lượng các action đã vượt quá giới hạn cho trước.
      AddKeyMethodNamesNumberOfBytesExceeded              Tổng số byte của các tên method đã vượt quá giới hạn trong một action Add Key.
      AddKeyMethodNameLengthExceeded                      Chiều dài của một số tên method đã vượt quá giới hạn trong một action Add Key.
      IntegerOverflow                                     Lỗi tràn số integer trong quá trình tính toán.
      InvalidAccountId                                    Account ID không hợp lệ.
      ContractSizeExceeded                                Kích thước code của contract đã vượt quá giới hạn trong một action DeployContract.
      FunctionCallMethodNameLengthExceeded                Chiều dài của tên method đã vượt quá giới hạn trong một action Function Call.
      FunctionCallArgumentsLengthExceeded                 Chiều dài của các tham số đã vượt quá giới hạn trong một action Function Call.
  ActionError                                             Lỗi xảy ra trong quá trình thực thi Action
    ActionErrorKind                                       Loại ActionError đã xảy ra
      RuntimeCallError 
      ReceiptValidationError                              Mô tả lỗi cho việc xác nhận một receipt
        ActionsValidationError                            Mô tả lỗi cho việc xác nhận danh sách các action    
          TotalPrepaidGasExceeded                         Tổng gas trả trước (cho tất cả các action cho trước) đã vượt quá giới hạn.
          TotalNumberOfActionsExceeded                    Số lượng các action đã vượt quá giới hạn cho trước.
          AddKeyMethodNamesNumberOfBytesExceeded          Tổng số byte của các tên method đã vượt quá giới hạn trong một action Add Key.
          AddKeyMethodNameLengthExceeded                  Chiều dài của một số tên method đã vượt quá giới hạn trong một action Add Key.
          IntegerOverflow                                 Lỗi tràn số integer trong quá trình tính toán.
          InvalidAccountId                                Account ID không hợp lệ.
          ContractSizeExceeded                            Kích thước code của contract đã vượt quá giới hạn trong một action DeployContract.
          FunctionCallMethodNameLengthExceeded            Chiều dài của tên method đã vượt quá giới hạn trong một action Function Call.
          FunctionCallArgumentsLengthExceeded             Chiều dài của các tham số đã vượt quá giới hạn trong một action Function Call.
```


### VMerror và các subtype {#vmerror-and-subtypes}

```text
VMerror                                                   Lỗi xảy ra bên trong máy ảo NEAR
  ExternalError                                           Lỗi bên ngoài từ việc thực hiện External trait được serialize
  InconsistentStateError                                  Lỗi xảy ra bởi một hoạt động trên một state không đồng nhất (ví dụ: lỗi tràn số integer xảy ra khi sử dụng một giá trị trong một context cho trước
    IntegerOverflow                                       Hoạt động tính toán với giá trị từ state đã trả về một lỗi tràn số integer
  FunctionCallError 
    LinkError 
    WasmTrap 
    MethodResolveError 
      MethodEmptyName 
      MethodUTF8Error 
      MethodNotFound 
      MethodInvalidSignature 
    HostError 
      BadUTF16                                            String encoding không phải là một chuỗi UTF-16
      BadUTF8                                             String encoding không phải là một chuỗi UTF-8
      GasExceeded                                         Đã vượt quá số gas trả trước
      GasLimitExceeded                                    Đã vượt quá số gas tối đa được cho phép để đốt cho mỗi contract
      BalanceExceeded                                     Đã vượt quá số dư tài khoản
      EmptyMethodName                                     Cố gắng call một tên method rỗng
      GuestPanic                                          Smart contract panic
      IntegerOverflow                                     IntegerOverflow đã xảy ra trong quá trình thực thi contract
      InvalidPromiseIndex                                 `promise_idx` không tương ứng với các promise hiện có
      CannotAppendActionToJointPromise                    Các action chỉ có thể được nối với non-joint promise.
      CannotReturnJointPromise                            Trả về joint promise đang bị cấm
      InvalidPromiseResultIndex                           Đã truy cập vào index không hợp lệ của kết quả promise
      InvalidRegisterId                                   Đã truy cập vào register id không hợp lệ
      IteratorWasInvalidated                              Iterator `iterator_index` Iterator `iterator_index` đã bị vô hiệu sau khi nó được tạo ra bằng cách thực thi một hành động mutable trên trie
      MemoryAccessViolation                               Đã truy cập ngoài vùng nhớ
      InvalidReceiptIndex                                 VM Logic đã trả về một receipt index không hợp lệ
      InvalidIteratorIndex                                Iterator index `iterator_index` không tồn tại
      InvalidAccountId                                    VM Logic đã trả về account id không hợp lệ
      InvalidMethodName                                   VM Logic đã trả về tên method không hợp lệ
      InvalidPublicKey                                    VM Logic đã cung cấp public key không hợp lệ
      ProhibitedInView                                    `method_name` không được cho phép trong view call
      NumberOfLogsExceeded                                Tổng số lượng log sẽ vượt quá giới hạn.
      KeyLengthExceeded                                   Chiều dài của storage key đã vượt quá giới hạn.
      ValueLengthExceeded                                 Chiều dài của storage value đã vượt quá giới hạn.
      TotalLogLengthExceeded                              Tổng số chiều dài của log đã vượt quá giới hạn.
      NumberPromisesExceeded                              Số lượng promise tối đa trong một FunctionCall đã vượt quá giới hạn.
      NumberInputDataDependenciesExceeded                 Số lượng dependency tối đa của dữ liệu đầu vào đã vượt quá giới hạn.
      ReturnedValueLengthExceeded                         Chiều dài của giá trị trả về đã vượt quá giới hạn.
      ContractSizeExceeded                                Kích thước contract cho action DeployContract đã vượt quá giới hạn.
    CompilationError 
      CodeDoesNotExist 
      WasmerCompileError 
      PrepareError                                        Lỗi xảy ra khi chuẩn bị hoặc thực thi Wasm smart-contract.
        Serialization                                     Lỗi đã xảy ra trong khi serialize module.
        Deserialization                                   Lỗi đã xảy ra trong khi deserialize module.
        InternalMemoryDeclared                            Khai báo bộ nhớ bên trong đã được tìm thấy trong module.
        GasInstrumentation                                Thất bại trong việc đo đạc gas.  Điều này cho thấy rất có thể module không hợp lệ
        StackHeightInstrumentation                        Thất bại trong việc đo đạc stack.  Điều này cho thấy rất có thể module không hợp lệ
        Instantiate                                       Lỗi đã xảy ra trong quá trình khởi tạo.  Điều này chỉ ra rằng có thể function `start` bị kẹt, hoặc module không thể khởi tạo và/hoặc không thể kết nối được.
        Memory                                            Lỗi khi tạo bộ nhớ
```

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
