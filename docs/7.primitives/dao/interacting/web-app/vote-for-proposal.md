import {Github} from "@site/src/components/codetabs";

```js
import { Wallet } from './near-wallet';

const DAO_CONTRACT_ADDRESS = "primitives.sputnik-dao.near";
const wallet = new Wallet({ createAccessKeyFor: DAO_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'act_proposal',
  args: { id: 0, action: "VoteApprove" },
  contractId: DAO_CONTRACT_ADDRESS,
  gas: 300000000000000,
});
```

:::note
Available vote options: `VoteApprove`, `VoteReject`, `VoteRemove`.
:::

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />