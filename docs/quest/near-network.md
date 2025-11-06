---
id: near-network
title: Understanding the NEAR Network
sidebar_label: 🌐 The NEAR Network
description: Learn how the NEAR network operates - understand validators, epochs, different network environments, and how the blockchain stays secure and decentralized.
---

import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";
import Progress from "@site/src/components/Academy/Progress";

<Progress course="web3-apps" total={6} />

Now that you understand how data flows through NEAR Protocol, let's explore how the network itself operates. Understanding the NEAR network is crucial for building Web3 applications because it helps you choose the right environment for development and understand the security guarantees that protect your users.

---

## What is the NEAR Network?

The **NEAR network** is a decentralized blockchain that operates through a global network of computers working together. Think of it like a digital democracy where many participants collaborate to keep the system secure, fast, and reliable.

Unlike traditional systems controlled by a single company or government, the NEAR network is maintained by thousands of independent validators worldwide, making it resistant to censorship and single points of failure.

---

## The Building Blocks of the NEAR Network

### 1. Validators - The Network Guardians

**Validators** are like the security guards and administrators of the NEAR network. They're individuals or organizations that run special computers (nodes) that:

- **Validate transactions** - Check that all transactions are legitimate
- **Create new blocks** - Bundle transactions together and add them to the blockchain
- **Secure the network** - Watch for malicious activity and prevent attacks
- **Earn rewards** - Get paid in NEAR tokens for their service

Think of validators like bank tellers, but instead of one bank, there are thousands of independent "tellers" worldwide, all working together to process transactions securely.

### 2. Proof-of-Stake - The Security System

NEAR uses a **Proof-of-Stake** system to ensure network security. Here's how it works:

**Staking**: People "stake" (lock up) their NEAR tokens to support validators they trust. It's like voting with your money, the more tokens you stake, the more influence you have.

**Economic Incentives**: Validators have a financial stake in the network's success. 

**Decentralization**: No single entity can control the network because it would require controlling a majority of the staked tokens, which would be incredibly expensive.

### 3. Epochs - The Network's Clock

An **epoch** is like a "shift" in the network, a period of time when the same set of validators work together. Think of it like work shifts at a 24-hour business:

- **Duration**: Each epoch lasts about 12 hours (43,200 blocks)
- **Validator Rotation**: After each epoch, the network can choose different validators based on their performance and stake
- **Network Updates**: Epochs allow the network to adapt and improve over time

---

## How the Network Stays Secure

### The Security Model

**Economic Security**: The network is secure because attacking it would cost more than any potential gain. To attack the network, someone would need to:
1. Acquire a majority of staked NEAR tokens (extremely expensive)
2. Risk losing all their staked tokens if the attack fails
3. Face the economic consequences of destroying trust in the network

**Decentralization**: With hundreds of validators worldwide, no single point of failure exists. Even if some validators go offline or misbehave, the network continues operating.

**Transparency**: All validator actions are public and verifiable. Anyone can check that validators are following the rules.

### Validator Roles and Responsibilities

**Block Producers** (Top 100 validators):
- Create new blocks containing transactions
- Validate transactions from users
- Earn guaranteed 4.5% annual rewards
- Require significant stake and hardware

**Chunk Validators** (Additional validators):
- Validate blocks created by block producers
- Help secure the network with lower requirements
- Also earn 4.5% annual rewards
- Make the network more decentralized

---

## Different NEAR Networks

NEAR operates multiple networks for different purposes, like having different environments for different stages of development.

### Mainnet - The Production Network

**Mainnet** is the "real" NEAR network where:
- **Real money** flows (actual NEAR tokens with real value)
- **Production apps** run (live applications serving real users)
- **Permanent state** is guaranteed (data persists forever)
- **Highest security** is required

Think of mainnet like a live, public website that real customers use every day.

### Testnet - The Testing Environment

**Testnet** is a "practice" version of the network where:
- **Free tokens** are available (no real money at risk)
- **Testing happens** before mainnet deployment
- **New features** are tested before going live
- **State can reset** (data might not persist forever)

Think of testnet like a staging environment where developers test their applications before going live.

### Localnet - The Development Environment

**Localnet** is your personal NEAR network where:
- **Complete control** over the environment
- **Custom settings** and configurations
- **Private development** (no information leaks)
- **Instant transactions** (no waiting for network consensus)

Think of localnet like running a website on your own computer for development and testing.

---

## Network Economics - How Validators Get Paid

### Reward System

**Inflationary Rewards**: The network creates new NEAR tokens to pay validators, targeting 4.5% annual inflation. This means:
- Validators earn rewards for securing the network
- The total supply of NEAR increases slightly each year
- Rewards are distributed based on stake and performance

**Transaction Fees**: All transaction fees are "burned" (destroyed), which:
- Reduces the total supply of NEAR over time
- Creates deflationary pressure
- Makes NEAR more valuable as usage increases

### Staking Rewards

**For Validators**: Earn 4.5%+ annual returns for running the network
**For Delegators**: Earn rewards by staking tokens with trusted validators
**For the Network**: Economic incentives ensure security and decentralization

---

## Network Performance and Scalability

### Speed and Efficiency

**Fast Finality**: Transactions are confirmed in 1-2 seconds
**High Throughput**: Can handle thousands of transactions per second
**Low Costs**: Transaction fees are typically less than a penny
**Sharding**: Multiple parallel chains process transactions simultaneously

### Network Resilience

**Fault Tolerance**: Network continues operating even if some validators fail
**Upgradeability**: Network can improve and add features over time
**Global Distribution**: Validators worldwide ensure 24/7 operation
**Economic Sustainability**: Reward system ensures long-term network health

---

## Real-World Network Examples

### DeFi Applications
- **DEXs**: Handle thousands of trades per day on mainnet
- **Lending**: Process millions in loans with 1-2 second finality
- **Yield Farming**: Automatically compound rewards across the network

### NFT Marketplaces
- **Trading**: Instant NFT sales and transfers
- **Minting**: Create new NFTs with minimal fees
- **Royalties**: Automatic payments to creators

### Gaming Applications
- **Real-time**: Games with instant in-game transactions
- **Cross-game**: Assets that work across multiple games
- **Tournaments**: Prize distributions in seconds

---

## Choosing the Right Network

### For Development
1. **Start with Localnet** - Fast iteration and testing
2. **Move to Testnet** - Test with real network conditions
3. **Deploy to Mainnet** - Launch for real users

### For Users
- **Mainnet**: For real applications and valuable transactions
- **Testnet**: For learning and experimenting (free tokens available)
- **Localnet**: For developers and advanced users

---

## The Future of the NEAR Network

### Continuous Improvement
- **Protocol Upgrades**: Regular improvements to speed and security
- **New Features**: Additional functionality based on community needs
- **Ecosystem Growth**: More validators, applications, and users

### Global Impact
- **Financial Inclusion**: Access to financial services worldwide
- **Developer Tools**: Better tools for building Web3 applications
- **User Experience**: Simpler interfaces for everyday users

---

## Key Takeaways

- **Validators** are the guardians of the NEAR network, securing it through economic incentives
- **Proof-of-Stake** ensures security by making attacks economically unfeasible
- **Epochs** provide regular opportunities for network improvement and validator rotation
- **Multiple networks** (mainnet, testnet, localnet) serve different development and usage needs
- **Economic incentives** ensure long-term network security and sustainability
- **Decentralization** provides resistance to censorship and single points of failure
- **Performance** is optimized for speed, low costs, and high throughput

Want to dive deeper into the NEAR runtime? Check out the <a href="../protocol/network/runtime" target="_blank">NEAR Runtime Videos</a>

Understanding the NEAR network helps you build better Web3 applications by knowing which environment to use, what security guarantees to expect, and how the network will evolve over time. This knowledge is essential for creating applications that users can trust with their valuable digital assets!

---

## Quiz

<Quiz course="web3-apps" id="near-network-quiz">
    <MultipleChoice question="What are validators in the NEAR network?">
        <Option> A. Users who create smart contracts on the blockchain.</Option>
        <Option correct> B. Individuals or organizations that run special computers to validate transactions, create blocks, and secure the network.</Option>
        <Option> C. The people who write the NEAR Protocol software code.</Option>
        <Option> D. Companies that provide wallet services for NEAR users.</Option>
    </MultipleChoice>
    <MultipleChoice question="How does Proof-of-Stake ensure network security?">
        <Option> A. By requiring validators to solve complex mathematical puzzles.</Option>
        <Option correct> B. By making attacks economically unfeasible - attackers would need to stake huge amounts of tokens and risk losing them.</Option>
        <Option> C. By using advanced encryption that only validators can break.</Option>
        <Option> D. By having a central authority that monitors all network activity.</Option>
    </MultipleChoice>
    <MultipleChoice question="What is an epoch in the NEAR network?">
        <Option> A. A type of smart contract that handles token transfers.</Option>
        <Option> B. A special type of transaction that creates new blocks.</Option>
        <Option correct> C. A period of time (about 12 hours) when the same set of validators work together to secure the network.</Option>
        <Option> D. A network upgrade that adds new features to the blockchain.</Option>
    </MultipleChoice>
    <MultipleChoice question="What is the main difference between mainnet and testnet?">
        <Option> A. Mainnet is faster than testnet.</Option>
        <Option> B. Testnet has more validators than mainnet.</Option>
        <Option correct> C. Mainnet uses real NEAR tokens with real value, while testnet uses free test tokens for development and testing.</Option>
        <Option> D. Mainnet is more secure than testnet.</Option>
    </MultipleChoice>
    <MultipleChoice question="How do validators earn rewards in the NEAR network?">
        <Option> A. By charging high fees to users for processing transactions.</Option>
        <Option> B. By mining new NEAR tokens using powerful computers.</Option>
        <Option correct> C. By receiving newly created NEAR tokens (targeting 4.5% annual inflation) for securing the network.</Option>
        <Option> D. By selling user data to third parties.</Option>
    </MultipleChoice>
    <MultipleChoice question="What happens to transaction fees in the NEAR network?">
        <Option> A. They are distributed equally among all network users.</Option>
        <Option> B. They are given to the validators as additional rewards.</Option>
        <Option correct> C. They are burned (destroyed), which reduces the total supply of NEAR tokens over time.</Option>
        <Option> D. They are stored in a special fund for network development.</Option>
    </MultipleChoice>
    <MultipleChoice question="Which network should developers use for testing their Web3 applications?">
        <Option> A. Mainnet, because it provides the most realistic testing environment.</Option>
        <Option correct> B. Testnet, because it provides a realistic environment with free test tokens and no risk of losing real money.</Option>
        <Option> C. Localnet, because it has the fastest transaction processing.</Option>
        <Option> D. All networks are equally suitable for testing applications.</Option>
    </MultipleChoice>
</Quiz>
