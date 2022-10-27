---
id: "walletAccount.WalletConnection"
title: "Class: WalletConnection"
sidebar_label: "WalletConnection"
custom_edit_url: null
---

[walletAccount](../modules/walletAccount.md).WalletConnection

This class is used in conjunction with the [BrowserLocalStorageKeyStore](key_stores_browser_local_storage_key_store.BrowserLocalStorageKeyStore.md).
It redirects users to [NEAR Wallet](https://wallet.near.org) for key management.
This class is not intended for use outside the browser. Without `window` (i.e. in server contexts), it will instantiate but will throw a clear error when used.

**`See`**

[https://docs.near.org/tools/near-api-js/quick-reference#wallet](https://docs.near.org/tools/near-api-js/quick-reference#wallet)

**`Example`**

```js
// create new WalletConnection instance
const wallet = new WalletConnection(near, 'my-app');

// If not signed in redirect to the NEAR wallet to sign in
// keys will be stored in the BrowserLocalStorageKeyStore
if(!wallet.isSignedIn()) return wallet.requestSignIn()
```

## Constructors

### constructor

**new WalletConnection**(`near`, `appKeyPrefix`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `near` | [`Near`](near.Near.md) |
| `appKeyPrefix` | `string` |

#### Defined in

[wallet-account.ts:87](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L87)

## Methods

### account

**account**(): [`ConnectedWalletAccount`](walletAccount.ConnectedWalletAccount.md)

Returns the current connected wallet account

#### Returns

[`ConnectedWalletAccount`](walletAccount.ConnectedWalletAccount.md)

#### Defined in

[wallet-account.ts:273](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L273)

___

### getAccountId

**getAccountId**(): `string`

Returns authorized Account ID.

**`Example`**

```js
const wallet = new WalletConnection(near, 'my-app');
wallet.getAccountId();
```

#### Returns

`string`

#### Defined in

[wallet-account.ts:159](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L159)

___

### isSignedIn

**isSignedIn**(): `boolean`

Returns true, if this WalletConnection is authorized with the wallet.

**`Example`**

```js
const wallet = new WalletConnection(near, 'my-app');
wallet.isSignedIn();
```

#### Returns

`boolean`

#### Defined in

[wallet-account.ts:128](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L128)

___

### isSignedInAsync

**isSignedInAsync**(): `Promise`<`boolean`\>

Returns promise of completing signing in after redirecting from wallet

**`Example`**

```js
// on login callback page
const wallet = new WalletConnection(near, 'my-app');
wallet.isSignedIn(); // false
await wallet.isSignedInAsync(); // true
```

#### Returns

`Promise`<`boolean`\>

#### Defined in

[wallet-account.ts:142](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L142)

___

### requestSignIn

**requestSignIn**(`options`): `Promise`<`void`\>

Redirects current page to the wallet authentication page.

**`Example`**

```js
const wallet = new WalletConnection(near, 'my-app');
// redirects to the NEAR Wallet
wallet.requestSignIn({ contractId: 'account-with-deploy-contract.near' });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `SignInOptions` | An optional options object |

#### Returns

`Promise`<`void`\>

#### Defined in

[wallet-account.ts:177](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L177)

___

### requestSignTransactions

**requestSignTransactions**(`__namedParameters`): `Promise`<`void`\>

Requests the user to quickly sign for a transaction or batch of transactions by redirecting to the NEAR wallet.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `RequestSignTransactionsOptions` |

#### Returns

`Promise`<`void`\>

#### Defined in

[wallet-account.ts:205](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L205)

___

### signOut

**signOut**(): `void`

Sign out from the current account

**`Example`**

```ts
walletConnection.signOut();
```

#### Returns

`void`

#### Defined in

[wallet-account.ts:265](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/wallet-account.ts#L265)
