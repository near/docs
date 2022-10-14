<TableAs>

| Function Name          | SDK method                     | Description                                                            |
| ---------------------- | ------------------------------ | ---------------------------------------------------------------------- |
| Predecessor            | `context.predecessor`          | Account ID that called this method                                     |
| Current Account        | `context.contractName`         | Account ID of this smart contract                                      |
| Signer                 | `context.sender`               | Account ID that signed the transaction leading to this execution |
| Attached Deposit       | `context.attachedDeposit`      | Amount in NEAR attached to the call by the predecessor                                   |
| Account Balance        | `context.accountBalance`       | Balance of this smart contract (including Attached Deposit)            |
| Prepaid Gas            | `context.prepaidGas`           | Amount of gas available for execution                                  |
| Timestamp              | `context.blockTimestamp`       | Current timestamp (number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC)|
| Current Epoch          | `context.epochHeight`          | Current epoch in the blockchain                                        |
| Block Index            | `context.blockIndex`           | Current block index (a.k.a. block height)                              |
| Storage Used           | `context.storageUsage`         | Current storage used by this smart contract                            |
| Used Gas               | `context.usedGas`              | Amount of gas used for execution                                       |
| Signer Public Key      | `context.senderPublicKey`      | Sender Public Key                                                      |
| Account Locked Balance | `context.accountLockedBalance` | Balance of this smart contract that is locked                          |

</TableAs>