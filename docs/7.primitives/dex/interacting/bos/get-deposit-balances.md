import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="dex-tabs" className="file-tabs">

<TabItem value="Ref Finance" label="Ref Finance">

```js
const ammContract = "v2.ref-finance.near";
const depositBalances = Near.view(
  ammContract,
  "get_deposits",
  {
    account_id: "bob.near"
  }
);
```

<details>
<summary>Example response</summary>
<p>

```json
{
  "token.v2.ref-finance.near": "0",
  "wrap.near": "0"
}
```

</p>

</details>
</TabItem>

</Tabs>