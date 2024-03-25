import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="file-tabs">

<TabItem value="near-api-js" label="near-api-js">

```js
import { KeyPair } from 'near-api-js';

const newKeyPair = KeyPair.fromRandom('ed25519');
newKeyPair.public_key = newKeyPair.publicKey.toString();
```

</TabItem>

<TabItem value="Keypom API" label="Keypom API">

```js
const state = {};

const dropsNumber = "2";
const keysGeneratorUrl = "https://keypom.sctuts.com/keypair/";

fetch(keysGeneratorUrl + dropsNumber + "/rootEntrophy").then((res) => {
  const keyPairs = JSON.parse(res.body);
  const pubKeys = [];
  const privKeys = [];

  keyPairs.forEach((e) => {
    pubKeys.push(e.pub);
    privKeys.push(e.priv);
  });

  state.publicKeys = pubKeys;
  state.privKeys = privKeys;
});
```

</TabItem>

</Tabs>
