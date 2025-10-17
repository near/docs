---
id: data-flow
title: Understanding Data Flow in NEAR Protocol
sidebar_label: 🔄 Data Flow & Transactions
description: Learn how data moves through NEAR Protocol - understand transactions, receipts, gas fees, and how the blockchain processes your requests step by step.
---

import { Quiz, MultipleChoice, Option } from "@site/src/components/Academy/Quiz";
import Progress from "@site/src/components/Academy/Progress";

<Progress course="web3-apps" total={3} />

Now that you understand what Web3 apps are, let's dive deeper into how data actually flows through the NEAR Protocol blockchain. Understanding data flow is crucial for building Web3 applications because it helps you predict how your app will behave and how much it will cost to operate.

Think of data flow like understanding how mail moves through a postal system - from when you drop a letter in the mailbox to when it reaches its destination.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/VSBJ-A69Km4?si=kr809VfUq8dsjOKf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## The Three Building Blocks of Data Flow

Every time you use a Web3 app (like sending tokens, calling a smart contract, or updating data), your action creates a journey through the blockchain that follows specific rules and steps.

### 1. Transactions - Your Instructions

A **transaction** is like a written instruction that tells the blockchain what you want to do. It contains:
- **Who** is making the request (your wallet address)
- **What** you want to do (send tokens, call a function, etc.)
- **Where** it should go (which account or smart contract)
- **How much** you're willing to pay (gas fee)
- **Your signature** (proof that you authorized this action)

Think of a transaction like filling out a form at the bank - you specify exactly what you want to do, sign it, and hand it over.

### 2. Receipts - Internal Messages

When your transaction is processed, it gets converted into a **receipt**. A receipt is like an internal message that the blockchain uses to communicate between different parts of the network.

**Key points about receipts:**
- They're created automatically from your transaction
- They travel between different parts of the blockchain (called shards)
- They contain the actual work that needs to be done
- They're processed in the next available block

### 3. Gas - The Fuel for Operations

**Gas** is the fee you pay to use the blockchain. Think of it like paying for electricity - you pay based on how much "computing power" your transaction needs.

**Important gas facts:**
- Gas costs are **fixed and predictable** - the same action always costs the same amount
- You pay upfront when you submit your transaction
- If you pay too much, you get a refund
- Gas prevents spam and keeps the network running smoothly

---

## The Complete Data Flow Journey

Let's follow a simple example: Alice wants to send 5 NEAR tokens to Bob.

### Step 1: Transaction Creation
Alice creates a transaction in her wallet app:
- **From:** alice.near
- **To:** bob.near  
- **Amount:** 5 NEAR
- **Gas:** 0.000045 NEAR (automatic)

### Step 2: Transaction Processing (Block 1)
- Alice's transaction is sent to the blockchain
- The network immediately validates it and deducts gas fees
- A receipt is created containing the transfer instruction
- This happens in about 1 second

### Step 3: Receipt Execution (Block 2)
- The receipt travels to Bob's shard (the part of the blockchain where Bob's account lives)
- The actual token transfer happens
- Bob's balance increases by 5 NEAR
- Alice's balance decreases by 5 NEAR

### Step 4: Gas Refund (Block 3)
- If Alice paid more gas than needed, she gets a refund
- This completes the entire process

**Total time:** About 1-2 seconds for a simple transfer.

---

## Understanding Shards - The Blockchain's Neighborhoods

NEAR Protocol uses **shards** to handle many transactions simultaneously. Think of shards like different neighborhoods in a city:

- Each shard can process transactions independently
- Accounts are distributed across different shards
- Receipts travel between shards when needed
- This allows NEAR to handle thousands of transactions per second

### Same Shard vs. Different Shards

**Same Shard (Faster):**
- Alice and Bob are in the same neighborhood
- No travel time needed for receipts
- Slightly faster processing

**Different Shards (Still Fast):**
- Alice and Bob are in different neighborhoods  
- Receipts travel between shards
- Still completes in 2-3 seconds

---

## Gas Fees in Detail

### How Gas Works
Gas fees are calculated using two components:
1. **Gas Units** - Fixed amount of "work" each action requires
2. **Gas Price** - Current cost per unit (changes based on network demand)

### Common Gas Costs (at minimum price)
| Action | Cost in NEAR |
|--------|--------------|
| Send tokens | 0.000045 Ⓝ |
| Create account | 0.000042 Ⓝ |
| Deploy small contract | 0.000265 Ⓝ |
| Function call | Up to 0.03 Ⓝ |

*Note: These are tiny amounts - less than a penny in most cases!*

### Gas Refunds
- If you attach more gas than needed, you get most of it back
- There's a small fee for over-estimating (to encourage accurate estimates)
- This prevents people from attaching huge amounts of gas unnecessarily

---

## Smart Contract Interactions

When you interact with smart contracts, the data flow becomes more complex but follows the same principles:

### Simple Function Call
1. **Transaction:** You call a function on a smart contract
2. **Receipt:** The function executes and may create new receipts
3. **Results:** You get the function's return value
4. **Refund:** Unused gas is returned

### Cross-Contract Calls
Smart contracts can call other smart contracts, creating a chain of receipts:
1. Your transaction calls Contract A
2. Contract A calls Contract B
3. Contract B calls Contract C
4. Each call creates receipts that are processed in sequence

---

## Transaction Status and Errors

### Success vs. Failure
- **Success:** All actions in your transaction completed successfully
- **Failure:** One or more actions failed, and the transaction is marked as failed
- **Partial Success:** Your transaction succeeded, but some internal calls failed

### What Happens When Things Go Wrong?
- If your transaction fails, you still pay gas fees (the network did work to process it)
- Failed transactions don't change the blockchain state
- You can retry with the same or different parameters

---

## Real-World Examples

### DeFi Trading
1. You want to swap tokens on a DEX
2. Your transaction calls the swap function
3. The DEX contract calls the token contracts
4. Multiple receipts are created and processed
5. You receive your swapped tokens

### NFT Purchase
1. You buy an NFT from a marketplace
2. Your transaction pays the seller and transfers the NFT
3. The marketplace contract handles the escrow
4. Multiple receipts ensure everything happens atomically

---

## Key Takeaways

- **Transactions** are your instructions to the blockchain
- **Receipts** are internal messages that carry out the work
- **Gas fees** are predictable and usually very small
- **Shards** allow the network to process many transactions simultaneously
- **Data flow** typically completes in 2-3 seconds
- **Smart contracts** can create chains of receipts for complex operations
- **Refunds** ensure you only pay for the work actually performed

Understanding data flow helps you build better Web3 applications by knowing exactly how your users' actions will be processed and what they'll cost. This knowledge is essential for creating smooth user experiences and accurate cost estimates!

---

## Quiz

<Quiz course="web3-apps" id="data-flow-quiz">
    <MultipleChoice question="What is a transaction in the context of NEAR Protocol?">
        <Option> A. A receipt that travels between shards.</Option>
        <Option correct> B. A written instruction that tells the blockchain what you want to do, containing who, what, where, and your signature.</Option>
        <Option> C. The gas fee you pay for using the blockchain.</Option>
        <Option> D. A smart contract that processes user requests.</Option>
    </MultipleChoice>
    <MultipleChoice question="What happens when your transaction is processed by the blockchain?">
        <Option> A. It immediately executes all actions and returns results.</Option>
        <Option correct> B. It gets converted into a receipt that contains the work to be done.</Option>
        <Option> C. It creates multiple new transactions automatically.</Option>
        <Option> D. It gets stored permanently without any processing.</Option>
    </MultipleChoice>
    <MultipleChoice question="How are gas fees calculated in NEAR Protocol?">
        <Option> A. Gas fees are random and change unpredictably.</Option>
        <Option> B. Gas fees are based on how much you're willing to pay for faster processing.</Option>
        <Option correct> C. Gas fees are calculated using fixed gas units multiplied by the current gas price.</Option>
        <Option> D. Gas fees are only charged when transactions fail.</Option>
    </MultipleChoice>
    <MultipleChoice question="What are shards in NEAR Protocol?">
        <Option> A. Different types of smart contracts on the blockchain.</Option>
        <Option correct> B. Different parts of the blockchain that can process transactions independently, like neighborhoods in a city.</Option>
        <Option> C. Different types of wallets that users can choose from.</Option>
        <Option> D. Different versions of the NEAR Protocol software.</Option>
    </MultipleChoice>
    <MultipleChoice question="How long does a typical token transfer take to complete on NEAR Protocol?">
        <Option> A. 10-15 minutes, similar to other blockchains.</Option>
        <Option> B. 5-10 seconds depending on network congestion.</Option>
        <Option correct> C. 2-3 seconds for most simple transfers.</Option>
        <Option> D. 1 hour to ensure maximum security.</Option>
    </MultipleChoice>
    <MultipleChoice question="What happens if you attach more gas than needed to a transaction?">
        <Option> A. Your transaction gets processed faster with priority.</Option>
        <Option> B. The extra gas is burned and lost forever.</Option>
        <Option correct> C. You get most of the unused gas refunded, minus a small fee.</Option>
        <Option> D. The transaction automatically fails to prevent overpayment.</Option>
    </MultipleChoice>
</Quiz>
