---
id: staking
title: Running a Validator Node
sidebar_label: Running the Node
---

## Setting up a Validator on BetaNet

Validators have the opportunity to maintain the state of the blockchain and earn rewards. There are two types of validator setups:

1. A Contract Validator (requirment for StakeWars)
2. A Direct Staked Validator

Staking is currently enabled on *BetaNet* and you will use these BetaNet services to assit with setting and monitoring your validator:

|             ⛔️ TestNet             |             ✅ BetaNet             |
| :-------------------------------: | :-------------------------------: |
| https://explorer.testnet.near.org | https://explorer.betanet.near.org |
|  https://wallet.testnet.near.org  |  https://wallet.betanet.near.org  |
|   https://rpc.testnet.near.org    |   https://rpc.betanet.near.org    |


<blockquote class="warning">
  <strong>HEADS UP: BetaNet resets every Tuesday at 00:00 GMT</strong><br/><br/>

  A new version of BetaNet is released each Tuesday to deploy new features and fixes. Depending on your setup you will need to rebuild/restart your node to trigger the update and avoid losing your status as a validator.
Join NEAR Protocol validator channel on [Telegram](https://t.me/near_validators) or [Discord](https://discord.gg/ZMPr3VB) to get updates on when a new node version is deployed, and when you can safely rebuild/restart your node.
</blockquote>

## What will be covered
1. [Node requirements](#node-requirements)
2. [Setting up your environment](#setting-up-your-environment)
3. [Setup BetaNet Accounts](#setup-betanet-accounts)
4. [Install Near-Shell](#now-install-near-shell)
5. [Setting up a Node or Validator](#setting-up-a-node-or-validator)
6. [Staking to Validators](#staking-to-validators)
7. [How to be selected as a Validator](#how-to-be-selected-as-a-validator)
8. [Monitoring your validator](#how-to-be-selected-as-a-validator)
9. [Automatic re-staking](#automatic-re-staking)

## Node requirements

To become a validator, you need a node running on your machine or cloud provider with the following minimum spec:

```bash
At least 2 CPUs
At least 4GB RAM
At least 100 GB free disk
```

## Setting up your environment

To use the BetaNet network you need to update the environment via the command line.

1. Open a command prompt and run
```bash
  export NODE_ENV=betanet
```
2. Add (`export NODE_ENV=betanet`) to the end of the `~/.bashrc` file to ensure it persists system restarts.
```bash
    echo 'export NODE_ENV=betanet' >> ~/.bashrc 
```

### You will need:
1. Latest version of NEAR Shell
2. Node Version; 12.x
3. An account with tokens on **BetaNet**

## Setup BetaNet Accounts
### Master Account
This is your main account you will use to create sub accounts when needed.
1. Set up an account on [BetaNet](https://wallet.betanet.near.org)
2. You can follow the [Create Account](../local-setup/create-account.md) instructions and come right back. 
3. **Important: be sure to create a backup of your Seed Recovery Phrase.** 
4. Remember to use the [BetaNet wallet](https://wallet.betanet.near.org)!
### Sub Accounts (recommended for validators)
If you plan to setup a contract validator you will need to create a seperate account to run the contract.
#### Create a sub account (recommended for validators)
1. Once your master account is created you can use it to create additonal accounts.
2. Make the name of the new account something memorable (you will give this to delegators to stake)
3. You can learn more about contracts in [Initial-Contracts](https://github.com/near/initial-contracts/tree/master/staking-pool#staking--delegation-contract)
  ```bash
  near create_account <your contract name> --masterAccount=<your master account>
  ```

## Install Near-Shell
Near-Shell does not need to be installed on the same machine as the validator. It is recommended to be installed on a separate machine for increased security, however it can be installed on the same machine.

### What you will need
1. Node Version 12.x [node.js](https://nodejs.org/en/download/)
2. [npm](https://www.npmjs.com/get-npm). 

### Check to see if Node.js and npm are installed

  1. Open a command prompt
  2. Display Node version - If not version 12.x upgrade [node.js](https://nodejs.org/en/download/)
  ```bash
  node -v
  ```
  3. Display npm version - If nothing is returned install [npm](https://www.npmjs.com/get-npm)
  ```bash
  npm -v
  ```
### Now Install Near-Shell
  1. Open a command prompt
  ```bash
  npm i -g near-shell
  ```
## Setting up a Node or Validator

A NEAR node is operated by Nearup can be setup several ways depending on the needs of the network and yours. There are three types of setups with two ways to run Nearup.

### Node Types
1. Basic Node (non-validating)
2. Self Staking Validator
3. Contract Based Validator (required for StakeWars)

### Nearup configurations
1. Official Compiled Binary (Immediate updates by simply restarting)
2. Locally Compiled Binary  (with --binary-path parameter recommended for validators)
  - Removes the executable dependancy and allows validators to receive updates on their schedule.
  - Git branch for betanet: `beta`, Git branch for testnet: `stable`
    - Both branches should be comiled with `make release`

### Operating Systems
A NEAR node can be setup on Linux, Mac, Windows Subsystem or Docker. To get started quickly Ubuntu is recommended.
Learn more by visiting the [Nearup documentation](https://github.com/near/nearup).

### Installing Nearup

### 1. Ubuntu
<details>
    <summary>Click to expand</summary>
    
##### Update System

  ```bash
  sudo apt update
  ```
  
##### Install Python, Git and Curl

  ```bash
  sudo apt install python3 git curl
  ```
  
##### Install Nearup

  ```bash
  curl --proto '=https' --tlsv1.2 -sSfL https://up.near.dev | python3
  ```
  
##### Add Nearup to path

  ```bash
  source ~/.profile
  ```
</details>

### 2. macOS Setup

**Important: Running a Validator on a MacBook or other laptops is not recommended, and should only be used for local testing.**

<details>
    <summary>Click to expand</summary>
    
#### Install Xcode
    
  ```bash
  xcode-select --install
  ```
  
#### Install Nearup

If you receive an alert to install or update Xcode. Follow the steps and try again.

  ```bash
  curl --proto '=https' --tlsv1.2 -sSfL https://up.near.dev | python3
  ```  
#### Add Nearup to path

  ```bash
  source ~/.profile
  ```
</details>

### 3. Docker Setup
**Important: you need [Docker](https://docs.docker.com/get-docker/) installed first.**
<details>
    <summary>Click to expand</summary>
    
#### Update system

  ```bash
  sudo apt update
 ```
#### Install Docker

  ```bash
  sudo apt install docker.io
 ```
#### Add user to docker group

  ```bash
  sudo usermod -aG docker `whoami`
  ```
#### Close the shell and open a new one so the group changes take effect.
  
#### Install Python, Git and Curl

  ```bash
  sudo apt install python3 git curl
  ```
#### Install Nearup

  ```bash
  curl --proto '=https' --tlsv1.2 -sSfL https://up.near.dev | python3
  ```
  
#### Add Nearup to path

  ```bash
  source ~/.profile
  ```
</details>

### Compile NearCore & Nearup
If you plan to be a validator and participate in StakeWars, follow these steps to compile the Nearup executbile.

##### Install needed libraries
  ```bash
  sudo apt install clang
  ```
##### Install Rust
  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  
  source $HOME/.cargo/env
  ```
##### Download NearCore with Git
  ```bash
  git clone https://github.com/nearprotocol/nearcore.git
  cd nearcore
  git checkout beta
  git branch
  ```
##### Compile NearCore (This will take some time ~30min+)
  ```bash
  make release

  curl --proto '=https' --tlsv1.2 -sSfL https://up.near.dev | python3

  source $HOME/.nearup/env
  ```
#### Start a Node

  1. Start the official compiled binary
  ```bash
  # If running Docker you do not need the --nodocker parameter
  nearup betanet --nodocker
  ```
  2. Start the compiled binary (recommended for validators)
  ```bash
  # If running Docker you do not need the --nodocker parameter, the binary-path is your location to nearcore
  nearup betanet --nodocker --binary-path ~/nearcore/target/release
  ```
  3. **Important when asked for the validator account id**
  - Validators: Set it to the contract account.
  - Non-Validators: Set it to the Master account.
  - Several public keys (validator, stake, node) will be returned, copy them as you will need them later. They will look similar to:
    ```bash
    Stake for user 'thefutureisnear.test' with 'ed25519:97JLghrxUQMaX2pcerVB5FNFu4qk8rx8J3fnWRyoEB7M'
    ```
    Make sure you copy this validator\_key as you will need it for the next step. You can also find this public key at the following     path in your near files `~/.near/betanet/validator_key.json`

<blockquote class="warning">
    <strong>Fully sync your node before staking</strong><br><br>
     An out of sync node cannot produce or validate blocks, so you risk being kicked from the validator pool and losing rewards by joining before your node has fully downloaded the headers.
</blockquote>

## Staking to Validators
There are two ways to setup your validator for staking
1. Staking via a contract, see: [Initial-Contracts](https://github.com/near/initial-contracts/tree/master/staking-pool#staking--delegation-contract)
2. Staking directly to the validator

   **Important: this option is for debugging or running a localnet, using `near stake` will not work on BetaNet moving forward**

### Login

#### Things to know
1. You will need to be logged into your wallet in the browser [BetaNet wallet](https://wallet.betanet.near.org)
2. If you are not logged in you will need to restore your wallet with the secret recovery phrase.

```bash
near login
```
#### Authorize Near-Shell
1. Upon calling `near login` a browser may automatically open asking you to authorize the shell. 
2. If a browser does not open you can copy the the link and paste it in the browser.
3. Folow the prompts in the browser.

Once done, enter that account ID in the shell:

```bash
Please enter the accountId that you logged in with:
```
When you have entered your account ID, it will display the following message:

`Missing public key for <asdfasdf> in default`
`Logged in with masternode24`

This message is not an error, it just means that it will create a public key for you.

### 1. Self Staking Validator
**Important: If you plan to participate in StakeWars skip this step and go to [Staking to a Contract](https://github.com/htafolla/docs/blob/master/docs/validator/staking.md#staking-to-a-contract-recommended-for-stakewars), otherwise follow these instructions:**

#### Stake directly to your validator

**Important: this should be done for testing or a localnet otherwise a contract is needed.

```bash
near stake <accountId> <staking public key> <amount to stake>
```
You should see a success message that looks something like:

```text
Staking 50000 on thefutureisnear with public key = A4inyaard6yzt1HQL8u5BYdWhWQgCB87RbRRHKPepfrn.
```

### Staking to a Contract (recommended for StakeWars)
<blockquote class="warning">
    <strong>heads up</strong><br><br>
    NEAR Protocol provides contract-based delegation. Take some time to learn more, reading the StakeWars Ep.II <a href="https://near.org/blog/stake-wars-episode-ii/" target="_blank">blog post</a>.
</blockquote>

## How to be selected as a Validator

1. It takes ~6 hours (2 epochs) on BetaNet to become a validator and ~12 hours on TestNet and MainNet if your proposal was accepted.
2. To see if you have staked enough to become a validator you can check if your proposal was accepted:
  ```bash
  near proposals | grep <your contract name>
  ```
3. After ~9 hours (3 epochs) if your proposal was accepted and not consequently rejected you will see a "V/" - where V means this node is currently a validator in your logs.

![](assets/validators%20%281%29.png)
Legend: # 7153 | BlockHeight V/1 | 'V' (validator) or '—' (regular node)
The 0/0/40 shows the total validators: connected peers / up to date peers / my peers. This number may change over time.

To learn more about how validators are chosen, take a look at the [Validator FAQ](../validator/validator-faq.md).

## Monitoring your validator
Once you are a validator you will want to monitor your progress and ensure you are not kicked. The two areas to monitor are `blocks produced` and `seat price`. If your validator misses more than 10% of the blocks or the seat price goes above your current proposal you will be kicked from the validator pool.

1. View your validator and blocks produced
  ```bash
  near validators current | grep <your contract name>
  ```
2. Check if your validator has been kicked
  ```bash
  near validators next | grep <your contract name>
  ```
3. View current seat price
  ```bash
  near validators next | grep seat
  ```

## Automatic re-staking

NEAR Protocol automatically re-stakes rewards, unless they are unstaked.
Follow the instructions for you validator type to lower the staked value, and your funds will be unlocked within three epochs (~9 hours on BetaNet, ~36 hours on TestNet).
