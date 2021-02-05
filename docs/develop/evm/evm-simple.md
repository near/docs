---
id: evm-simple
title: A simple EVM script and NEAR CLI interaction
sidebar_label: Simple EVM Script
---

### Contents:
1. The <a href="#evm-simple">`evm-simple` example</a>
2. Using <a href="#near-cli">NEAR CLI to interact</a> with an EVM contract

---

<h3 id="evm-simple">`evm-simple` example</h3>

The following example uses an existing smart contract deployed to the EVM on betanet, and makes simple read and write operations. Feel free to follow along <a href="https://github.com/near-examples/evm-simple" target="_blank">with this repository</a>. It uses two existing NEAR betanet accounts, so you don't have to create one. An upcoming section covers building and deploying a contract from Solidity and deploying from your own betanet account, but we'll keep it simple for now. For this `evm-simple` example, we'll interact with a version of the NEAR Pet Shop, which is a dApp based on the <a href="https://www.trufflesuite.com/tutorials/pet-shop" target="_blank">Truffle starter project</a>. In this application, there are two functions:

1. `getAdopters()` — returns an array of 16 Ethereum addresses corresponding to 16 pets that are either adopted or need to be adopted. For example, when a user adopts the first pet, we can expect the value returned from this function to have their Ethereum address as the first of 16 items in the array returned. If a pet has not been adopted, the <a href="https://ethereum.org/en/glossary/#zero-address" target="_blank">zero address</a> is used. This function is read-only.
2. `adopt(uint petId)` — this assigns the adoption of a pet to the Ethereum address that sent the transaction, mutating (modifying) state.

This project uses two npm packages: <a href="https://www.npmjs.com/package/web3-eth-contract" target="_blank">web3-eth-contract</a> and <a href="https://www.npmjs.com/package/near-web3-provider" target="_blank">near-web3-provider</a>. The former is a common dependency in the Web3 world, which plays nicely with the latter package described [in detail here](/docs/develop/evm/near-web3-provider).

The entire file is 42 lines and newcomer-friendly. In the below screenshot, the function `callEvm` is collapsed for readability. The last line of the file calls `start`, which will send two NEAR betanet account names to `callEvm`.

<a href="https://github.com/near-examples/evm-simple/blob/0bef42aab9f7386269a9a5c17860d37530fc42da/index.js#L4-L9" target="_blank"><img loading="lazy" src="/docs/assets/evm/evm-simple-callEvm-collapsed-1024x482.jpg" alt="EVM Simple example showing that mike.betanet and josh.betanet will be calling the same function back-to-back" width="1024" height="482" srcset="/docs/assets/evm/evm-simple-callEvm-collapsed-1024x482.jpg 1024w, /docs/assets/evm/evm-simple-callEvm-collapsed-300x141.jpg 300w, /docs/assets/evm/evm-simple-callEvm-collapsed-768x362.jpg 768w, /docs/assets/evm/evm-simple-callEvm-collapsed-1536x723.jpg 1536w, /docs/assets/evm/evm-simple-callEvm-collapsed-2048x964.jpg 2048w" sizes="(max-width: 1024px) 100vw, 1024px"></a>

✋ **Quick note**: all code screenshots on this page link to GitHub projects at the latest commit when this was written.

Now let's look at the expanded `callEvm` function and discuss the highlighted sections:

<a href="https://github.com/near-examples/evm-simple/blob/0bef42aab9f7386269a9a5c17860d37530fc42da/index.js#L11-L41" target="_blank"><img loading="lazy" src="/docs/assets/evm/evm-simple-with-sections-numbers-improved-1024x978.jpg" alt="The evm-simple example highlighting various sections" width="1024" height="978" srcset="/docs/assets/evm/evm-simple-with-sections-numbers-improved-1024x978.jpg 1024w, /docs/assets/evm/evm-simple-with-sections-numbers-improved-300x286.jpg 300w, /docs/assets/evm/evm-simple-with-sections-numbers-improved-768x733.jpg 768w, /docs/assets/evm/evm-simple-with-sections-numbers-improved-1536x1467.jpg 1536w, /docs/assets/evm/evm-simple-with-sections-numbers-improved-2048x1956.jpg 2048w" sizes="(max-width: 1024px) 100vw, 1024px"></a>

Breaking down each step:

1. Instantiate the `NearProvider` — passing it the:
    - `networkId` associated with the NEAR network you wish to interact with. (See a list of networks and reasonable defaults in NEAR Web3 Provider's <a href="https://github.com/near/near-web3-provider/blob/88a62702aea31bffa372ffc450cfb78ffb0b0082/src/network-config.js" target="_blank">`network-config.js` file</a>.)
    - For signed transactions, the `masterAccountId`, which is the name of the NEAR account on that network that'll be signing the transaction. If the provider only needs to read state, a `masterAccountId` should be omitted, adding `isReadOnly: true` instead. (We cover an example of this in the [Pet Shop documentation](/docs/develop/evm/near-pet-shop).) More on this <a href="/docs/develop/evm/near-web3-provider#instantiating-read-only" target="_blank">in the docs</a>.
    - `keyStore` for the location of the private key. As per the comment above that line of code, NEAR's library <a href="https://github.com/near/near-api-js" target="_blank">near-api-js</a> (used by the NEAR Web3 Provider) has different types of key stores. In this example there are keys located in the project's `private-keys` directory. For more information on that, please see the <a href="https://github.com/near-examples/evm-simple#private-keys" target="_blank">corresponding README</a>. (Note: in the [NEAR Pet Shop documentation](/docs/develop/evm/near-pet-shop), the front-end will use a different type of key store for the browser.)
2. Instantiate the smart contract and set the provider.
3. Derive the Ethereum address associated with the NEAR account. This uses a small helper function `nearAccountToEvmAddress` which simply takes 20 bytes of the hashed NEAR account name, <a href="https://github.com/near/near-web3-provider/blob/88a62702aea31bffa372ffc450cfb78ffb0b0082/src/utils.js#L298" target="_blank">shown here</a>.
4. Send a transaction using Web3 as one normally would. Here we're calling the function `adopt` from the derived Ethereum address, indicating to adopt the first pet, hence the `0` argument for that index in the array.
5. Call the contract's read-only function `getAdopters`. The provider instantiated in Step 1 can sign transactions as well as call read-only functions.

Finally, run this project following the instructions <a href="https://github.com/near-examples/evm-simple" target="_blank">in the README</a>. You'll see this simple NodeJS app setting the adopter of the first pet to be `mike.betanet`, show the list of adopted pets, then have `josh.betanet` adopt the first pet and show the results again.

<h3 id="near-cli">NEAR CLI commands</h3>

Let's show how to interact with the same contract from before using only your Terminal or Command Prompt.

NEAR CLI is a command-line interface tool written in JavaScript. It uses <a href="https://github.com/near/near-api-js" target="_blank">near-api-js</a> to make RPC calls, offer utility functions, and generally simplifies the experience of deploying and interacting with contracts and NEAR accounts. There's more information in the [documentation for this tool](/docs/tools/near-cli), but assuming you <a href="https://nodejs.org/en/download/package-manager/" target="_blank">have Node 12+</a> you may install it globally with:

    npm install -g near-cli

In the previous `evm-simple` example, there was an artifact for the Adoption contract. This was created when the contract was compiled, and lives in the directory `build/contracts`. It contains application binary interface (ABI) information necessary to call functions and handle their returned values, contract data, and other details including where this contract was deployed. Let's peek at the bottom of the artifact file, <a href="https://github.com/near-examples/evm-simple/blob/0bef42aab9f7386269a9a5c17860d37530fc42da/build/contracts/Adoption.json" target="_blank">Adoption.json</a>:

<a href="https://github.com/near-examples/evm-simple/blob/0bef42aab9f7386269a9a5c17860d37530fc42da/build/contracts/Adoption.json#L1193-L1200" target="_blank"><img loading="lazy" src="/docs/assets/evm/adoption-artifact-improved-1024x257.jpg" alt="Code snippet of the networks key showing where the Adoption smart contract has been deployed to: what chain id and what Ethereum address" width="1024" height="257" srcset="/docs/assets/evm/adoption-artifact-improved-1024x257.jpg 1024w, /docs/assets/evm/adoption-artifact-improved-300x75.jpg 300w, /docs/assets/evm/adoption-artifact-improved-768x193.jpg 768w, /docs/assets/evm/adoption-artifact-improved-1536x385.jpg 1536w, /docs/assets/evm/adoption-artifact-improved-2048x514.jpg 2048w" sizes="(max-width: 1024px) 100vw, 1024px"></a>

Two key things to note here:

1. The chain ID is `1313161554`. This has been registered for NEAR at <a href="https://chainid.network/" target="_blank">https://chainid.network</a> (Minor changes are currently needed to differentiate testnet and mainnet chain IDs.)
2. The `address` key contains the Ethereum address of the deployed Adoption contract: `0xAdf11a39283CEB00DEB90a5cE9220F89c6C27E67`

Let's use NEAR CLI to call the read-only function `getAdopters`:

    NEAR_ENV=betanet near evm-view evm 0xAdf11a39283CEB00DEB90a5cE9220F89c6C27E67 getAdopters '[]' --abi /path/to/build/contracts/Adoption.json --accountId mike.betanet

If this command were translated to English it would say,

"Hey NEAR CLI, use the command `evm-view` on the EVM contract deployed to the account `evm`, calling the Ethereum smart contract located at address `0xAdf…E67` giving empty parameters to the function `getAdopters`. And oh yeah, here's where you can find the artifact containing the ABI.”

After running the command you'll see something like this:

<img loading="lazy" src="/docs/assets/evm/Screen-Shot-2021-01-01-at-11.07.17-AM-1024x1016.png" alt="The result returned from calling the Adoption smart contract's getAdopters() function in Terminal" width="504" height="500" srcset="/docs/assets/evm/Screen-Shot-2021-01-01-at-11.07.17-AM-1024x1016.png 1024w, /docs/assets/evm/Screen-Shot-2021-01-01-at-11.07.17-AM-300x298.png 300w, /docs/assets/evm/Screen-Shot-2021-01-01-at-11.07.17-AM-150x150.png 150w, /docs/assets/evm/Screen-Shot-2021-01-01-at-11.07.17-AM-768x762.png 768w, /docs/assets/evm/Screen-Shot-2021-01-01-at-11.07.17-AM.png 1522w" sizes="(max-width: 504px) 100vw, 504px">

The item in the array contains the address `0x5d60a489b2f457cb351b0faabf5f9746d6bd4a8c`. This is the Ethereum address derived from the NEAR account `josh.betanet`, as demonstrated by a quick NodeJS <a href="https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop" target="_blank">REPL</a> trick:

<img loading="lazy" src="/docs/assets/evm/josh.betanet-eth-address-1024x442.jpg" alt="Use NodeJS's REPL, we show that josh.betanet is the Ethereum address of 0x5d60a489b2f457cb351b0faabf5f9746d6bd4a8c" width="813" height="351" srcset="/docs/assets/evm/josh.betanet-eth-address-1024x442.jpg 1024w, /docs/assets/evm/josh.betanet-eth-address-300x130.jpg 300w, /docs/assets/evm/josh.betanet-eth-address-768x332.jpg 768w, /docs/assets/evm/josh.betanet-eth-address-1536x663.jpg 1536w, /docs/assets/evm/josh.betanet-eth-address.jpg 1556w" sizes="(max-width: 813px) 100vw, 813px">

(A Quick reminder that Ethereum addresses are not case sensitive, so don't be confused by the two addresses ending in `…4A8C` vs. `…4a8c` as shown here. Capitalization is only used <a href="https://eips.ethereum.org/EIPS/eip-55" target="_blank">as a nifty checksum</a>, helping users make less mistakes.)

The second item in the array is all zeroes, meaning this "pet” hasn't been adopted yet, so let's use NEAR CLI to send a signed transaction from the NEAR account `mike.betanet` and manually adopt this pet without a web interface. We can do this because the private key to `mike.betanet` is a special, function-call access key, meaning NEAR tokens (Ⓝ) cannot be transferred, or the account deleted, etc.

    NEAR_ENV=betanet near evm-call evm 0xAdf11a39283CEB00DEB90a5cE9220F89c6C27E67 adopt '["1"]' --abi /path/to/build/contracts/Adoption.json --accountId mike.betanet

After running that command, we'll rerun the previous `evm-view` command for `getAdopters` to see the second item in the array has updated to the Ethereum address of `mike.betanet`:

<img loading="lazy" src="/docs/assets/evm/Screen-Shot-2021-01-01-at-2.57.49-PM-1024x318.png" alt="Screenshot showing output highlighting the second pet ID is now adopted by the Ethereum address for mike.betanet" width="1024" height="318" srcset="/docs/assets/evm/Screen-Shot-2021-01-01-at-2.57.49-PM-1024x318.png 1024w, /docs/assets/evm/Screen-Shot-2021-01-01-at-2.57.49-PM-300x93.png 300w, /docs/assets/evm/Screen-Shot-2021-01-01-at-2.57.49-PM-768x238.png 768w, /docs/assets/evm/Screen-Shot-2021-01-01-at-2.57.49-PM.png 1528w" sizes="(max-width: 1024px) 100vw, 1024px">

We've demonstrated how to access and mutate state using NEAR CLI. The three new commands added related to the EVM are:

1. [near evm-view](/docs/tools/near-cli#near-evm-view)
2. [near evm-call](/docs/tools/near-cli#near-evm-call)
3. [near evm-init-dev](/docs/tools/near-cli#near-evm-dev-init) — this is discussed in the [EVM testing section](/docs/develop/evm/evm-testing).
