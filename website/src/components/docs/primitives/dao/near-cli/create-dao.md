```bash

export COUNCIL='["bob.near"]'
export ARGS=`echo '{"config": {"name": "Primitives", "purpose": "Building primitives on NEAR", "metadata":""}, "policy": '$COUNCIL'}' | base64`

near call sputnikv2.testnet create "{\"name\": \"primitives\", \"args\": \"$ARGS\"}" --accountId bob.near --amount 6 --gas 150000000000000
```

:::note
The full list of roles and permissions you can find [here](https://github.com/near-daos/sputnik-dao-contract#roles-and-permissions).
:::
