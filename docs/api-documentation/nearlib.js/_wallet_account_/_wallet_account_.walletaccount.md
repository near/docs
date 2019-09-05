# WalletAccount

## Hierarchy

**WalletAccount**

## Constructors

### constructor <a id="constructor"></a>

⊕ **new WalletAccount**\(near: [_Near_](../_near_/_near_.near.md), appKeyPrefix: _`string` \| `null`_\): [WalletAccount](_wallet_account_.walletaccount.md)

_Defined in_ [_wallet-account.ts:18_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/wallet-account.ts#L18)

**Parameters:**

| Name | Type |
| :--- | :--- |
| near | [Near](../_near_/_near_.near.md) |
| appKeyPrefix | `string` \| `null` |

**Returns:** [WalletAccount](_wallet_account_.walletaccount.md)

## Properties

### \_authData <a id="_authdata"></a>

**● \_authData**: _`any`_

_Defined in_ [_wallet-account.ts:17_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/wallet-account.ts#L17)

### \_authDataKey <a id="_authdatakey"></a>

**● \_authDataKey**: _`string`_

_Defined in_ [_wallet-account.ts:15_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/wallet-account.ts#L15)

### \_keyStore <a id="_keystore"></a>

**● \_keyStore**: [_KeyStore_](../_key_stores_keystore_/_key_stores_keystore_.keystore.md)

_Defined in_ [_wallet-account.ts:16_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/wallet-account.ts#L16)

### \_networkId <a id="_networkid"></a>

**● \_networkId**: _`string`_

_Defined in_ [_wallet-account.ts:18_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/wallet-account.ts#L18)

### \_walletBaseUrl <a id="_walletbaseurl"></a>

**● \_walletBaseUrl**: _`string`_

_Defined in_ [_wallet-account.ts:14_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/wallet-account.ts#L14)

## Methods

### \_completeSignInWithAccessKey <a id="_completesigninwithaccesskey"></a>

▸ **\_completeSignInWithAccessKey**\(\): `Promise`&lt;`void`&gt;

_Defined in_ [_wallet-account.ts:84_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/wallet-account.ts#L84)

Complete sign in for a given account id and public key. To be invoked by the app when getting a callback from the wallet.

**Returns:** `Promise`&lt;`void`&gt;

### \_moveKeyFromTempToPermanent <a id="_movekeyfromtemptopermanent"></a>

▸ **\_moveKeyFromTempToPermanent**\(accountId: _`string`_, publicKey: _`string`_\): `Promise`&lt;`void`&gt;

_Defined in_ [_wallet-account.ts:97_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/wallet-account.ts#L97)

**Parameters:**

| Name | Type |
| :--- | :--- |
| accountId | `string` |
| publicKey | `string` |

**Returns:** `Promise`&lt;`void`&gt;

### getAccountId <a id="getaccountid"></a>

▸ **getAccountId**\(\): `any`

_Defined in_ [_wallet-account.ts:46_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/wallet-account.ts#L46)

Returns authorized Account ID.

_**example**_: walletAccount.getAccountId\(\);

**Returns:** `any`

### isSignedIn <a id="issignedin"></a>

▸ **isSignedIn**\(\): `boolean`

_Defined in_ [_wallet-account.ts:37_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/wallet-account.ts#L37)

Returns true, if this WalletAccount is authorized with the wallet.

_**example**_: walletAccount.isSignedIn\(\);

**Returns:** `boolean`

### requestSignIn <a id="requestsignin"></a>

▸ **requestSignIn**\(contractId: _`string`_, title: _`string`_, successUrl: _`string`_, failureUrl: _`string`_\): `Promise`&lt;`void`&gt;

_Defined in_ [_wallet-account.ts:63_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/wallet-account.ts#L63)

Redirects current page to the wallet authentication page.

_**example**_: walletAccount.requestSignIn\( myContractId, title, onSuccessHref, onFailureHref\);

**Parameters:**

| Name | Type | Description |
| :--- | :--- | :--- |
| contractId | `string` | contract ID of the application |
| title | `string` | name of the application |
| successUrl | `string` | url to redirect on success |
| failureUrl | `string` | url to redirect on failure |

**Returns:** `Promise`&lt;`void`&gt;

### signOut <a id="signout"></a>

▸ **signOut**\(\): `void`

_Defined in_ [_wallet-account.ts:108_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/wallet-account.ts#L108)

Sign out from the current account

_**example**_: walletAccount.signOut\(\);

**Returns:** `void`

