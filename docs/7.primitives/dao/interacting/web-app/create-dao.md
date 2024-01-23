import {Github} from "@site/src/components/codetabs";

```js
import { Wallet } from './near-wallet';

const DAO_FACTORY_CONTRACT_ADDRESS = "sputnik-dao.near";
const wallet = new Wallet({ createAccessKeyFor: DAO_FACTORY_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'create',
  args: {
    name: "primitives",
    args: btoa({
      config: {
        name: "Primitives",
        purpose: "Building primitives on NEAR",
        metadata: ""
      },
      policy: ["bob.near"]
    }),
  },
  contractId: DAO_FACTORY_CONTRACT_ADDRESS,
  gas: 300000000000000,
  deposit: 6000000000000000000000000
});
```

:::note
The full list of roles and permissions you can find [here](https://github.com/near-daos/sputnik-dao-contract#roles-and-permissions).
:::

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />