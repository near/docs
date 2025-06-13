---
id: production-deploying
title: Deploying an Agent
sidebar_label: Deploying an Agent
---

import { SigsSupport } from '@site/src/components/sigsSupport';

# Deploying an Agent

In this section we'll walk through deploying your first Shade Agent. The template we're using is a simple Shade Agent built with NextJS that acts as a verifiable ETH price oracle. It takes prices from two different APIs, takes the average and then pushes the price to an Ethereum contract.  

We'll cover two deployment scenarios:
1. **TEE Deployment**: Running the worker agent in a real Trusted Execution Environment (TEE).
2. **Local Development**: Running the agent locally for rapid testing and development.

In the following pages, you'll see how to edit this agent to work for your use case.

---

## Prerequisites

- First, `clone` the [template repository](https://github.com/NearDeFi/shade-agent-template).

```bash
git clone https://github.com/NearDeFi/shade-agent-template.git
cd shade-agent-template
```

- Install Rust and NEAR tooling.

```bash
# Install Rust: https://www.rust-lang.org/tools/install
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Contracts will be compiled to wasm, so we need to add the wasm target
rustup target add wasm32-unknown-unknown

# Install the NEAR CLI to deploy and interact with the contract
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh

# Install cargo near to help building the contract
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/cargo-near/releases/latest/download/cargo-near-installer.sh | sh
```

- Later on, you'll need a NEAR account. You can get a pre-funded testnet account with cargo-near. Make sure to note down the private key and account Id.

```bash
cargo near create-dev-account use-random-account-id autogenerate-new-keypair print-to-terminal network-config testnet create
```

- Install Docker for [Mac](https://docs.docker.com/desktop/setup/install/mac-install/) or [Linux](https://docs.docker.com/desktop/setup/install/linux/) and set up an account.

- Set up a free Phala Cloud account at https://cloud.phala.network/register. 

<details>

<summary> What is a Phala Cloud </summary>

Phala Cloud is a service that offers secure and private hosting in a TEE using [Dstack](https://docs.phala.network/overview/phala-network/dstack). Phala Cloud makes it easy to run a TEE, that's why we'll use it in our template!

</details>

---

:::warning
This technology has not yet undergone a formal audit. Use at your own risk. Please conduct your own due diligence and exercise caution before integrating or relying on it in production environments.
:::

## TEE Deployment

These set of instructions will guide you to deploy your Shade Agent within a TEE.

### Configuring the worker agent 

- Enter the repository and run `yarn` to install the dependencies.

- Update the `docker:image` and `docker:push` scripts within your `package.json` file to match your docker hub account.

- Configure your `.env.local.development` file with the following:
  - Your NEAR account ID.
  - The corresponding private key.
  - Set the contract ID to your account ID prefixed with `contract.` (the contract account will be created during deployment, you should not create this before).

- Set the same contract ID in your `.env` file.

- Open Docker Desktop (you don't need to do anything here, it's just to start up Docker).

- Run `yarn docker:image` followed by `yarn docker:push` to build and publish your Docker image.

- The CLI will print out your `code hash`, which will look something like `sha256:c085606f55354054408f45a9adee8ba4c0a4421d8e3909615b72995b83ad0b84`. You can also check this code hash on Docker Desktop, under the image Id. Take this code hash and update the hash in your [docker-compose.yaml](https://github.com/NearDeFi/shade-agent-template/blob/main/docker-compose.yaml#L4) and [utils/deploy-contract.js](https://github.com/NearDeFi/shade-agent-template/blob/main/utils/deploy-contract.js#L9).

### Deploying the Agent Contract 

- Make sure to keep your account topped up with testnet NEAR to deploy the contract. You can get additional NEAR from the [faucet](https://near-faucet.io/) or by asking in our [Dev Group](https://t.me/shadeagents).

- To build and deploy the agent contract, run `yarn contract:deploy` or `yarn contract:deploy:mac` depending on which system you're using. For deployment on Mac, the script builds a Docker container and installs tools to build the agent contract, since the contract has dependencies that cannot be built on Mac.

### Deploying to Phala

- Go to the Phala Cloud dashboard https://cloud.phala.network/dashboard.

- Click deploy > docker-compose.yml > and paste in your docker-compose.yaml and select `tdx.small`.

- Once the deployment is finished, click on your deployment, then head to the `network tab` and open the endpoint.

Now you can interact with the Shade Agent. 

:::tip
If you are having problems deploying your Docker image to Phala, make sure that your node version in your [Dockerfile](https://github.com/NearDeFi/shade-agent-template/blob/main/Dockerfile#L3) matches the one on your machine.
:::

### Using the Shade Agent

- You will need to first fund the worker agent with a small amount of `testnet NEAR`. This can be done from the NEAR CLI or a testnet wallet. This account needs testnet NEAR to call the agent contract to register and send transactions.

```bash
near tokens <accountId> send-near <workerAccountId> '1 NEAR' network-config testnet
```

- Next, fund the Sepolia account from a wallet. You can get `Sepolia ETH` from this [faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia). This account needs Sepolia ETH to call the Ethereum smart contract to update the stored value.

- Then register the worker agent by clicking the step 3 box.

- Now the worker agent is registered, you can click to update the stored price of ETH in the Ethereum smart contract.

The RPCs being used are rate-limited, so the agent may throw errors if the update price box is clicked too often.

### Iterative Flow 

Each time you update the worker code, you need to deploy a new image to Phala Cloud as the code hash will have changed. To do this, follow these steps:

- Build and publish the new image `yarn docker:image` followed by `yarn docker:push`.

- Update the stored codehash in your [docker-compose.yaml](https://github.com/NearDeFi/shade-agent-template/blob/main/docker-compose.yaml#L4) file and then the code hash (no sha256: prefix) in the agent contract using the NEAR CLI: 

```bash
near contract call-function as-transaction <contractId> approve_codehash json-args '{"codehash": "<yourNewCodeHash>"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet 
```

- Update your Phala deployment by clicking on the three little dots, clicking update, and pasting your new `docker-compose.yaml` file.

:::tip
If you have made changes to the agent contract, you will need to redeploy the contract with the new hash. Update [utils/deploy-contract.js](https://github.com/NearDeFi/shade-agent-template/blob/main/utils/deploy-contract.js#L9) and run `yarn contract:deploy` or `yarn contract:deploy:mac`.
:::

---

## Local Development 

Developing locally is much easier for quickly iterating on and testing your agent. You can test all the flows except for the agent registration and valid agent gating.

- To develop locally, comment out the valid worker agent gating from the `sign_tx` function in the [lib.rs](https://github.com/NearDeFi/shade-agent-template/blob/main/contract/src/lib.rs#L70C1-L71C71) file of the agent contract.

```rust
pub fn sign_tx(&mut self, payload: Vec<u8>, derivation_path: String, key_version: u32) -> Promise {
    // Comment these two lines for local development
    //let worker = self.get_worker(env::predecessor_account_id());
    //require!(self.approved_codehashes.contains(&worker.codehash));

    // Call the MPC contract to get a signature for the payload
    ecdsa::get_sig(payload, derivation_path, key_version)
}
```

This means now any account, not just valid worker agents, can call this function and get signatures.

- Next, redeploy your agent contract with `yarn contract:deploy` or `yarn contract:deploy:mac`.

- Now you can run your agent locally `yarn dev`.

<SigsSupport />
