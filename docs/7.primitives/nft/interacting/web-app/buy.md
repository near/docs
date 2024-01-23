import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs";

<Tabs groupId="nft-contract-tabs" className="file-tabs">
<TabItem value="Paras" label="Paras" default>

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "x.paras.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_buy',
  args: {
    token_series_id: "299102",
    receiver_id: "bob.near",
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 205740000000000000000000 // attached deposit in yoctoNEAR, covers NFT price + storage cost
});
```

**Example response:**

```json
"299102:1"
```


</TabItem>

<TabItem value="Mintbase" label="Mintbase">

By using [`near-api-js`](https://docs.near.org/tools/near-api-js/quick-reference)

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "simple.market.mintbase1.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'buy',
  args: {
    nft_contract_id: "rubennnnnnnn.mintbase1.near",
    token_id: "38"
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 1000000000000000000000 // attached deposit in yoctoNEAR, covers NFT price + storage cost (optional)
});
```

**Example response:**

```json
{
  "payout": {
    "rub3n.near": "889200000000000000000",
    "rubenm4rcus.near": "85800000000000000000"
  }
}
```


By using [`Mintbase JS`](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/buy)

```js
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, burn, BuyArgs } from '@mintbase-js/sdk';


export const BuyComponent = ({ contractAddress, price, tokenId, affiliateAccount, marketId }:BuyArgs): JSX.Element => {
  const { selector } = useWallet();

  const handleBuy = async (): Promise<void> => {
    const wallet = await selector.wallet();
    const buyArgs = {contractAddress: contractAddress, tokenId: tokenId, affiliateAccount: affiliateAccount , marketId:marketId, price:price }

    await execute(
      { wallet },
      buy(buyArgs)
    );
  }

  return (
    <div>
      <button onClick={handleBuy}>
        Burn provided token array from {contractAddress}
      </button>
    </div>
  );
};
```

</TabItem>
</Tabs>

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />