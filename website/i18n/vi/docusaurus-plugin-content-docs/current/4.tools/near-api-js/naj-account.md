---
id: account
title: Account
sidebar_label: Account
---

You can interact with, create or delete NEAR accounts.

### Load Account {#load-account}

This will return an Account object for you to interact with.

```js
const account = await nearConnection.account("example-account.testnet");
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `Account`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html)

### Tạo account {#create-account}

```js
// create a new account using funds from the account used to create it.
const account = await nearConnection.account("example-account.testnet");
await account.createAccount(
  "example-account2.testnet", // new account name
  "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
  "10000000000000000000" // initial balance for new account in yoctoNEAR
);
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.createAccount`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#createAccount)

### Xóa account {#delete-account}

```js
// deletes account found in the `account` object
// transfers remaining account balance to the accountId passed as an argument
const account = await nearConnection.account("example-account.testnet");
await account.deleteAccount("beneficiary-account.testnet");
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.deleteAccount`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#deleteAccount)

### Kiểm tra số dư tài khoản {#get-account-balance}

```js
// gets account balance
const account = await nearConnection.account("example-account.testnet");
await account.getAccountBalance();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.getAccountBalance`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#getAccountBalance)

### Xem thông tin chi tiết của account {#get-account-details}

Returns information about an account, such as authorized apps.

```js
// gets account details in terms of authorized apps and transactions
const account = await nearConnection.account("example-account.testnet");
await account.getAccountDetails();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.getAccountDetails`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#getAccountDetails)

### Deploy contract {#deploy-a-contract}

You can deploy a contract from a compiled WASM file. This returns an object with transaction and receipts outcomes and status.

```js
const account = await nearConnection.account("example-account.testnet");
const transactionOutcome = await account.deployContract(
  fs.readFileSync("example-file.wasm")
);
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.deployContract`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#deployContract) &nbsp;&nbsp;&nbsp; [<span class="typedoc-icon typedoc-icon-interface"></span> Interface `FinalExecutionOutcome`](https://near.github.io/near-api-js/interfaces/_near_js_types.provider_response.FinalExecutionOutcome.html)

### Send Tokens {#send-tokens}

Transfer NEAR tokens between accounts. This returns an object with transaction and receipts outcomes and status.

```js
const account = await nearConnection.account("sender-account.testnet");
await account.sendMoney(
  "receiver-account.testnet", // receiver account
  "1000000000000000000000000" // amount in yoctoNEAR
);
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.sendMoney`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#sendMoney) &nbsp;&nbsp;&nbsp; [<span class="typedoc-icon typedoc-icon-interface"></span> Interface `FinalExecutionOutcome`](https://near.github.io/near-api-js/interfaces/_near_js_types.provider_response.FinalExecutionOutcome.html)

### State {#state}

Get basic account information, such as amount of tokens the account has or the amount of storage it uses.

```js
const account = await nearConnection.account("example-account.testnet");
const accountState = await account.state();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.state`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#state) &nbsp;&nbsp;&nbsp; [<span class="typedoc-icon typedoc-icon-interface"></span> Interface `AccountView`](https://near.github.io/near-api-js/interfaces/near_api_js.providers_provider.AccountView.html)

### Các RPC Endpoint {#access-keys}

You can get and manage keys for an account.

#### Thêm một Full Access Key {#add-full-access-key}

```js
// takes public key as string for argument
const account = await nearConnection.account("example-account.testnet");
await account.addKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.addKey`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#addKey)

#### Thêm một Function Access Key {#add-function-access-key}

```js
const account = await nearConnection.account("example-account.testnet");
await account.addKey(
  "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
  "example-account.testnet", // contract this key is allowed to call (optional)
  "example_method", // methods this key is allowed to call (optional)
  "2500000000000" // allowance key can use to call methods (optional)
);
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.addKey`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#addKey)

#### Lấy tất cả các Access Key {#get-all-access-keys}

```js
const account = await nearConnection.account("example-account.testnet");
await account.getAccessKeys();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.getAccessKeys`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#getAccessKeys) &nbsp;&nbsp;&nbsp; [<span class="typedoc-icon typedoc-icon-interface"></span> Interface `AccessKeyInfoView`](https://near.github.io/near-api-js/interfaces/near_api_js.providers_provider.AccessKeyInfoView.html)

#### Xóa Access Key {#delete-access-key}

```js
const account = await nearConnection.account("example-account.testnet");
await account.deleteKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.deleteKey`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#deleteKey)
