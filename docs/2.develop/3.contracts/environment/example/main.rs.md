<MainRs>

```rust
use near_sdk::{ env, log };

log!(
    "Transferred {} tokens from {}",
    env::attached_deposit(),
    env::predecessor_account_id()
);
```

</MainRs>