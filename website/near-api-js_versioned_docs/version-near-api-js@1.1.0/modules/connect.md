---
id: "connect"
title: "Module: connect"
sidebar_label: "connect"
sidebar_position: 0
custom_edit_url: null
---

Connect to NEAR using the provided configuration.

[networkId](../interfaces/connect.ConnectConfig.md#networkid) and [nodeUrl](../interfaces/connect.ConnectConfig.md#nodeurl) are required.

To sign transactions you can also pass:
1. [keyStore](../interfaces/connect.ConnectConfig.md#keystore)
2. [keyPath](../interfaces/connect.ConnectConfig.md#keypath)

If all three are passed they are prioritize in that order.

**`See`**

[ConnectConfig](../interfaces/connect.ConnectConfig.md)

**`Example`**

```js
async function initNear() {
  const near = await connect({
     networkId: 'testnet',
     nodeUrl: 'https://rpc.testnet.near.org'
  })
}
```

## Interfaces

- [ConnectConfig](../interfaces/connect.ConnectConfig.md)

## Functions

### connect

**connect**(`config`): `Promise`<[`Near`](../classes/near.Near.md)\>

Initialize connection to Near network.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectConfig`](../interfaces/connect.ConnectConfig.md) |

#### Returns

`Promise`<[`Near`](../classes/near.Near.md)\>

#### Defined in

[connect.ts:42](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/connect.ts#L42)
