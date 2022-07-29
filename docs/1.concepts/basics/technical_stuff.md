Interaction with NEAR is done with [JSON RPC API](../../5.api/rpc/introduction.md) via HTTP calls.

With the API, you can call smart contracts, send transactions, manage keys and get information about blockchain data and status.

The NEAR CLI abstracts some actions, such as deploying a contract, but eventually, all actions are done via JSON RPC.

:::info
We recommend using the CLI for deploying contracts. In a CI/CD environment, you can write a shell script to utilize the CLI for deployments.
:::

### API requests flow

There are different types of [Nodes on NEAR](./validators.md): RPC Nodes, Validators, and Archival Nodes.

When calling an endpoint on `near.org`, it resolves to a server that chooses an available RPC node to handle the request.
Then the RPC node passes the request to an available Validator node. Finally, the validator node spawns a VM environment to execute the contract.

Due to the decentralized nature of a blockchain network, there are many RPC nodes, and a request can reach any one of them, after which it can pass it to any one of the validators.

![JSON Network Arch](/docs/assets/JSONNetworkArch.png)