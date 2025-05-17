import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="nft-contract-tabs" className="file-tabs">
<TabItem value="Paras" label="Paras" default>

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = 'x.paras.near';
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

await wallet.callMethod({
  method: 'nft_buy',
  args: {
    token_series_id: '299102',
    receiver_id: 'bob.near',
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 205740000000000000000000, // attached deposit in yoctoNEAR, covers NFT price + storage cost
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

<details>

<summary>Example response</summary>

```json
"299102:1"
```

</details>

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = 'simple.market.mintbase1.near';
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

await wallet.callMethod({
  method: 'buy',
  args: {
    nft_contract_id: 'rubennnnnnnn.mintbase1.near',
    token_id: '38',
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 1000000000000000000000, // attached deposit in yoctoNEAR, covers NFT price + storage cost (optional)
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

<details>

<summary>Example response</summary>

```json
{
  "payout": {
    "rub3n.near": "889200000000000000000",
    "rubenm4rcus.near": "85800000000000000000"
  }
}
```

</details>

:::tip

Check how to do this using the [`Mintbase JS`](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/buy)

:::

</TabItem>

</Tabs>
