---
sidebar_position: 4
---

# Payable Methods

We can allow methods to accept token transfer together with the function call. Điều này được thực hiện để các contract có thể xác định một khoản phí trong các token cần phải trả khi chúng được sử dụng. By default the methods are not payable and they will panic if someone will attempt to transfer tokens to them during the invocation. Điều này được thực hiện vì lý do an toàn, trong trường hợp ai đó vô tình chuyển token trong function call.

To declare a method as payable, use the `#[payable]` annotation within the [`near` macro](../contract-structure/near-bindgen.md) as follows:

```rust
#[payable]
pub fn my_method(&mut self) {
...
}
```

This will allow the `my_method` function to be called and transfer balance to the contract.

Dưới đây là danh sách đầy đủ các error variant có thể được trả về theo loại request `view_access_key_list`:

```rust
#[near]
impl Contract {
    #[payable]
    pub fn take_my_money(&mut self) {
        near_sdk::env::log_str("Thanks!");
    }
    pub fn do_not_take_my_money(&mut self) {
        near_sdk::env::log_str("Thanks!");
    }
}
```

is equivalent to:

```rust
#[near]
impl Contract {
    pub fn take_my_money(&mut self) {
        near_sdk::env::log_str("Thanks!");
    }
    pub fn do_not_take_my_money(&mut self) {
        if near_sdk::env::attached_deposit() != 0 {
            near_sdk::env::panic_str("Method do_not_take_my_money doesn't accept deposit");
        }
        near_sdk::env::log_str("Thanks!");
    }
}
```
