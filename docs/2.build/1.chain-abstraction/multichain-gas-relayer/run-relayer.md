---
id: run-relayer
title: Running your own Relayer
sidebar_label: Running a Relayer
---

In this article you'll learn how to run your own Relayer server, to relay blockchain transactions for your users.

## What is a Relayer?

At a high level, a Relayer is a HTTP server that relays transactions to the NEAR network via RPC on behalf of new users who haven't yet acquired `NEAR` tokens as part of the onboarding process. The entity running the relayer covers the gas costs for the end users who are signing the transactions.

:::tip Why use a Relayer?

Check [this article](../../../1.concepts/abstraction/relayers.md#why-use-a-relayer) to learn more about why you'd want to use a Relayer server.

:::

### How it works

Technically, the end-user (client) creates a `SignedDelegateAction` that contains the required data to construct a `Transaction`, signs the `SignedDelegateAction` using their key, which is then serialized and sent  to the relayer (server) as payload of a `POST` request. 
When the request is received, the relayer uses its own key to sign a `Transaction` using the fields in the `SignedDelegateAction` as input to create a `SignedTransaction`. 
The `SignedTransaction` is then sent to the network via RPC call and the result is then sent back to the client.

:::info
This functionality depends on [NEP-366: Meta Transactions](https://github.com/near/NEPs/pull/366).
:::

## Features

The open-source Rust [reference implementation of a Relayer server](https://github.com/near/pagoda-relayer-rs/) offers the following features:

:::info
Features can be combined as needed. Use of one feature does not preclude the use of any other feature unless specified.
:::

1. Cover the gas costs of end users while allowing them to maintain custody of their funds and approve transactions (`/relay`, `/send_meta_tx`, `/send_meta_tx_async`, `/send_meta_tx_nopoll`)
2. Only pay for users interacting with certain contracts by whitelisting contracts addresses (`whitelisted_contracts` in `config.toml`) 
3. Specify gas cost allowances for all accounts (`/update_all_allowances`) or on a per-user account basis (`/create_account_atomic`, `/register_account`, `/update_allowance`) and keep track of allowances (`/get_allowance`)
4. Specify the accounts for which the relayer will cover gas fees (`whitelisted_delegate_action_receiver_ids` in `config.toml`)
5. Only allow users to register if they have a unique Oauth Token (`/create_account_atomic`, `/register_account`)
6. Relayer Key Rotation: `keys_filenames` in `config.toml`
7. Integrate with [FastAuth SDK](../fastauth-sdk.md)
8. Mix and Match configuration options

:::tip
Check the [Use cases section](#use-cases) for example configuration files corresponding to different usage scenarios.
:::

## Basic Setup

You can follow these steps to set up your local Relayer server development environment:

1. [Install Rust for NEAR Development](../../../sdk/rust/intro.md)
2. If you don't have a NEAR account, [create one](../../../1.concepts/protocol/account-model.md)
3. With the account from step 2, create a JSON file in this directory in the format
   ```js
   {"account_id":"example.testnet","public_key":"ed25519:98GtfFzez3opomVpwa7i4m3nptHtc7Ha514XHMWszLtQ","private_key":"ed25519:YWuyKVQHE3rJQYRC3pRGV56o1qEtA1PnMYPDEtroc5kX4A4mWrJwF7XkzGe7JWNMABbtY4XFDBJEzgLyfPkwpzC"}
   ```
   using a [Full Access Key](../../../1.concepts/protocol/access-keys.md#full-access-keys) from an account that has enough NEAR to cover the gas costs of transactions your server will be relaying. Usually, this will be a copy of the json file found in the `.near-credentials` directory. 
4. Update values in `config.toml`
5. Open up the `port` from `config.toml` in your machine's network settings
6. Run the server using `cargo run`. 
   > **(OPTIONAL)** To run with logs (tracing) enabled run `RUST_LOG=tower_http=debug cargo run`

:::info Optional setup

If you're integrating with [FastAuth](../fastauth-sdk.md) make sure to enable feature flags: 
```
cargo build --features fastauth_features,shared_storage
```
If you're using shared storage, make sure to enable feature flags:
```
cargo build --features shared_storage
```

:::

## Redis Setup

:::tip
This is only needed if you intend to use whitelisting, allowances, and OAuth functionality.
:::

1. [Install Redis](https://redis.io/docs/latest/get-started/).
   > Steps 2 & 3 assume Redis was installed on machine instead of a Docker setup. If you're connecting to a Redis instance running in GCP, follow the above steps to connect to a VM that will forward requests from your local relayer server to [Redis running in GCP](https://cloud.google.com/memorystore/docs/redis/connect-redis-instance#connecting_from_a_local_machine_with_port_forwarding)
2. Run `redis-server --bind 127.0.0.1 --port 6379` - make sure the port matches the `redis_url` in the `config.toml`.
3. Run `redis-cli -h 127.0.0.1 -p 6379`


## Advanced setup

- [Multiple Key Generation](https://github.com/near/pagoda-relayer-rs/tree/main?tab=readme-ov-file#multiple-key-generation---optional-but-recommended-for-high-throughput-to-prevent-nonce-race-conditions): this is optional, but recommended for high throughput to prevent nonce race conditions. Check 
- [Docker Deployment](https://github.com/near/pagoda-relayer-rs/tree/main?tab=readme-ov-file#docker-deployment): instructions to deploy with Docker
- [Cloud Deployment](https://github.com/near/pagoda-relayer-rs/tree/main?tab=readme-ov-file#cloud-deployment): instructions to deploy on Cloud providers

## API Specifications

You can find the complete Relayer server API specification on the [GitHub repository](https://github.com/near/pagoda-relayer-rs/tree/main?tab=readme-ov-file#api-spec-).

## Use cases

The [examples folder](https://github.com/near/pagoda-relayer-rs/tree/main/examples) on the GitHub repository contains example configuration files corresponding to different use cases. 

:::info
These files are for reference only and you should update the `config.toml` values before using it on your development environment.
:::

### No filters

This is a config for a relayer that covers gas for all user transactions to all contracts with no filters. To prevent abuse, this should only be used if there's only a secure backend calling the relayer
- [`no_filters.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/no_filters.toml)

### Basic whitelist

This is a configuration for a basic relayer that covers gas for user transactions to interact with a whitelisted set of contracts
- [`basic_whitelist.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/basic_whitelist.toml)

### Redis

This is a configuration for a relayer that covers gas for user transactions up to a allowance specified in Redis to interact with a whitelisted set of contracts. 
- Allowances are on a per-account id basis and on signup (account creation in Redis and on-chain) an OAuth token is required to help with sybil resistance
- [`redis.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/redis.toml)

### FastAuth

This is a configuration for use if you intend to integrate with [FastAuth SDK](../fastauth-sdk.md)
- It covers gas for user transactions up to a allowance specified in Redis to interact with a whitelisted set of contracts. 
- Allowances are on a per-account id basis and on signup (account creation in Redis and on-chain) an OAuth token is required to help with sybil resistance 
- This also makes use of a shared storage functionality on the Near Social DB contract 
- and a whitelisted sender (`whitelisted_delegate_action_receiver_ids`)
- [`fastauth.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/fastauth.toml)

### Pay with fungible tokens

This is a configuration for a relayer that ensures there's FTs sent to a burn address used to cover the equivalent amount of gas for user transactions to interact with a whitelisted set of contracts 
- [`pay_with_ft.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/pay_with_ft.toml)

### Whitelist senders

This is a config for a relayer that covers gas for a whitelisted set of users' transactions to interact with a whitelisted set of contracts
- [`whitelist_senders.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/whitelist_senders.toml) (`whitelisted_delegate_action_receiver_ids`)

### Shared storage

This is a configuration for a relayer that covers BOTH gas AND storage fees for user transactions to interact with a whitelisted set of contracts

- be sure to include shared storage logic based on [`shared_storage.rs`](https://github.com/NearSocial/social-db/blob/master/contract/src/shared_storage.rs) in your contract that is being whitelisted
- [`shared_storage.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/shared_storage.toml)

### Exchange withdraw

This is a configuration for a relayer where an exchange running the relayer covers user withdraw fees when they are withdrawing stablecoins on NEAR (e.g., `USDT` or `USDC`)

- [`exchange_withdraw.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/exchange_withdraw.toml)
