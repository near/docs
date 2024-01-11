---
id: account
title: 계정
sidebar_label: 계정
---

NEAR 계정과 상호 작용, 생성 또는 삭제할 수 있습니다.

### 계정 불러오기 {#load-account}

다음과 같은 명령을 통해 상호작용할 계정 객체를 반환합니다.

```js
const account = await nearConnection.account("example-account.testnet");
```

[<span class="typedoc-icon typedoc-icon-class"></span> Class `Account`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html)

### 계정 생성 {#create-account}

```js
// create a new account using funds from the account used to create it. const account = await nearConnection.account("example-account.testnet");
await account.createAccount(
  "example-account2.testnet", // new account name
  "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
  "10000000000000000000" // initial balance for new account in yoctoNEAR
);
```

[<span class="typedoc-icon typedoc-icon-method"></span> `Account.createAccount` 메서드](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#createAccount)

### 계정 삭제 {#delete-account}

```js
// deletes account found in the `account` object
// transfers remaining account balance to the accountId passed as an argument
const account = await nearConnection.account("example-account.testnet");
await account.deleteAccount("beneficiary-account.testnet");
```

[<span class="typedoc-icon typedoc-icon-method"></span> `Account.deleteAccount` 메서드](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#deleteAccount)

### 계정 잔고 가져오기 {#get-account-balance}

```js
// gets account balance
const account = await nearConnection.account("example-account.testnet");
await account.getAccountBalance();
```

[<span class="typedoc-icon typedoc-icon-method"></span> `Account.getAccountBalance` 메서드](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#getAccountBalance)

### 계정 세부 정보 가져오기 {#get-account-details}

승인된 앱과 같은 계정에 대한 정보를 반환합니다.

```js
// gets account details in terms of authorized apps and transactions
const account = await nearConnection.account("example-account.testnet");
await account.getAccountDetails();
```

[<span class="typedoc-icon typedoc-icon-method"></span> `Account.getAccountDetails` 메서드](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#getAccountDetails)

### 컨트랙트 배포 {#deploy-a-contract}

컴파일된 WASM 파일에서 컨트랙트를 배포할 수 있습니다. 트랜잭션 및 Receipt 결과와 상태가 있는 객체를 반환합니다.

```js
const account = await nearConnection.account("example-account.testnet");
const transactionOutcome = await account.deployContract(
  fs.readFileSync("example-file.wasm")
);
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.deployContract`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#deployContract) &nbsp;&nbsp;&nbsp; [<span class="typedoc-icon typedoc-icon-interface"></span> Interface `FinalExecutionOutcome`](https://near.github.io/near-api-js/interfaces/_near_js_types.provider_response.FinalExecutionOutcome.html)

### 토큰 전송 {#send-tokens}

계정 간에 NEAR 토큰을 전송합니다. 트랜잭션 및 Receipt 결과와 상태가 있는 객체를 반환합니다.

```js
const account = await nearConnection.account("sender-account.testnet");
await account.sendMoney(
  "receiver-account.testnet", // receiver account
  "1000000000000000000000000" // amount in yoctoNEAR
);
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.sendMoney`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#sendMoney) &nbsp;&nbsp;&nbsp; [<span class="typedoc-icon typedoc-icon-interface"></span> Interface `FinalExecutionOutcome`](https://near.github.io/near-api-js/interfaces/_near_js_types.provider_response.FinalExecutionOutcome.html)

### 상태 {#state}

계정이 보유한 토큰의 양 또는 사용하는 스토리지의 양과 같은 기본 계정 정보를 가져옵니다.

```js
const account = await nearConnection.account("example-account.testnet");
const accountState = await account.state();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.state`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#state) &nbsp;&nbsp;&nbsp; [<span class="typedoc-icon typedoc-icon-interface"></span> Interface `AccountView`](https://near.github.io/near-api-js/interfaces/near_api_js.providers_provider.AccountView.html)

### 액세스 키 {#access-keys}

계정의 키를 가져오고 관리할 수 있습니다.

#### 전체 액세스 키 {#add-full-access-key}

```js
// takes public key as string for argument
const account = await nearConnection.account("example-account.testnet");
await account.addKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
```

[<span class="typedoc-icon typedoc-icon-method"></span> `Account.addKey` 메서드](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#addKey)

#### 함수 액세스 키 {#add-function-access-key}

```js
const account = await nearConnection.account("example-account.testnet");
await account.addKey(
  "8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc", // public key for new account
  "example-account.testnet", // contract this key is allowed to call (optional)
  "example_method", // methods this key is allowed to call (optional)
  "2500000000000" // allowance key can use to call methods (optional)
);
```

[<span class="typedoc-icon typedoc-icon-method"></span> `Account.addKey` 메서드](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#addKey)

#### 모든 액세스 키 가져오기 {#get-all-access-keys}

```js
const account = await nearConnection.account("example-account.testnet");
await account.getAccessKeys();
```

[<span class="typedoc-icon typedoc-icon-method"></span> Method `Account.getAccessKeys`](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#getAccessKeys) &nbsp;&nbsp;&nbsp; [<span class="typedoc-icon typedoc-icon-interface"></span> Interface `AccessKeyInfoView`](https://near.github.io/near-api-js/interfaces/near_api_js.providers_provider.AccessKeyInfoView.html)

#### 액세스 키 삭제 {#delete-access-key}

```js
const account = await nearConnection.account("example-account.testnet");
await account.deleteKey("8hSHprDq2StXwMtNd43wDTXQYsjXcD4MJTXQYsjXcc");
```

[<span class="typedoc-icon typedoc-icon-method"></span> `Account.deleteKey` 메서드](https://near.github.io/near-api-js/classes/near_api_js.account.Account.html#deleteKey)
