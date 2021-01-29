---
id: create-account
title: Creating a NEAR Account
sidebar_label: Create Your Account
---

The easiest way to create an account on NEAR is with [NEAR Wallet](https://wallet.near.org/). NEAR has several [development networks](https://docs.near.org/docs/roles/developer/networks) operating independently of each other with their own accountIDs. To create accounts for each network you will use the following NEAR Wallets:

* [`mainnet` NEAR Wallet](https://wallet.near.org/)
* [`testnet` NEAR Wallet](https://wallet.testnet.near.org/)
* [`betanet` NEAR Wallet](https://wallet.betanet.near.org/)

## Creating a `testnet` account

## Creating a `mainnet` account

Creating an account on `mainnet` is _almost_ identical to `testnet` but will require initial funding for the account. Here is a guide to `mainnet` account creation.

### Reserve Account ID

> * Navigate to https://wallet.near.org and click on "Create Account"

![mainnet wallet landing](/docs/assets/create-account/mainnet-wallet-landing.jpg)

> * Next, enter your desired account name
  
![mainnet create account](/docs/assets/create-account/mainnet-create-account.jpg)

### Secure your account

> * Choose your account recovery method. "Recovery Phrase" or [Ledger](https://www.ledger.com/) is recommended as the most secure method.

#### Seed Phrase Account Recovery

> * When selecting a recovery phrase / [seed phrase](https://en.bitcoin.it/wiki/Seed_phrase) it is **extremely  important** to write down your words **IN ORDER** and keep them in a safe place! We will not have a backup and will not be able to help you recover your account without it.

![recovery method selection](/docs/assets/create-account/security-method.jpg)

![setup seed phrase](/docs/assets/create-account/seed-phrase.jpg)

#### E-mail / Phone Number Account Recovery

> * If you choose e-mail or text, a **ONE TIME** recovery link will be sent to you that will have a recovery seed phrase embedded in the URL. **DO NOT DELETE THIS MESSAGE** If you loose access to this link we will be unable to re-send it to you and you will loose access to your account. (unless you have another account recovery method enabled)

![e-mail recovery](/docs/assets/create-account/email-text-recovery.jpg)

### Fund Your Account

> * An initial funding of 1.1 Ⓝ will be required to create the account and pay for a small amount of initial storage. You will receive a temporaty funding account address similar to the one below.

![fund your account](/docs/assets/create-account/fund-your-account.jpg)

> * Copy this funding account address and **OPEN A NEW TAB** to fund the account. It is important to leave this page open while funding the account creation. If it accidentally gets closed, you can reconstruct the link by following this format: **wallet.near.org/fund-create-account/YOUR_ACCOUNT.near/FUNDING_ACCOUNT_ADDRESS**

![image](/docs/assets/create-account/url-breakdown.png)

> * To fund the account, have an existing NEAR account send >= 1.1 Ⓝ to the funding account address, or click on "Where can I purchase NEAR" to go to an exchange and purchase some. You will then need to provide them with the funding account address.

![purchase near](/docs/assets/create-account/purchase_near.jpg)

> * Once your account is funded, navigate back to the "Fund Your Account" tab you left open earlier. This page should be automatically updated notifying you that your account has been funded. To complete the process, check the box that acknowledges your one-time funding address will now be deleted and any further assets sent to this address will be lost.

![image](/docs/assets/create-account/account-funded.png)

### Success!

> * You have now created a NEAR account on `mainnet`!

![image](/docs/assets/create-account/mainnet-success.jpg)

> * From here you will shown your account dashboard where you can view your total balance, available balance, and minimum balance needed for on-chain storage costs.  Here you can also view and rotate your [Access Keys](/docs/concepts/account#access-keys) by enabling _(add)_ or disabling _(delete)_.

![image](/docs/assets/create-account/mainnet-wallet-dashboard.jpg)

## Support
> Did something go wrong, or you need further assistance setting up your account? Head to our [#wallet-support](https://discord.gg/mGRcBpA8gN) channel in Discord.
