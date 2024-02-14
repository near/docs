---
id: what-is
title: What is Chain Abstraction? 
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

The idea behind `chain abstraction` is quite simple: **blockchain** technology should be **abstracted away** from the user experience. In other words, people should **not realize** when they are **using a blockchain**, nor **which blockchain** they are using.

![img](/docs/assets/welcome-pages/data-lake.png)

To help on this task, NEAR Protocol provides services that allow to **create** and **recover accounts** using **email addresses**, use the account **without acquiring funds**, and **control accounts** in **other chains**. All in the most **seamless** way possible.

<!-- ---


## NEAR, the abstraction layer

Do you know how your favorite apps are built and which database they use?. Chances are not, since we choose apps based on their functionality, and not their underlying tech.

While the **same should be true for blockchain apps**, the reality is that apps tend to be defined by its underlying network instead of the problems they actually solve. Moreover, since blockchains tend to be **disconnected**. Accounts from one chain cannot be used on other chains. This is a problem for both users and developers, since their accounts and applications end up locked in a specific chain.

NEAR Protocol provides a set of services that allow to **abstract away** the blockchain from the user experience. This means that users can use blockchain-based application - both in NEAR and **other chains** - without realizing they are using a blockchain. Through a combination of multiple technologies, NEAR allows to create a very simple user flow, in which users can use their email to create an account, start using the account without acquiring funds, and use the same account in other chains.
-->

---

## Fast-Auth: Email onboarding
One of the first barriers that new users face when entering the world of Web3 is the need to create a crypto wallet. This generally implies the need to choose a wallet, create and store a recovery phrase, and obtain deposit funds to start using the account.

With FastAuth, users only need to provide an email address to create a NEAR account. Using the same email address the user will be able to use their account across applications and devices.

FastAuth accounts are kept safe through multi-party computation (MPC) on a decentralized network. This means that the user's private key is never stored in a single location, and thus it is never exposed to any single party.


<hr subclass="subsection" />

## Relayers: Cover gas fees
Allowing users to start using a dApp without having to acquire funds is a powerful tool to increase user adoption. NEAR Protocol provides a service that allows developers to subsidize gas fees for their users.

This concept, known as "Account Abstraction" in other chains, is a **built-in feature** in NEAR thanks to **meta-transactions**. The idea is simple, the user creates a transaction and wraps it in a message (called meta-transaction) that **any other** account can relay to the network.

The account relaying the transaction (known as the relayer) will pay for the transaction's gas fees. In NEAR, the relayer is nothing but a a **middle-man service** that **pays for gas**. The transaction is indeed executed as if the **user had send it**, meaning the user is still the **sole owner** of its account and funds.

<hr subclass="subsection" />

## Multi-chain signatures: One account, multiple chains 
Currently, users and applications are siloed in different chains. This means that a user needs to create a new account for each chain they want to use. This is not only cumbersome for the user, but also for the developer who needs to maintain different codebases for each chain.

NEAR Protocol provides a multi-chain signature service that allows users to use their NEAR Account to sign transactions in **other chains**. This means that a user can use the same account to interact with **Ethereum**, **Binance Smart Chain**, **Avalanche**, and **NEAR**.

Multi-chain signatures work by combining **smart contracts** that produce signatures, with indexers that listen for these signatures, and relayers that submit the transactions to other networks. This allows users to hold assets and use applications in **any** network, only needing to have a single NEAR account.

---

## Chain Abstraction: The holistic view

The combination of these services allows to create a **seamless** user experience, in which users can use blockchain-based applications without realizing they are using a blockchain.

Users will simply login with an email, and a **zero-funds** account will be created for them. No seed phrases to remember, no private keys to safe keep, and no need to acquire funds.

Once having their account, apps can ask the user to create transactions and embed them in **meta-transactions**, which can be sent to any relayer. The relayer will pass the transaction to the network, attaching NEAR to pay for the execution fees. The transaction will then be executed as if the user had sent it, since the relayer is only there to attach NEAR to the submission.   

If the user sees another blockchain-based application, they can use the same account to interact with it. For this, a **multi-chain** app can simply ask the user to sign a transaction for another chain, and then relay the transaction to the right network, covering GAS fees.

As an example, this would allow users to collect NFTs across different chains, without ever needing to explicitly create an account or acquire crypto. All with just a single email login.