---
id: "globals"
title: "near-api-js"
sidebar_label: "Globals"
---

## Index

### Enumerations

* [FinalTransactionStatus](enums/finaltransactionstatus.md)
* [KeyType](enums/keytype.md)

### Classes

* [AccessKey](classes/accesskey.md)
* [AccessKeyPermission](classes/accesskeypermission.md)
* [Account](classes/account.md)
* [AccountCreator](classes/accountcreator.md)
* [Action](classes/action.md)
* [AddKey](classes/addkey.md)
* [Assignable](classes/assignable.md)
* [BinaryReader](classes/binaryreader.md)
* [BinaryWriter](classes/binarywriter.md)
* [BrowserLocalStorageKeyStore](classes/browserlocalstoragekeystore.md)
* [Connection](classes/connection.md)
* [Contract](classes/contract.md)
* [CreateAccount](classes/createaccount.md)
* [DeleteAccount](classes/deleteaccount.md)
* [DeleteKey](classes/deletekey.md)
* [DeployContract](classes/deploycontract.md)
* [Enum](classes/enum.md)
* [FullAccessPermission](classes/fullaccesspermission.md)
* [FunctionCall](classes/functioncall.md)
* [FunctionCallPermission](classes/functioncallpermission.md)
* [IAction](classes/iaction.md)
* [InMemoryKeyStore](classes/inmemorykeystore.md)
* [InMemorySigner](classes/inmemorysigner.md)
* [JsonRpcProvider](classes/jsonrpcprovider.md)
* [KeyPair](classes/keypair.md)
* [KeyPairEd25519](classes/keypaired25519.md)
* [KeyStore](classes/keystore.md)
* [LocalAccountCreator](classes/localaccountcreator.md)
* [MergeKeyStore](classes/mergekeystore.md)
* [Near](classes/near.md)
* [Provider](classes/provider.md)
* [PublicKey](classes/publickey.md)
* [Signature](classes/signature.md)
* [SignedTransaction](classes/signedtransaction.md)
* [Signer](classes/signer.md)
* [Stake](classes/stake.md)
* [Transaction](classes/transaction.md)
* [Transfer](classes/transfer.md)
* [UnencryptedFileSystemKeyStore](classes/unencryptedfilesystemkeystore.md)
* [UrlAccountCreator](classes/urlaccountcreator.md)
* [WalletAccount](classes/walletaccount.md)

### Interfaces

* [AccountInfo](interfaces/accountinfo.md)
* [AccountState](interfaces/accountstate.md)
* [BlockHeader](interfaces/blockheader.md)
* [BlockResult](interfaces/blockresult.md)
* [ConnectionInfo](interfaces/connectioninfo.md)
* [FinalTransactionResult](interfaces/finaltransactionresult.md)
* [Network](interfaces/network.md)
* [NodeStatusResult](interfaces/nodestatusresult.md)
* [SyncInfo](interfaces/syncinfo.md)
* [TotalWeight](interfaces/totalweight.md)
* [TransactionLog](interfaces/transactionlog.md)
* [TransactionResult](interfaces/transactionresult.md)

### Type aliases

* [Arrayish](globals.md#arrayish)
* [Schema](globals.md#schema)

### Variables

* [DEFAULT_FUNC_CALL_AMOUNT](globals.md#const-default_func_call_amount)
* [INITIAL_LENGTH](globals.md#const-initial_length)
* [LOCAL_STORAGE_KEY_PREFIX](globals.md#const-local_storage_key_prefix)
* [LOCAL_STORAGE_KEY_SUFFIX](globals.md#const-local_storage_key_suffix)
* [LOGIN_WALLET_URL_SUFFIX](globals.md#const-login_wallet_url_suffix)
* [PENDING_ACCESS_KEY_PREFIX](globals.md#const-pending_access_key_prefix)
* [SCHEMA](globals.md#const-schema)
* [TX_STATUS_RETRY_NUMBER](globals.md#const-tx_status_retry_number)
* [TX_STATUS_RETRY_WAIT](globals.md#const-tx_status_retry_wait)
* [TX_STATUS_RETRY_WAIT_BACKOFF](globals.md#const-tx_status_retry_wait_backoff)
* [_nextId](globals.md#let-_nextid)
* [exists](globals.md#const-exists)
* [fetch](globals.md#const-fetch)
* [mkdir](globals.md#const-mkdir)
* [readFile](globals.md#const-readfile)
* [readdir](globals.md#const-readdir)
* [unlink](globals.md#const-unlink)
* [writeFile](globals.md#const-writefile)

### Functions

* [addKey](globals.md#addkey)
* [base_decode](globals.md#base_decode)
* [base_encode](globals.md#base_encode)
* [connect](globals.md#connect)
* [createAccount](globals.md#createaccount)
* [deleteAccount](globals.md#deleteaccount)
* [deleteKey](globals.md#deletekey)
* [deployContract](globals.md#deploycontract)
* [deserialize](globals.md#deserialize)
* [deserializeField](globals.md#deserializefield)
* [deserializeStruct](globals.md#deserializestruct)
* [ensureDir](globals.md#ensuredir)
* [fetchJson](globals.md#fetchjson)
* [fullAccessKey](globals.md#fullaccesskey)
* [functionCall](globals.md#functioncall)
* [functionCallAccessKey](globals.md#functioncallaccesskey)
* [getProvider](globals.md#getprovider)
* [getSigner](globals.md#getsigner)
* [getTransactionLastResult](globals.md#gettransactionlastresult)
* [key_type_to_str](globals.md#key_type_to_str)
* [loadJsonFile](globals.md#loadjsonfile)
* [promisify](globals.md#const-promisify)
* [readKeyFile](globals.md#readkeyfile)
* [serialize](globals.md#serialize)
* [serializeField](globals.md#serializefield)
* [serializeStruct](globals.md#serializestruct)
* [signTransaction](globals.md#signtransaction)
* [sleep](globals.md#sleep)
* [stake](globals.md#stake)
* [str_to_key_type](globals.md#str_to_key_type)
* [transfer](globals.md#transfer)

## Type aliases

###  Arrayish

Ƭ **Arrayish**: *string | ArrayLike‹number›*

*Defined in [utils/key_pair.ts:6](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L6)*

___

###  Schema

Ƭ **Schema**: *Map‹Function, any›*

*Defined in [utils/serialize.ts:19](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/serialize.ts#L19)*

## Variables

### `Const` DEFAULT_FUNC_CALL_AMOUNT

• **DEFAULT_FUNC_CALL_AMOUNT**: *2000000* = 2000000

*Defined in [account.ts:14](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L14)*

___

### `Const` INITIAL_LENGTH

• **INITIAL_LENGTH**: *1024* = 1024

*Defined in [utils/serialize.ts:17](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/serialize.ts#L17)*

___

### `Const` LOCAL_STORAGE_KEY_PREFIX

• **LOCAL_STORAGE_KEY_PREFIX**: *"near-api-js:keystore:"* = "near-api-js:keystore:"

*Defined in [key_stores/browser_local_storage_key_store.ts:6](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/browser_local_storage_key_store.ts#L6)*

___

### `Const` LOCAL_STORAGE_KEY_SUFFIX

• **LOCAL_STORAGE_KEY_SUFFIX**: *"_wallet_auth_key"* = "_wallet_auth_key"

*Defined in [wallet-account.ts:10](https://github.com/near/near-api-js/blob/88ad17d/src.ts/wallet-account.ts#L10)*

___

### `Const` LOGIN_WALLET_URL_SUFFIX

• **LOGIN_WALLET_URL_SUFFIX**: *"/login/"* = "/login/"

*Defined in [wallet-account.ts:8](https://github.com/near/near-api-js/blob/88ad17d/src.ts/wallet-account.ts#L8)*

___

### `Const` PENDING_ACCESS_KEY_PREFIX

• **PENDING_ACCESS_KEY_PREFIX**: *"pending_key"* = "pending_key"

*Defined in [wallet-account.ts:11](https://github.com/near/near-api-js/blob/88ad17d/src.ts/wallet-account.ts#L11)*

___

### `Const` SCHEMA

• **SCHEMA**: *Map‹Function, any›* =  new Map<Function, any>([
    [Signature, {kind: 'struct', fields: [
        ['keyType', 'u8'],
        ['data', [32]]
    ]}],
    [SignedTransaction, {kind: 'struct', fields: [
        ['transaction', Transaction],
        ['signature', Signature]
    ]}],
    [Transaction, { kind: 'struct', fields: [
        ['signerId', 'string'],
        ['publicKey', PublicKey],
        ['nonce', 'u64'],
        ['receiverId', 'string'],
        ['blockHash', [32]],
        ['actions', [Action]]
    ]}],
    [PublicKey, { kind: 'struct', fields: [
        ['keyType', 'u8'],
        ['data', [32]]
    ]}],
    [AccessKey, { kind: 'struct', fields: [
        ['nonce', 'u64'],
        ['permission', AccessKeyPermission],
    ]}],
    [AccessKeyPermission, {kind: 'enum', field: 'enum', values: [
        ['functionCall', FunctionCallPermission],
        ['fullAccess', FullAccessPermission],
    ]}],
    [FunctionCallPermission, {kind: 'struct', fields: [
        ['allowance', {kind: 'option', type: 'u128'}],
        ['receiverId', 'string'],
        ['methodNames', ['string']],
    ]}],
    [FullAccessPermission, {kind: 'struct', fields: []}],
    [Action, {kind: 'enum', field: 'enum', values: [
        ['createAccount', CreateAccount],
        ['deployContract', DeployContract],
        ['functionCall', functionCall],
        ['transfer', transfer],
        ['stake', stake],
        ['addKey', addKey],
        ['deleteKey', deleteKey],
        ['deleteAccount', deleteAccount],
    ]}],
    [CreateAccount, { kind: 'struct', fields: [] }],
    [DeployContract, { kind: 'struct', fields: [
        ['code', ['u8']]
    ]}],
    [FunctionCall, { kind: 'struct', fields: [
        ['methodName', 'string'],
        ['args', ['u8']],
        ['gas', 'u64'],
        ['deposit', 'u128']
    ]}],
    [Transfer, { kind: 'struct', fields: [
        ['deposit', 'u128']
    ]}],
    [Stake, { kind: 'struct', fields: [
        ['stake', 'u128'],
        ['publicKey', PublicKey]
    ]}],
    [AddKey, { kind: 'struct', fields: [
        ['publicKey', PublicKey],
        ['accessKey', AccessKey]
    ]}],
    [DeleteKey, { kind: 'struct', fields: [
        ['publicKey', PublicKey]
    ]}],
    [DeleteAccount, { kind: 'struct', fields: [
        ['beneficiaryId', 'string']
    ]}],
])

*Defined in [transaction.ts:140](https://github.com/near/near-api-js/blob/88ad17d/src.ts/transaction.ts#L140)*

___

### `Const` TX_STATUS_RETRY_NUMBER

• **TX_STATUS_RETRY_NUMBER**: *10* = 10

*Defined in [account.ts:17](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L17)*

___

### `Const` TX_STATUS_RETRY_WAIT

• **TX_STATUS_RETRY_WAIT**: *500* = 500

*Defined in [account.ts:20](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L20)*

___

### `Const` TX_STATUS_RETRY_WAIT_BACKOFF

• **TX_STATUS_RETRY_WAIT_BACKOFF**: *1.5* = 1.5

*Defined in [account.ts:23](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L23)*

___

### `Let` _nextId

• **_nextId**: *number* = 123

*Defined in [providers/json-rpc-provider.ts:10](https://github.com/near/near-api-js/blob/88ad17d/src.ts/providers/json-rpc-provider.ts#L10)*

___

### `Const` exists

• **exists**: *Function* =  promisify(fs.exists)

*Defined in [key_stores/unencrypted_file_system_keystore.ts:18](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L18)*

___

### `Const` fetch

• **fetch**: *any* =  (typeof window === 'undefined' || window.name === 'nodejs') ? require('node-fetch') : window.fetch

*Defined in [utils/web.ts:14](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/web.ts#L14)*

___

### `Const` mkdir

• **mkdir**: *Function* =  promisify(fs.mkdir)

*Defined in [key_stores/unencrypted_file_system_keystore.ts:23](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L23)*

___

### `Const` readFile

• **readFile**: *Function* =  promisify(fs.readFile)

*Defined in [key_stores/unencrypted_file_system_keystore.ts:19](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L19)*

___

### `Const` readdir

• **readdir**: *Function* =  promisify(fs.readdir)

*Defined in [key_stores/unencrypted_file_system_keystore.ts:22](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L22)*

___

### `Const` unlink

• **unlink**: *Function* =  promisify(fs.unlink)

*Defined in [key_stores/unencrypted_file_system_keystore.ts:21](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L21)*

___

### `Const` writeFile

• **writeFile**: *Function* =  promisify(fs.writeFile)

*Defined in [key_stores/unencrypted_file_system_keystore.ts:20](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L20)*

## Functions

###  addKey

▸ **addKey**(`publicKey`: [PublicKey](classes/publickey.md), `accessKey`: [AccessKey](classes/accesskey.md)): *[Action](classes/action.md)*

*Defined in [transaction.ts:89](https://github.com/near/near-api-js/blob/88ad17d/src.ts/transaction.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`publicKey` | [PublicKey](classes/publickey.md) |
`accessKey` | [AccessKey](classes/accesskey.md) |

**Returns:** *[Action](classes/action.md)*

___

###  base_decode

▸ **base_decode**(`value`: string): *Uint8Array*

*Defined in [utils/serialize.ts:13](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/serialize.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |

**Returns:** *Uint8Array*

___

###  base_encode

▸ **base_encode**(`value`: Uint8Array | string): *string*

*Defined in [utils/serialize.ts:6](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/serialize.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | Uint8Array &#124; string |

**Returns:** *string*

___

###  connect

▸ **connect**(`config`: any): *Promise‹[Near](classes/near.md)›*

*Defined in [near.ts:72](https://github.com/near/near-api-js/blob/88ad17d/src.ts/near.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | any |

**Returns:** *Promise‹[Near](classes/near.md)›*

___

###  createAccount

▸ **createAccount**(): *[Action](classes/action.md)*

*Defined in [transaction.ts:69](https://github.com/near/near-api-js/blob/88ad17d/src.ts/transaction.ts#L69)*

**Returns:** *[Action](classes/action.md)*

___

###  deleteAccount

▸ **deleteAccount**(`beneficiaryId`: string): *[Action](classes/action.md)*

*Defined in [transaction.ts:97](https://github.com/near/near-api-js/blob/88ad17d/src.ts/transaction.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`beneficiaryId` | string |

**Returns:** *[Action](classes/action.md)*

___

###  deleteKey

▸ **deleteKey**(`publicKey`: [PublicKey](classes/publickey.md)): *[Action](classes/action.md)*

*Defined in [transaction.ts:93](https://github.com/near/near-api-js/blob/88ad17d/src.ts/transaction.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`publicKey` | [PublicKey](classes/publickey.md) |

**Returns:** *[Action](classes/action.md)*

___

###  deployContract

▸ **deployContract**(`code`: Uint8Array): *[Action](classes/action.md)*

*Defined in [transaction.ts:73](https://github.com/near/near-api-js/blob/88ad17d/src.ts/transaction.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`code` | Uint8Array |

**Returns:** *[Action](classes/action.md)*

___

###  deserialize

▸ **deserialize**(`schema`: [Schema](globals.md#schema), `classType`: any, `buffer`: Buffer): *any*

*Defined in [utils/serialize.ts:228](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/serialize.ts#L228)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | [Schema](globals.md#schema) |
`classType` | any |
`buffer` | Buffer |

**Returns:** *any*

___

###  deserializeField

▸ **deserializeField**(`schema`: [Schema](globals.md#schema), `fieldType`: any, `reader`: any): *any*

*Defined in [utils/serialize.ts:206](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/serialize.ts#L206)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | [Schema](globals.md#schema) |
`fieldType` | any |
`reader` | any |

**Returns:** *any*

___

###  deserializeStruct

▸ **deserializeStruct**(`schema`: [Schema](globals.md#schema), `classType`: any, `reader`: any): *any*

*Defined in [utils/serialize.ts:220](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/serialize.ts#L220)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | [Schema](globals.md#schema) |
`classType` | any |
`reader` | any |

**Returns:** *any*

___

###  ensureDir

▸ **ensureDir**(`path`: string): *Promise‹void›*

*Defined in [key_stores/unencrypted_file_system_keystore.ts:38](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *Promise‹void›*

___

###  fetchJson

▸ **fetchJson**(`connection`: string | [ConnectionInfo](interfaces/connectioninfo.md), `json?`: string): *Promise‹any›*

*Defined in [utils/web.ts:16](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/web.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`connection` | string &#124; [ConnectionInfo](interfaces/connectioninfo.md) |
`json?` | string |

**Returns:** *Promise‹any›*

___

###  fullAccessKey

▸ **fullAccessKey**(): *[AccessKey](classes/accesskey.md)*

*Defined in [transaction.ts:50](https://github.com/near/near-api-js/blob/88ad17d/src.ts/transaction.ts#L50)*

**Returns:** *[AccessKey](classes/accesskey.md)*

___

###  functionCall

▸ **functionCall**(`methodName`: string, `args`: Uint8Array, `gas`: number, `deposit`: BN): *[Action](classes/action.md)*

*Defined in [transaction.ts:77](https://github.com/near/near-api-js/blob/88ad17d/src.ts/transaction.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`methodName` | string |
`args` | Uint8Array |
`gas` | number |
`deposit` | BN |

**Returns:** *[Action](classes/action.md)*

___

###  functionCallAccessKey

▸ **functionCallAccessKey**(`receiverId`: string, `methodNames`: String[], `allowance?`: BN): *[AccessKey](classes/accesskey.md)*

*Defined in [transaction.ts:54](https://github.com/near/near-api-js/blob/88ad17d/src.ts/transaction.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`receiverId` | string |
`methodNames` | String[] |
`allowance?` | BN |

**Returns:** *[AccessKey](classes/accesskey.md)*

___

###  getProvider

▸ **getProvider**(`config`: any): *[Provider](classes/provider.md)*

*Defined in [connection.ts:6](https://github.com/near/near-api-js/blob/88ad17d/src.ts/connection.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | any |

**Returns:** *[Provider](classes/provider.md)*

___

###  getSigner

▸ **getSigner**(`networkId`: string, `config`: any): *[Signer](classes/signer.md)*

*Defined in [connection.ts:13](https://github.com/near/near-api-js/blob/88ad17d/src.ts/connection.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`networkId` | string |
`config` | any |

**Returns:** *[Signer](classes/signer.md)*

___

###  getTransactionLastResult

▸ **getTransactionLastResult**(`txResult`: [FinalTransactionResult](interfaces/finaltransactionresult.md)): *any*

*Defined in [providers/provider.ts:83](https://github.com/near/near-api-js/blob/88ad17d/src.ts/providers/provider.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`txResult` | [FinalTransactionResult](interfaces/finaltransactionresult.md) |

**Returns:** *any*

___

###  key_type_to_str

▸ **key_type_to_str**(`keyType`: [KeyType](enums/keytype.md)): *String*

*Defined in [utils/key_pair.ts:18](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`keyType` | [KeyType](enums/keytype.md) |

**Returns:** *String*

___

###  loadJsonFile

▸ **loadJsonFile**(`path`: string): *Promise‹any›*

*Defined in [key_stores/unencrypted_file_system_keystore.ts:33](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *Promise‹any›*

___

### `Const` promisify

▸ **promisify**(`fn`: any): *Function*

*Defined in [key_stores/unencrypted_file_system_keystore.ts:9](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`fn` | any |

**Returns:** *Function*

___

###  readKeyFile

▸ **readKeyFile**(`path`: string): *Promise‹[string, [KeyPair](classes/keypair.md)]›*

*Defined in [key_stores/unencrypted_file_system_keystore.ts:46](https://github.com/near/near-api-js/blob/88ad17d/src.ts/key_stores/unencrypted_file_system_keystore.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *Promise‹[string, [KeyPair](classes/keypair.md)]›*

___

###  serialize

▸ **serialize**(`schema`: [Schema](globals.md#schema), `obj`: any): *Uint8Array*

*Defined in [utils/serialize.ts:200](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/serialize.ts#L200)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | [Schema](globals.md#schema) |
`obj` | any |

**Returns:** *Uint8Array*

___

###  serializeField

▸ **serializeField**(`schema`: [Schema](globals.md#schema), `value`: any, `fieldType`: any, `writer`: any): *void*

*Defined in [utils/serialize.ts:147](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/serialize.ts#L147)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | [Schema](globals.md#schema) |
`value` | any |
`fieldType` | any |
`writer` | any |

**Returns:** *void*

___

###  serializeStruct

▸ **serializeStruct**(`schema`: [Schema](globals.md#schema), `obj`: any, `writer`: any): *void*

*Defined in [utils/serialize.ts:174](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/serialize.ts#L174)*

**Parameters:**

Name | Type |
------ | ------ |
`schema` | [Schema](globals.md#schema) |
`obj` | any |
`writer` | any |

**Returns:** *void*

___

###  signTransaction

▸ **signTransaction**(`receiverId`: string, `nonce`: number, `actions`: [Action](classes/action.md)[], `blockHash`: Uint8Array, `signer`: [Signer](classes/signer.md), `accountId?`: string, `networkId?`: string): *Promise‹[Uint8Array, [SignedTransaction](classes/signedtransaction.md)]›*

*Defined in [transaction.ts:214](https://github.com/near/near-api-js/blob/88ad17d/src.ts/transaction.ts#L214)*

**Parameters:**

Name | Type |
------ | ------ |
`receiverId` | string |
`nonce` | number |
`actions` | [Action](classes/action.md)[] |
`blockHash` | Uint8Array |
`signer` | [Signer](classes/signer.md) |
`accountId?` | string |
`networkId?` | string |

**Returns:** *Promise‹[Uint8Array, [SignedTransaction](classes/signedtransaction.md)]›*

___

###  sleep

▸ **sleep**(`millis`: number): *Promise‹any›*

*Defined in [account.ts:26](https://github.com/near/near-api-js/blob/88ad17d/src.ts/account.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`millis` | number |

**Returns:** *Promise‹any›*

___

###  stake

▸ **stake**(`stake`: BN, `publicKey`: [PublicKey](classes/publickey.md)): *[Action](classes/action.md)*

*Defined in [transaction.ts:85](https://github.com/near/near-api-js/blob/88ad17d/src.ts/transaction.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`stake` | BN |
`publicKey` | [PublicKey](classes/publickey.md) |

**Returns:** *[Action](classes/action.md)*

___

###  str_to_key_type

▸ **str_to_key_type**(`keyType`: string): *[KeyType](enums/keytype.md)*

*Defined in [utils/key_pair.ts:25](https://github.com/near/near-api-js/blob/88ad17d/src.ts/utils/key_pair.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`keyType` | string |

**Returns:** *[KeyType](enums/keytype.md)*

___

###  transfer

▸ **transfer**(`deposit`: BN): *[Action](classes/action.md)*

*Defined in [transaction.ts:81](https://github.com/near/near-api-js/blob/88ad17d/src.ts/transaction.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`deposit` | BN |

**Returns:** *[Action](classes/action.md)*
