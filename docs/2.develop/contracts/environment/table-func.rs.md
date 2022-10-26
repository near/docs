<TableRsFunc>

| Function Name          | SDK method                      | Description                                                            |
| ---------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| SHA 256                | `env::sha256(value)` | Hashes a sequence of bytes using sha256.                                     |
| Keccak 256             | `env::keccak256(value)`     | Hashes a sequence of bytes using keccak256.                                     |
| Keccak 512             | `env::keccak512(value)`      | Hashes a sequence of bytes using keccak512. |
| SHA 256 (Array)        | `env::sha256_array(value)`       | Hashes the bytes using the SHA-256 hash function. This returns a 32 byte hash. |
| Keccak 256 (Array)     | `env::keccak256_array(value)`    | Hashes the bytes using the Keccak-256 hash function. This returns a 32 byte hash. |
| Keccak 512 (Array)     | `env::keccak512_array(value)`      | Hashes the bytes using the Keccak-512 hash function. This returns a 64 byte hash. |
| RIPEMD 160 (Array)     | `env::ripemd160_array(value)`    | Hashes the bytes using the RIPEMD-160 hash function. This returns a 20 byte hash.|
| EC Recover             | `env::ecrecover(hash, signature, v, malleability_flag)`           | Recovers an ECDSA signer address from a 32-byte message `hash` and a corresponding `signature` along with `v` recovery byte. Takes in an additional flag to check for malleability of the signature which is generally only ideal for transactions. Returns 64 bytes representing the public key if the recovery was successful. |
| Panic String           | `env::panic_str(message)`            | Terminates the execution of the program with the UTF-8 encoded message. |
| Log String             | `env::log_str(message)`          | Logs the string message. This message is stored on chain.                            |
| Validator Stake        | `env::validator_stake(account_id)` | For a given account return its current stake. If the account is not a validator, returns 0. |
| Validator Total Stake  | `env::validator_total_stake()` | Returns the total stake of validators in the current epoch. |

</TableRsFunc>