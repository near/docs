---
id: quickstart
title: Your First Smart Contract
sidebar_label: Quickstart
description: "Create your first contract using your favorite language."
---

import {Github, Language} from '@site/src/components/UI/Codetabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Card from '@site/src/components/UI/Card';
import MovingForwardSupportSection from '@site/src/components/MovingForwardSupportSection';

Welcome! [NEAR accounts](../protocol/account-model.md) can store small apps known as smart contracts. In this quick tutorial, we will guide you in creating your first contract on the NEAR **testnet**!

Join us in creating a friendly auction contract, which allows users to place bids, track the highest bidder and claim tokens at the end of the auction.

<details>

  <summary> Prefer an online IDE? </summary>

  Want to jump right into the code without setting up a local dev environment?
  
  Checkout [NEAR Playground](https://nearplay.app/) for an easy-to-use online IDE w/ pre-configured templates.

  ![NEAR Playground](@site/static/assets/docs/smart-contracts/NEAR-Playground.png)

</details>

---

## Prerequisites

Before starting, make sure to set up your development environment.

<details>
<summary>Working on Windows?</summary>

  See our blog post [getting started on NEAR using Windows](/blog/getting-started-on-windows) for a step-by-step guide on how to set up WSL and your environment

</details>

<Tabs groupId="code-tabs" queryString>
<TabItem value="rust" label="🦀 Rust">

```bash
# Install Rust: https://www.rust-lang.org/tools/install
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Contracts will be compiled to wasm, so we need to add the wasm target
rustup target add wasm32-unknown-unknown

# Install NEAR CLI-RS to deploy and interact with the contract
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh

# Install cargo near to help building the contract
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/cargo-near/releases/latest/download/cargo-near-installer.sh | sh
```

</TabItem>

  <TabItem value="js" label="🌐 JavaScript">

```bash
# Install Node.js using nvm (more options in: https://nodejs.org/en/download)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install latest

# ⚠️ For Mac Silicon users only, Rosetta is needed to compile contracts
# /usr/sbin/softwareupdate --install-rosetta --agree-to-license

# Install NEAR CLI to deploy and interact with the contract
npm install -g near-cli-rs@latest
```

</TabItem>

<TabItem value="py" label="🐍 Python">

:::note
Python quickstart tutorial is coming soon!

In the meantime, please check out the [hello-near](https://github.com/near-examples/hello-near-examples/tree/main/contract-py) example.
:::

<!-- ```bash
# Install Python (if not already installed)
# Use your system's package manager or download from https://www.python.org/downloads/

# Install Emscripten (required for compiling Python contracts to WebAssembly)
# For Linux/macOS:
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
# Add to your .bashrc or .zshrc for permanent installation:
# echo 'source "/path/to/emsdk/emsdk_env.sh"' >> ~/.bashrc
cd ..

# For Windows:
# Download and extract: https://github.com/emscripten-core/emsdk
# Then in Command Prompt:
# cd emsdk
# emsdk install latest
# emsdk activate latest
# emsdk_env.bat

# Verify installation with:
emcc --version

# Install uv for Python package management
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install NEAR CLI-RS to deploy and interact with the contract
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh
``` -->

</TabItem>

</Tabs>

<hr class="subsection" />

### Testnet Account

There is no need to have a `testnet` account to follow this tutorial.

However, if you want to create one, you can do so through [a wallet](https://testnet.mynearwallet.com), and use it from the `near-cli` by invoking `near login`.

:::info Testnet tokens

Need some `testnet` tokens? Use the [faucet](../faucet.md) to top-up your account.

:::

---

## Creating the Contract

Create a smart contract by using one of the scaffolding tools and following their instructions:

<Tabs groupId="code-tabs">
<TabItem value="rust" label="🦀 Rust">

```bash
cargo near
```

![img](@site/static/assets/docs/smart-contracts/hello-near-rs.gif)
_Creating a project using `cargo near new`_

</TabItem>

  <TabItem value="js" label="🌐 JavaScript">


```bash
npx create-near-app@latest
```

![img](@site/static/assets/docs/smart-contracts/hello-near-ts.gif)
_Creating a project using `npx create-near-app@latest`_

:::important

When prompted to choose a template, select the basic `Auction` template to scaffold the auction contract

:::

</TabItem>

<TabItem value="py" label="🐍 Python">

:::note
Python quickstart tutorial is coming soon!

In the meantime, please check out the [hello-near](https://github.com/near-examples/hello-near-examples/tree/main/contract-py) example.
:::

<!-- ```bash
  npx create-near-app@latest
```

![img](@site/static/assets/docs/smart-contracts/hello-near-py.gif)
_Creating a project using `create-near-app`_

This will generate a project with the following structure:

```bash
auction
├── tests                # sandbox testing
│   └── test_mod.py
├── contract.py          # Main Python file
├── pyproject.toml       # Project configuration
├── README.md            # README
├── .git                 # Git repository
├── .gitignore           # Git ignore file
└── .python-version      # Python version file
```

:::important

Ensure you have [Emscripten](https://emscripten.org/) properly installed and available in your `PATH`. The compilation process requires it to convert Python code to WebAssembly.

::: -->

</TabItem>

</Tabs>

:::tip

For this tutorial we chose to name the project `auction`, but feel free to use any name you prefer

:::

---

## Project Structure

The scaffolding tools will generate a project with the following structure:

<Tabs groupId="code-tabs">
<TabItem value="rust" label="🦀 Rust">

```bash
auction
├── src        # contract's code
│   └── lib.rs
├── tests      # sandbox testing
│   └── test_basics.rs
├── Cargo.toml # package manager
├── Cargo.lock # package lock file
├── README.md
└── rust-toolchain.toml
```

</TabItem>

  <TabItem value="js" label="🌐 JavaScript">

```bash
auction
├── sandbox-test    # sandbox testing
│   └── main.ava.js
├── src             # contract's code
│   └── contract.ts
├── README.md
├── package.json    # package manager
└── tsconfig.json
```

</TabItem>

<TabItem value="py" label="🐍 Python">

:::note
Python quickstart tutorial is coming soon!

In the meantime, please check out the [hello-near](https://github.com/near-examples/hello-near-examples/tree/main/contract-py) example.
:::

<!-- ```bash
auction
├── tests                # sandbox testing
│   └── test_mod.py
├── contract.py          # Main Python file
├── pyproject.toml       # Project configuration
├── README.md            # README
├── .git                 # Git repository
├── .gitignore           # Git ignore file
└── .python-version      # Python version file
``` -->

</TabItem>

</Tabs>

---

## The Contract

The auction smart contract allows users to place bids, track the highest bidder and claim tokens at the end of the auction. 

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="lib.rs" language="rust"
            url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs"
            start="5" end="93" />
  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="index.js" language="js"
            url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts"
            start="9" end="72" />
  </TabItem>

  <TabItem value="py" label="🐍 Python">
    :::note
    Python quickstart tutorial is coming soon!

    In the meantime, please check out the [hello-near](https://github.com/near-examples/hello-near-examples/tree/main/contract-py) example.
    :::

    <!-- <Github fname="contract.py" language="python"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-py/contract.py"
            start="3" end="30" /> -->
  </TabItem>
</Tabs>

The most relevant functions of the contract are:
1. `init`: to initialize the contract with auction parameters
2. `bid`: to place a bid in the auction
3. `claim`: to claim tokens after the auction ends
4. `get_highest_bid`: to fetch the highest bid and bidder information

Besides these functions, the contract also exposes some methods to know when the auction will finish, and to check if the auction is still active

:::tip

After finishing this tutorial, check our [contract's anatomy](./anatomy/anatomy.md) page to learn more about the contract's structure

:::

---

## Test the Contract

Building and testing the contract is as simple as running the `test` command. The contract will be compiled and the tests will be executed.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

  ```bash
  cargo test
  ```

  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">

    ```bash
    npm run test
    ````

    <details>
    <summary> Failing tests? </summary>

    Make sure that you are using `node v24 / 22 / 20`, and that you have installed `Rosetta` if you have a Mac with Apple Silicon

    </details>

  </TabItem>
  
  <TabItem value="py" label="🐍 Python">

  :::note
  Python quickstart tutorial is coming soon!

  In the meantime, please check out the [hello-near](https://github.com/near-examples/hello-near-examples/tree/main/contract-py) example.
  :::

  <!-- ```bash
  uv run pytest
  ```

  :::tip

  If you have multiple test files and want to run only one of them just pass the path to the file as an command line argument:

  ```bash
  uv run pytest tests/test_mod.py
  ```

  ::: -->

  </TabItem>
</Tabs>

:::tip Sandbox Testing

These commands will execute the build tools for each language to compile the contract, and then deploy it within a [Sandbox](./testing/integration-test.md) to test it

Using a Sandbox allows you to see exactly how the contract will behave once deployed on NEAR, while giving you total control over the testing environment

:::

---

## Create a Testnet Account

Now that you know the contract is passing the tests, let's create a `testnet` account in which to deploy the contract.

```bash
# Replace <contract-acc.testnet> with a name for your contract account
near create-account <contract-acc.testnet> --useFaucet
```

<details>

<summary> Got an Error on Windows? </summary>

When working on `WSL` - or any other headless Linux environment - you might encounter issues when trying to create an account as the `cli` tries to save the keys into the system's keychain.

In such cases, you can try the following command to create the account:

```bash
near account create-account sponsor-by-faucet-service <your-account-id.testnet> autogenerate-new-keypair save-to-legacy-keychain network-config testnet create
```

</details>

:::tip

If you already have a `testnet` account and would like to use it instead, you can login into the `near-cli` with the command `near login`.

:::

---

## Build & Deploy the Contract

Now that we know that tests are passing and we have a `testnet` account created, we can proceed to deploy the contract. For that, we first need to compile the contract into WebAssembly:

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

  ```bash
  cargo near build
  ```
  
  :::info

  For this tutorial we will use the `non-reproducible-wasm` option when building the contract, but please know that you can create a reproducible build if you have `Docker` installed

  :::

  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">

  ```bash
  npm run build
  ```

  </TabItem>
  
  <TabItem value="py" label="🐍 Python">

  :::note
  Python quickstart tutorial is coming soon!

  In the meantime, please check out the [hello-near](https://github.com/near-examples/hello-near-examples/tree/main/contract-py) example.
  :::

  <!-- ```bash
  # Build with nearc through the uv executor (no installation needed)
  uvx nearc contract.py
  ```
  
  The above command will compile your Python contract into WebAssembly (WASM) that can be deployed to the NEAR blockchain.
  
  :::info
  
  The default `nearc` build configuration is appropriate for most contracts. You don't need to install nearc separately as we're using `uvx` to run it directly.
  
  :::

  :::important
  
  This step requires [Emscripten](https://emscripten.org/) to be installed and accessible in your `PATH`. If you encounter errors during compilation, verify that Emscripten is properly installed with `emcc --version`.
  
  Common compilation errors and solutions:
  - `emcc: command not found` - Emscripten is not in your PATH. Run `source /path/to/emsdk/emsdk_env.sh` to add it temporarily.
  - `error: invalid version of emscripten` - Your Emscripten version might be too old. Try updating with `./emsdk install latest && ./emsdk activate latest`.
  - `Could not find platform micropython-dev-wasm32` - This typically means the Emscripten installation is incomplete or not properly activated.
  
  ::: -->

  </TabItem>
</Tabs>

With the contract ready, we can now deploy it to the `testnet` account we created earlier:

<Tabs groupId="cli-tabs">
  <TabItem value="rust" label="🦀 Rust">
    ```bash
    near deploy <contract-acc.testnet> ./target/near/auction.wasm
    ```
  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">
    ```bash
    near deploy <contract-acc.testnet> ./build/auction.wasm
    ```
  </TabItem>
  
  <TabItem value="py" label="🐍 Python">
    :::note
    Python quickstart tutorial is coming soon!

    In the meantime, please check out the [hello-near](https://github.com/near-examples/hello-near-examples/tree/main/contract-py) example.
    :::

    <!-- <Tabs groupId="cli-tabs">
      <TabItem value="short" label="Short">

        ```bash
        near deploy <contract-acc.testnet> ./greeting_contract.wasm
        ```

      </TabItem>

      <TabItem value="full" label="Full">

        ```bash
        near contract deploy <contract-acc.testnet> use-file ./greeting_contract.wasm without-init-call network-config testnet sign-with-keychain send
        ```

      </TabItem>
    </Tabs> -->
  </TabItem>
</Tabs>

**Congrats!** Your contract now lives in the NEAR testnet network.

---

## Interacting with the Contract

To interact with your deployed smart contract, you can call its functions through the command line.

#### Initialize the Contract
Let's start by initializing the contract with the auction parameters. The `init` method sets up the auction with an end time and the auctioneer's account ID. It can be called only by contract's account itself.

```bash
FIVE_MINUTES_FROM_NOW=$(( $(date +%s%N) + 5 * 60 * 1000000000 ))
near call <contract-acc.testnet> init "{\"end_time\": \"$FIVE_MINUTES_FROM_NOW\", \"auctioneer\": \"influencer.testnet\"}" --useAccount <contract-acc.testnet>
```

:::note

In this case, we are calling the `init` function, passing as parameters that we want the auction to end 5 minutes from now, and that the auctioneer - i.e. the person that is doing the auction - is `influencer.testnet` (you can replace it with any valid `testnet` account)

To make the call we are using the account `<contract-acc.testnet>`, so in this case, we are using the contract's account to initialize itself

:::

<hr class="subsection" />

#### Place a Bid

We can now place a bid in the auction by calling the `bid` method while attaching some NEAR deposit. On each bid, the highest bid and bidder information will be recorded in the contract's [storage](./anatomy/storage.md).

```bash
# Create a new account to place the bid
near create-account <bidder-account.testnet> --useFaucet

# Place a bid of 0.01 NEAR
near call <contract-acc.testnet> bid '{}' --deposit 0.01  --useAccount <bidder-account.testnet>
```

:::note

Note how in this case we are using the `<bidder-account.testnet>` account (remember to rename it!) to call the `bid` function, while attaching a deposit of `0.01` NEAR as our bid

:::

<hr class="subsection" />

#### Get Highest Bid

The `get_highest_bid` function only reads from the contract's state, for which it does not require to create a transaction or sign anything

```bash
near view <contract-acc.testnet> get_highest_bid '{}'
```

<details>
  <summary> Expected Output </summary>

  ```json
  {
    "bidder": "<bidder-account.testnet>",
    "amount": "10000000000000000000000"
  }
  ```
</details>

:::tip

Feel free to create as many bidder accounts as you want and place more bids to see how the highest bid changes!

:::

<hr class="subsection" />

#### Claim

After the auction ends, anyone can call the `claim` method, which will transfer the `highest bid` amount to the auctioneer and end the auction.

```bash
near call <contract-acc.testnet> claim '{}' --useAccount <contract-acc.testnet>
```

:::info Who won?

After the auction ends, the highest bidder can be determined by simply calling the `get_highest_bid` method again

:::

---

## Moving Forward

<div class="row" style={{marginTop: '2rem', marginBottom: '2rem'}}>
  <div class="col col--6">
    <Card title="Create a Frontend" >
      Check the [action frontend tutorial](../tutorials/auction/2.1-frontend.md) to learn how to build a simple web app that interacts with the auction contract
    </Card>
  </div>
  <div class="col col--6">
    <Card title="Extend the Contract" >
      Follow the [auction NFT tutorial](../tutorials/auction/3.1-nft.md) to award the highest bidder a Non-Fungible Token (NFT) and allow users to bid using Fungible Tokens (FT) 
    </Card>
  </div>
</div>
<div class="row" style={{marginTop: '2rem', marginBottom: '2rem'}}>
  <div class="col col--6">
    <Card title="Learn More about the SDK" >
      Check our [Anatomy of a Contract](./anatomy/anatomy.md) page to understand the different components that make up a NEAR smart contract
    </Card>
  </div>
</div>

<MovingForwardSupportSection />

<br />

<details>

<summary> Versioning for this article </summary>

At the time of this writing, this example works with the following versions:

- node: `22.18.0`
- rustc: `1.86.0`
- near-cli-rs: `0.22.0`
- cargo-near: `0.16.1`
- Python: `3.13`
- near-sdk-py: `0.7.3`
- uvx nearc: `0.9.2`
- emscripten: `4.0.9` (required for Python contracts)

</details>