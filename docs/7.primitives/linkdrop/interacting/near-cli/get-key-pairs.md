import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>

<TabItem value="Near CLI" label="Near CLI">

```bash
# This command creates a key pair locally in .near-credentials with an implicit account as the accountId (hash representation of the public key)

near generate-key
```

**Example response:**

```bash
Key pair with ed25519:33Vn9VtNEtWQPPd1f4jf5HzJ5weLcvGHU8oz7o5UnPqy public key for an account "1e5b1346bdb4fc5ccd465f6757a9082a84bcacfd396e7d80b0c726252fe8b3e8"
```

</TabItem>

<TabItem value="Keypom API" label="Keypom API">

```bash
export NUMBER_OF_DROPS=2

curl https://keypom.sctuts.com/keypair/$NUMBER_OF_DROPS/rootEntrophy
```

</TabItem>

</Tabs>