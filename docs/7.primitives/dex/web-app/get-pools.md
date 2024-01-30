```js
const AMM_CONTRACT_ADDRESS = "v2.ref-finance.near";
const wallet = new Wallet({ createAccessKeyFor: AMM_CONTRACT_ADDRESS });
 
await wallet.viewMethod({
  method: 'get_pools',
  args: {
    from_index: 0,
    limit: 1000
  },
  contractId: AMM_CONTRACT_ADDRESS,
});
```
_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_ 

<details>
<summary>Example response</summary>
<p>

```js
[
  {
    pool_kind: 'SIMPLE_POOL',
    token_account_ids: [ 'token.skyward.near', 'wrap.near' ],
    amounts: [ '51865812079751349630100', '6254162663147994789053210138' ],
    total_fee: 30,
    shares_total_supply: '1305338644973934698612124055',
    amp: 0
  },
  {
    pool_kind: 'SIMPLE_POOL',
    token_account_ids: [
      'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.factory.bridge.near',
      'wrap.near'
    ],
    amounts: [ '783621938569399817', '1100232280852443291118200599' ],
    total_fee: 30,
    shares_total_supply: '33923015415693335344747628',
    amp: 0
  }
]
```

</p>

</details>