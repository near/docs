---
id: create-a-near-account
title: Creating-a-NEAR-Account-in-TestNet
sidebar_label: Example Page
---

# Creating a NEAR Account in TestNet

The first thing you'll likely want to do is create a NEAR account on Testnet. This account will also be seeded with a balance so that you can use those funds to deploy your contracts.

Go to our wallet faucet: [https://wallet.nearprotocol.com](https://wallet.nearprotocol.com/), enter a username, and click create account.  
Usernames can be 5-32 characters long and contain any of the following:

* Lowercase characters \(a-z\) 
* Digits \(0-9\) 
* Special characters \(@.\_-\)

![Step 1: Create Account](../.gitbook/assets/image-3.png)

## Managing Private Keys

![Step 2: Decide how you want to back up your private keys](../.gitbook/assets/image%20%281%29.png)

From here, you can decide how you would like to manage your private keys. There are two options: If you'd like to be able to recover your private key through NEAR should you lose it, enter your phone number. Otherwise, backup your private key manually. 

### Near key recovery

In the case that you would like to be able to recover your key if you happen to lose it, Near \(the wallet host\) creates a separate public/private key pair and assigns it to your account.

This key pair is stored securely on Near's servers, and with this key pair, we can link a new public/private key pair each time you need to recover your account. 

**Note:** Currently, your previous private key will still remain valid. Right now Near Wallet is discussing a way for users to view, manage, and revoke the keys associated with their account. You can follow the[ discussion here](https://github.com/nearprotocol/near-wallet/issues/119).

### Backup private key manually

If you decide you'd like to backup your private key manually, navigate to local storage to grab your private key and store it somewhere secure.

**Warning:** If you back up your key manually and lose your private key, there is nothing we can do to help you recover your account. Nevertheless, properly backing up your key manually is normally the more secure option.

Find your private key by opening up the developer console, navigating to the `Application` tab, clicking on `Local Storage`, and looking for the key-pair `nearlib:keystore:{AccountName}:default`

![](../.gitbook/assets/image-5.png)

