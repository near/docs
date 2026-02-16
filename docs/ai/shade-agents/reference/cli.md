---
id: cli
title: Shade Agent CLI
sidebar_label: Shade Agent CLI
description: "Use the Shade Agent CLI to deploy your Shade Agent."
---

The Shade Agent CLI makes it easy to deploy a Shade Agent. Including building and deploying your agent contract, building and publishing your agent's Docker image, and deploying the agent to Phala Cloud. The CLI revolves around a `deployment.yaml` file that configures how your Shade Agent will be deployed.

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

Configure NEAR and Phala credentials required for deploying your Shade Agent. Must be run before using the `deploy` or `whitelist` commands.

```bash
shade auth
```

---


## deployment.yaml reference

CLI configurations are read from a single `deployment.yaml` file in the project root. The following sections describe what each key configures.

### Top-level keys

| Key | Required | Description |
|-----|----------|-------------|
| **environment** | Yes |`local` or `TEE`. Controls whether the agent runs locally or in a Phala TEE. |
| **network** | Yes | `testnet` or `mainnet`. Controls whether the agent contract is on NEAR testnet or mainnet. |
| **docker_compose_path** | Yes if TEE | Path to the Docker Compose file (e.g. `./docker-compose.yaml`). Used for building the Docker image and deploying your application to a TEE. |
| **agent_contract** | Yes | Agent contract configuration. See [agent_contract](#agent_contract) for more details. |
| **approve_measurements** | No | If enabled, sets allowed measurements in the agent contract. |
| **approve_ppids** | No | If enabled, sets allowed PPIDs in the agent contract.|
| **build_docker_image** | No (TEE only) | If enabled and environment is TEE, builds a new Docker image for your agent, publishes it and updates the Docker Compose with the new image.  |
| **deploy_to_phala** | No (TEE only) | If enabled and environment is TEE, deploys the Docker Compose to Phala Cloud. |
| **whitelist_agent_for_local** | No | Config for the `shade whitelist` command to whitelist an agent's account ID whilst in local mode (not used by the shade deploy command). |
| **os** | No | Override OS for tooling: `mac` or `linux`. If omitted, the CLI auto-detects from the current platform. |

### agent_contract

| Key | Required | Description |
|-----|----------|-------------|
| **contract_id** | Yes | NEAR account ID for the agent contract (e.g. `example-contract-123.testnet`). Must be unused if you are deploying a new contract. |
| **deploy_custom** | No | If enabled, the CLI creates the contract account with the same private key as the account set up via `shade auth`, and deploys a new contract. If the contract account already exists, it will be deleted and recreated to remove the old contract. |

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
| **init** | No | If enabled, initializes the contract via a function call. |

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

- `<MEASUREMENTS>` — Resolves to real calculated measurements for the application for TEE and fake default measurements for local. 

### approve_ppids

| Key | Required | Description |
|-----|----------|-------------|
| **enabled** | No | If `false`, PPIDs are not approved. |
| **method_name** | Yes | Contract method to call (e.g. `approve_ppids`). |
| **args** | Yes | Arguments to call the method with. |
| **tgas** | No | Gas for the call (default 30). |

Placeholders in args:

- `<PPIDS>` — Resolves to a list of all PPIDs of devices on Phala Cloud for TEE and a fake fault PPID for local.

### build_docker_image (TEE only)

| Key | Required | Description |
|-----|----------|-------------|
| **enabled** | No | If `false`, the Docker image is not built. If disabled, the CLI will use the existing Docker Compose file.  |
| **tag** | Yes | Docker image tag (e.g. `username/my-first-agent`) for building and pushing. |
| **cache** | Yes | Boolean; whether to use caching in the build process. |
| **dockerfile_path** | Yes | Path to the Dockerfile to use for the build process (e.g. `./Dockerfile`). |

### deploy_to_phala (TEE only)

| Key | Required | Description |
|-----|----------|-------------|
| **enabled** | No | If `false`, deployment to Phala Cloud is skipped. |
| **app_name** | Yes | Phala Cloud app (CVM) name. |
| **env_file_path** | Yes | Path to the environment variables file loaded when deploying to Phala (e.g. `./.env`). |

### whitelist_agent_for_local (local only)

Used by `shade whitelist`. No `enabled` flag; if the section is present, the command is available.

| Key | Required | Description |
|-----|----------|-------------|
| **method_name** | Yes | Contract method to call (e.g. `whitelist_agent_for_local`). |
| **args** | Yes |  Arguments to call the method with. |
| **tgas** | No | Gas for the call (default 30). |

Placeholders in args:

- `<AGENT_ACCOUNT_ID>` — Replaced with the agent account ID you provide when running `shade whitelist`.

:::info
Currently, the CLI only supports measurement calculation and Phala Cloud deployment for fixed configurations on DStack. If you need to deploy with different configurations, you can calculate the measurements and deploy to Phala by other means; you can ask for assistance with this in our [support group](https://t.me/+mrNSq_0tp4IyNzg8).

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

You can view a list of [example deployment.yaml configurations here](https://github.com/NearDeFi/shade-agent-framework/tree/main/shade-agent-cli/example-deployment-files).