---
id: custom-agent-contract
title: Custom Agent Contract
sidebar_label: Custom Agent Contract
description: "Learn how to build, deploy, and interact with custom Shade Agent contracts."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In some cases, you may want to deploy a `custom agent contract`. This allows for more customizability inside the agent contract, allows you to restrict your agent to certain actions by implementing `guard rails`, and is used for building Shade Agents that interact with just NEAR.

---

## Creating the Contract

To create a custom agent contract, we recommend you fork the [sandbox contract](https://github.com/NearDeFi/shade-agent-js/tree/main/contracts/sandbox). This is the agent contract that's deployed under the hood when using the `shade-agent-cli`. For testing locally, you will need to maintain a separate similar contract that does not implement the agent registration flow; for this, you can follow the structure of the [proxy contract](https://github.com/NearDeFi/shade-agent-js/tree/main/contracts/proxy).

Inside this contract, you will create your own functions. For building contracts on NEAR, see our [smart contract docs](../../smart-contracts/quickstart.md). You can only develop agent contracts in Rust.

With the quickstart template, an agent can sign any transaction. You may want to limit your agent to only be able to sign transactions for a limited set of functions or actions. For this, we recommend building your transactions inside your agent contract with the [omni-transaction-rs](https://github.com/near/omni-transaction-rs) library. In such case, you should make the `request_signature` function private.

For developing Shade Agents that just interact with NEAR, you can remove the `request_signature` function. The agent will make function calls to the contract directly. Make sure that you restrict relevant functions to only be allowed to be called by the agent. If you want to interact with existing contracts on NEAR that do not implement agent registration, you can leverage [cross contract calls](../../smart-contracts/anatomy/crosscontract.md).

How you compile the contract depends on your operating system.

<Tabs groupId="code-tabs">

<TabItem value="linux" label="Linux">

    For Linux, you can compile the contract directly with [cargo near](https://github.com/near/cargo-near/releases/latest).


    ```bash
    cargo near build non-reproducible-wasm
    ```

</TabItem>

<TabItem value="mac" label="Mac">

    Because of a required dependency used in the agent registration flow, agent contracts cannot easily be compiled on a Mac. We suggest you build the contract inside a Docker container. You can use this pre-configured image for compiling NEAR contracts:

    ```bash
    docker run --rm -v "$(pwd)":/workspace pivortex/near-builder@sha256:cdffded38c6cff93a046171269268f99d517237fac800f58e5ad1bcd8d6e2418 cargo near build non-reproducible-wasm
    ```

</TabItem>

</Tabs>

---

## Deploying the Custom Contract

To deploy your agent with the custom contract, add the `--wasm` flag when using the Shade Agent CLI, specifying the path to your wasm file. Depending on the size of the wasm, you may require more NEAR to deploy the contract. This can be done using the `--funding` flag, followed by the amount of NEAR (100KB = 1 NEAR).

Here is an example:

```bash
shade-agent-cli --wasm contract/target/near/contract.wasm --funding 5
```

---

## Interacting with Custom Contract 

To call a function on your custom agent contract, use the `agentCall` function provided by the Shade Agent API. Please refer to the [relevant docs](./framework/api.md#agent-call) for calling the contract in your desired language. 