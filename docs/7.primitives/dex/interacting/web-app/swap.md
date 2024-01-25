import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs";

<Tabs groupId="dex-tabs" className="file-tabs">

<TabItem value="Ref Finance" label="Ref Finance">

:::note
Please, be careful using third-party contracts. Make sure that your account meets all the requirements of the smart contract if they exist. [Ref Finance docs](https://guide.ref.finance/).
:::

```js
import { Wallet } from './near-wallet';

const AMM_CONTRACT_ADDRESS = "v2.ref-finance.near";
const wallet = new Wallet({ createAccessKeyFor: AMM_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'swap',
  args: {
   actions: [
      {
        pool_id: 79,
        token_in: "token.v2.ref-finance.near",
        token_out: "wrap.near",
        amount_in: "100000000000000000",
        min_amount_out: "1",
      },
    ],
  },
  contractId: AMM_CONTRACT_ADDRESS,
  gas: 300000000000000,
  deposit: 1
});
```

<details>
<summary>Example response</summary>
<p>

```json
"5019606679394603179450"
```

</p>

</details>
</TabItem>

</Tabs>

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />