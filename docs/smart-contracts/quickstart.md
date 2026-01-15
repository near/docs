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
  
  Check out [NEAR Playground](https://nearplay.app/) for an easy-to-use online IDE with pre-configured templates.

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

 ```bash
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
``` 

</TabItem>
<TabItem value="go" label="🐹 GO">

```bash
#For Linux arm/x64
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential curl wget git libssl-dev pkg-config checkinstall
sudo apt install bison

#For Mac
xcode-select --install
brew update
brew install mercurial
brew install binaryen

bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
gvm install go1.25.4 -B
gvm use go1.25.4 --default

curl -LO https://github.com/vlmoon99/near-cli-go/releases/latest/download/install.sh && bash install.sh

```
</TabItem>

</Tabs>

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

## The Contract

The auction smart contract allows users to place bids, track the highest bidder and claim tokens at the end of the auction. 

Do not worry about the code just yet — for now, it is enough to know that the most relevant function is `bid`, which allows users to place bids by attaching NEAR tokens:

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="lib.rs" language="rust"
            url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-rs/01-basic-auction/src/lib.rs"
            start="37" end="63" />
  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="index.js" language="js"
            url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-ts/01-basic-auction/src/contract.ts"
            start="23" end="43" />
  </TabItem>

  <TabItem value="py" label="🐍 Python">
    <Github fname="contract.py" language="python"
            url="https://github.com/near-examples/auctions-tutorial/blob/main/contract-py/01-basic-auction/contract.py"
            start="20" end="45" />
  </TabItem>
</Tabs>

Besides `bid`, the contract exposes methods to initialize the auction (`init`), query the highest bidder (`get_highest_bid`), and claim tokens once the auction ends (`claim`).

---

## Test the Contract

Lets make sure the contract is working as expected by running its tests. Simply run the `test` command, the contract will then be compiled and deployed to a local sandbox for testing:

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

  ```bash
  uv run pytest
  ```
  
  </TabItem>
</Tabs>

Feel free to check the test files to see how they interact with the contract. In short, a local NEAR sandbox is created, the contract is deployed, and different methods are called to verify the expected behavior.

---

## Build & Deploy the Contract

Now that we know the tests are passing, let us deploy the contract! First, we need to compile it into WebAssembly:

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">

  ```bash
  cargo near build non-reproducible-wasm
  ```
  
  </TabItem>

  <TabItem value="js" label="🌐 JavaScript">

  ```bash
  npm run build
  ```

  </TabItem>
  
  <TabItem value="py" label="🐍 Python">

   ```bash
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
  
  :::

  </TabItem>

  <TabItem value="go" label="🐹 GO">
    ```bash
    near-go build
    ```

    :::info Near Go SDK Build Process

    1. All code from the main package, including imports from other modules, is combined into a single **generated_build.go** file.
    2. The **generated_build.go** file is compiled into `wasm32-unknown-unknown` via **TinyGo**.

    :::

    :::info Customizing the Build
    
    The default `near-go build` command works for most standard projects, compiling source code from the current directory into `main.wasm`. 
    
    However, if you want to specify a custom output name or **inspect the intermediate glue code** (generated JSON serialization and SDK integration wrappers) for debugging purposes, you can use the available flags:

    ```bash
    near-go build --output my_contract.wasm --keep-generated
    ```
    :::

    </TabItem>

  </Tabs>

<hr class="subsection" />

### Create an Account

Let us now create a NEAR account where we will deploy the contract:

```bash
# Replace <contract-acc.testnet> with a name for your contract account
near create-account <contract-acc.testnet> --useFaucet
```

:::tip Already have a testnet account?

If you already have a `testnet` account and would like to use it instead, you can log in with the command `near login`.

:::

<details>

<summary> Got an error on Windows? </summary>

When working on `WSL` - or any other headless Linux environment - you might encounter issues when trying to create an account as the `cli` tries to save the keys into the system's keychain.

In such cases, you can try the following command to create the account:

```bash
near account create-account sponsor-by-faucet-service <your-account-id.testnet> autogenerate-new-keypair save-to-legacy-keychain network-config testnet create
```

</details>

<hr class="subsection" />

### Deploy it!

With the contract ready, we can now deploy it to the `testnet` account we created earlier:

<Tabs groupId="code-tabs">
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

    ```bash
    near deploy <created-account> ./auction.wasm
    ```

  </TabItem>
</Tabs>

**Congrats!** Your contract now lives in the NEAR testnet network.

---

## Interacting with the Contract

To interact with your deployed smart contract, you can call its functions through the command line.

#### Initialize the Contract
Let us initialize the auction by setting when it ends and who receives the funds (the auctioneer):

```bash
# Get a timestamp for 5 minutes from now (in nanoseconds)
FIVE_MINUTES_FROM_NOW=$(( $(date +%s%N) + 5 * 60 * 1000000000 ))

# Initialize the auction
near call <contract-acc.testnet> init "{\"end_time\": \"$FIVE_MINUTES_FROM_NOW\", \"auctioneer\": \"influencer.testnet\"}" --useAccount <contract-acc.testnet>
```

:::tip
Feel free to replace `influencer.testnet` with any valid testnet account — this is where the winning bid will be sent
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

The `get_highest_bid` function only reads from the contract state, so it does not require a transaction or signature:

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
      Check the [auction frontend tutorial](../tutorials/auction/2.1-frontend.md) to learn how to build a simple web app that interacts with the auction contract
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