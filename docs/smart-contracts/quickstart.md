---
id: quickstart
title: Hello Contract
sidebar_label: Quickstart ✨
---

import {Github} from '@site/src/components/codetabs';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MovingForwardSupportSection from '@site/src/components/MovingForwardSupportSection';

Welcome! [NEAR accounts](../protocol/account-model.md) can store small apps known as smart contracts. In this quick tutorial, we will guide you in creating your first contract on the NEAR **testnet**!

Join us in creating a friendly contract that stores a greeting, and exposes functions to interact with it.

---

## Prerequisites

Before starting, make sure to set up your development environment.

<details>
<summary>Working on Windows?</summary>

  See our blog post [getting started on NEAR using Windows](/blog/getting-started-on-windows) for a step-by-step guide on how to set up WSL and your environment

</details>

<Tabs groupId="code-tabs" queryString>
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

<TabItem value="py" label="🐍 Python">

```bash
# Install Python (if not already installed)
# Use your system's package manager or download from https://www.python.org/downloads/

# Install uv for Python package management
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install NEAR CLI-RS to deploy and interact with the contract
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/near/near-cli-rs/releases/latest/download/near-cli-rs-installer.sh | sh
```

</TabItem>
</Tabs>

:::note
Some `near-cli` commands have two versions - a **full** one and a **short** one. If you want to explore all options provided by `near-cli` use [the interactive mode](../tools/cli.md#interactive-mode).
:::

:::tip Testnet Account

There is no need to have a `testnet` account to follow this tutorial.

However, if you want to create one, you can do so through [a wallet](https://testnet.mynearwallet.com), and use it from the `near-cli` by invoking `near login`.

:::

---

## Creating the Contract

Create a smart contract by using one of the scaffolding tools and following their instructions:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">


```bash
  npx create-near-app@latest
```

![img](@site/static/docs/hello-near-ts.gif)
_Creating a project using `create-near-app`_

This will generate a project with the following structure:

```bash
hello-near
├── sandbox-test    # sandbox testing
│   └── main.ava.js
├── src             # contract's code
│   └── contract.ts
├── README.md
├── package.json    # package manager
└── tsconfig.json
```

:::tip

We recommend you to name your project `hello-near` for this tutorial, but feel free to use any name you prefer

:::

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```bash
  cargo near new hello-near
```

![img](@site/static/docs/hello-near-rs.gif)
_Creating a project using `cargo near new`_

This will generate a project with the following structure:

```bash
hello-near
├── src        # contract's code
│   └── lib.rs
├── tests      # sandbox testing
│   └── test_basics.rs
├── Cargo.toml # package manager
├── README.md
└── rust-toolchain.toml
```

:::tip

`hello-near` is the name we chose for this project so the tutorial is simpler to follow, but for future projects feel free to use any name you prefer

:::

</TabItem>

<TabItem value="py" label="🐍 Python">

Create a new project using `uv init`:

```bash
uv init hello-near
cd hello-near
```

This creates a Python project with the following structure:

```bash
hello-near
├── .git                 # Git repository
├── .gitignore           # Git ignore file
├── .python-version      # Python version file
├── README.md            # README
├── main.py              # Main Python file
└── pyproject.toml       # Project configuration
```

Now, add the NEAR SDK to your project:

```bash
uv add near-sdk-py
```

:::tip

`hello-near` is the name we chose for this project so the tutorial is simpler to follow, but for future projects feel free to use any name you prefer

:::

</TabItem>
</Tabs>


---

## The Contract

The `Hello World` smart contract stores a greeting in its state, and exposes two functions to interact with it:
1. `set_greeting`: to change the greeting
2. `get_greeting`: to fetch the greeting

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

    <Github fname="index.js" language="js"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/src/contract.ts"
            start="4" end="22" />

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

    <Github fname="lib.rs" language="rust"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-rs/src/lib.rs"
            start="4" end="32" />

  </TabItem>

  <TabItem value="py" label="🐍 Python">

```python
from near_sdk_py import Contract, view, call, init

class GreetingContract(Contract):
    """
    A simple greeting contract that stores and returns a message.
    """
    
    @init
    def initialize(self, default_message="Hello, NEAR world!"):
        """
        Initialize the contract with a default greeting message.
        """
        self.storage["greeting"] = default_message
        return {"success": True}
    
    @call
    def set_greeting(self, message: str):
        """
        Change the greeting message.
        """
        self.storage["greeting"] = message
        self.log_info(f"Saving greeting: {message}")
        return {"success": True}
    
    @view
    def get_greeting(self):
        """
        Retrieve the current greeting message.
        """
        return self.storage.get("greeting", "Hello, NEAR world!")
```

  </TabItem>
</Tabs>

:::tip

After finishing this tutorial, check our [contract's anatomy](./anatomy/anatomy.md) page to learn more about the contract's structure

:::

---

## Test the Contract

Building and testing the contract is as simple as running the `test` command. The contract will be compiled and the tests will be executed.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

    ```bash
    npm run test
    ````

    <details>
    <summary> Failing tests? </summary>

    Make sure that you are using `node v18`, `v20` or `v22` - you can manage multiple versions using `nvm` - and that you have `Rosetta` installed on MacOS if you have an Apple Silicon processor.

    </details>

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

  ```bash
  cargo test
  ```

  </TabItem>
  
  <TabItem value="py" label="🐍 Python">

  Create a test file for your contract:

  ```bash
  # Create a tests directory
  mkdir tests
  touch tests/test_greeting.py
  ```

  Add the following content to `tests/test_greeting.py`:

  ```python
  from near_pytest.testing import NearTestCase
  import json

  class TestGreetingContract(NearTestCase):
      @classmethod
      def setup_class(cls):
          """Compile and deploy the greeting contract."""
          super().setup_class()
          
          # Compile the contract
          wasm_path = cls.compile_contract(
              "greeting_contract.py", 
              single_file=True
          )
          
          # Deploy the contract
          cls.contract_account = cls.create_account("contract")
          cls.instance = cls.deploy_contract(cls.contract_account, wasm_path)
          
          # Initialize the contract
          cls.instance.call_as(
              account=cls.contract_account,
              method_name="initialize",
              args={"default_message": "Initial greeting"},
          )
          
          # Create test user
          cls.user = cls.create_account("user")
          
          # Save state for future resets
          cls.save_state()
      
      def setup_method(self):
          """Reset state before each test method."""
          self.reset_state()
          
      def test_greeting(self):
          # Set greeting as user
          result = self.instance.call_as(
              account=self.user,
              method_name="set_greeting",
              args={"message": "Hello from test!"}
          )
          result = json.loads(result)
          assert result["success"] == True
          
          # Get greeting
          greeting = self.instance.call_as(
              account=self.user,
              method_name="get_greeting"
          )
          assert greeting == "Hello from test!"
  ```

  Run the test:

  ```bash
  # Add near-pytest to your project
  uv add near-pytest
  
  # Run the test
  uv run pytest tests/test_greeting.py -v
  ```

  </TabItem>
</Tabs>

In the background, these commands are calling the build tools for each language and using a [Sandbox](./testing/integration-test.md) to test the contract.

:::tip Sandbox

Testing the contracts within a Sandbox allows you to understand how the contract will behave once deployed to the network while having total control over the testing environment.

:::

---

## Create a Testnet Account

Now that you know the contract is passing the tests, let's create a `testnet` account in which to deploy the contract. [`near-cli`](../tools/cli.md) supports two versions of some commands - full and short one. It's up to you which format you prefer, but full version provides more features.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

    ```bash
    # Replace <your-account-id.testnet> with a custom name
    near create-account <your-account-id.testnet> --useFaucet
    ```

    <details>
    <summary> Example Result </summary>

    ```bash
    $> near create-account lovely-event.testnet --useFaucet
    # New account "lovely-event.testnet" created successfully
    ```

    </details>
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    # Replace <your-account-id.testnet> with a custom name
    near account create-account sponsor-by-faucet-service <your-account-id.testnet> autogenerate-new-keypair save-to-keychain network-config testnet create
    ````

    <details>
    <summary> Example Result </summary>

    ```bash
    $> near account create-account sponsor-by-faucet-service lovely-event.testnet autogenerate-new-keypair save-to-keychain network-config testnet create

    # New account "lovely-event.testnet" created successfully
    ```

    </details>

  </TabItem>

</Tabs>


:::tip

Remember that you can create a named account through any wallet (i.e. [MyNearWallet](https://testnet.mynearwallet.com)) and then use it from the `near-cli` by invoking `near login`.

:::

:::warning

When running the near account create-account command in a headless Linux environment (e.g., WSL), the `save-to-keychain` option may fail due to platform limitations. Use `save-to-legacy-keychain` instead of `save-to-keychain` to ensure compatibility.

:::


---

## Build the Contract

When you are ready to create a build of the contract run a one-line command depending on your environment.

<Tabs groupId="cli-tabs">
  <TabItem value="js" label="🌐 JavaScript">

  ```bash
  npm run build
  ```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

  ```bash
  cargo near build
  ```

  
  :::info

  For this tutorial we will use the `non-reproducible-wasm` option when building the contract, but please know that you can create a reproducible build if you have `Docker` installed

  :::

  </TabItem>
  
  <TabItem value="py" label="🐍 Python">

  ```bash
  # Build with nearc through the uv executor (no installation needed)
  uvx nearc build greeting_contract.py -o greeting_contract.wasm
  ```
  
  The above command will compile your Python contract into WebAssembly (WASM) that can be deployed to the NEAR blockchain.
  
  :::info
  
  The default nearc build configuration is appropriate for most contracts. You don't need to install nearc separately as we're using `uvx` to run it directly.
  
  :::

  </TabItem>
</Tabs>

---

## Deploy the Contract

Having our account created, we can now deploy the contract:

<Tabs groupId="cli-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Tabs groupId="cli-tabs">
      <TabItem value="short" label="Short">

        ```bash
        near deploy <created-account> ./build/hello_near.wasm
        ```

      </TabItem>
      <TabItem value="full" label="Full">

        ```bash
        near contract deploy <created-account> use-file ./build/hello_near.wasm without-init-call network-config testnet sign-with-keychain send
        ```

      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

    <Tabs groupId="cli-tabs">
      <TabItem value="short" label="Short">

        ```bash
        near deploy <created-account> ./target/near/hello_near.wasm
        ```

      </TabItem>

      <TabItem value="full" label="Full">

        ```bash
        near contract deploy <created-account> use-file ./target/near/hello_near.wasm without-init-call network-config testnet sign-with-keychain send
        ```

      </TabItem>
    </Tabs>
  </TabItem>
  
  <TabItem value="py" label="🐍 Python">
    <Tabs groupId="cli-tabs">
      <TabItem value="short" label="Short">

        ```bash
        near deploy <created-account> ./greeting_contract.wasm
        ```

      </TabItem>

      <TabItem value="full" label="Full">

        ```bash
        near contract deploy <created-account> use-file ./greeting_contract.wasm without-init-call network-config testnet sign-with-keychain send
        ```

      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

**Congrats**! Your contract now lives in the NEAR testnet network.

---

## Initializing the Contract

After deploying, you'll need to initialize the contract:

<Tabs groupId="cli-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Tabs groupId="cli-tabs">
      <TabItem value="short" label="Short">

        ```bash
        near call <created-account> new '{}' --accountId <created-account>
        ```

      </TabItem>
      <TabItem value="full" label="Full">

        ```bash
        near contract call-function as-transaction <created-account> new json-args '{}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <created-account> network-config testnet sign-with-keychain send
        ```

      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

    <Tabs groupId="cli-tabs">
      <TabItem value="short" label="Short">

        ```bash
        near call <created-account> new '{}' --accountId <created-account>
        ```

      </TabItem>

      <TabItem value="full" label="Full">

        ```bash
        near contract call-function as-transaction <created-account> new json-args '{}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <created-account> network-config testnet sign-with-keychain send
        ```

      </TabItem>
    </Tabs>
  </TabItem>
  
  <TabItem value="py" label="🐍 Python">
    <Tabs groupId="cli-tabs">
      <TabItem value="short" label="Short">

        ```bash
        near call <created-account> initialize '{"default_message":"Hello, NEAR world!"}' --accountId <created-account>
        ```

      </TabItem>

      <TabItem value="full" label="Full">

        ```bash
        near contract call-function as-transaction <created-account> initialize json-args '{"default_message":"Hello, NEAR world!"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <created-account> network-config testnet sign-with-keychain send
        ```

      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

## Interacting with the Contract

To interact with your deployed smart contract, you can call its functions through the command line.

<hr class="subsection" />

#### Get Greeting
Let's start by fetching the greeting stored in the contract. The `get_greeting` function only reads from the contract's state, and can thus be called for **free**.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

    ```bash
    > near view <created-account> get_greeting
    # "Hello, NEAR world!"
    ```
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    > near contract call-function as-read-only <created-account> get_greeting json-args {} network-config testnet now
    # "Hello, NEAR world!"
    ```
  </TabItem>
</Tabs>

<hr class="subsection" />

#### Set Greeting

We can now change the greeting stored in the contract. The `set_greeting` method writes on the contract's [storage](./anatomy/storage.md), and thus requires a user to sign a transaction in order to be executed.

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Short">

  ```bash
  > near call <created-account> set_greeting '{"message": "Hola"}' --accountId <created-account>
  # {"success": true}
  ```
  </TabItem>

  <TabItem value="full" label="Full">

    ```bash
    > near contract call-function as-transaction <created-account> set_greeting json-args '{"message": "Hola"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <created-account> network-config testnet sign-with-keychain send
    # {"success": true}
    ```
  </TabItem>
</Tabs>

:::tip

Notice that we are signing the transaction using `<created-account>`, so in this case, we are asking the contract's account to call its own function

:::


---

## Moving Forward

That's it for the quickstart tutorial. You have now seen a fully functional contract with a minimal user interface and testing.

To better understand the contract's structure, check our [contract's anatomy](./anatomy/anatomy.md) page.

If you prefer to see more examples, check our [examples](/tutorials/examples/count-near) page.

<MovingForwardSupportSection />

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- node: `20.18.0`
- rustc: `1.81.0`
- near-cli-rs: `0.17.0`
- cargo-near: `0.13.2`
- Python: `3.11`
- near-sdk-py: `0.4.1`
- uvx nearc: `0.1.0`

:::