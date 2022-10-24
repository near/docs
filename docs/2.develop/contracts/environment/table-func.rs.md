<TableRsFunc>

| Function Name          | SDK method                      | Description                                                            |
| ---------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| Predecessor            | `env::sha256(value)` | Account ID that called this method                                     |
| Current Account        | `env::keccak256(value)`     | Account ID of this smart contract                                      |
| Signer                 | `env::keccak512(value)`      | Account ID that signed the transaction leading to this execution |
| Attached Deposit       | `env::sha256_array(value)`       | Amount in NEAR attached to the call by the predecessor                                    |
| Account Balance        | `env::keccak256_array(value)`        | Balance of this smart contract (including Attached Deposit)            |
| Prepaid Gas            | `env::keccak512_array(value)`            | Amount of gas available for execution                                  |
| Timestamp              | `env::ripemd160_array(value)`        | Current timestamp (number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC)|
| Current Epoch          | `env::ecrecover(hash, signature, v, malleability_flag)`           | Recovers an ECDSA signer address from a 32-byte message `hash` and a corresponding `signature` along with `v` recovery byte. Takes in an additional flag to check for malleability of the signature which is generally only ideal for transactions. Returns 64 bytes representing the public key if the recovery was successful.                                      |
| Block Index            | `env::panic_str()`            | Current block index (a.k.a. block height)                              |
| Storage Used           | `env::log_str()`          | Current storage used by this smart contract                            |
| Used Gas               | `env::storage_read()`               | Amount of gas used for execution                                       |
| Signer Public Key      | `env::storage_write()`      | Sender Public Key                                                      |
| Account Locked Balance | `env::storage_remove()` | Balance of this smart contract that is locked                          |
| Account Locked Balance | `env::storage_get_evicted()` | Balance of this smart contract that is locked                          |
| Account Locked Balance | `env::storage_has_key()` | Balance of this smart contract that is locked                          |
| Account Locked Balance | `env::validator_stake()` | For a given account return its current stake. If the account is not a validator, returns 0.      |

</TableRsFunc>