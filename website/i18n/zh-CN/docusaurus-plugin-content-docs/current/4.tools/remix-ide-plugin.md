---
id: remix-ide-plugin
sidebar_label: Remix IDE Plugin
---

# Remix IDE Plugin Integration

This tutorial details how to deploy and run NEAR smart contract on Remix IDE. It is a no-setup tool with a GUI for developing NEAR smart contract. It is a no-setup tool with a GUI for developing NEAR smart contract.

![remix-plugin](/docs/assets/remix-ide-plugin/remix-ide.png?raw=true "remix-plugin")

## Connect to Remix IDE

[WELLDONE Code](https://docs.welldonestudio.io/code) is the official Remix IDE Plug-in. Please visit the [Remix IDE](https://remix.ethereum.org/) and follow the guide below. Please visit the [Remix IDE](https://remix.ethereum.org/) and follow the guide below.

Click **Plugin Manager** button in the left bar and search for **CODE BY WELLDONE STUDIO** and click the Activate button.

<img src={require('/docs/assets/remix-ide-plugin/plugin-manager.png').default} alt='plugin-manager' style={{width: '500px', marginRight: '10px', display: 'inline'}} />

<img src={require('/docs/assets/remix-ide-plugin/activate-plugin.png').default} alt='active-plugin' style={{width: '300px', display: 'inline'}} />

## Select a Chain

Click on NEAR(NVM) in the list of chains.

If you click the `Documentation` button, go to WELL DONE Docs, and if you find a problem or have any questions while using it, click the `Make an issue` button to go to the [Github Repository](https://github.com/welldonestudio/welldonestudio.github.io) and feel free to create an issue.

<img src={require('/docs/assets/remix-ide-plugin/select-chain.png').default} alt='select-chain' style={{width: '318px'}} />

## Install a browser extension wallet

:::info 
Other wallets will be supported soon, and WELLDONE Wallet can be used now.
:::
:::

After choosing a chain, click the `Connect to WELLDONE` button to connect to the **WELLDONE Wallet.**

If you haven't installed the WELLDONE Wallet yet, please follow the following [manual](https://docs.welldonestudio.io/wallet/manual/) to install and create a wallet and create an account for the selected chain. Finally, go into the Setting tab of your wallet and activate Developer Mode. Finally, go into the Setting tab of your wallet and activate Developer Mode.

<img src={require('/docs/assets/remix-ide-plugin/wallet-developer-mode.png').default} alt='wallet-developer-mode' style={{width: '318px', marginBottom: '10px'}} />

And you must click the Refresh button in the upper right corner of the plug-in to apply changes to your wallet.

## Create the Project

In NEAR, you can write smart contracts with Rust, JavaScript, and TypeScript. In NEAR, you can write smart contracts with Rust, JavaScript, and TypeScript. Because the structure of the contract is different in each language, **WELLDONE Code** provides two features to help developers new to NEAR.

### Select a Template

Create a simple example contract code written in Rust, JavaScript, and TypeScript. Create a simple example contract code written in Rust, JavaScript, and TypeScript. You can create a sample contract by selecting the template option and clicking the `Create` button. More templates may be found at [NEAR Samples](https://github.com/near-examples/). More templates may be found at [NEAR Samples](https://github.com/near-examples/).

<img src={require('/docs/assets/remix-ide-plugin/template-code-near.png').default} alt='template-code-near' style={{width: '318px'}} />

### New Project

Automatically generate a contract structure based on the smart contract language you want to use. Automatically generate a contract structure based on the smart contract language you want to use. Select the language option, write a name for the project, and click the `Create` button to create a contract structure that is appropriate for the language.

<img src={require('/docs/assets/remix-ide-plugin/new-project-near.png').default} alt='new-project-near' style={{width: '318px'}} />

:::info
You can create your own contract projects without using the features above. However, for the remix plugin to build and deploy the contract, it must be built within the directory `near/`. If you start a new project, the structure should look like the following. ::: However, for the remix plugin to build and deploy the contract, it must be built within the directory `near/`. If you start a new project, the structure should look like the following.
:::

#### 1. 1. Writing Contracts in Rust
  ```
  near
  └── <YOUR_PROJECT_NAME>
      ├── Cargo.toml
      └── src
          └── lib.rs
  ```

#### 2. 2. Writing Contracts in TypeScript
  ```
  near
  └── <YOUR_PROJECT_NAME>
      ├── package.json
      ├── babel.config.json
      ├── tsconfig.json
      └── src
        └── contract.ts
  ```

#### 3. 3. Writing Contracts in JavaScript
  ```
  near
  └── <YOUR_PROJECT_NAME>
      ├── package.json
      ├── babel.config.json
      └── src
        └── contract.js
  ```

## Compile the Contract

:::info
Six compilation options are now available in WELLDONE Code: `Rust`, `CARGO-NEAR`, `EMBED-ABI`, `JavaScript`, and `TypeScript`.

We now only support the AMD compilation server, however, we will shortly add support for the ARM compilation server.
:::
:::

**Step 1**: Select the project you want to compile in the **TARGET PROJECT** section.

**Step 2**: Select a compilation option and click the `Compile` button.

**Step 3**: When the compilation is complete, a wasm file is returned.

<img src={require('/docs/assets/remix-ide-plugin/project-compile.png').default} alt='project-compile' style={{width: '318px'}} />

:::note
You can check the returned wasm file in `near/<YOUR_PROJECT_NAME>/out` directory.

If you need to revise the contract and compile again, delete the `out` directory and click the compile button.
:::
:::

### 1. 1. Rust Compile

Using the `cargo build` command to compile a smart contract written in Rust. Although it offers a stable compile, it is inconvenient to enter the method's parameters directly when executing the contract. Although it offers a stable compile, it is inconvenient to enter the method's parameters directly when executing the contract.

### 2. 2. CARGO-NEAR Compile (for Rust) - `Experimental`

Compile using `cargo near` which is officially being developed by NEAR. If Compile is successful, an executable wasm binary file and a json file containing the ABI of the contract are created together. Compile using `cargo near` which is officially being developed by NEAR. If Compile is successful, an executable wasm binary file and a json file containing the ABI of the contract are created together. If you have deployed and imported a compiled contract using `cargo-near`, you can find out the parameter type of the method, making it easier to run the contract.

However, because this feature is still under development, the `near-sdk-rs` version must be specified at **4.1.0** or higher in the `Cargo.toml` file, and unexpected issues may occur during compilation. Please check out the NEAR's [repository](https://github.com/near/abi) for more detail. Please check out the NEAR's [repository](https://github.com/near/abi) for more detail.

### 3. 3. EMBED-ABI Compile (for Rust) - `Experimental`

When using `-embed-abi` option in `cargo-near`, generates a wasm file containing ABI inside. For contracts that have deployed the wasm file compiling with this option, you can get ABI information even when importing the contract through `At Address` button. See the [cargo-near](https://github.com/near/cargo-near) repository for a detailed description of the options. For contracts that have deployed the wasm file compiling with this option, you can get ABI information even when importing the contract through `At Address` button. See the [cargo-near](https://github.com/near/cargo-near) repository for a detailed description of the options.

### 4. 4. JavaScript & TypeScript Compile

Using [`near-sdk-js`](https://github.com/near/near-sdk-js) to compile a smart contract written in JavaScript or TypeScript.

:::note
If you are using JavaScript or TypeScript compile options, you must write the name of the contract file you want to compile as follows to ensure that the compilation runs without error.
- JavaScript: `contract.js`
- TypeScript: `contract.ts`
:::

## Deploy the Contract

:::tip
The WELLDONE Wallet automatically finds and imports networks associated with your wallet address. As a result, before deploying, you should choose whether you want to send a transaction to mainnet or testnet. ::: As a result, before deploying, you should choose whether you want to send a transaction to mainnet or testnet.
:::

**Step 1**: If you have a compiled contract code, then `Deploy` button will be activated.

**Step 2**: Enter the Account ID for which you want to deployed the contract and click the `Deploy` button. If you want to add `init function`, click `Deploy Option` to add the method name and arguments. If you want to add `init function`, click `Deploy Option` to add the method name and arguments.

<img src={require('/docs/assets/remix-ide-plugin/deploy-option-near.png').default} alt='deploy-option-near' style={{width: '318px'}} />

**Step 3**: If the AccountId already has a deployed contract, confirm once more.

**Step 4**: Click the `Send Tx` button in the **WELLDONE Wallet** to sign the transaction.

<img src={require('/docs/assets/remix-ide-plugin/deploy-near.png').default} alt='deploy-near' style={{width: '500px'}} />

**Step 5**: A transaction success log will be printed to the terminal and the contract can be executed if contract deployment is successful.

<img src={require('/docs/assets/remix-ide-plugin/deployed-contract-near.png').default} alt='deployed-contract-near' style={{width: '318px'}} />

## Execute the Contract

:::info
There are two ways to import contracts.

1. Automatically import contracts deployed through the above process.
2. Import existing deployed contracts through `At Address` button.

:::

**Step 1**: Select the method to run.

**Step 2**: Add parameters as you needed.

**Step 3**: In the case of the `Call` function, You can specify the number of NEAR tokens to attach to a function call and the GAS LIMIT.

**Step 4**: Run the method via clicking `View` or `Call` button. **Step 4**: Run the method via clicking `View` or `Call` button. If you are sending a transaction, you must sign the transaction by clicking the `Send Tx` button in the **WELLDONE Wallet**.

<img src={require('/docs/assets/remix-ide-plugin/function-call.png').default} alt='function-call' style={{width: '318px'}} />


:::info
If you deployed the compiled contract using `CARGO-NEAR` or `EMBED-ABI` options, you can execute the contract more easily using the ABI without directly entering the parameters of the method.
:::
:::

<img src={require('/docs/assets/remix-ide-plugin/cargo-near.png').default} alt='cargo-near' style={{width: '250px', display: 'inline-block'}} />
<img src={require('/docs/assets/remix-ide-plugin/cargo-near1.png').default} alt='cargo-near1' style={{width: '250px', display: 'inline-block'}} />
<img src={require('/docs/assets/remix-ide-plugin/cargo-near2.png').default} alt='cargo-near2' style={{width: '250px', display: 'inline-block'}} />