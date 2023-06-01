---
id: "browserConnect"
title: "Module: browserConnect"
sidebar_label: "browserConnect"
sidebar_position: 0
custom_edit_url: null
---

Connect to NEAR using the provided configuration.

[networkId](../interfaces/browserConnect.ConnectConfig.md#networkid) and [nodeUrl](../interfaces/browserConnect.ConnectConfig.md#nodeurl) are required.

To sign transactions you can also pass: [keyStore](../interfaces/browserConnect.ConnectConfig.md#keystore)

Both are passed they are prioritize in that order.

**`See`**

[ConnectConfig](../interfaces/browserConnect.ConnectConfig.md)

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

- [ConnectConfig](../interfaces/browserConnect.ConnectConfig.md)

## Functions

### connect

**connect**(`config`): `Promise`<[`Near`](../classes/near.Near.md)\>

Initialize connection to Near network.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ConnectConfig`](../interfaces/browserConnect.ConnectConfig.md) |

#### Returns

`Promise`<[`Near`](../classes/near.Near.md)\>

#### Defined in

[browser-connect.ts:33](https://github.com/near/near-api-js/blob/ef6d7fbf/packages/near-api-js/src/browser-connect.ts#L33)
