---
id: iprpc
sidebar_label: Free Public RPC
title: Using NEAR Incentivized Public RPC
---


## Overview  📋

In order to provide decentralized, reliable and public RPC to all developers in the ecosystem, NEAR uses [Lava](https://www.lavanet.xyz/?utm_source=near-iprpc-dev-tutorial&utm_medium=near-docs&utm_campaign=near-iprpc-dev) to serve RPC to its developer community. Lava aggregates and routes RPC requests to a peer-to-peer network of top-performing node providers, with built-in fraud detection, conflict resolution, and quality of service guarantees for all requests. All relays are conducted securely with no man-in-the-middle. For more details on Lava's protocol, take a look at [the Lava litepaper](https://litepaper.lavanet.xyz/?utm_source=near-iprpc-dev-tutorial&utm_medium=near-docs&utm_campaign=near-iprc-dev).

Lava ipRPC aggregates RPC providers and provides a unified endpoint for NEAR's entire ecosystem.


## Endpoints 🔗

A list is provided below for your convenience!

### Mainnet 🌐

- **JSON-RPC** - `https://near.lava.build`

### Testnet 🧪

- **JSON-RPC** - `https://near-testnet.lava.build`

## Using `near-cli` with ipRPC ⚡

You can use your `near-cli` installation with ipRPC for all calls and requests.

For `mainnet` use:
```bash
./near <command> --nodeUrl https://near.lava.build
```

For `testnet` use:
```bash
./near <command> --nodeUrl https://near-testnet.lava.build
```

Using this schema, all `near-cli` commands which communicate with the blockchain will be carried out securely and efficiently over Lava ipRPC.


## Test Commands 🖥️

You can send requests to each endpoint.  This can be done with the use of different tools such as `curl` for HTTP-responsive protocols. You can also use any of the endpoints programmatically. Some examples are below:


### 🟢 JSON-RPC
Use CURL command to the appropriate NEAR endpoints!

```bash
# Mainnet
curl -X POST -H "Content-Type: application/json" https://near.lava.build --data '{"jsonrpc":"2.0","method":"block","params":{"finality":"final"},"id":1}'

# Testnet
curl -X POST -H "Content-Type: application/json" https://near-testnet.lava.build --data '{"jsonrpc":"2.0","method":"block","params":{"finality":"final"},"id":1}'
```

✅ The rest is up to you! The possibilities are literally endless!