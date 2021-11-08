---
id: accounts-and-keys
title: Intro to Accounts and Keys
sidebar_label: Accounts and Keys
---

The easiest way to create an account on NEAR is with [NEAR Wallet](https://wallet.near.org/). NEAR has several [development networks](/docs/concepts/networks) operating independently of each other with their own accountIDs. Below we have guides for creating account for two of these networks:

- [`testnet`](/docs/develop/basics/create-account#creating-a-testnet-account)
- [`mainnet`](/docs/develop/basics/create-account#creating-a-mainnet-account)

---

## Creating a `testnet` account

The following guide with walk you through `testnet` account creation using [NEAR Wallet](https://wallet.testnet.near.org/).

### Reserve Account ID

> - Navigate to https://wallet.testnet.near.org and click on "Create Account".

![mainnet wallet landing](/docs/assets/create-account/mainnet-wallet-landing.jpg)

> - Next, enter your desired account name.

![mainnet create account](/docs/assets/create-account/testnet-create-account.jpg)

---

### Secure your account

> - Choose your account recovery method. "Recovery Phrase" or [Ledger](https://www.ledger.com/) is recommended as the most secure method.

#### Seed Phrase Account Recovery

> - When selecting a recovery phrase / [seed phrase](https://en.bitcoin.it/wiki/Seed_phrase) it is **extremely important** to write down your words **IN ORDER** and keep them in a safe place! We will not have a backup and will not be able to help you recover your account without it.

![recovery method selection](/docs/assets/create-account/security-method.jpg)

![setup seed phrase](/docs/assets/create-account/seed-phrase.jpg)

#### E-mail / Phone Number Account Recovery

> - When choosing e-mail or text, a **ONE TIME** recovery link will be sent to you that will have a recovery seed phrase embedded in the URL.
>
> - **DO NOT DELETE THIS MESSAGE!** We are unable to resend this link to you. If you loose access to this it will result in the loss of your account unless you have another recovery method enabled.

![e-mail recovery](/docs/assets/create-account/email-text-recovery.jpg)

---

### Success!

> You just created a `testnet` account and received 200 Ⓝ! Upon recovery method confirmation you should be directed to your account dashboard similar to the one below:

![testnet success](/docs/assets/create-account/testnet-success.jpg)

> - Here you can view your total balance, available balance, and minimum balance needed for on-chain storage costs. Also, you can view and rotate your [Access Keys](/docs/concepts/account#access-keys) by enabling _(add)_ or disabling _(delete)_ them.

---

## Creating a `mainnet` account

Creating an account on `mainnet` is _almost_ identical to `testnet` but will require initial funding for the account. Here is a guide to `mainnet` account creation.

### Reserve Account ID

> - Navigate to https://wallet.near.org and click on "Create Account".

![mainnet wallet landing](/docs/assets/create-account/mainnet-wallet-landing.jpg)

> - Next, enter your desired account name.

![mainnet create account](/docs/assets/create-account/mainnet-create-account.jpg)

---

### Secure your account

> - Choose your account recovery method. "Recovery Phrase" or [Ledger](https://www.ledger.com/) is recommended as the most secure method.

#### Seed Phrase Account Recovery

> - When selecting a recovery phrase / [seed phrase](https://en.bitcoin.it/wiki/Seed_phrase) it is **extremely important** to write down your words **IN ORDER** and keep them in a safe place! We will not have a backup and will not be able to help you recover your account without it.

![recovery method selection](/docs/assets/create-account/security-method.jpg)

![setup seed phrase](/docs/assets/create-account/seed-phrase.jpg)

#### E-mail / Phone Number Account Recovery

> - When choosing e-mail or text, a **ONE TIME** recovery link will be sent to you that will have a recovery seed phrase embedded in the URL.
>
> - **DO NOT DELETE THIS MESSAGE!** We are unable to resend this link to you. If you loose access to this it will result in the loss of your account unless you have another recovery method enabled.

![e-mail recovery](/docs/assets/create-account/email-text-recovery.jpg)

---

### Fund Your Account

> - An initial funding of 1.1 Ⓝ will be required to create the account and pay for a small amount of initial storage. You will receive a temporary funding account address similar to the one below.

![fund your account](/docs/assets/create-account/fund-your-account.jpg)

> - Copy this funding account address and **OPEN A NEW TAB** to fund the account. It is important to leave this page open while funding the account creation. If it accidentally gets closed, you can reconstruct the link by following this format: **wallet.near.org/fund-create-account/YOUR_ACCOUNT.near/FUNDING_ACCOUNT_ADDRESS**

![image](/docs/assets/create-account/url-breakdown.png)

> - To fund the account, have an existing NEAR account send >= 1.1 Ⓝ to the funding account address, or click on "Where can I purchase NEAR" to go to an exchange and purchase some. You will then need to provide them with the funding account address.

![purchase near](/docs/assets/create-account/purchase_near.jpg)

> - Once your account is funded, navigate back to the "Fund Your Account" tab you left open earlier. This page should be automatically updated notifying you that your account has been funded. To complete the process, check the box that acknowledges your one-time funding address will now be deleted and any further assets sent to this address will be lost.

![image](/docs/assets/create-account/account-funded.png)

> - If you are using a Ledger device, two pop-ups will appear: the first one asking you to sign the account creation transaction, and a second one to sign deletion of the one-time funding account address. This second [transaction](https://nomicon.io/RuntimeSpec/Actions.html#deleteaccountaction) will also transfer remaining funds in your one-time address to your new named account.

---

### Success!

> - You have now created a NEAR account on `mainnet`!

![image](/docs/assets/create-account/mainnet-success.jpg)

> - You should now be directed to your account dashboard where you can view your total balance, available balance, and minimum balance needed for on-chain storage costs. Also, you can view and rotate your [Access Keys](/docs/concepts/account#access-keys) by enabling _(add)_ or disabling _(delete)_ them.

![image](/docs/assets/create-account/mainnet-wallet-dashboard.jpg)

## Creating an Account w/ Ledger

> This two minute video walkthrough will guide you on the account creation process using a Ledger device.
>
> - [[ **Click here** ](/docs/tutorials/ledger#setup)] for detailed instructions on setting up your Ledger device and the NEAR App.

<iframe
  width="960"
  height="540"
  src="https://www.youtube-nocookie.com/embed/i9XYvHpeBZ4"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>

## Access Key Storage / Sign Out

> **WARNING!** Make sure you have a recovery method enabled and working _**BEFORE**_ doing this! If you do not, you **WILL NOT** be able to recover your account!
>
> You'll notice that there is not a "sign out" option available with NEAR Wallet. This is due to your [access key](/docs/concepts/account#access-keys) being stored in your browser's local storage. If it is imperative that you disable the ability of your browser to access your account, open your browser's dev tools and clear the key/value line of the account you wish to remove.

![local storage access key](/docs/assets/create-account/local-storage.png)

> Alternatively, if you would like to save an [access key](/docs/concepts/account#access-keys) to your hard-drive, you can use the [`near-cli`](/docs/tools/near-cli) command [`near login`](/docs/tools/near-cli#near-login).

## Support

> Did something go wrong, or you need further assistance setting up your account? Head to our [#wallet-support](https://discord.gg/mGRcBpA8gN) channel in Discord.
