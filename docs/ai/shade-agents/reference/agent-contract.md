---
id: agent-contract
title: Agent Contract
sidebar_label: Agent Contract
description: "Review the agent contract template for the Shade Agent Framework."
---

import { Github } from "@site/src/components/UI/Codetabs";

The agent contract is the on-chain component of the Shade Agent Framework. It handles agent registration, measurements and PPID management and enforces that only valid agent can call specific methods.

On this page you'll walk through the key components of the a reference agent contract then you'll see how to implement your own agent gated functions in the [your_functions](https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/your_functions.rs) file. You may want to make changes to other parts of the contract depending on your use case. If you would like to dig deeper into the contract, the source code can be found in the [shade-agent-template](https://github.com/NearDeFi/shade-agent-template/tree/2.0/agent-contract).


flow 

contract deployed
initizalized by owner 
measurements + PPID approved by owner 
agent registers
agent can now call agent gated functions 


---

## Initialization  

The template takes four arguments. The CLI will initialize the contract with default arguments.
- **requires_tee**: Sets the contract to local or TEE mode. Changes the behavior of the contract depending on the mode to switch easily between local and TEE deployments.
- **attestation_expiration_time_ms**: Sets how long an agent is valid for after registering.
- **owner_id**: Sets the account ID of the owner who is permitted to call owner gated methods. In general the owner shoudl be set to a multisig.
- **mpc_contract_id**: Sets the MPC contract that the agent contract will interact with.

On init the rest of the state in the contract is set to empty.

<Github
  fname="lib.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/lib.rs#L63-L81"
  start="63"
  end="81"
/>

If your contract requires additional state you'll need to modify the init method.

---

## Measurements, PPID, whitelist and agent management

The `owner_id` of the contract can manage the approved measurements, PPIDs, whitelist and agents.

### Measurements

The approved measurements decide what code an agent is allowed to run. The CLI will approve a set of measurements for your agent when ran. You can learn more about measurements here TODO.

An owner sets which measurements are approved in a contract and can add and remove them over time. To upgrade the code an agent runs a typical upgrade pattern is that a new set of measurements are approved to the contract, a transition period happens (of say a week) allowing operators time to start running the new codebase, and then the old measurements are removed. 

<Github
  fname="lib.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/owner.rs#L23-L36"
  start="23"
  end="36"
/>

### PPID

The approved PPIDs decide which physical TEE CPUs an agent is allowed to run on. The CLI will approve a list of default PPIDs when ran. You can learn more about PPID here TODO.

<Github
  fname="lib.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/owner.rs#L38-L52"
  start="38"
  end="52"
/>

### Agent

The authorization of agents happens by an agent calling the `register_agent` method, but an owner can manually remove an agent. This can be useful for cleaning up no longer valid agents or removing agents in the case of a TEE exploit.

<Github
  fname="lib.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/owner.rs#L54-L66"
  start="54"
  end="66"
/>

Note that a removed agent can re-register if it again provides a valid attestation.

### Whitelist

The whitelist is only relevant for local mode. It sets which account IDs are permitted to call the agent gated methods, as in local mode the contract cannot verify an agent is running the correct code. The CLI will whitelist the specified account ID when running `shade whitelist`. You can learn more about whitelisting agents here TODO.

<Github
  fname="lib.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/owner.rs#L54-L66"
  start="54"
  end="66"
/>

---

## Register agent

Agents register in the contract by calling the `register_agent` method. The method checks that the agent has a valid attestation via `verify_attestation`, and if so registers it in the contract recording its measurements, PPID and how long it's valid for (determined by the attestation_expiration_time).

An agent must pay 0.005 NEAR to cover its own storage cost in the contract.

<Github
  fname="lib.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/lib.rs#L84-L124"
  start="84"
  end="124"
/>

By default an agent that provides a valid attestation can register. Meaning that anyone may be able to run an agent and register. Depending on your use case you may want to add additional restrictions to an agent (for example require the agent to contain a secret and perform signature verification) or only allow a single agent to register at a time.

### Verify attestation

`verify_attestation` checks if an agent is allowed to register. It's behavior changes depending on whether the contract is in TEE or local mode.

#### TEE mode 

If the contract is in TEE mode `requires_tee = true` then the method will approve the agent if it provides a genuine attestation, this is checked via the `verify` function provided by the [shade-attestation crate](https://github.com/NearDeFi/shade-agent-framework/tree/main/shade-attestation). This function expects a list of approved measurement and PPIDs, the current timestamp in milliseconds and something called the `report data`.

<Github
  fname="internal/attestation.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/internal/attestation.rs#L39-L51"
  start="39"
  end="51"
/>

The verify function expects the attestation's report data to contain the NEAR account ID of the agent that called the register function. This proves that the attestation was produced in the same TEE that the agent's key was generated in, this stops attackers replaying genuine attestations. The report data is submitted as bytes.

<Github
  fname="internal/attestation.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/internal/attestation.rs#L10-L25"
  start="10"
  end="25"
/>

#### Local mode 

If the contract is in local mode `requires_tee = false` then the method will approve the agent if it is whitelisted and the the default fake measurements and PPID are approved in the contract.

<Github
  fname="internal/attestation.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/internal/attestation.rs#L55-L69"
  start="55"
  end="69"
/>

---

## Require valid agent

Methods in the contract can be gated to only allow valid agents to call them. The contract has a helper function called `require_valid_agent` that completes the valid checks. Just because an agent once registered doesn't mean that its currently valid.







To gate a function you must call the `require_valid_agent` function, check if it returns a promise, and if so execute the promise. You can see the logic here:

<Github
  fname="internal/attestation.rs"
  language="rust"
  url="https://github.com/NearDeFi/shade-agent-template/blob/2.0/agent-contract/src/your_functions.rs#L15-L17"
  start="15"
  end="17"
/>

If the function returns a promise it means that it is not a valid 

---


## Your logic

example request signature 


Put your own functions here 

omni-transaction-rs


---

## Building the contract 


---

for Calling other methods

Use NEAR CLI 