import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs className="file-tabs">

<TabItem value="Keypom API" label="Keypom API">

```js
const dropsNumber = "2";
const keysGeneratorUrl = "https://keypom.sctuts.com/keypair/";
const rootEntrophy = "my-password"; //If not provided, the keypair will be completely random. see: https://docs.keypom.xyz/docs/next/keypom-sdk/Core/modules 
asyncFetch(keysGeneratorUrl + dropsNumber + "/" + rootEntrophy).then((res) => {
  const keyPairs = JSON.parse(res.body);
  const pubKeys = [];
  const privKeys = [];

  keyPairs.forEach((e) => {
    pubKeys.push(e.pub);
    privKeys.push(e.priv);
  });

  const obj = {
    publicKeys: pubKeys,
    privKeys: privKeys,
  };

  State.update(obj);
});
```

</TabItem>

</Tabs>
