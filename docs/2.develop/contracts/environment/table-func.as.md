<TableAsFunc>

| Function Name          | SDK method                     | Description                                                            |
| ---------------------- | ------------------------------ | ---------------------------------------------------------------------- |
| SHA 256            | `context.sha256`          | Hashes the random sequence of bytes using sha256.                                     |
| Keccak 256        | `context.keccak256`         | Hashes the random sequence of bytes using keccak256.                                      |
| Keccak 512                 | `context.keccak512`               | Hashes the random sequence of bytes using keccak512. |
| Panic String       | `context.panic`      | Terminates the execution of the program with the UTF-8 encoded message.                        |
| Log String      | `context.log_utf8`      | Logs the string message. This message is stored on chain. |
| Validator Stake | `context.validator_stake` | For a given account return its current stake. If the account is not a validator, returns 0. |
| Account ID Validation | `context.isValidAccountID` | Validates an accountId string. |

</TableAsFunc>