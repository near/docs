<TableJsFunc>

| Function Name          | SDK method                    | Description                                                                          |
| ---------------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| SHA 256            | `near.sha256(value)`          | Hashes a sequence of bytes using sha256.   |
| Keccak 256        | `near.keccak256(value)`       | Hashes a sequence of bytes using keccak256. |
| Keccak 512                 | `near.keccak512(value)`       | Hashes a sequence of bytes using keccak512. |
| RIPEMD 160       | `near.ripemd160(value)`       | Hashes the bytes using the RIPEMD-160 hash function.   |
| EC Recover        | `near.ecrecover(hash, sig, v, malleabilityFlag)`  | Recovers an ECDSA signer address from a 32-byte message `hash` and a corresponding `signature` along with `v` recovery byte. Takes in an additional flag to check for malleability of the signature which is generally only ideal for transactions. Returns 64 bytes representing the public key if the recovery was successful. |
| Log String              | `near.log(msg)`           | Logs the string message. This message is stored on chain.                  |
| Validator Stake  | `near.validatorStake(accountId)`   | For a given account return its current stake. If the account is not a validator, returns 0. |
| Validator Total Stake  | `near.validatorTotalStake()`   | Returns the total stake of validators in the current epoch. |

</TableJsFunc>