---
id: staking
title: Staking and becoming a Validator
sidebar_label: Staking and becoming a Validator
---

## Staking on official TestNet

### _READ THIS PART BEFORE YOU START_

Wait until your node is fully synced before you send a staking transaction. An out of sync node cannot produce or validate blocks, so if you're chosen as a validator, you're at risk of being kicked out of the validator pool and losing your rewards if your node doesn't maintain the appropriate uptime \(i.e. validate / produce the number of assigned blocks for that epoch\).

### Requirements

To stake, make sure you have

* an account with tokens: [Create Account](local-setup/)
* `near-shell`, our CLI tool, which which will require [node.js and npm](https://www.npmjs.com/get-npm)

```bash 
# Download Near Shell with npm: 
npm i -g near-shell
```

* **IMPORTANT: Make sure you have the latest version of NEAR Shell and Node Version &gt; 10.x**
* A node running on your machine

### Run a Node

Make sure you have a node running by following these instructions: [How to run a Node](local-setup/running-testnet)

When prompted for an account ID, enter the accountID of the account you want to stake with. You will be returned a public key used for staking:

```bash
"Stake for user 'thefutureisnear' with 'A4inyaard6yzt1HQL8u5BYdWhWQgCB87RbRRHKPepfrn'"
```

Make sure you copy this validator\_key as you will need it for the next step. You can also find this public key at `~/.near/validator_key.json`

### Send a staking transaction

First let's authenticate near shell by running the command `near login`

You will be prompted to navigate to a url to authenticate your staking account.

```bash
Please navigate to this url and follow the instructions to log in: 
https://wallet.nearprotocol.com/login/?title=NEAR+Shell&public_key=FSgxX7YwuCveCeYqsSAB3sD8dgdy3XBWztCQcEjimpaN
```

 Once done, enter that account ID in the shell:

```
Please enter the accountId that you logged in with:
```

Now you're ready to send a staking transaction.

```bash
near stake <accountId> <staking public key> <amount to stake>
```

You should see a success message that looks something like:

```text
Staking 100000 on thefutureisnear with public key = A4inyaard6yzt1HQL8u5BYdWhWQgCB87RbRRHKPepfrn.
```

### Being chosen to become a validator

After this, you will need to wait the ~5 minute bonding period on TestNet to see if you have staked enough to become a validator. You can see you are a validator when in the logs of the node you see "V/" - where V means this node is currently a validator.

![](assets/validators%20%281%29.png)

To learn more about how validators are chosen, take a look at the Validator FAQ \(coming soon\).

### See current list of Validators and stake amounts

To see the current list of validators, you can take a look here: [http://rpc.nearprotocol.com/status](http://rpc.nearprotocol.com/status)

If you would like to see how much a validator is staking, you can run the command `near state <account name>`in Near Shell.

```bash
{
  account_id: '.near',
  amount: '1009989889356521963560496643',
  code_hash: '11111111111111111111111111111111',
  nonce: 9,
  public_keys: [ 'DuZSg3DRUQDiR5Wvq5Viifaw2FXPimer2omyNBqUytua' ],
  stake: '321687967719751680'
}
```