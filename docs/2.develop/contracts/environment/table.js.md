<TableJs>

| Variable Name          | SDK Variable                  | Description                                                                          |
| ---------------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| Predecessor            | `near.predecessorAccountId()` | Account ID that called this method                                                   |
| Current Account        | `near.currentAccountId()`     | Account ID of this smart contract                                                    |
| Signer                 | `near.signerAccountId()`      | Account ID that signed the transaction leading to this execution                     |
| Attached Deposit       | `near.attachedDeposit()`      | Amount in NEAR attached to the call by the predecessor                               |
| Account Balance        | `near.accountBalance()`       | Balance of this smart contract (including Attached Deposit)                          |
| Prepaid Gas            | `near.prepaidGas()`           | Amount of gas available for execution                                                |
| Timestamp              | `near.blockTimestamp()`       | Current timestamp (number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC) |
| Current Epoch          | `near.epochHeight()`          | Current epoch in the blockchain                                                      |
| Block Index            | `near.blockIndex()`           | Current block index (a.k.a. block height)                                            |
| Storage Used           | `near.storageUsage()`         | Current storage used by this smart contract                                          |
| Used Gas               | `near.usedGas()`              | Amount of gas used for execution                                                     |
| Signer Public Key      | `near.signerAccountPk()`      | Sender Public Key                                                                    |
| Account Locked Balance | `near.accountLockedBalance()` | Balance of this smart contract that is locked                                        |

</TableJs>