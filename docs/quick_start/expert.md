---
name: Connect to NEAR TestNet
route: /quick_start/expert
menu: Quick start
---

# Expert: Connect to NEAR TestNet

_Note: This is functionality for people who want to interact directly with the blockchain versus building applications. Currently still in Alpha, proceed at your own peril._

Start by checking the [blockchain explorer](https://alphanet.nearprotocol.com/explorer) for TestNet to see current state of the chain.

If you are interested in developing / launching applications, you can use [TestNet Studio](https://alphanet.nearprotocol.com/explorer).

## Sync local node to TestNet

Make sure you went through [building and running local](advanced.md)[node](advanced.md). Now to sync to the main blockchain, you will need to configure this node and join the network:

```text
mkdir alphanet
./target/debug/nearcore --base-path=alphanet --chain-spec-file ops/chain_spec.json --boot-nodes=35.236.60.217:3000/7tkzFg8RHBmMw1ncRJZCCZAizgq4rwCftTKYLce8RU8t -a <some name>
```

Wait until it will fetch the blocks and catch up with the network \(may take a while\).

## Interact with TestNet via your local node

After spinning up local node, you can interact with it with:

* [NEAR command line tool](https://github.com/nearprotocol/docs/tree/4bc92a5b2379087d21014144a712b0a4720e80c2/docs/quick_start/quick_start/medium.md).
* Raw RPC over HTTP.

For example, to quickly create new app and deploy it to the TestNet via local node:

```text
near new_project --project_dir ~/[wherever you want your project]
near create_account --node_url http://localhost:3030 --account_id <yourcontractname>
npm run build
near deploy --node_url http://localhost:3030 --contract_name <yourcontractname>
```

You can also use Raw RPC over HTTP, to check on your account status:

```text
http post http://localhost:3030/view_account account_id=<yourcontractname>
```

