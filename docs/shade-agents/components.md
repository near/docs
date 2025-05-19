---
id: key-components
title: Key Components
sidebar_label: Key Components
---












## Security Considerations

Please review this list of security considerations before deploying anything to mainnet.

### Duplicate Agents, Duplicate Actions

To ensure liveness, the Shade Agent should be composed of a few identical worker agents hosted by different provider/on different hardware. When multiple agents are running, all agents will respond to an update (a user input, agent ping, update from an API, etc.). You need to make sure that the agent collectively only takes the desired action once as a result of this update. 

Lets take an example of a Kaito Mindshare Trading Agent. If the mindshare of Solana increases compared to NEAR the agent would swap Sol for NEAR. If two worker agents are running then you need to ensure this swap doesn't happen twice.

This logic is usually best implemented inside of the smart contract.

### Restricting Actions

Whilst TEEs are considered to be trusted and tamper-resistant is is a good idea to implement tight restrictions or `guard rails` to actions that the agent can take within the NEAR smart contract. 

Examples of restrictions could be:
- The NEAR smart contract has a list of functions and smart contracts addresses, it can only build transactions for these.
- The NEAR smart contract can only build transactions for specific chains.
- The NEAR smart contract can only build transactions that swap or send up to 0.1 ETH per 24 hours.

We recommend you use the [omni-transactions-rs](https://github.com/near/omni-transaction-rs) library to build transactions inside of your smart contract instead of the worker agent. 

### Failed or Unsent Transactions

Just because a the MPC successfully signed a this does not mean the transaction itself will be successful or is sent at all. A transaction may fail for a few reasons like target network being too congested, the transaction having the incorrect nonce or having insufficient gas.

We suggest you build your agent in such a way that if the transaction fails then a new signature can be requested without allowing for unlimited signing.

It may also be relevant in some use cases to emit the signed transaction from your smart contract so anyone/an indexer can relay them in case your worker agent fails to retrieve the result. Signed transactions can be built using [omni-transactions-rs](https://github.com/near/omni-transaction-rs). Be careful about having unsent signatures floating about.