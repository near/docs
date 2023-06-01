<TableRs>

| Variable Name          | SDK Variable                    | Description                                                            |
| ---------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| Predecessor            | `env::predecessor_account_id()` | Account ID that called this method                                     |
| Current Account        | `env::current_account_id()`     | Account ID of this smart contract                                      |
| Signer                 | `env::signer_account_id()`      | Account ID that signed the transaction leading to this execution |
| Attached Deposit       | `env::attached_deposit()`       | Amount in NEAR attached to the call by the predecessor                                    |
| Account Balance        | `env::account_balance()`        | Balance of this smart contract (including Attached Deposit)            |
| Prepaid Gas            | `env::prepaid_gas()`            | Amount of gas available for execution                                  |
| Timestamp              | `env::block_timestamp()`        | Current timestamp (number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC)|
| Current Epoch          | `env::epoch_height()`           | Current epoch in the blockchain                                        |
| Block Index            | `env::block_index()`            | Current block index (a.k.a. block height)                              |
| Storage Used           | `env::storage_usage()`          | Current storage used by this smart contract in bytes                            |
| Storage Byte Cost      | `env::storage_byte_cost()`      | Current storage cost per byte in yoctoNEAR                       |
| Used Gas               | `env::used_gas()`               | Amount of gas used for execution                                       |
| Signer Public Key      | `env::signer_account_pk()`      | Sender Public Key                                                      |
| Account Locked Balance | `env::account_locked_balance()` | Balance of this smart contract that is locked                          |

</TableRs>