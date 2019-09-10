# "account"

## Index

#### Classes

* [Account](_account_.account.md)

#### Interfaces

* [AccountState](_account_.accountstate.md)

#### Variables

* [DEFAULT\_FUNC\_CALL\_AMOUNT](./#default_func_call_amount)
* [TX\_STATUS\_RETRY\_NUMBER](./#tx_status_retry_number)
* [TX\_STATUS\_RETRY\_WAIT](./#tx_status_retry_wait)
* [TX\_STATUS\_RETRY\_WAIT\_BACKOFF](./#tx_status_retry_wait_backoff)

#### Functions

* [sleep](./#sleep)

## Variables

### `<Const>` DEFAULT\_FUNC\_CALL\_AMOUNT <a id="default_func_call_amount"></a>

**● DEFAULT\_FUNC\_CALL\_AMOUNT**: _`BN`_ = new BN\(1000000000\)

_Defined in_ [_account.ts:13_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L13)

### `<Const>` TX\_STATUS\_RETRY\_NUMBER <a id="tx_status_retry_number"></a>

**● TX\_STATUS\_RETRY\_NUMBER**: _`10`_ = 10

_Defined in_ [_account.ts:16_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L16)

### `<Const>` TX\_STATUS\_RETRY\_WAIT <a id="tx_status_retry_wait"></a>

**● TX\_STATUS\_RETRY\_WAIT**: _`500`_ = 500

_Defined in_ [_account.ts:19_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L19)

### `<Const>` TX\_STATUS\_RETRY\_WAIT\_BACKOFF <a id="tx_status_retry_wait_backoff"></a>

**● TX\_STATUS\_RETRY\_WAIT\_BACKOFF**: _`1.5`_ = 1.5

_Defined in_ [_account.ts:22_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L22)

## Functions

### sleep <a id="sleep"></a>

▸ **sleep**\(millis: _`number`_\): `Promise`&lt;`any`&gt;

_Defined in_ [_account.ts:25_](https://github.com/nearprotocol/nearlib/blob/7880ebf/src.ts/account.ts#L25)

**Parameters:**

| Name | Type |
| :--- | :--- |
| millis | `number` |

**Returns:** `Promise`&lt;`any`&gt;

