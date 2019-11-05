---
id: create-account
title: Creating a NEAR Account in TestNet
sidebar_label: Creating a NEAR Account in TestNet
---

The first thing you'll likely want to do is create a NEAR account on Testnet. This account will also be seeded with a balance so that you can use those funds to deploy your contracts.

Go to our wallet faucet: [https://wallet.nearprotocol.com](https://wallet.nearprotocol.com/), enter a username, and click create account.  
Usernames can be 5-32 characters long and contain any of the following:

* Lowercase characters \(a-z\) 
* Digits \(0-9\) 
* Special characters \(@.\_-\)

![Step 1: Create Account](assets/image-3.png)

## Managing Private Keys

![Step 2: Decide how you want to back up your private keys](assets/image%20%281%29.png)

From here, you can decide how you would like to manage your private keys. There are two options: If you'd like to be able to recover your private key through NEAR should you lose it, enter your phone number. Otherwise, backup your private key manually. 

### Backup your Private Keys Manually

To so click below the the phone number entry on "I choose to backup my account manually".

Then you will be presented with a seed phrase that will allow you to recover your key pair in the future. 

![SeedPhrase](assets/writedownrecovery.png)

**Important** Please write down the seed phrase in a secure place, potentially make a copy and store both copies at two different places. We will not have a backup and will not be able to help you recover your key pair. Nevertheless, properly backing up your key manually is normally the more secure option.

Once you click "Setup seed phrase", you will be directed to your wallet interface, so please make sure that you have taken note of your seed phrase beforehand. 

![Wallet](assets/finalscreen.png)

### Near key recovery

Note that this option is not possible if you backup your account manually via the seed phrase. If you have backedup your private keys manually, you are responsible for those yourself, and the only way that you can recover them is through the seed phrase. 

In the case that you would like to be able to recover your key if you happen to lose it, Near \(the wallet host\) creates a separate public/private key pair and assigns it to your account.

This key pair is stored securely on Near's servers, and with this key pair, we can link a new public/private key pair each time you need to recover your account. 

**Note:** Currently, your previous private key will still remain valid. Right now Near Wallet is discussing a way for users to view, manage, and revoke the keys associated with their account. You can follow the[ discussion here](https://github.com/nearprotocol/near-wallet/issues/119).


