import {Github} from "@site/src/components/codetabs";

```js
import { Wallet } from './near-wallet';

const DAO_CONTRACT_ADDRESS = "nearweek-news-contribution.sputnik-dao.near";
const wallet = new Wallet({ createAccessKeyFor: DAO_CONTRACT_ADDRESS });
 
await wallet.viewMethod({
  method: 'get_proposals',
  args: { from_index: 9262, limit: 2 },
  contractId: DAO_CONTRACT_ADDRESS
});
```

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />