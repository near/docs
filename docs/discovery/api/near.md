---
id: near
title: NEAR API
sidebar_label: NEAR
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Near APIs

VM provides a convenient API to interact with the NEAR blockchain. There are three methods:

- [`Near.block`](#nearblock)
- [`Near.call`](#nearcall)
- [`Near.view`](#nearview)

## Near.block

| param                 | required | type | description                                                                                                                                       |
| --------------------- | -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blockHeightOrFinality` | _optional_    | any  | The block height or finality level to use for the blockchain query (desired block height, or one of the following strings: `optimistic`, `final`)<br/>- desired block height: The height of the specific block to query, expressed as a positive integer<br/>- `optimistic`: Uses the latest block recorded on the node that responded to your query (<1 second delay)<br/>- `final`: a block that has been validated on at least 66% of the nodes in the network (approx. 2s) |

### Example

<Tabs>
<TabItem value="request" label="Request" default>

```jsx
return Near.block("optimistic");
```

</TabItem>
<TabItem value="response" label="Response">

```json
{
  "author": "cryptium.poolv1.near",
  "chunks": [
    {
      "balance_burnt": "1401758302520100000000",
      "chunk_hash": "2a43V7ovicNbSsLEDL3yp1WJWa3bUWvHv5xz52vWqaSL",
      "encoded_length": 1898,
      "encoded_merkle_root": "8i97jVjroXatbDq12CXw8dfkQaX49cWgitD7Pdj61AFR",
      "gas_limit": 1000000000000000,
      "gas_used": 15913198926319,
      "height_created": 85885463,
      "height_included": 85885463,
      "outcome_root": "3M7Tx68bNtHvPLaavGEP7FovdULhppHFBavPCNjkgD5r",
      "outgoing_receipts_root": "FnKFqjSFfcFZ45k1ftG6tmnGD3uoV5VTmkAUYHbaBRRK",
      "prev_block_hash": "5YSsd2iwtwTLETkJvPVef5XbpER8NzJ6JUCuXLTnfPcm",
      "prev_state_root": "3UwJpoQKhuCAqbNFdNRQuNLPBNT5kQxwVy5CHNjLdcQi",
      "rent_paid": "0",
      "shard_id": 0,
      "signature": "ed25519:3MJhP6r3pyX1TaUWyW6KrWNdSWrzrR5VctP3MqLphzUFWTiNux9kXXnUAqmjLiYbDZ9w3QqVXPTUZDYiynGPTfab",
      "tx_root": "DHZ2oaett6NBGWoPb5SrB7gdQFaXEBapFXA2FAdHHi5r",
      "validator_proposals": [],
      "validator_reward": "0"
    },
    {
      "balance_burnt": "0",
      "chunk_hash": "4XHDgq6LL9TzYXDcK4vfnVyFM186RVzjgebZH5gbuzkK",
      "encoded_length": 8,
      "encoded_merkle_root": "9zYue7drR1rhfzEEoc4WUXzaYRnRNihvRoGt1BgK7Lkk",
      "gas_limit": 1000000000000000,
      "gas_used": 0,
      "height_created": 85885463,
      "height_included": 85885463,
      "outcome_root": "11111111111111111111111111111111",
      "outgoing_receipts_root": "8s41rye686T2ronWmFE38ji19vgeb6uPxjYMPt8y8pSV",
      "prev_block_hash": "5YSsd2iwtwTLETkJvPVef5XbpER8NzJ6JUCuXLTnfPcm",
      "prev_state_root": "2rXZaz7jwGb4ro6XhsQ7a1ZZnXqbx3QMjuKsViQUvJBV",
      "rent_paid": "0",
      "shard_id": 1,
      "signature": "ed25519:Sz7m5JsWR29EP7V1GBzYgkYah3Tw5Zitrq81WpLibrJWiD6RQFWc6BDh3Z2fWwz9FtFqpSy85nvSmZ4UDPZciMC",
      "tx_root": "11111111111111111111111111111111",
      "validator_proposals": [],
      "validator_reward": "0"
    },...],
    ...}
```

</TabItem>
</Tabs>

---

## Near.call

| param          | required | type            | description                                                                 |
| -------------- | -------- | --------------- | --------------------------------------------------------------------------- |
| `contractName` | **required**     | string             | Name of the smart contract to call                                          |
| `methodName`   | **required**     | string             | Name of the method to call on the smart contract                            |
| `args`         | _optional_    | object instance | Arguments to pass to the smart contract method as an object instance        |
| `gas`          | _optional_    | string / number             | Maximum amount of gas to be used for the transaction (default 300Tg)        |
| `deposit`      | _optional_    | string / number             | Amount of NEAR tokens to attach to the call as deposit (in yoctoNEAR units) |

This will conduct a call to a smart contract that will store a message onchain.

### Example

<Tabs>
<TabItem value="request" label="Request" default>

```jsx
return Near.call("nearsocialexamples.near", "set_greeting", {
  message: "Hi Near Social",
});
```

</TabItem>
<TabItem value="response" label="Response">

Upon hitting the `Render` button in `Widget Editor` you should see this:

![result](https://i.imgur.com/Lft2rtR.png)

Please take a look at [this Explorer link](https://explorer.near.org/transactions/8PyDVdbizhNj81LxfwdZ1WidKZyS8HVZp8udPKgzFiNi) to see the details related to this `Near.call` method.

</TabItem>
</Tabs>

---

## Near.view

| param              | required | type            | description                                                                                                                    |
| ------------------ | -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `contractName`     | **required**     | string             | Name of the smart contract                                                                                                     |
| `methodName`       | **required**     | string             | Name of the method to call                                                                                                     |
| `args`             | _optional_    | object instance | Arguments to pass to the method                                                                                                |
| `blockId/finality` | _optional_    | string             | Block ID or finality of the transaction                                                                                        |
| `subscribe`        | _optional_    | boolean            | This feature allows users to subscribe to a query, which automatically refreshes the data for all subscribers every 5 seconds. |

<Tabs>
<TabItem value="request" label="Request" default>

```jsx
return Near.view("nearsocialexamples.near", "get_greeting", `{}`);
```

</TabItem>
<TabItem value="response" label="Response">

Upon hitting the `Render` button in `Widget Editor` you should see this:

```jsx
"Hi Near Social";
```

</TabItem>
</Tabs>

### Call and View Example

Below is an example of how to conduct a Call and View Method within `near.social`

```jsx
State.init({
  value: "value to update",
});

console.log(Near.view("nearsocialexamples.near", "get_greeting"));

const testCall = () => {
  return Near.call("nearsocialexamples.near", "set_greeting", {
    message: "Hi Near Social",
  });
};

const testView = () => {
  State.update({
    value: Near.view("nearsocialexamples.near", "get_greeting"),
  });
};

return (
  <div>
    <button onClick={testCall}>test call</button>
    <button onClick={testView}>test view</button>

    <div>{state.value}</div>
  </div>
);
```
