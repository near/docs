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

[wallet-account.ts:86](https://github.com/maxhr/near--near-api-js/blob/57fed346/packages/near-api-js/src/wallet-account.ts#L86)

## Methods

### account

**account**(): [`ConnectedWalletAccount`](walletAccount.ConnectedWalletAccount.md)

Returns the current connected wallet account

#### Returns

[`ConnectedWalletAccount`](walletAccount.ConnectedWalletAccount.md)

#### Defined in

[wallet-account.ts:272](https://github.com/maxhr/near--near-api-js/blob/57fed346/packages/near-api-js/src/wallet-account.ts#L272)

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

[wallet-account.ts:158](https://github.com/maxhr/near--near-api-js/blob/57fed346/packages/near-api-js/src/wallet-account.ts#L158)

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

[wallet-account.ts:127](https://github.com/maxhr/near--near-api-js/blob/57fed346/packages/near-api-js/src/wallet-account.ts#L127)

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

[wallet-account.ts:141](https://github.com/maxhr/near--near-api-js/blob/57fed346/packages/near-api-js/src/wallet-account.ts#L141)

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

[wallet-account.ts:176](https://github.com/maxhr/near--near-api-js/blob/57fed346/packages/near-api-js/src/wallet-account.ts#L176)

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

[wallet-account.ts:204](https://github.com/maxhr/near--near-api-js/blob/57fed346/packages/near-api-js/src/wallet-account.ts#L204)

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

[wallet-account.ts:264](https://github.com/maxhr/near--near-api-js/blob/57fed346/packages/near-api-js/src/wallet-account.ts#L264)
