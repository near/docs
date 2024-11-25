---
id: macros
title: Internals of Rust macros
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Let's talk about what happens internally when `near` macro is used. Consider this example:

```rust
#[near(contract_state)]
pub struct PersonContract {
    name: String,
    age: u8,
}

#[near]
impl PersonContract {
    pub fn set_person(&mut self, name: String, age: u8) {
        self.name = name;
        self.age = age;
    }
}
```

The following is what `near` macro does. The generated code is not a real output, but a demonstration:
```rust
// Using Borsh so that it can be keeped in the blockchain storage.
#[derive(BorshSerialize, BorshDeserialize)] 
#[borsh(crate = "::near_sdk::borsh")] 
pub struct PersonContract { 
    name : String, 
    age : u8, 
}

// This function is executed when someone calls a contract method
pub extern "C" fn set_person()
{
    // Setting up panic hook so that when error appears, it is handled correctly (env::panic_str() is called)
    setup_panic_hook();
    
    // To accept a deposit, you have to mark the function as #[payable]. Otherwise, the execution has to be interrupted.
    if env::attached_deposit().as_yoctonear() != 0 {
        env::panic_str("Method set_person doesn't accept deposit");
    } 

    // Creating a structure for arguments, so it can be deserialized with serde when the method is called
    #[derive(Deserialize)]
    #[serde(crate = "::near_sdk::serde")] 
    struct Input { 
        name: String, 
        age: u8, 
    } 

    // Getting arguments 
    let Input { name, age, } = match env::input() {
        Some(input) => match serde_json::from_slice(&input) {
            Ok(deserialized) => deserialized, 
            Err(_) => env::panic_str("Failed to deserialize input from JSON.")
        },
        None => env::panic_str("Expected input since method has arguments.")
    };

    // Reading contract state
    let mut contract: PersonContract = env::state_read().unwrap_or_default(); 

    // Calling contract method
    contract.set_person(name, age);

    // Writing contract state
    env::state_write(& contract);
}
```

In addition, a struct for cross contract calls is generated. It is done so that the contract can easily call itself. Similar code is generated when `#[ext_contract]` macro is used:
```rust
impl PersonContractExt {
    // If you execute this method from another contract, it's going to call `pub extern "C" fn set_person()`
    pub fn set_person(self, name : String, age : u8,) -> Promise {
        let __args =
        {
            // Creating a structure for arguments, so it can be serialized with serde and passed 
            #[derive(serde::Serialize)]
            #[serde(crate = "::near_sdk::serde")] 
            struct Input < 'nearinput > { 
                name : & 'nearinput String, 
                age : & 'nearinput u8, 
            } 
            
            // Serializing arguments with serde
            let __args = Input { name : & name, age : & age, }; 
            serde_json::to_vec(& __args)
        };

        // Actually calling other contract
        Promise::new(self.account_id).function_call_weight(
            String::from("set_person"), 
            __args, 
            self.deposit, 
            self.static_gas,
            self.gas_weight,
        )
    }
} 
```

In addition, helpers are generated:
```rust
impl PersonContract
{
    pub fn ext(account_id : :: near_sdk :: AccountId) -> PersonContractExt
    {
        PersonContractExt
        {
            account_id, 
            deposit: from_near(0),
            static_gas: from_gas(0), 
            gas_weight: default(),
        }
    }
} 


pub struct PersonContractExt
{
    pub(crate) account_id: AccountId, 
    pub(crate) deposit: NearToken, 
    pub(crate) static_gas: Gas,
    pub(crate) gas_weight: GasWeight,
} 

impl PersonContractExt
{
    pub fn with_attached_deposit(mut self, amount: NearToken) -> Self { 
        self.deposit = amount; 
        self 
    } 
    pub fn with_static_gas(mut self, static_gas: Gas) -> Self { 
        self.static_gas = static_gas; 
        self 
    } 
    pub fn with_unused_gas_weight(mut self, gas_weight : u64) -> Self { 
        self.gas_weight = GasWeight(gas_weight); 
        self 
    }
} 

```