---
id: environment-variables
title: Environment Variables
sidebar_label: Environment Variables
description: "Learn about the required and optional environment variables as part of the Shade Agent Framework."
---

Environment variables are a crucial component of the Shade Agent Framework. They configure your Shade Agent and are passed encrypted into your agent when it goes live. Note that the same agent code (same Docker Compose file) can use different environment variables in different deployments.

The environment variables file must be named `.env.development.local`.

## Required Variables

Below, we'll walk through each environment variable required by the Shade Agent Framework: 

- **NEAR_ACCOUNT_ID**

    :::info Example
    NEAR_ACCOUNT_ID=example-account.testnet
    :::

    This is the NEAR account ID used to create the agent contract's account when running the Shade Agent CLI and is used to automatically fund the agent's account on boot. You should ensure this account remains funded as you continue to deploy additional agents.

    You can create a NEAR account by using the NEAR CLI.

    Install the CLI:

    ```bash
    curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh
    ```

    Create an account:

    ```bash
    export ACCOUNT_ID=example-name.testnet
    near account create-account sponsor-by-faucet-service $ACCOUNT_ID autogenerate-new-keypair save-to-keychain network-config testnet create
    ```

    Replace `example-name.testnet` with a unique account ID.

- **NEAR_SEED_PHRASE**

    :::info Example
    NEAR_SEED_PHRASE="book chapter unknown knife strange inherit amazing artist mixture loan rotate lyrics"
    :::

    This is the seed phrase for the NEAR_ACCOUNT_ID. When creating an account with the above command, the seed phrase will be printed to the terminal.

- **NEXT_PUBLIC_contractId**

    :::info Examples
    NEXT_PUBLIC_contractId=ac-proxy.example-account.testnet
    NEXT_PUBLIC_contractId=ac-sandbox.example-account.testnet
    :::

    This is the NEAR account ID where the agent contract will be deployed when running the Shade Agent CLI. The account is automatically created when you run the Shade Agent CLI. This account must be your NEAR_ACCOUNT_ID prefixed with either `ac-proxy.` or `ac-sandbox.`, which determines whether the deployment is local or to a TEE, respectively. 

- **API_CODEHASH**

    The API_CODEHASH defines the code hash of the Shade Agent API. You only need to update this when a new API version is released. The [Quickstart Template](https://github.com/NearDeFi/shade-agent-template/blob/main/.env.development.local.example#L9) always includes the most up-to-date API code hash. 

- **APP_CODEHASH**

    The APP_CODEHASH defines the code hash of your agent. You don't need to edit this as it will be automatically updated when running the Shade Agent CLI in production.

- **DOCKER_TAG**

    :::info Example
    DOCKER_TAG=username/my-app
    :::

    The DOCKER_TAG specifies the location of your app image on Docker Hub. Edit this tag to match your Docker username in the first part, and choose any name you'd like for the second part. The CLI will automatically update the Docker tag in your docker-compose.yaml file when it runs in production.

- **PHALA_API_KEY**

    :::info Example
    PHALA_API_KEY=phak_tIhrDY0mXJMgmLLMEMoM6yBxOsjfVM-sTmXmjOF4Fks
    :::

    The PHALA_API_KEY is used to upload your agent to Phala Cloud when running the Shade Agent CLI. You can get a key [here](https://cloud.phala.network/dashboard/tokens).

## Optional Environment Variables 

- **API_PORT**

    :::info Example
    API_PORT=4000
    :::

    The API_PORT defines which port number the Shade Agent API is exposed on. The API by default is hosted on port 3140.

## Your Own Variables

You should also set any additional environment variables your agent may need in the `.env.development.local` file. Remember to update your [Docker Compose](https://github.com/NearDeFi/shade-agent-template/blob/main/docker-compose.yaml#L21) file to pass these additional variables to your agent. 