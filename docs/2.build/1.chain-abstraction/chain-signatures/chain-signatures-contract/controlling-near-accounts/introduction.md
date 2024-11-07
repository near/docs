---
id: introduction
title: Controlling a NEAR account
sidebar_label: Overview
---

This example is of a `simple subscription service` that allows a user to subscribe to an arbitary service and allows the contract to charge them 5 NEAR tokens every month. For most chains an account as a single key, the power of NEARs account model combined with chain signatures is that you can add an `MPC controlled key` to your account and allow a contract to control your account through code and limited actions (including ones that require a full access key to sign). You can also dervie and use new implicit NEAR accounts via the MPC contract as you do with other chains but this usecase is cooler.

This concept also enables:
- **Account recovery**: allow a contract to add a new private key to your account after preset conditions are met.
- **Trail accounts**: the [Keypom](https://github.com/keypom) contract uses this concept to create trial accounts that can only peform a limited number of actions (including those that require a full access key) and can be upgraded to a full account upon the completion of specified actions. These accounts are also multichain.
- **DCA service**: a contract that allows a DEX to buy a token for a user every fixed period with a pre defined amount of USDC.
- **and more...**

These were all previously possible - before chain signatures - since a NEAR account is also a smart contract, but this required the user to consume a lot of $NEAR in storage costs to upload the contract to the account and it lacked flexability. This approach is much more scalable and new account services can be switched in and out easily.

Since a NEAR account is also a multichain account, any dervied foreign accounts associated with the NEAR account also inherit these account services.

---

# Running the example 

This example has contracts written in rust and scripts to interact with the contract in NodeJS. 

Go ahead and clone the repository to get started:

```bash
# Clone the repository
git clone https://github.com/PiVortex/subscription-example.git

# Navigate to the scripts directory
cd subscription-example/scripts

# Install the dependencies
npm install
```

To interact with the contract you will need three different accounts. A subscriber, an admin and a contract. Run the following command to create the accounts and deploy the contract:

```bash
npm run setup
```

To subscribe to the service run the following command:

```bash
npm run subscribe
```

To charge the subscriber from the admin account run the command:
    
```bash 
npm run charge
```

To unsubscribe from the service run the command:

```bash
npm run unsubscribe
```