---
id: agent-contract
title: Agent Contract
sidebar_label: Agent Contract
description: "Review the agent contract template for the Shade Agent Framework."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Github } from "@site/src/components/UI/Codetabs";

The **agent contract** is the on-chain component of the Shade Agent Framework. It handles agent registration, measurement, and PPID approval, and enforces that only valid agents can call specific methods.

On this page, you'll walk through the key components of the reference agent contract and how to implement your own **agent-gated functions**. You may need to change other parts of the contract depending on your use case. The full source lives in the [shade-agent-template](https://github.com/NearDeFi/shade-agent-template/tree/2.0/agent-contract) repo.

---

## Flow 

High-level flow:
- The owner deploys and initializes the contract.
- The owner approves measurements and PPIDs.
- Each agent calls `register_agent` with a valid attestation.
- Valid agents can then call agent-gated methods.

---

## Initialization  

The `new` method initializes the contract and takes four arguments (the CLI can initialize the contract with defaults):
- **`requires_tee`**: Whether the contract runs in local or TEE mode. This switches the behavior of the contract so you can move easily between local and TEE deployments.
- **`attestation_expiration_time_ms`**: How long a registration stays valid for after an agent registers.
- **`owner_id`**: The account ID allowed to call owner-only methods. The owner should usually be a multisig.
- **`mpc_contract_id`**: The Chain Signatures MPC contract that the agent contract will call for multichain signing.

On initialization, the rest of the contract state is set to empty.

<Github
  fname="lib.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/lib.rs#L63-L81"
  start="63"
  end="81"
/>

If your contract needs additional state, add it in the init method and extend the `Contract` struct accordingly.

---

## Measurements, PPID, Whitelist, and Agent Management

The **owner** of the contract can manage the approved measurements, PPIDs, whitelist, and agents.

### Measurements

The `approved_measurements` decide what code an agent is allowed to run. The CLI will approve a set of measurements for your agent when run. You can learn more about measurements [here](../concepts/terminology.md#measurements).

The owner controls which measurements are approved and can add or remove them over time. A typical agent code upgrade flow is: approve a new set of measurements, allow a transition period (e.g. a week) so operators can update agents to run the new code, then remove the old measurements. 

<Github
  fname="lib.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/owner.rs#L23-L36"
  start="23"
  end="36"
/>

### PPID

The `approved_ppids` decide which physical TEE CPUs an agent may run on. The CLI will approve a list of default PPIDs when run. You can learn more about PPID [here](../concepts/terminology.md#ppid).

<Github
  fname="lib.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/owner.rs#L38-L52"
  start="38"
  end="52"
/>

### Agent

Agents become authorized by calling `register_agent`; the owner can also remove an agent at any time. Use removal to clean up invalid agents or to revoke access if a TEE were to become compromised.

<Github
  fname="lib.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/owner.rs#L54-L66"
  start="54"
  end="66"
/>

:::note
A removed agent can re-register by calling `register_agent` with a valid attestation.
:::

### Whitelist

The **whitelist** applies only in **local mode**. It defines which account IDs may call **agent-gated methods**, since in local mode, the contract cannot verify that an agent is running approved code. Use `shade whitelist` in the CLI to add an account. You can learn more about whitelisting [here](../concepts/terminology.md#whitelisted-accounts).

<Github
  fname="lib.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/owner.rs#L54-L66"
  start="54"
  end="66"
/>

---

## Register Agent

Agents register by calling `register_agent`. The method checks that the agent has a valid attestation via `verify_attestation`; if it passes, the agent is stored with its measurements, PPID, and validity period (determined by `attestation_expiration_time_ms`).

An agent must attach 0.00486 NEAR to cover its own storage cost in the contract. If you change how much data is stored per agent, update the `STORAGE_BYTES_TO_REGISTER` constant accordingly.

<Github
  fname="lib.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/lib.rs#L84-L124"
  start="84"
  end="124"
/>

By default, an agent that provides a valid attestation can register. Meaning that anyone may be able to run an agent and register. Depending on your use case, you may want to add additional restrictions to an agent, for example, an allow-list of accounts, proof of a shared secret, or a limit of one agent per contract.

### Verify Attestation

`verify_attestation` decides if an agent is allowed to register. Its behavior depends on whether the contract is in TEE or local mode.

#### TEE Mode 

In TEE mode (`requires_tee = true`), the method accepts the agent only if it supplies a valid attestation, which is checked using the `verify` function provided by the [shade-attestation crate](https://github.com/NearDeFi/shade-agent-framework/tree/main/shade-attestation), which takes the list of approved measurements and PPIDs, the current timestamp (in seconds), and the expected `report_data`.

<Github
  fname="internal/attestation.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/internal/attestation.rs#L39-L51"
  start="39"
  end="51"
/>

The attestation’s **report data** must contain the NEAR account ID of the agent. This binds the attestation to the same TEE where the agent’s key was created to prevent replay of valid attestations. Report data is passed as **bytes**.

<Github
  fname="internal/attestation.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/internal/attestation.rs#L10-L25"
  start="10"
  end="25"
/>

#### Local Mode 

In local mode (`requires_tee = false`), the method approves the agent if the caller is whitelisted and the mock measurements and PPID are approved in the contract. No real attestation is verified.

<Github
  fname="internal/attestation.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/internal/attestation.rs#L55-L69"
  start="55"
  end="69"
/>

---

## Require Valid Agent

You can restrict methods so only valid agents can call them using the helper `require_valid_agent`. An agent that registered earlier may no longer be valid. To gate a method: call `require_valid_agent`, and if it returns `Some(promise)`, execute the promise.

<Github
  fname="your_functions.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/your_functions.rs#L15-L17"
  start="15"
  end="17"
/>

:::caution Handle the promise
You must execute the promise returned by `require_valid_agent` when it is `Some(promise)`; otherwise, the invalid agent can still call the function.
:::

`require_valid_agent` first loads the agent from storage; if the caller is not registered, it panics.

<Github
  fname="internal/helpers.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/internal/helpers.rs#L27-L28"
  start="27"
  end="28"
/>

It then checks whether the agent is still valid. It's valid if its registration has not expired (determined by `attestation_expiration_time_ms`), its measurements are still in the approved set, and its PPID is still approved.

<Tabs groupId="code-tabs">

<TabItem value="get_removal_reasons" label="get_removal_reasons">

    <Github
      fname="internal/helpers.rs"
      language="rust"
      url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/internal/helpers.rs#L31-L31"
      start="31"
      end="31"
    />
</TabItem>

<TabItem value="check_invalid_reasons" label="check_invalid_reasons">

    <Github
      fname="internal/helpers.rs"
      language="rust"
      url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/internal/helpers.rs#L55-L76"
      start="55"
      end="76"
    />
</TabItem>

</Tabs>

If the agent is valid, then the function will return `None`. If the agent is invalid, it will be removed from the map of agents, an event will be emitted detailing the reasons for removal, and a promise will be returned from the function that will call `fail_on_invalid_agent` in the next block.

<Github
    fname="internal/helpers.rs"
    language="rust"
    url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/internal/helpers.rs#L33-L54"
    start="33"
    end="54"
/>

The promise calls `fail_on_invalid_agent`, which panics in the next block. Panicking in the next block (rather than the current one) ensures the agent is removed from storage; panicking in the current block would revert that removal.

<Github
    fname="internal/helpers.rs"
    language="rust"
    url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/internal/helpers.rs#L83-L86"
    start="83"
    end="86"
/>
 
---

## Your Functions

The template includes an example `request_signature` function. It allows a **valid agent** to request a signature for a transaction payload from the MPC contract, so you can sign transactions for most chains. You can learn more about singing transactions for different chains in the [chain signatures documentation](../../../chain-abstraction/chain-signatures/implementation).

<Github
    fname="your_functions.rs"
    language="rust"
    url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/your_functions.rs#L8-L20"
    start="8"
    end="20"
/>

You should implement your own **agent-gated functions** in this `your_functions.rs` file, following the same pattern: call `require_valid_agent`, then run your logic.

:::tip On chain guardrails
A key part of the Shade Agent Framework is the ability to implement **on-chain guardrails**. This gives protection against unauthorized actions - even if the TEE is compromised. It's strongly recommended that you build actions within the agent contract rather than in the agent itself, for example, using the [omni-transaction-rs](https://github.com/Omni-rs/omni-transaction-rs) library.
:::

---

## Building the Contract 

Usually, you build and deploy with the **Shade Agent CLI**: `shade deploy`. To build the contract manually, use the following command:

<Tabs groupId="code-tabs">

<TabItem value="linux" label="Linux">

    For Linux, you can compile the contract directly with [cargo near](https://github.com/near/cargo-near/releases/latest).


    ```bash
    cargo near build non-reproducible-wasm --no-abi
    ```

</TabItem>

<TabItem value="mac" label="Mac">

    Because of a required dependency in the shade-attestation crate, agent contracts cannot be built on Mac machines. You can build the contract inside a Docker container using the following command:

    ```bash
    docker run --rm -v "$(pwd)":/workspace pivortex/near-builder@sha256:cdffded38c6cff93a046171269268f99d517237fac800f58e5ad1bcd8d6e2418 cargo near build non-reproducible-wasm --no-abi
    ```

    If you would like to build the image yourself, you can use [this Dockerfile](https://github.com/NearDeFi/shade-agent-framework/blob/main/contract-builder/Dockerfile).

</TabItem>

</Tabs>

:::note
The `--no-abi` flag is used to build the contract without an ABI. This is required because the shade-attestation crate currently doesn't support ABI generation.
:::

---

## Calling Methods 

The **Shade Agent CLI** calls the main contract methods when you run `shade deploy`, but it does not cover every method. For methods the CLI doesn’t support, use the [NEAR CLI](../../../tools/cli) or create scripts using the [NEAR API](../../../tools/near-api). 