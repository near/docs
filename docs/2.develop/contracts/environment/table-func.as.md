<TableAsFunc>

| Function Name          | SDK method                     | Description                                                            |
| ---------------------- | ------------------------------ | ---------------------------------------------------------------------- |
| SHA 256            | `context.sha256(value)`          | Hashes a sequence of bytes using sha256.    |
| Keccak 256        | `context.keccak256(value)`         | Hashes a sequence of bytes using keccak256. |
| Keccak 512  | `context.keccak512(value)`   | Hashes a sequence of bytes using keccak512. |
| Panic String       | `context.panic(message)`      | Terminates the execution of the program with the UTF-8 encoded message.  |
| Log String      | `context.log_utf8(message)`      | Logs the string message. This message is stored on chain. |
| Validator Stake | `context.validator_stake(account_id)` | For a given account return its current stake. If the account is not a validator, returns 0. |
| Validator Total Stake | `context.validator_total_stake()` | Returns the total stake of validators in the current epoch. |
| Account ID Validation | `context.isValidAccountID(account_id)` | Validates an `accountId` string. |

</TableAsFunc>