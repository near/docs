---
id: marketplace
title: Marketplace
sidebar_label: Marketplace
---



In this tutorial, you'll learn the basics of an NFT marketplace contract where you can buy and sell non-fungible tokens for $NEAR. In the previous tutorials, you went through and created a fully fledged NFT contract that incorporates all the standards found in the [NFT standard](https://nomicon.io/Standards/NonFungibleToken).

---

## Introduction

Throughout this tutorial, you'll learn how a marketplace contract **could** work on NEAR. This is meant to be **an example** as there is no **canonical implementation**. Feel free to branch off and modify this contract to meet your specific needs.

```bash
cd market-contract/
```

This folder contains both the actual contract code and dependencies as outlined below.

```
market-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
└── src
    ├── external.rs
    ├── internal.rs
    ├── lib.rs
    ├── nft_callbacks.rs
    ├── sale.rs
    └── sale_views.rs
```

---

## Understanding the contract

At first, the contract can be quite overwhelming but if you strip away all the fluff and dig into the core functionalities, it's actually quite simple. This contract was designed for only one thing - to allow people to buy and sell NFTs for NEAR. This includes the support for paying royalties, updating the price of your sales, removing sales and paying for storage.

Let's go through the files and take note of some of the important functions and what they do.

---

## lib.rs {#lib-rs}

This file outlines what information is stored on the contract as well as some other crucial functions that you'll learn about below.

### Initialization function {#initialization-function}

The first function you'll look at is the initialization function. This takes an `owner_id` as the only parameter and will default all the storage collections to their default values.

```
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        let this = Self {
            //set the owner_id field equal to the passed in owner_id.
            owner_id,

            //Storage keys are simply the prefixes used for the collections. This helps avoid data collision
            sales: UnorderedMap::new(StorageKey::Sales),
            by_owner_id: LookupMap::new(StorageKey::ByOwnerId),
            by_nft_contract_id: LookupMap::new(StorageKey::ByNFTContractId),
            storage_deposits: LookupMap::new(StorageKey::StorageDeposits),
        };

        //return the Contract object
        this
    }

```

<hr className="subsection" />

### Storage management model {#storage-management-model}

Next, let's talk about the storage management model chosen for this contract. On the NFT contract, users attached $NEAR to the calls that needed storage paid for. For example, if someone was minting an NFT, they would need to attach `x` amount of NEAR to cover the cost of storing the data on the contract.

On this marketplace contract, however, the storage model is a bit different. Users will need to deposit $NEAR onto the marketplace to cover the storage costs. Whenever someone puts an NFT for sale, the marketplace needs to store that information which costs $NEAR. Users can either deposit as much NEAR as they want so that they never have to worry about storage again or they can deposit the minimum amount to cover 1 sale on an as-needed basis.

You might be thinking about the scenario when a sale is purchased. What happens to the storage that is now being released on the contract? This is why we've introduced a storage withdrawal function. This allows users to withdraw any excess storage that is not being used. Let's go through some scenarios to understand the logic. The required storage for 1 sale is 0.01 NEAR on the marketplace contract.

**Scenario A**

- Benji wants to list his NFT on the marketplace but has never paid for storage.
- He deposits exactly 0.01 NEAR using the `storage_deposit` method. This will cover 1 sale.
- He lists his NFT on the marketplace and is now using up 1 out of his prepaid 1 sales and has no more storage left. If he were to call `storage_withdraw`, nothing would happen.
- Dorian loves his NFT and quickly purchases it before anybody else can. This means that Benji's sale has now been taken down (since it was purchased) and Benji is using up 0 out of his prepaid 1 sales. In other words, he has an excess of 1 sale or 0.01 NEAR.
- Benji can now call `storage_withdraw` and will be transferred his 0.01 NEAR back. On the contract's side, after withdrawing, he will have 0 sales paid for and will need to deposit storage before trying to list anymore NFTs.

**Scenario B**

- Dorian owns one hundred beautiful NFTs and knows that he wants to list all of them.
- To avoid having to call `storage_deposit` everytime he wants to list an NFT, he calls it once. Since Dorian is a baller, he attaches 10 NEAR which is enough to cover 1000 sales. Then he lists his 100 NFTs and now he has an excess of 9 NEAR or 900 sales.
- Dorian needs the 9 NEAR for something else but doesn't want to take down his 100 listings. Since he has an excess of 9 NEAR, he can easily withdraw and still have his 100 listings. After calling `storage_withdraw` and being transferred 9 NEAR, he will have an excess of 0 sales.

With this behavior in mind, the following two functions outline the logic.

```
    #[payable]
    pub fn storage_deposit(&mut self, account_id: Option<AccountId>) {
        //get the account ID to pay for storage for
        let storage_account_id = account_id
            //convert the valid account ID into an account ID
            .map(|a| a.into())
            //if we didn't specify an account ID, we simply use the caller of the function
            .unwrap_or_else(env::predecessor_account_id);

        //get the deposit value which is how much the user wants to add to their storage
        let deposit = env::attached_deposit();

        //make sure the deposit is greater than or equal to the minimum storage for a sale (which computes like env::storage_byte_cost().saturating_mul(1000))
        assert!(
            deposit.ge(&storage_per_sale()),
            "Requires minimum deposit of {}",
            storage_per_sale()
        );

        //get the balance of the account (if the account isn't in the map we default to a balance of 0)
        let mut balance: NearToken = self
            .storage_deposits
            .get(&storage_account_id)
            .unwrap_or(ZERO_NEAR);
        //add the deposit to their balance
        balance = balance.saturating_add(deposit);
        //insert the balance back into the map for that account ID
        self.storage_deposits.insert(&storage_account_id, &balance);
    }

```
```
    #[payable]
    pub fn storage_withdraw(&mut self) {
        //make sure the user attaches exactly 1 yoctoNEAR for security purposes.
        //this will redirect them to the NEAR wallet (or requires a full access key).
        assert_one_yocto();

        //the account to withdraw storage to is always the function caller
        let owner_id = env::predecessor_account_id();
        //get the amount that the user has by removing them from the map. If they're not in the map, default to 0
        let mut amount = self.storage_deposits.remove(&owner_id).unwrap_or(ZERO_NEAR);

        //how many sales is that user taking up currently. This returns a set
        let sales = self.by_owner_id.get(&owner_id);
        //get the length of that set.
        let len = sales.map(|s| s.len()).unwrap_or_default();
        //how much NEAR is being used up for all the current sales on the account
        let diff = storage_per_sale().saturating_mul(u128::from(len));

        //the excess to withdraw is the total storage paid - storage being used up.
        amount = amount.saturating_sub(diff);

        //if that excess to withdraw is > 0, we transfer the amount to the user.
        if amount.gt(&ZERO_NEAR) {
            Promise::new(owner_id.clone()).transfer(amount);
        }
        //we need to add back the storage being used up into the map if it's greater than 0.
        //this is so that if the user had 500 sales on the market, we insert that value here so
        //if those sales get taken down, the user can then go and withdraw 500 sales worth of storage.
        if diff.gt(&ZERO_NEAR) {
            self.storage_deposits.insert(&owner_id, &diff);
        }
    }

```

In this contract, the storage required for each sale is 0.01 NEAR but you can query that information using the `storage_minimum_balance` function. In addition, if you wanted to check how much storage a given account has paid, you can query the `storage_balance_of` function.

With that out of the way, it's time to move onto the `sale.rs` file where you'll look at how NFTs are put for sale.

---

## sale.rs {#sale}

This file is responsible for the internal marketplace logic.

### Listing logic {#listing-logic}

In order to put an NFT on sale, a user should:

1. Approve the marketplace contract on an NFT token (by calling `nft_approve` method on the NFT contract)
2. Call the `list_nft_for_sale` method on the marketplace contract.

#### nft_approve
This method has to be called by the user to [approve our marketplace](5-approvals.md), so it can transfer the NFT on behalf of the user. In our contract, we only need to implement the `nft_on_approve` method, which is called by the NFT contract when the user approves our contract.

In our case, we left it blank, but you could implement it to do some additional logic when the user approves your contract.

```
    fn nft_on_approve(
        &mut self,
        token_id: TokenId,
        owner_id: AccountId,
        approval_id: u64,
        msg: String,
    ) {
        /*
          YOU CAN PUT SOME INTERNAL MARKETPLACE LOGIC HERE
        */
    }
}
```


#### list_nft_for_sale
The `list_nft_for_sale` method lists an nft for sale, for this, it takes the id of the NFT contract (`nft_contract_id`), the `token_id` to know which token is listed, the [`approval_id`](5-approvals.md), and the price in yoctoNEAR at which we want to sell the NFT.

```
    #[payable]
    pub fn list_nft_for_sale(
        &mut self,
        nft_contract_id: AccountId,
        token_id: TokenId,
        approval_id: u64,
        sale_conditions: SalePriceInYoctoNear,
    ) {
        let owner_id = env::predecessor_account_id();

        //we need to enforce that the user has enough storage for 1 EXTRA sale.

        //get the storage for a sale
        let storage_amount = self.storage_minimum_balance();
        //get the total storage paid by the owner
        let owner_paid_storage = self.storage_deposits.get(&owner_id).unwrap_or(ZERO_NEAR);
        //get the storage required which is simply the storage for the number of sales they have + 1
        let signer_storage_required = storage_amount
            .saturating_mul((self.get_supply_by_owner_id(owner_id.clone()).0 + 1).into());

        //make sure that the total paid is >= the required storage
        assert!(
            owner_paid_storage.ge(&signer_storage_required),
            "Insufficient storage paid: {}, for {} sales at {} rate of per sale",
            owner_paid_storage,
            signer_storage_required.saturating_div(storage_per_sale().as_yoctonear()),
            storage_per_sale()
        );

        let nft_token_promise = Promise::new(nft_contract_id.clone()).function_call(
            "nft_token".to_owned(),
            json!({ "token_id": token_id }).to_string().into_bytes(),
            ZERO_NEAR,
            Gas::from_gas(10u64.pow(13)),
        );
        let nft_is_approved_promise = Promise::new(nft_contract_id.clone()).function_call(
          "nft_is_approved".to_owned(),
          json!({ "token_id": token_id, "approved_account_id": env::current_account_id(), "approval_id": approval_id }).to_string().into_bytes(),
          ZERO_NEAR,
          Gas::from_gas(10u64.pow(13))
        );
        nft_token_promise.and(nft_is_approved_promise).then(
            Self::ext(env::current_account_id()).process_listing(
```

The function first checks if the user has [enough storage available](#storage-management-model), and makes two calls in parallel to the NFT contract. The first is to check if this marketplace contract is authorized to transfer the NFT. The second is to make sure that the caller (`predecessor`) is actually the owner of the NFT, otherwise, anyone could call this method to create fake listings. This second call is mostly a measure to avoid spam, since anyways, only the owner could approve the marketplace contract to transfer the NFT.

Both calls return their results to the `process_listing` function, which executes the logic to store the sale object on the contract.

#### process_listing

The `process_listing` function will receive if our marketplace is authorized to list the NFT on sale, and if this was requested by the NFTs owner. If both conditions are met, it will proceed to check if the user has enough storage, and store the sale object on the contract.

```
        &mut self,
        owner_id: AccountId,
        nft_contract_id: AccountId,
        token_id: TokenId,
        approval_id: u64,
        sale_conditions: SalePriceInYoctoNear,
        #[callback_result] nft_token_result: Result<JsonToken, PromiseError>,
        #[callback_result] nft_is_approved_result: Result<bool, PromiseError>,
    ) {
        if let Ok(result) = nft_token_result {
            assert_eq!(result.owner_id, owner_id, "Signer is not NFT owner",)
        } else {
            log!("nft_is_approved call failed");
        }
        if let Ok(result) = nft_is_approved_result {
            assert_eq!(result, true, "Marketplace contract is not approved",)
        } else {
            log!("nft_is_approved call failed");
        }

        //create the unique sale ID which is the contract + DELIMITER + token ID
        let contract_and_token_id = format!("{}{}{}", nft_contract_id, DELIMETER, token_id);

        //insert the key value pair into the sales map. Key is the unique ID. value is the sale object
        self.sales.insert(
            &contract_and_token_id,
            &Sale {
                owner_id: owner_id.clone(),                   //owner of the sale / token
                approval_id, //approval ID for that token that was given to the market
                nft_contract_id: nft_contract_id.to_string(), //NFT contract the token was minted on
                token_id: token_id.clone(), //the actual token ID
                sale_conditions, //the sale conditions
            },
        );

        //Extra functionality that populates collections necessary for the view calls

        //get the sales by owner ID for the given owner. If there are none, we create a new empty set
        let mut by_owner_id = self.by_owner_id.get(&owner_id).unwrap_or_else(|| {
            UnorderedSet::new(StorageKey::ByOwnerIdInner {
                //we get a new unique prefix for the collection by hashing the owner
                account_id_hash: hash_account_id(&owner_id),
            })
        });

        //insert the unique sale ID into the set
        by_owner_id.insert(&contract_and_token_id);
        //insert that set back into the collection for the owner
        self.by_owner_id.insert(&owner_id, &by_owner_id);

        //get the token IDs for the given nft contract ID. If there are none, we create a new empty set
        let mut by_nft_contract_id = self
            .by_nft_contract_id
            .get(&nft_contract_id)
            .unwrap_or_else(|| {
                UnorderedSet::new(StorageKey::ByNFTContractIdInner {
                    //we get a new unique prefix for the collection by hashing the owner
                    account_id_hash: hash_account_id(&nft_contract_id),
                })
            });

        //insert the token ID into the set
        by_nft_contract_id.insert(&token_id);
        //insert the set back into the collection for the given nft contract ID
        self.by_nft_contract_id
            .insert(&nft_contract_id, &by_nft_contract_id);
    }
}

//this is the cross contract call that we call on our own contract.
/*
    private method used to resolve the promise when calling nft_transfer_payout. This will take the payout object and
    check to see if it's authentic and there's no problems. If everything is fine, it will pay the accounts. If there's a problem,
    it will refund the buyer for the price.
*/
#[ext_contract(ext_self)]
trait ExtSelf {
    fn resolve_purchase(&mut self, buyer_id: AccountId, price: NearToken) -> Promise;
}

```

<hr class="subsection" />

### Sale object {#sale-object}

It's important to understand what information the contract is storing for each sale object. Since the marketplace has many NFTs listed that come from different NFT contracts, simply storing the token ID would not be enough to distinguish between different NFTs. This is why you need to keep track of both the token ID and the contract by which the NFT came from. In addition, for each listing, the contract must keep track of the approval ID it was given to transfer the NFT. Finally, the owner and sale conditions are needed.

```
//struct that holds important information about each sale on the market
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, NearSchema)]
#[borsh(crate = "near_sdk::borsh")]
#[serde(crate = "near_sdk::serde")]
pub struct Sale {
    //owner of the sale
    pub owner_id: AccountId,
    //market contract's approval ID to transfer the token on behalf of the owner
    pub approval_id: u64,
    //nft contract where the token was minted
    pub nft_contract_id: String,
    //actual token ID for sale
    pub token_id: String,
    //sale price in yoctoNEAR that the token is listed for
    pub sale_conditions: SalePriceInYoctoNear,
}

```

<hr className="subsection" />

### Removing sales {#removing-sales}

In order to remove a listing, the owner must call the `remove_sale` function and pass the NFT contract and token ID. Behind the scenes, this calls the `internal_remove_sale` function which you can find in the `internal.rs` file. This will assert one yoctoNEAR for security reasons.

```
                owner_id.clone(),
                nft_contract_id,
                token_id,
                approval_id,
                sale_conditions,
            ),
        );
    }

    //removes a sale from the market.
    #[payable]
    pub fn remove_sale(&mut self, nft_contract_id: AccountId, token_id: String) {
        //assert that the user has attached exactly 1 yoctoNEAR (for security reasons)
```

<hr className="subsection" />

### Updating price {#updating-price}

In order to update the list price of a token, the owner must call the `update_price` function and pass in the contract, token ID, and desired price. This will get the sale object, change the sale conditions, and insert it back. For security reasons, this function will assert one yoctoNEAR.

```
        //get the sale object as the return value from removing the sale internally
        let sale = self.internal_remove_sale(nft_contract_id.into(), token_id);
        //get the predecessor of the call and make sure they're the owner of the sale
        let owner_id = env::predecessor_account_id();
        //if this fails, the remove sale will revert
        assert_eq!(owner_id, sale.owner_id, "Must be sale owner");
    }

    //updates the price for a sale on the market
    #[payable]
    pub fn update_price(&mut self, nft_contract_id: AccountId, token_id: String, price: NearToken) {
        //assert that the user has attached exactly 1 yoctoNEAR (for security reasons)
        assert_one_yocto();

        //create the unique sale ID from the nft contract and token
        let contract_id: AccountId = nft_contract_id.into();
        let contract_and_token_id = format!("{}{}{}", contract_id, DELIMETER, token_id);

        //get the sale object from the unique sale ID. If there is no token, panic.
        let mut sale = self.sales.get(&contract_and_token_id).expect("No sale");

        //assert that the caller of the function is the sale owner
        assert_eq!(
            env::predecessor_account_id(),
            sale.owner_id,
            "Must be sale owner"
        );

        //set the sale conditions equal to the passed in price
        sale.sale_conditions = price;
```

<hr className="subsection" />

### Purchasing NFTs {#purchasing-nfts}

For purchasing NFTs, you must call the `offer` function. It takes an `nft_contract_id` and `token_id` as parameters. You must attach the correct amount of NEAR to the call in order to purchase. Behind the scenes, this will make sure your deposit is greater than the list price and call a private method `process_purchase` which will perform a cross-contract call to the NFT contract to invoke the `nft_transfer_payout` function. This will transfer the NFT using the [approval management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) standard that you learned about and it will return the `Payout` object which includes royalties.

The marketplace will then call `resolve_purchase` where it will check for malicious payout objects and then if everything went well, it will pay the correct accounts.

```
        self.sales.insert(&contract_and_token_id, &sale);
    }

    //place an offer on a specific sale. The sale will go through as long as your deposit is greater than or equal to the list price
    #[payable]
    pub fn offer(&mut self, nft_contract_id: AccountId, token_id: String) {
        //get the attached deposit and make sure it's greater than 0
        let deposit = env::attached_deposit();
        assert!(
            !deposit.is_zero(),
            "Attached deposit must be greater than 0"
        );

        //convert the nft_contract_id from a AccountId to an AccountId
        let contract_id: AccountId = nft_contract_id.into();
        //get the unique sale ID (contract + DELIMITER + token ID)
        let contract_and_token_id = format!("{}{}{}", contract_id, DELIMETER, token_id);

        //get the sale object from the unique sale ID. If the sale doesn't exist, panic.
        let sale = self.sales.get(&contract_and_token_id).expect("No sale");

        //get the buyer ID which is the person who called the function and make sure they're not the owner of the sale
        let buyer_id = env::predecessor_account_id();
        assert_ne!(sale.owner_id, buyer_id, "Cannot bid on your own sale.");

        let price = sale.sale_conditions;

        //make sure the deposit is greater than the price
        assert!(deposit.ge(&price), "Attached deposit must be greater than or equal to the current price: {:?}. Your deposit: {:?}", price, deposit);

        //process the purchase (which will remove the sale, transfer and get the payout from the nft contract, and then distribute royalties)
        self.process_purchase(contract_id, token_id, deposit, buyer_id);
```

---

## sale_view.rs {#sale_view-rs}

The final file is [`sale_view.rs`](https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale_view.rs) file. This is where some of the enumeration methods are outlined. It allows users to query for important information regarding sales.

---

## Deployment and Initialization

Next, you'll deploy this contract to the network.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  export MARKETPLACE_CONTRACT_ID=<accountId>
  near create-account $MARKETPLACE_CONTRACT_ID --useFaucet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  export MARKETPLACE_CONTRACT_ID=<accountId>
  near account create-account sponsor-by-faucet-service $MARKETPLACE_CONTRACT_ID autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
</Tabs>

Using the build script, deploy the contract as you did in the previous tutorials:

```bash
cargo near deploy build-non-reproducible-wasm $MARKETPLACE_CONTRACT_ID with-init-call new json-args '{"owner_id": "'$MARKETPLACE_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

<hr className="subsection" />

### Minting and approving

Let's mint a new NFT token and approve a marketplace contract:

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID nft_mint '{"token_id": "token-1", "metadata": {"title": "My Non Fungible Team Token", "description": "The Team Most Certainly Goes :)", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' --gas 100000000000000 --deposit 0.1 --accountId $NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID nft_mint json-args '{"token_id": "token-1", "metadata": {"title": "My Non Fungible Team Token", "description": "The Team Most Certainly Goes :)", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $NFT_CONTRACT_ID nft_approve '{"token_id": "token-1", "account_id": "'$MARKETPLACE_CONTRACT_ID'"}' --gas 100000000000000 --deposit 0.1 --accountId $NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $NFT_CONTRACT_ID nft_approve json-args '{"token_id": "token-1", "account_id": "'$MARKETPLACE_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

<hr className="subsection" />

### Listing NFT on sale

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near call $MARKETPLACE_CONTRACT_ID list_nft_for_sale '{"nft_contract_id": "'$NFT_CONTRACT_ID'", "token_id": "token-1", "approval_id": 0, "msg": "{\"sale_conditions\": \"1\"}"}' --gas 300000000000000 --accountId $NFT_CONTRACT_ID --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-transaction $MARKETPLACE_CONTRACT_ID list_nft_for_sale json-args '{"nft_contract_id": "'$NFT_CONTRACT_ID'", "token_id": "token-1", "approval_id": 0, "msg": "{\"sale_conditions\": \"1\"}"}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

<hr className="subsection" />

### Total supply {#total-supply}

To query for the total supply of NFTs listed on the marketplace, you can call the `get_supply_sales` function. An example can be seen below.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $MARKETPLACE_CONTRACT_ID get_supply_sales '{}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_supply_sales json-args {} network-config testnet now
  ```
  </TabItem>

</Tabs>

<hr className="subsection" />

### Total supply by owner {#total-supply-by-owner}

To query for the total supply of NFTs listed by a specific owner on the marketplace, you can call the `get_supply_by_owner_id` function. An example can be seen below.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $MARKETPLACE_CONTRACT_ID get_supply_by_owner_id '{"account_id": "'$NFT_CONTRACT_ID'"}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_supply_by_owner_id json-args '{"account_id": "'$NFT_CONTRACT_ID'"}' network-config testnet now
  ```
  </TabItem>
</Tabs>

<hr className="subsection" />

### Total supply by contract {#total-supply-by-contract}

To query for the total supply of NFTs that belong to a specific contract, you can call the `get_supply_by_nft_contract_id` function. An example can be seen below.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $MARKETPLACE_CONTRACT_ID get_supply_by_nft_contract_id '{"nft_contract_id": "'$NFT_CONTRACT_ID'"}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_supply_by_nft_contract_id json-args '{"nft_contract_id": "'$NFT_CONTRACT_ID'"}' network-config testnet now
  ```
  </TabItem>
</Tabs>

<hr className="subsection" />

### Query for listing information {#query-listing-information}

To query for important information for a specific listing, you can call the `get_sale` function. This requires that you pass in the `nft_contract_token`. This is essentially the unique identifier for sales on the market contract as explained earlier. It consists of the NFT contract followed by a `DELIMITER` followed by the token ID. In this contract, the `DELIMITER` is simply a period: `.`.  An example of this query can be seen below.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $MARKETPLACE_CONTRACT_ID get_sale '{"nft_contract_token": "'$NFT_CONTRACT_ID'.token-1"}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_sale json-args '{"nft_contract_token": "'$NFT_CONTRACT_ID'.token-1"}' network-config testnet now
  ```
  </TabItem>
</Tabs>

In addition, you can query for paginated information about the listings for a given owner by calling the `get_sales_by_owner_id` function.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $MARKETPLACE_CONTRACT_ID get_sales_by_owner_id '{"account_id": "'$NFT_CONTRACT_ID'", "from_index": "0", "limit": 5}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_sales_by_owner_id json-args '{"account_id": "'$NFT_CONTRACT_ID'", "from_index": "0", "limit": 5}' network-config testnet now
  ```
  </TabItem>
</Tabs>

Finally, you can query for paginated information about the listings that originate from a given NFT contract by calling the `get_sales_by_nft_contract_id` function.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  near view $MARKETPLACE_CONTRACT_ID get_sales_by_nft_contract_id '{"nft_contract_id": "'$NFT_CONTRACT_ID'", "from_index": "0", "limit": 5}' --networkId testnet
  ```
  </TabItem>

  <TabItem value="full" label="Full">

  ```bash
  near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_sales_by_nft_contract_id json-args '{"nft_contract_id": "'$NFT_CONTRACT_ID'", "from_index": "0", "limit": 5}' network-config testnet now
  ```
  </TabItem>
</Tabs>

---

## Conclusion

In this tutorial, you learned about the basics of a marketplace contract and how it works. You went through the [lib.rs](#lib-rs) file and learned about the [initialization function](#initialization-function) in addition to the [storage management](#storage-management-model) model.

You went through the [NFTs listing process](#listing-logic). In addition, you went through some important functions needed after you've listed an NFT. This includes [removing sales](#removing-sales), [updating the price](#updating-price), and [purchasing NFTs](#purchasing-nfts).

Finally, you went through the enumeration methods found in the [`sale_view`](#sale_view-rs) file. These allow you to query for important information found on the marketplace contract.

You should now have a solid understanding of NFTs and marketplaces on NEAR. Feel free to branch off and expand on these contracts to create whatever cool applications you'd like. In the [next tutorial](9-series.md), you'll learn how to take the existing NFT contract and optimize it to allow for:
- Lazy Minting
- Creating Collections
- Allowlisting functionalities
- Optimized Storage Models

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.17.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
