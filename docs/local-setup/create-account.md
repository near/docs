---
id: create-account
title: Creating a NEAR Account in Testnet
sidebar_label: Create a NEAR Account
---

#### Please Read
Before you get started with NEAR, the first thing that you want to do is to set up a NEAR account on Testnet. This account will also be seeded with a balance so that you can use those funds to deploy your contracts, access applications, and stake tokens.

Either read-on to learn more about the wallet or jump to [set up your wallet](http://localhost:3000/docs/local-setup/create-account#set-up-your-wallet).

## Learn more about the wallet

The wallet allows you to make contract calls to the blockchain, set up your local node, and send and receive funds from other users. When you register your Account ID, you have to provide a unique name. Although every wallet has to have a unique name, every user can set-up mutliple wallets.

You can imagine this similar to a Facebook or Google account. Once you have registered to either of the services, you can use the same account to log-into thrid-party services. The difference between NEAR Account IDs and Google accounts is that the data, stored against an Account ID, is only accessible and manageable by the owner of the wallet. Additionally, all information are stored on a distributed network of nodes instead of a single server.

Let's go ahead and get you started!

## Set up your wallet

Go to our wallet faucet: [https://wallet.nearprotocol.com](https://wallet.nearprotocol.com/), enter a username, and click create account.
Usernames can be 5-32 characters long and contain any of the following:

* Lowercase characters \(a-z\)
* Digits \(0-9\)
* Special characters \(@.\_-\)

![Step 1: Create Account](assets/image-3.png)

## Managing Private Keys

![Step 2: Decide how you want to back up your private keys](assets/image%20%281%29.png)

From here, you can decide how you would like to manage your private keys. There are two options: If you'd like to be able to recover your private key through NEAR should you lose it, enter your phone number. Otherwise, backup your private key manually.

### Recover your Private Keys via Phone Number

After you have provided us with your phone number and clicked the "PROTECT ACCOUNT" button, you will be sent a 6 digit security code to your number. Please provide the same code on the next screen:

![Step 3: Security Code](assets/entercode.png)

Once you click on the "PROTECT ACCOUNT" button, you will be forwarded to the dashboard.

![Wallet](assets/finalscreen.png)

### Backup your Private Keys Manually

Alternatively, you can choose to backup your private keys manually. To do so click below the the phone number entry on "I choose to backup my account manually". In this case we're not backing up "private keys". Instead, we are guaranteeing that your account can be recovered using a different (ie. not phone SMS) method; in our case, by using a seed phrase.

In the next step, you will be presented with a seed phrase that will allow you to recover your key pair in the future.

![SeedPhrase](assets/writedownrecovery.png)

**Important** Please write down the seed phrase in a secure place, potentially make a copy and store both copies at two different places. We will not have a backup and will not be able to help you recover your key pair. Nevertheless, properly backing up your key manually is normally the more secure option.

Once you click "Setup seed phrase", you will be directed to your wallet interface, so please make sure that you have taken note of your seed phrase beforehand.

![Wallet](assets/finalscreen.png)

### Near key recovery

Note that this option is not possible if you backup your account manually via the seed phrase. If you have backedup your private keys manually, you are responsible for those yourself, and the only way that you can recover them is through the seed phrase.

In the case that you would like to be able to recover your key if you happen to lose it, Near \(the wallet host\) creates a separate public/private key pair and assigns it to your account.

This key pair is stored securely on Near's servers, and with this key pair, we can link a new public/private key pair each time you need to recover your account.

**Note:** Currently, your previous private key will still remain valid. Right now Near Wallet is discussing a way for users to view, manage, and revoke the keys associated with their account. You can follow the[ discussion here](https://github.com/nearprotocol/near-wallet/issues/119).
