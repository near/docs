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

[Class `Account`](https://near.github.io/near-api-js/classes/account.account-1.html)

### Create Account {#create-account}

```js
// create a new account using funds from the account used to create it.
const account = await nearConnection.account("example-account.testnet");
await account.createAccount(
  "example-account2.testnet", // new account name
  "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
  "10000000000000000000" // initial balance for new account in yoctoNEAR
);
```

[Method `Account.createAccount`](https://near.github.io/near-api-js/classes/account.account-1.html#createaccount)

### Delete Account {#delete-account}

```js
// deletes account found in the `account` object
// transfers remaining account balance to the accountId passed as an argument
const account = await nearConnection.account("example-account.testnet");
await account.deleteAccount("beneficiary-account.testnet");
```

[Method `Account.deleteAccount`](https://near.github.io/near-api-js/classes/account.account-1.html#deleteaccount)

### Get Account Balance {#get-account-balance}

```js
// gets account balance
const account = await nearConnection.account("example-account.testnet");
await account.getAccountBalance();
```

[Method `Account.getAccountBalance`](https://near.github.io/near-api-js/classes/account.account-1.html#getaccountbalance)

### Get Account details {#get-account-details}

Returns information about an account, such as authorized apps.

```js
// gets account details in terms of authorized apps and transactions
const account = await nearConnection.account("example-account.testnet");
await account.getAccountDetails();
```

[Method `Account.getAccountDetails`](https://near.github.io/near-api-js/classes/account.account-1.html#getaccountdetails)

### Deploy a Contract {#deploy-a-contract}

You can deploy a contract from a compiled WASM file. This returns an object with transaction and receipts outcomes and status.

```js
const account = await nearConnection.account("example-account.testnet");
const transactionOutcome = await account.deployContract(fs.readFileSync('example-file.wasm'));
```

[Method `Account.deployContract`](https://near.github.io/near-api-js/classes/account.account-1.html#deploycontract)
&nbsp;&nbsp;&nbsp;
[Interface `FinalExecutionOutcome`](https://near.github.io/near-api-js/interfaces/providers_provider.finalexecutionoutcome.html)


### Send Tokens {#send-tokens}

Transfer NEAR tokens between accounts. This returns an object with transaction and receipts outcomes and status.

```js
const account = await nearConnection.account("sender-account.testnet");
await account.sendMoney(
  "receiver-account.testnet", // receiver account
  "1000000000000000000000000" // amount in yoctoNEAR
);
```

[Method `Account.sendMoney`](https://near.github.io/near-api-js/classes/account.account-1.html#sendmoney)
&nbsp;&nbsp;&nbsp;
[Interface `FinalExecutionOutcome`](https://near.github.io/near-api-js/interfaces/providers_provider.finalexecutionoutcome.html)


### State {#state}

Get basic account information, such as amount of tokens the account has or the amount of storage it uses.

```js
const account = await nearConnection.account("example-account.testnet");
const accountState = await account.state();
```

[Method `Account.state`](https://near.github.io/near-api-js/classes/account.account-1.html#state)
&nbsp;&nbsp;&nbsp;
[Interface `AccountView`](https://near.github.io/near-api-js/interfaces/providers_provider.accountview.html)

### Access Keys {#access-keys}

You can get and manage keys for an account.

#### Add Full Access Key {#add-full-access-key}

```js
// takes public key as string for argument
const account = await nearConnection.account("example-account.testnet");
await account.addKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
```

[Method `Account.addKey`](https://near.github.io/near-api-js/classes/account.account-1.html#addkey)

#### Add Function Access Key {#add-function-access-key}

```js
const account = await nearConnection.account("example-account.testnet");
await account.addKey(
  "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
  "example-account.testnet", // contract this key is allowed to call (optional)
  "example_method", // methods this key is allowed to call (optional)
  "2500000000000" // allowance key can use to call methods (optional)
);
```

[Method `Account.addKey`](https://near.github.io/near-api-js/classes/account.account-1.html#addkey)

#### Get All Access Keys {#get-all-access-keys}

```js
const account = await nearConnection.account("example-account.testnet");
await account.getAccessKeys();
```

[Method `Account.getAccessKeys`](https://near.github.io/near-api-js/classes/account.account-1.html#getaccesskeys)
&nbsp;&nbsp;&nbsp;
[Interface `AccessKeyInfoView`](https://near.github.io/near-api-js/interfaces/providers_provider.accesskeyinfoview.html)

#### Delete Access Key {#delete-access-key}

```js
const account = await nearConnection.account("example-account.testnet");
await account.deleteKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
```

[Method `Account.deleteKey`](https://near.github.io/near-api-js/classes/account.account-1.html#deletekey)