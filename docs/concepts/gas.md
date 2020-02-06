---
id: gas
title: Gas
sidebar_label: Gas
---

Gas is a dynamic, unified unit of cost of computation and storage on the blockchain as well as network utilization among nodes.  

Accounts automatically buy gas using NEAR tokens at various points in time as when they invoke a function (charged at the moment the transaction is processed) or pay storage rent (charged periodically based on amount of data stored by an account as well as a possible tax on having a short account name to prevent name squatting).

This page covers these dynamics in more detail, starting with an an excerpt from the [NEAR Whitepaper](https://nearprotocol.com/papers/the-official-near-white-paper/) below:

<blockquote class="info">
<strong>NEAR Platform Economics -- What is Gas?</strong><br><br>

Fundamentally, the NEAR platform is a marketplace between willing participants.

On the supply side, operators of the validator nodes and other fundamental infrastructure need to be incentivized to provide these services which make up the community cloud.  On the demand side, the developers and end-users of the platform who are paying for its use need to be able to do so in a way which is simple, clear and consistent so it helps them.

A blockchain-based cloud provides several specific resources to the applications which run atop it:

- **Compute (CPU)**: This is the actual computer processing (and immediately available RAM) which run the code in a contract.
- **Bandwidth ("Network")**: This is the network traffic between participants and users, including messages which submit transactions and those which propagate blocks.
- **Storage**: Permanent data storage on the chain, typically expressed as a function of both storage space and time.   
 
Existing blockchains like Ethereum account for all of these in a single up front transaction fee which represents a separate accounting for each of them but ultimately charges developers or users only once in a single fee.  

**This is a high volatility fee commonly denominated in "gas".**

Developers prefer predictable pricing so they can budget and provide prices for their end users.  The pricing for the above-mentioned resources on NEAR is an amount which is slowly adjusted based on system usage (and subject to the smoothing effect of resharding for extreme usage) rather than being fully auction-based. This means that a developer can more predictably know that the cost of running transactions or maintaining their storage.

Initially, all of these resources will be priced and paid in terms of NEAR tokens. In the future, they may also be priced in terms of a stable currency denomination (for example a token pegged to the $USD).

[read more here](https://nearprotocol.com/papers/the-official-near-white-paper/#economy)

</blockquote>







## How do I buy gas?

You don't. 

Accounts purchase gas automatically using NEAR tokens and at various points in time including:

1. **when a transaction is processed** (ie. a function call is made, an account is created, tokens are transferred, etc) \
    The amount of gas used by a transaction depends on the transaction itself and is fixed at genesis (ie. it requires 1 unit of gas to store 1 byte of information and it requires 3 units of gas to compute 2+2).  The actual *cost of this gas*, it's price in NEAR tokens is calculated dynamically and on an ongoing basis based on system load.

2. **when an account is charged rent** to remain on the network  \
    From the NEAR whitepaper, 
    
    *"Storage is a long-term scarce asset which is priced on a rental basis.  This means that each account or contract will be charged per byte per block for its storage use deducted automatically from the balance on that account. The storage price is fixed and is only subject to change as a major governance decision."*

    *"If an account has data stored but does not have the resources to pay its storage bill for a given block, that account is deallocated, meaning that its storage will be released back to the chain.  Should the account desire to recover their storage, it will need to reallocate the storage by paying its rent and presenting back the data from the account. The previous state is recoverable by examining the prior history of the chain or third-party backups."*

    It also costs more to control accounts with short names.  At time of writing, all account names must be 2 characters or more and are charged rent up to 10 characters after which rent on account names is zero. At 10 characters long, an account named "abcdefghij" is charged rent some amount `R` (measured in units of gas).  9 characters is `3 x R`, 8 characters is `3 x 3 x R` and so on down to 2 characters which is the most expensive at `3^8 x R` or about `6,500 x R`.  This rent for short names is intended to prevent name squatting.  Refer to the [Key Concept: Account](/docs/concepts/account) page for more detail about accounts.

Thus, accounts have their balance in NEAR tokens and gas is bought on the fly when a transaction gets processed or when the account pays storage rent.

Note that the minimum amount of gas for any transaction is 5000 yoctoNEAR (10^-24 NEAR) at time of writing.

## An Example Scenario

Account has its balance in NEAR tokens

A user decides to send a transaction to the network.  She decides how much gas at most she is willing to spend for the transaction and sets a gas limit for processing the transaction.  Some transactions require an almost constant amount of gas but function calls are hard to predict so a little extra never hurts since whatever remains unspent will be returned.

The transaction reaches the network and, while being processed, it automatically "buys" enough gas to finish processing at the current gas prices.

Once the transaction is processed, the related account is only "charged" for the gas that was used.  Any leftover gas is converted back to NEAR tokens on the account.


## What about Prepaid Gas?

The Near Team understands that developers want to provide their users with the best possible onboarding experience.  To realize this vision, developers can design their applications in a way that first-time users can draw funds for purchasing gas directly from an account maintained by the developer.  Once onboarded, users can then transition to paying for their own platform use.

In this sense, prepaid gas can be realized using a funded account and related contract(s) for onboarding new users.
