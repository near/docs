---
id: relayer-gas-example
title: Multichain Relayer and Gas Station example
sidebar_label: Relayer + Gas Station
---
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this article you'll learn how to run end-to-end tests on the entire Multichain Relayer system.

:::info Required tools

For this tutorial, you'll need to have installed:

 - [Multichain Relayer Server](https://github.com/near/multichain-relayer-server)
 - [Gas Station Event indexer](https://github.com/near/gas-station-event-indexer)
 - [NEAR CLI RS](https://github.com/near/near-cli-rs)

:::

## Setup

Before you start testing, set up your local environment and install the Relayer server, the Event indexer and NEAR CLI.

:::info Alpha stage

The Multichain Relayer solution is currently under development. Users who want to test-drive this solution should keep in mind that the product is in alpha stage, and a code audit is pending.

:::

### Multichain Relayer server

The main function of this server is interfacing with foreign chain RPCs sending both pre-signed funding transactions to cover gas and the actual pre-signed transaction once the funding is done.

To run the [Multichain Relayer Server](https://github.com/near/multichain-relayer-server):

1. Configure the Multichain Relayer by editing the [`config.toml`](https://github.com/near/multichain-relayer-server/blob/main/config.toml) file
2. Start the multichain relayer server:
   ```sh
   cargo run
   ```

:::tip

Find the Multichain Relayer server source code in [this GitHub repository](https://github.com/near/multichain-relayer-server).

:::

### Gas Station Event indexer

The event indexer is a Python script that picks up events emitted from the [gas station contract](gas-station.md) used for generating signed foreign chain transactions and calls the multichain relayer `/send_funding_and_user_signed_txns` endpoint locally.

To run the [Gas Station indexer](https://github.com/near/gas-station-event-indexer):

1. Ensure you have the [Multichain Relayer Server](#multichain-relayer-server) running on `localhost:3030`
2. Create the virtual environment and install requirements:
   ```sh
   make install
   ```

3. Update the [`config.toml`](https://github.com/near/gas-station-event-indexer/blob/main/config.toml) configuration file with appropriate values
   ```
   network = "testnet"
   # gas station contract account id
   contract_id = "canhazgas.testnet"
   ```

4. Populate the [environment file](https://github.com/near/gas-station-event-indexer/blob/main/.env.sample) containing AWS credentials for reading from [Near Lake](../../6.data-infrastructure/lake-framework/near-lake.md)
   ```sh
   cp .env.sample .env
   ```

4. Run the indexer script:
   ```sh
   make run
   ```

:::tip

Find the Gas Station Event indexer source code in [this GitHub repository](https://github.com/near/gas-station-event-indexer).

:::

## Running tests

The gas station contract supports EIP-1559 transactions.

1. Set the transaction details of the EVM transaction you want to send in [`generate_rlp_evm_txn.py`](https://github.com/near/multichain-relayer-server/blob/5b040611f2dc6c6b405b5ec00d5102e3cc27a65c/integration_tests/generate_rlp_evm_txn.py), run the script, and save the RLP hex string output.

:::note

Python and Rust output different hex RLP encoded transactions.
 - If you're using Rust, use [`generate_eip1559_rlp_hex()`](https://github.com/near/multichain-relayer-server/blob/5b040611f2dc6c6b405b5ec00d5102e3cc27a65c/tests/tests.rs#L24).
 - If you're using Python, use [`generate_rlp_encoded_transaction(is_eip_1559=true)`](https://github.com/near/multichain-relayer-server/blob/5b040611f2dc6c6b405b5ec00d5102e3cc27a65c/integration_tests/generate_rlp_evm_txn.py#L7)

:::

<CodeTabs>
  <Language value="Python" language="python">
    <Github fname="generate_rlp_evm_txn.py"
        url="https://github.com/near/multichain-relayer-server/blob/5b040611f2dc6c6b405b5ec00d5102e3cc27a65c/integration_tests/generate_rlp_evm_txn.py"
        start="7" end="13" />
  </Language>
  <Language value="Rust" language="rust">
    <Github fname="test.rs"
        url="https://github.com/near/multichain-relayer-server/blob/5b040611f2dc6c6b405b5ec00d5102e3cc27a65c/tests/tests.rs"
        start="24" end="38" />
  </Language>
</CodeTabs>

2. Ensure the [Multichain Relayer server](#multichain-relayer-server) is configured correctly and running.

3. Ensure the [Gas Station indexer](#gas-station-event-indexer) is running locally.

4. Construct the signed transaction using the [near-cli-rs](https://github.com/near/near-cli-rs).
   The receiver account ID should be the gas station contract.
   You will need 2 actions if you want the gas station to cover your gas cost on the foreign chain:
    - 1 action to send the NEAR equivalent
    - 1 function call to the gas station.

   You should transfer the amount of `NEAR` that's needed to cover gas both on NEAR and on the foreign chain.
   You also need to paste in the RLP generated hex for the EVM transaction you want on the other chain generated in step 1.

   When it asks you to _send_ or _display_, choose <kbd>send</kbd>.
   Example below:
   ```sh
   near contract call-function as-transaction canhazgas.testnet create_transaction json-args '{"transaction_rlp_hex":"eb80851bf08eb000825208947b965bdb7f0464843572eb2b8c17bdf27b720b14872386f26fc1000080808080","use_paymaster":true}' prepaid-gas '100.000 TeraGas' attached-deposit '0.5 NEAR' sign-as nomnomnom.testnet network-config testnet sign-with-keychain send
   ```

5. Get the `"id"` from the receipts from the call in step 4, and use that to call `sign_next` twice:
   ```sh
    near contract call-function as-transaction canhazgas.testnet sign_next json-args '{"id":"16"}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as nomnomnom.testnet network-config testnet sign-with-keychain send
   ```

## Options for testing purposes

Instead of creating a signed transaction and calling the gas station contract to sign it, you can get the recently signed transactions by calling the contract while replacing the `blockheight` with a more recent block height:

```sh
near contract call-function as-read-only canhazgas.testnet list_signed_transaction_sequences_after json-args '{"block_height":"157111000"}' network-config testnet now
```

This will return something like the output below. Take an individual entry in the list of JSONs and send that as the payload of a `POST` request to the `/send_funding_and_user_signed_txns` endpoint:

```jsx
[
  {
    "created_by_account_id": "b807806adcb73f6aecb5ed98bb8bd7bbe7bbf8ed342596ab700ef6b050abc4c3",
    "foreign_chain_id": "97",
    "signed_transactions": [
      "0x02f873610385174876e80085174876e80082520894c89663ac6d169bc3e2e0a99d9fe96f2e82bcc307870eebe0b40e800080c080a0712d44ba4cd7567764231e21f054c5e7d008055222820e9d5ba148ede48755f7a06e8b812d37047593fc51fce7254ea7aef89927cada729bc903cd36fa9659dce4",
      "0x02f873618085174876e80085174876e80082520894ef55a8bdf4498ea0af88bc54efb29608bb25e130872aa1efb94e000080c080a017d7024fe9e32ad8da1181729fac7e6a45311c47bf59f2b5a8b5e9fe002c0617a04ad725b362cf12c6e066c5b0b7ecbbf08f5e4d0a240337e6ddc8076f0528e3e5"
    ]
  },
...
  {
    "created_by_account_id": "b807806adcb73f6aecb5ed98bb8bd7bbe7bbf8ed342596ab700ef6b050abc4c3",
    "foreign_chain_id": "97",
    "signed_transactions": [
      "0x02f873610185174876e80085174876e80082520894c89663ac6d169bc3e2e0a99d9fe96f2e82bcc307870eebe0b40e800080c001a0ff19fe769246de8483b986e5aeaa3360bfb74f238e2a91ea353dac9aad9e24a0a020485dcd2c64172b9bc058b7813646dafbf2f27d51aae388b074e514fdb6de05",
      "0x02f873618085174876e80085174876e80082520894ef55a8bdf4498ea0af88bc54efb29608bb25e130872e2f6e5e14800080c001a0dac67c383e8de3211f3c5d360cc2e9a21d160711fc3f80113ac525169317e2eca07140a1d0d1528b6eaf9fac4bb1bd44c1c4f63bb956292b0211a0dad1748e2eea"
    ]
  }
]
```

