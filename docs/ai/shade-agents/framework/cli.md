---
id: cli
title: Shade Agent CLI
sidebar_label: Shade Agent CLI
description: "Learn about the Shade Agent CLI and how to use it to deploy Shade Agents."
---

The [Shade Agent CLI](https://github.com/NearDeFi/shade-agent-cli/tree/main) makes it simple to deploy a Shade Agent.

Under the hood, the CLI:
- Builds and publishes the Docker Image for your agent app, and modifies your environment variables and docker-compose.yaml to match your new image hash
- Creates the agent contract account, deploys the agent contract to it, and initializes it with the NEAR_ACCOUNT_ID as the owner
- Approves the image code hashes for your agent (app and API image)
- Deploys the agent to a TEE on Phala Cloud

---

## Local vs Production

The `NEXT_PUBLIC_contractId` in your environment variables prefix should be set to `ac-proxy.` for local development and `ac-sandbox.` for TEE deployment.

For local deployment, the CLI works a little differently:
- No Docker Image is built or published for your agent app
- An agent contract that doesn't require agent registration is deployed instead (since locally you cannot produce a valid TEE attestation)
- The API image is hosted locally instead of deploying anything to a TEE

---

## Installation 

```bash
npm i -g @neardefi/shade-agent-cli
```

---

## Usage

The Shade Agent CLI is a single command that runs the CLI with standard configurations. Run the command within the root of your project.

```bash
shade-agent-cli
```

Your project root must contain your `.env.development.local`, `Dockerfile` and `docker-compose.yaml` files.

---

## Flags 

The CLI includes various flags to configure deployment options and disable specific components. If you require further customizability when deploying your agent, you can disable the relevant components using flags and complete those steps manually with native tools: [Docker CLI](https://docs.docker.com/reference/cli/docker/), [NEAR CLI](https://docs.near.org/tools/near-cli) and [Phala CLI](https://docs.phala.network/phala-cloud/phala-cloud-cli/overview)

- **--wasm `<path>`** 

  Path to a custom agent contract WASM file (e.g. `contract/near/contract.wasm`) to deploy instead of the default contract. Use this when deploying [custom contracts](../custom-agent-contract.md). 

- **--funding `<amount>`** 

  Amount of NEAR tokens to fund the contract deployment with (e.g. `5` for 5 NEAR). Use this when deploying a custom contract.

- **--image** 

  Build and push the Docker image only. Use this when you want customizability over the deployment of the agent contract.

- **--contract**

  Build and push the Docker image, and deploy the contract only. Use this when you want customizability over the approving of image code hashes.

- **--phala-only**

  Deploy the agent, specified by the current `docker-compose.yaml`, to Phala Cloud. Use this when you want to redeploy the same agent as you last deployed.

- **--no-redeploy**

  Skip redeploying the contract. Use when you want to deploy a new agent quicker and you don't need the agent contract redeploying.

- **--no-build**

  Skip building and pushing the Docker image. Use this when you want to redeploy the same agent or want more control over the image build process.

- **--no-phala**

  Skip deploying the agent to Phala Cloud. Use this when you want more control over hosting the agent (e.g. deploying to a TEE with higher specs).

- **--no-cache**

  Run Docker build with --no-cache. Use this when you need clean builds or want to update cached layers (e.g. cached layers may use older packages). 

:::note
Some options are mutually exclusive. See error messages for details if you use conflicting flags.
:::

---

## Custom RPC

To use customs RPCs with the CLI and the API, create a file named `near-rpc.json` within your project's root and configure the RPCs you would like to use, for example:

```json
{
  "nearRpcProviders": [
    {
      "connectionInfo": {
        "url": "https://neart.lava.build:443"
      },
      "options": {
        "retries": 3,
        "backoff": 2,
        "wait": 1000
      }
    },
    {
      "connectionInfo": {
        "url": "https://test.rpc.fastnear.com"
      },
      "options": {
        "retries": 3,
        "backoff": 2,
        "wait": 1000
      }
    }
  ]
}
```

If required, you can specify headers under connectionInfo.
