---
id: cli
title: Shade Agent CLI
sidebar_label: Shade Agent CLI
description: "Use the Shade Agent CLI to deploy your Shade Agent."
---

The Shade Agent CLI makes it easy to deploy a Shade Agent as a whole. Including building and deploying your agent contract, building and publishing your agent's docker image, and deploying to Phala Cloud. 

The CLI revolves around a `deployment.yaml` file that configures how your Shade Agent will be deployed. It allows easy switching between local and TEE deployment modes for rapid development.

---

## Installation

```bash
npm install -g @neardefi/shade-agent-cli
```

---

## Commands 

### Deploy

Deploys your Shade Agent with the configuration as defined by the deployment.yaml file.

```bash
shade deploy
```

Must be executed in the same directory as your deployment.yaml file.

### Plan

Generates a preview of how your Shade Agent will be deployed as defined by the deployment.yaml file.

```bash
shade plan
```

Must be executed in the same directory as your deployment.yaml file.

### Whitelist 

Whitelists a specified agent's account ID in the agent contract as defined by the deployment.yaml file. This is only relevant for local mode.

```bash
shade whitelist
```

Must be executed in the same directory as your deployment.yaml file.

### Auth

Configure NEAR and Phala credentials required for deploying your Shade Agent.

```bash
shade auth
```

---


## deployment.yaml reference

All keys are read from a single `deployment.yaml` file in the project root. The following sections describe what each top-level key and nested option configures.

### Top-level keys

| Key | Required | Description |
|-----|----------|-------------|
| **environment** | Yes |`local` or `TEE`. Controls whether the agent runs locally or in a Phala TEE. |
| **network** | Yes | `testnet` or `mainnet`. Controls whether the agent contract is on NEAR testnet or mainnet. |
| **docker_compose_path** | Yes if TEE | Path to the Docker Compose file (e.g. `./docker-compose.yaml`).  used for building the docker image and deploying your application to a TEE. |
| **agent_contract** | Yes | Agent contract configuration. See [agent_contract](#agent_contract) for more details. |
| **approve_measurements** | No | If enabled, calls the agent contract to approve measurements. |
| **approve_ppids** | No | If enabled, calls the agent to approve PPIDs.|
| **build_docker_image** | No (TEE only) | If enabled and environment is TEE, builds a new Docker image for your agent, publishes it and updates the Docker Compose with the new image.  |
| **deploy_to_phala** | No (TEE only) | If enabled and environment is TEE, deploys the Docker Compose to Phala Cloud. |
| **whitelist_agent_for_local** | No | Config for the `shade whitelist` command to whitelist an agent's account ID whilst in local mode (not used by the shade deploy command). |
| **os** | No | Override OS for tooling: `mac` or `linux`. If omitted, the CLI auto-detects from the current platform. |

### agent_contract

| Key | Required | Description |
|-----|----------|-------------|
| **contract_id** | Yes | NEAR account ID for the agent contract (e.g. `example-contract-123.testnet`). Must be unused if you are deploying a new contract. |
| **deploy_custom** | No | If present and enabled, the CLI creates the contract account with the same private key as the account set up via `shade auth`, and deploys a new contract. If the contract account already exists it will be deleted and recreated to remove the old contract. |

#### deploy_custom

`agent_contract.deploy_custom`

| Key | Required | Description |
|-----|----------|-------------|
| **enabled** | No | If `false`, deploy_custom is skipped. |
| **funding_amount** | Yes | NEAR amount to fund the new contract account with, used to fund the deployment of the contract (number between 0 and 100). |
| **delete_key** | No | If `true`, the key for the contract account is deleted after deployment, locking the contract (defaults `false`). |
| **deploy_from_source** | One of three | Build the contract from source and deploy: set `enabled: true` and `source_path` to the contract directory. |
| **deploy_from_wasm** | One of three | Deploy a pre-built WASM file: set `enabled: true` and `wasm_path` to the `.wasm` file. |
| **use_global_by_hash** | One of three | Deploy using a global contract: set `enabled: true` and `global_hash` to the contract hash. |
| **init** | No | If present and enabled, initializes the contract via a function call. |

#### init 

`agent_contract.deploy_custom.init`

| Key | Required | Description |
|-----|----------|-------------|
| **enabled** | No | If `false`, init is skipped. |
| **method_name** | Yes | Contract method to call (e.g. `new`). |
| **args** | Yes | Arguments to call the method with. |
| **tgas** | No | Gas for the call (default 30). |

Placeholders in args:

- `<REQUIRES_TEE>` — Resolves to `true` or `false` depending on `environment`.
- `<7_DAYS>` — Resolves to 7 days in milliseconds (`604800000`).
- `<MASTER_ACCOUNT_ID>` — Resolves to the NEAR account ID from `shade auth`.
- `<DEFAULT_MPC_CONTRACT_ID>` — Resolves to the default MPC contract for the selected `network` (testnet/mainnet).

### approve_measurements

| Key | Required | Description |
|-----|----------|-------------|
| **enabled** | No | If `false`, measurements are not approved. |
| **method_name** | Yes | Contract method to call (e.g. `approve_measurements`). |
| **args** | Yes | Arguments to call the method with. |
| **tgas** | No | Gas for the call (default 30). |

Placeholders in args:

- `<MEASUREMENTS>` — Resolves to default fake measurements for local and real calculated measurements for the application. 

### approve_ppids

| Key | Required | Description |
|-----|----------|-------------|
| **enabled** | No | If `false`, PPIDs are not approved. Default is effectively true when the block is present. |
| **method_name** | Yes if enabled | Contract method to call (e.g. `approve_ppids`). |
| **args** | Yes if enabled | Multiline string (YAML block) of JSON. Must be a multiline string. |
| **tgas** | No | Gas for the call (default 30). |

Placeholders in **approve_ppids.args**:

- `<PPIDS>` — Replaced by PPIDs (local: default/zeros; TEE: fetched from Phala).

### build_docker_image (TEE only)

| Key | Required | Description |
|-----|----------|-------------|
| **enabled** | No | If `false`, the Docker image is not built. Default is effectively true when the block is present. |
| **tag** | Yes if enabled | Docker image tag (e.g. `username/my-first-agent`) for building and pushing. |
| **cache** | Yes if enabled | Boolean; whether to use Docker build cache. |
| **dockerfile_path** | Yes if enabled | Path to the Dockerfile (e.g. `./Dockerfile`). |

### deploy_to_phala (TEE only)

| Key | Required | Description |
|-----|----------|-------------|
| **enabled** | No | If `false`, deployment to Phala Cloud is skipped. Default is effectively true when the block is present. |
| **app_name** | Yes if enabled | Phala Cloud app (CVM) name. |
| **env_file_path** | Yes if enabled | Path to the environment file (e.g. `./.env`) loaded when deploying to Phala. |

### whitelist_agent_for_local (local only)

Used by `shade whitelist`. No `enabled` flag; if the section is present, the command is available.

| Key | Required | Description |
|-----|----------|-------------|
| **method_name** | Yes | Contract method to call (e.g. `whitelist_agent_for_local`). |
| **args** | Yes | Multiline string of JSON. Must be a multiline string. |
| **tgas** | No | Gas for the call (default 30). |

Placeholders in **whitelist_agent_for_local.args**:

- `<AGENT_ACCOUNT_ID>` — Replaced with the agent account ID you provide when running `shade whitelist`.

:::info
Currently the CLI supports measurement calculation and Phala Cloud deployment for fixed configurations on DStack. If you need to deploy with different configurations you can calculate the measurements and deploy to Phala by other means, you can ask for assistance with this in our [support group](https://t.me/+mrNSq_0tp4IyNzg8).

<details>
<summary> Fixed Dstack configurations </summary>

- Dstack Version: dstack-0.5.5
- Hardware: 1vCPU and 2GB RAM (tdx.small on Phala)
- Key Provider: Phala Key Provider 

**App compose configs**
- Pre Launch Script: v0.0.12

...

- features: ["kms", "tproxy-net"],
- gateway_enabled: true,
- kms_enabled: true,
- local_key_provider_enabled: false,
- manifest_version: 2,
- name: "",
- no_instance_id: false,
- public_logs: true,
- public_sysinfo: true,
- public_tcbinfo: true,
- runner: "docker-compose",
- secure_time: false,
- storage_fs: "zfs",
- tproxy_enabled: true,




</details>
:::

---



## Example deployment.yaml configurations

This example will oiasdfjoidajsfiojdiofj

Give a few common examples here of things I want to do.

I already have a contract deployed but want to remove its state, for example .

```yaml
# environment: local | TEE
environment: local

# network: testnet | mainnet
network: testnet

# Path to docker-compose file
docker_compose_path: ./docker-compose.yaml

agent_contract: 
  # NEAR Account Id of the contract
  # Fill this out with a unique contract id for your agent contract
  # For example: example-contract-123.testnet
  # This account should not already be in use
  contract_id: example-contract-123.testnet

  # Optional, if not enabled the contract will not be deployed
  # and it's assumed the agent contract is already deployed to the contract_id
  # and is initialized
  deploy_custom:
    enabled: true
    # Amount to fund the agent contract with in NEAR
    funding_amount: 8
    # If true the key for contract account will be deleted after deployment locking it
    delete_key: false

    # Choose ONE of the following:
    # Option 1: Build contract from source and deploy
    deploy_from_source:
      enabled: true
      source_path: ./agent-contract
    # Option 2: Use pre-built WASM file
    deploy_from_wasm:
      enabled: false
      wasm_path: ./agent-contract/target/near/shade-contract-template.wasm
    # Option 3: Use a deployed global contract, specifying it by its hash
    use_global_by_hash:
      enabled: false
      global_hash: 8eHvv9q4eovoUgDXYEduwv3dbcfXkCyPP9TSmhUSxkcm

    # Optional, if not enabled the contract will not be initialized
    init:
      enabled: true
      method_name: new
      # <REQUIRES_TEE> will be replaced wil true or false depending on the environment selected
      # <7_DAYS> will be replaced with 7 days in milliseconds
      # <MASTER_ACCOUNT_ID> will be replaced with the master account set up in the auth of the CLI
      # <DEFAULT_MPC_CONTRACT_ID> will be replaced with the MPC contract address depending on the network selected
      args: |
        {
          "requires_tee": <REQUIRES_TEE>,
          "attestation_expiration_time_ms": <7_DAYS>,
          "owner_id": <MASTER_ACCOUNT_ID>,
          "mpc_contract_id": <DEFAULT_MPC_CONTRACT_ID>
        }
      # tgas: 30

# Approve allowed measurements for registration
# Optional, if not enabled the measurements will not be approved
approve_measurements:
  enabled: true
  method_name: approve_measurements
  # <MEASUREMENTS> will be replaced with calculated measurements
  # for local it will be set to default measurements (all zeros)
  # for TEE and docker disabled it will be set to the measurements based on the current docker-compose file
  # for TEE and docker enabled it will be set to the measurements based on the docker-compose file once it has been updated
  args: |
    {
      "measurements": <MEASUREMENTS>
    }
  # tgas: 30

# Approve allowed PPIDs for registration
# Optional, if not enabled the PPIDs will not be approved
approve_ppids:
  enabled: true
  method_name: approve_ppids
  # <PPIDS> will be replaced with the PPIDs
  # for local it will be set to a default PPID (all zeros)
  # for TEE it will approve PPIDs on Phala Cloud
  args: |
    {
      "ppids": <PPIDS>
    }
  # tgas: 30

# Build a new docker image using the specified Dockerfile
# the docker-compose.yaml will be updated with the new docker image
# Optional, if not enabled the current docker-compose.yaml file will be used
# Only applicable if the environment is TEE
build_docker_image:
  enabled: true
  # Fill this out with the docker tag you want to use. For example: pivortex/my-first-agent
  tag: username/my-first-agent
  cache: true
  dockerfile_path: ./Dockerfile

# Deploy the docker compose file to Phala Cloud with the specified environment variables
# Optional, if not enabled the app will not be deployed to Phala Cloud
# Only applicable if the environment is TEE
deploy_to_phala:
  enabled: true
  app_name: my-first-agent
  env_file_path: ./.env

# Helper command to whitelist an agent for local mode
# Use the "shade whitelist" command
whitelist_agent_for_local:
  method_name: whitelist_agent_for_local
  # The <AGENT_ACCOUNT_ID> will automatically be replaced with the agent account id
  # specified when running the "shade whitelist" command
  args: |
    {
      "account_id": <AGENT_ACCOUNT_ID>
    }
  # tgas: 30
```