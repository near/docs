---
id: deploying
title: Deploying an Agent
sidebar_label: Deploying an Agent
---

# Deploying an Agent

In this section we we'll walk through deploying your first Shade Agent. The template we're using is a simple shade agent that acts as a verifiable ETH price oracle. It takes prices from two different APIs, takes the average and then pushes the price to an Ethereum contract.  

You can try out the frontend [here](https://6167fc3313d457d7b7d618605724595d30cd96ef-3000.dstack-prod5.phala.network/).

On the next sections you'll see how to edit the agent to work for your use case.

We'll cover two deployment scenarios:
1. **TEE Deployment**: Running the worker agent in a real Trusted Execution Environment (TEE).
2. **Local Development**: Running the agent locally for rapid testing and development.

## Setup

- First fork the [repository](https://github.com/PiVortex/shade-agent-template) to your GitHub and clone the repo from your fork (you'll need to fork it as any changes you make to your code need to be reflected on GitHub to make sure the code it verifiable)

- Later on you'll need a NEAR account. You can get a pre-funded testnet account with [cargo-near](https://github.com/near/cargo-near/releases/latest). Make sure to note down the private key and account ID. 

```bash
cargo near create-dev-account use-random-account-id autogenerate-new-keypair print-to-terminal network-config testnet create
```

- You'll also need to install the [NEAR CLI](https://github.com/near/near-cli-rs/releases/latest)

- Install docker. [Mac](https://docs.docker.com/desktop/setup/install/mac-install/) - [Linux](https://docs.docker.com/desktop/setup/install/linux/)

- Get a free Phala Cloud account at https://cloud.phala.network/register

## TEE Deployment

These set of instructions will guide you to deploy your Shade Agent within a TEE.

### Configuring the worker agent 

- Enter the repository and run `yarn` to install the dependencies.

- Update the `docker:image` and `docker:push` scripts within your `package.json` file to match your repo path (lower case)

- Open docker desktop

- Fill out your `.env.local.development` file with the account Id your created and the corresponding private key. Set the contract Id to your account Id but prefixed with `contract.` (you should not create the contract account as it will be create for you when deploying). Also set the contract Id within your `.env` file.

- Run `yarn docker:image` followed by `yarn docker:push` to build your docker image.

- The CLI will print our your `code hash`, which will look something like sha256:c085606f55354054408f45a9adee8ba4c0a4421d8e3909615b72995b83ad0b84. You can check this code hash in docker desktop also, under image ID. Take this code hash and update the hash in your [docker-compose.yaml](https://github.com/PiVortex/shade-agent-template/blob/main/docker-compose.yaml#L4) and [uilts/deploy-contract.js](https://github.com/PiVortex/shade-agent-template/blob/main/utils/deploy-contract.js#L9)

### Deploying the contract 

- To build and deploy the contract run `yarn contract:deploy` or `yarn contract:deploy:mac` depending which system you're on. For deployment on Mac, the script builds a docker container and installs tools to build the contract since the contract has dependencies that cannot be built on Mac.

- Make sure to keep your account topped up with testnet NEAR. You can get additional NEAR from the [faucet](https://near-faucet.io/).

### Deploying to the TEE

- Make sure that you push your recent changes to GitHub.

- Go to the Phala Cloud dashboard https://cloud.phala.network/dashboard 

- Click deploy > docker-compose.yml > paste in your docker-compose.yaml, select tdx.small, prod5 and dstack-dev-0.3.5 and click deploy. You do not need to enter any environment variables.

- Once the deployment is finished, click on your deployment, then head to the network tab and open the endpoint.

Now you can interact with the Shade Agent. 

:::tip
If you are having problems deploying your docker image to Phala make sure that your node version matches the one set within your [Dockerfile](https://github.com/PiVortex/shade-agent-template/blob/main/Dockerfile#L3).
:::

### Using the Shade Agent

- You will need to first fund the worker agent with a small amount of testnet NEAR. This can be done from the NEAR CLI or a testnet wallet. This account needs testnet NEAR to call the NEAR smart contract to register and send transactions.

```bash
near tokens <accountId> send-near <workerAccountId> '1 NEAR' network-config testnet
```

- Next fund the Sepolia account from a wallet. You can get Sepolia ETH from this [faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia). This account needs Sepolia ETH to call the Ethereum smart contract to update the stored value.

- Now register the worker agent by clicking the step 3 box.

- Now the worker agent is registered you can click to update the stored price of ETH in the ethereum smart contract. 

### Iterative flow 

Each time you update the code you need to deploy a new image to Phala Cloud as the code hash will have changed. To do this follow these steps:

- Build the new image `yarn docker:image` followed by `yarn docker:push`.

- Update the stored codehash in your [docker-compose.yaml](https://github.com/PiVortex/shade-agent-template/blob/main/docker-compose.yaml#L4) file and then the code hash (no sha256: prefix) in the contract using the NEAR CLI: 

```bash
near contract call-function as-transaction <contractId> approve_codehash json-args '{"codehash": "<yourNewCodeHash>"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet 
```

:::tip
If you have have made changes to the NEAR smart contract you will need to redeploy the contract with the new hash. Update [uilts/deploy-contract.js](https://github.com/PiVortex/shade-agent-template/blob/main/utils/deploy-contract.js#L9) and run `yarn contract:deploy` or `yarn contract:deploy:mac`.
:::

- Update your Phala deployment by clicking on the three little dots, clicking update and pasting your new docker compose file.

## Local development 

Developing locally is much easier for quickly iterating on and testing your agent. You can tests all the flows except for the agent registration and valid agent gating.

To develop locally comment out the valid worker agent gating from the `send_price` function in the [smart contract](https://github.com/PiVortex/shade-agent-template/blob/main/contract/src/lib.rs#L70C1-L71C71).

```rust
    pub fn send_price(&mut self, payload: Vec<u8>) -> Promise {
        // Commented these two lines for local development
        //let worker = self.get_worker(env::predecessor_account_id());
        //require!(self.approved_codehashes.contains(&worker.codehash));

        // Call the MPC contract to get a signature for the payload
        ecdsa::get_sig(payload, "ethereum-1".to_string(), 0)
    }
```

This means now any account, not just valid worker agents, can call successfully this function and get signatures.

Next redeploy your contract with `yarn contract:deploy` or `yarn contract:deploy:mac`.

Now you can run your agent locally `yarn dev`.
