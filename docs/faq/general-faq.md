---
id: general-faq
title: General FAQ
sidebar_label: General FAQ
---

Welcome to the Frequently Asked Questions. To contribute, use the `Edit` button on the right.

This General FAQ is dedicated to questions about the project overall.  For more specific question areas, please see the appropriate section in the sidebar menu.

## MainNet {#mainnet}

### When is MainNet? {#when-is-mainnet}
*Last Updated: 20211213*

The MainNet launches come in [3 phases](https://near.org/blog/mainnet-roadmap/) with phase 2 launched on Oct 13, 2020.

For more details, please refer to these two blog posts:

1. [The Road to MainNet and Beyond](https://near.org/blog/mainnet-roadmap/)
2. [Announcing NEAR Protocol's MainNet Genesis](https://near.org/blog/near-mainnet-genesis/)

To stay up to date with developments, please visit our Discord (http://near.chat/) and sign up to our Newsletter. (https://near.org/#newsletter)

### Why does MainNet Genesis not start from height 0? {#why-mainnet-genesis-not-start-from-zero}
*Last Updated: 20211213*

The genesis block of MainNet was initially 0 at phase 0 launch. However, at the time we did not have [upgradability](https://github.com/near/NEPs/blob/master/specs/ChainSpec/Upgradability.md) implemented
and as a result, some upgrades were down by hard-forking the network and restarting the network with a new genesis. In those cases, we wanted to make sure that block height is monotonic to avoid confusions
and therefore did not reset genesis height to zero. The current mainnet genesis height is `9820210`.

### When is sharding? {#when-is-sharding}
*Last Updated: 20211213*

Similar to the initial mainnet launch, sharding is also launched in phases. Phase 0 of sharding is launched on Nov 15, 2021.
For more details, please refer to [this blog post](https://near.org/blog/near-launches-nightshade-sharding-paving-the-way-for-mass-adoption/).

### When is the MOON? {#when-is-the-moon}
*Last Updated: 20200803*

Please check the lunar calendar yourself: https://www.timeanddate.com/moon/phases/

### Who are NEAR's competitors? {#who-are-nears-competitors}
*Last updated: 20200805*

The biggest competitor for all blockchain-based projects is the existing centralized web. The only way to succeed there is to provide an experience for app users and builders which is so good they cannot ignore it.

Within the decentralized web space, NEAR is most often compared to major scalable smart contract platforms like Ethereum's Serenity proposal or Polkadot.


### Is NEAR targeting mobile devices? {#is-near-targeting-mobile-devices}
*Last updated: 20200803*

Initially, it appeared that massive scale would be required very early on so the initial design targeted using mobile devices as nodes. **This is no longer the case.** We’ve since refocused on usability as the biggest hurdle to adoption since you have to have adoption in order to *need* that kind of scale.  

So perhaps mobile devices will be used later (which state sharding does give us an ability to do) but only once it’s clear that scaling will be needed.


### Did NEAR have or will it have an EIO, ICO or any other form of token sale? {#did-near-have-or-will-it-have-an-eio-ico-or-any-other-form-of-token-sale}
*Last updated: 20200803*

There was never any ICO for NEAR tokens. For any queries related to future token activities, please see [near.org/tokens](https://near.org/tokens).


### Are you going to have airdrops? {#are-you-going-to-have-airdrops}
*Last updated: 20200604*

We’re working with partners across the ecosystem to make sure tokens get in the hands of the right people to make the network successful but can't announce anything here. Please [join the mailing list](https://near.org/) to stay informed.


### Is NEAR on coinmarketcap? {#is-near-on-coinmarketcap}
*Last Updated 20200803*

The NEAR Protocol has not done an ICO and likely would not be traded (so there will be no pricing available) until sometime after Phase 2 of MainNet is voted to begin. Thus it is unlikely that you would see the token on [coinmarketcap.com](https://coinmarketcap.com) prior to that.



## Meta {#meta}


### Why doesn’t NEAR just do a side chain of Ethereum? {#why-doesnt-near-just-do-a-side-chain-of-ethereum}
*Last Updated: 20200103*

It simply doesn’t make sense from a technology perspective or a usability perspective. NEAR has a very different account model, consensus model and state transition from Ethereum, so they wouldn't operate smoothly as a simple side chain.

Instead, it is better for NEAR to support a trustless bridge to Ethereum.  This gives Ethereum users the substantial cost and scaling benefits of a side chain while also benefitting from the full security of an independent Proof of Stake system and the full ecosystem of its interoperable applications.


### Why doesn’t NEAR just work with the Ethereum Foundation on Ethereum 2.0? {#why-doesnt-near-just-work-with-the-ethereum-foundation-on-ethereum-20}
*Last Updated: 20200103*

Ethereum has done fantastic things to introduce the world to a virtual machine run atop a blockchain. Both they and NEAR are producing decentralized platforms that ideally fulfill essentially a similar vision. Fundamentally, though, the NEAR team believes that it can both:

- Build better tech for developers
- Ship it faster

Regarding the former, NEAR is designed specifically so developers can rapidly build and scale interoperable apps. NEAR has reimagined everything from the contract level through the transaction fees and economics to focus on providing both developers and their end-users with an incredibly good experience. This focus on usability is uniquely in our DNA and it is not part of the Ethereum 2.0 spec.

Regarding the latter, the [NEAR team](https://near.org/about) is the best in the world and has deep experience both launching businesses and engineering sharded systems at scale.  The last several decades have shown via a Darwinian process which approaches work and which ones do not when building effective and future-proof developer platforms. The NEAR platform will get to market well ahead of what Ethereum 2.0 will do, particularly given the baggage of the existing Ethereum design and state.

So, basically, we can give the world better technology faster by operating independently.


>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
