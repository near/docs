import {Github} from "@site/src/components/codetabs";

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "tkn.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

const args = {
  args: {
    owner_id: "bob.near",
    total_supply: "1000000000",
    metadata: {
      spec: "ft-1.0.0",
      name: "Test Token",
      symbol: "test",
      icon: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      decimals: 18,
    },
  },
  account_id: "bob.near",
};

const requiredStorageDeposit = await wallet.viewMethod({
  method: 'get_required_deposit',
  args,
  contractId: CONTRACT_ADDRESS
});
```

<details>
<summary>Example response</summary>
<p>

```json
'2234830000000000000000000'
```

</p>

</details>

Then you can create a token.

```js
await wallet.callMethod({
  method: 'create_token',
  args,
  contractId: CONTRACT_ADDRESS,
  gas: 300000000000000,
  deposit: requiredStorageDeposit
});
```

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />