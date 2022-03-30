<MainRs>

```rust
use near_sdk::{env, AccountId, PublicKey}

pub fn main(): void{
  // Account ID that called this method
  let predecessor: String = env::predecessor_account_id();

  // Account ID of this smart contract
  let current_account: AccountId = env::current_account_id();

  // Account ID that signed the first transaction leading to this execution
  let signer: AccountId = env::signer_account_id();

  // Amount of NEARs attached to the call
  let attached_amount: u128 = env::attached_deposit();

  // Balance of this smart contract (including attachedDeposit!)
  let contract_balance: u128 = env::account_balance();

  // Amount of GAS available for execution
  let gas: u64 = env::prepaid_gas();

  // Current timestamp
  let timestamp: u64 = env::block_timestamp();

  // Current epoch in the blockchain
  let current_epoch: u64 = env::epoch_height();

  // Current block index (aka block height)
  let block_index: u64 = env::block_index();
  
  // Current storage used by this smart contract
  let storage_used: u64 = env::storage_usage();

  // Amount of gas irreversibly used for execution
  let used_gas: u64 = env::used_gas();

  // Sender Public Key
  let signer_pk: PublicKey = env::signer_account_pk();
}
```

</MainRs>