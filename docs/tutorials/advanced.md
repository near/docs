# Advanced: Build & run a local TestNet node

There are three ways to run TestNet node:
 - Run single TestNet node for your own network ("DevNet" mode, used for development).
 - Run multi-node TestNet nodes on your own network.
 - Join existing TestNet by running node that syncs.

The core NEAR node client is written using the [Rust language](https://www.rust-lang.org/), which uses [Cargo](https://github.com/rust-lang/cargo) to manage packages \(similar to NPM\).

## 1. Setup Rust & dependencies

The most up-to-date procedure for installing and running a node is provided in the [README for the nearcore library on Github](https://github.com/nearprotocol/nearcore).

Follow the steps in that README to get Rust, Cargo and the nearcore library set up.

## 2. Run your own single node TestNet

Once everything is installed, you should setup TestNet:

```bash
tendermint init
```

then run Tendermint & NearMint in difference consoles:

```bash
tendermint node
cargo run -p nearmint
```

## 3. Deploy your app to the local TestNet

After you have an app locally developed, you can deploy it to the local TestNet.

Download near cli tools

```text
npm install -g near-shell
```

Navigate to your source directory in command line, and do the following:

1. Create an account for your contract

```bash
near create_account --account_id <yourcontractname>
```

1. Build your contract

```bash
near build
```

1. Deploy your contract to the local TestNet

```bash
near deploy --account_id <yourcontractname>
```

For help using cli tools, you can use `near help`.

## 4 \(Optional\). Play with your node!

Execute the following in the `nearcore` folder to run some Python scripts which will help you test that your TestNet is working properly:

```bash
# Install pynear
cd pynear
# sudo may be required if you are not testing with a python virtual environment
python setup.py develop

# See usage of rpc helper script
pynear --help

# Get usage of sub command
pynear send_money --help

# Send money
pynear send_money -r bob.near -a 1

# Create a new account for the contract
pynear create_account test_contract 1

# Deploy code for the smart contract account
pynear deploy test_contract tests/hello.wasm

# Call method 'setValue' for contract 'test_contract' and pass arguments
pynear schedule_function_call test_contract setValue --args '{"value":"testtest"}'

# Call view function 'getValue' for contract 'test_contract'
pynear call_view_function test_contract getValue

# Call view function 'benchmark_sum_n' for contract 'test_contract' and pass n=500000
pynear call_view_function test_contract benchmark_sum_n --args='{"n":500000}'

# View state for Bob's account
pynear view_account -a bob.near

# Create an account
pynear create_account cindy 1

# View full state db of the contract
pynear view_state test_contract
```
