---
id: near-drop-tutorial
title: "Building Token Drop Systems on NEAR"
description: "Learn how to create and manage token drops using NEAR's Function Call keys for seamless user onboarding"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

# Building Token Drop Systems on NEAR

Token drops are a powerful mechanism for distributing cryptocurrencies and digital assets to users without requiring them to have existing accounts or technical knowledge. On NEAR Protocol, drops leverage unique features like Function Call keys to create seamless onboarding experiences that feel familiar to Web2 users.

This tutorial will teach you how to build a complete token drop system, covering the concepts, implementation strategies, and best practices for creating user-friendly token distribution mechanisms.

## What You'll Learn

- Understanding token drops and their real-world use cases
- Leveraging NEAR's unique Function Call keys for gasless transactions  
- Implementing drops for different token types (NEAR, FT, NFT)
- Security considerations and best practices
- Testing and deployment strategies

## Prerequisites

- Basic understanding of smart contracts
- Familiarity with NEAR Protocol concepts
- Rust programming knowledge (helpful but not required)

---

## Understanding Token Drops

### The Traditional Problem

Traditional cryptocurrency transactions create barriers for new users:
- Recipients must have existing blockchain accounts
- Users need to understand wallet mechanics and seed phrases
- Gas fees create friction for small transactions
- Technical knowledge requirements exclude mainstream adoption

### The NEAR Solution

NEAR Drops eliminate these barriers by creating a Web2-like experience:
- **Gasless Claims**: Users don't need NEAR tokens to claim drops
- **Account Creation**: New accounts are created automatically during claiming
- **Secure Links**: Private keys embedded in shareable links enable easy distribution
- **Multiple Token Types**: Support for NEAR tokens, fungible tokens, and NFTs

This approach enables use cases like conference attendee rewards, marketing campaigns, and user onboarding programs that would be impractical with traditional blockchain interactions.

---

## Core Concepts

### Function Call Keys: The Secret Sauce

NEAR's Function Call keys are restricted access keys that can only call specific methods on specific contracts. Unlike full access keys, they provide:

- **Limited Scope**: Can only execute predetermined contract methods
- **Security**: No risk of account takeover or unauthorized transactions  
- **Gasless Execution**: The contract account pays for gas, not the key holder
- **Automatic Cleanup**: Keys can be removed after use to maintain security

### Drop Lifecycle

Understanding the complete flow helps you design better drop experiences:

1. **Drop Creation**: Creator deposits tokens and generates unique key pairs
2. **Key Registration**: Public keys are added to the contract as Function Call keys
3. **Link Generation**: Private keys are encoded into shareable URLs
4. **Distribution**: Links are shared via email, QR codes, or social media
5. **Claiming**: Recipients use links to claim tokens (with or without existing accounts)
6. **Cleanup**: Exhausted drops are removed to optimize storage costs

---

## Types of Token Drops

### NEAR Token Drops

Direct distribution of NEAR's native cryptocurrency, ideal for:
- **User Onboarding**: Give new users their first NEAR tokens
- **Event Rewards**: Conference attendees, workshop participants
- **Marketing Campaigns**: Social media engagement rewards

**Key Considerations:**
- Account creation requires minimum balance (~0.1 NEAR)
- Consider drop amounts that enable meaningful transactions
- Plan for storage costs when creating many drops

### Fungible Token (FT) Drops  

Custom token distribution following the NEP-141 standard:
- **Loyalty Programs**: Points, rewards, membership tokens
- **Governance Tokens**: DAO participation rights
- **Utility Tokens**: Access to services or features

**Implementation Notes:**
- Requires integration with existing FT contracts
- Verify token contract compatibility before deployment
- Consider token economics and total supply implications

### Non-Fungible Token (NFT) Drops

Unique digital asset distribution for:
- **Collectibles**: Digital art, trading cards, memorabilia  
- **Access Tokens**: Event tickets, membership badges
- **Certificates**: Course completion, achievement recognition

**Special Considerations:**
- Each NFT drop is unique and one-time use
- Metadata and royalty considerations
- Integration with NFT marketplaces

---

## Implementation Architecture

### Contract State Management

The drop contract efficiently manages three critical data structures:

<Github fname="lib.rs" language="rust"
       url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
       start="22" end="29" />

**Key Design Decisions:**
- `drop_id_by_key` enables O(1) lookup during claiming
- `drop_by_id` stores minimal data to reduce storage costs  
- `next_drop_id` provides unique identifiers without collisions

### Security Model

The contract implements defense-in-depth security:

**Access Control**: Function Call keys can only execute claim methods
**Input Validation**: All parameters are sanitized and validated
**State Consistency**: Atomic operations prevent partial state updates
**Resource Management**: Storage costs are calculated and charged upfront

### Drop Types Implementation

<Language value="rust" language="rust">
<Github fname="drop_types.rs"
   url="https://github.com/near-examples/near-drop/blob/main/src/drop_types.rs"
   start="8" end="16" />
</Language>

Each drop type encapsulates its specific requirements while sharing common claiming logic.

---

## Creating Drops: Best Practices

### Planning Your Drop Strategy

Before implementation, consider:

**Audience**: Who are your recipients? Existing crypto users or newcomers?
**Distribution Method**: Email links, QR codes, or social media?
**Timing**: Immediate claiming or time-delayed campaigns?
**Scale**: Individual drops or mass distribution?

### Storage Cost Optimization

Drop creation involves three types of storage costs:

1. **Drop Data Storage**: The actual drop information (amount, type, etc.)
2. **Key Mapping Storage**: PublicKey → DropId relationships  
3. **Access Key Storage**: Adding keys to the contract account

<Tabs>
  <TabItem value="NEAR" label="NEAR Drop Creation">
    <Language value="rust" language="rust">
      <Github fname="create_near_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
        start="44" end="66" />
    </Language>
  </TabItem>
  <TabItem value="FT" label="FT Drop Creation">
    <Language value="rust" language="rust">
      <Github fname="create_ft_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
        start="68" end="89" />
    </Language>
  </TabItem>
  <TabItem value="NFT" label="NFT Drop Creation">
    <Language value="rust" language="rust">
      <Github fname="create_nft_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
        start="91" end="103" />
    </Language>
  </TabItem>
</Tabs>

**Optimization Strategies:**
- Batch create multiple drops in single transaction
- Use efficient key generation algorithms
- Plan drop lifecycle to minimize storage duration

---

## Claiming Process: User Experience Design

### Two Claiming Paths

The contract supports both existing and new users:

<Tabs>
  <TabItem value="existing" label="Existing Account">
    <Language value="rust" language="rust">
      <Github fname="claim_for"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="11" end="14" />
      <Github fname="internal_claim"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="58" end="85" />
    </Language>
  </TabItem>
  <TabItem value="new" label="New Account">
    <Language value="rust" language="rust">
      <Github fname="create_account_and_claim"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="16" end="41" />
    </Language>
  </TabItem>
</Tabs>

### Error Handling and Edge Cases

Design your claiming interface to handle:
- **Invalid Keys**: Clear error messages for expired or invalid links
- **Already Claimed**: Informative feedback when drops are exhausted  
- **Account Name Conflicts**: Alternative suggestions for new account creation
- **Network Issues**: Retry logic and offline capability

---

## Testing Strategies

### Comprehensive Test Coverage

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
    ```bash
    cargo test
    ```
  </TabItem>
</Tabs>

**Unit Tests**: Test individual drop creation and claiming functions
**Integration Tests**: Verify end-to-end workflows with real token contracts
**Security Tests**: Attempt unauthorized access and input validation
**Performance Tests**: Load testing with many concurrent drops

:::tip
The integration tests use a sandbox to create NEAR users and simulate realistic contract interactions.
:::

### Testing Checklist

- [ ] Drop creation with valid parameters
- [ ] Drop creation with invalid/insufficient funds  
- [ ] Successful claiming for existing accounts
- [ ] Successful account creation and claiming
- [ ] Attempt to claim with invalid keys
- [ ] Attempt to double-claim the same drop
- [ ] Storage cost calculations accuracy
- [ ] Key cleanup after drop exhaustion

---

## Deployment and Operations

### Initial Deployment

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Quick Setup">
    ```bash
    # Create account
    near create-account <accountId> --useFaucet
    
    # Build and deploy
    cargo near build
    cargo near deploy <accountId> with-init-call new json-args '{"top_level_account": "testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
    ```
  </TabItem>
</Tabs>

### Operational Considerations

**Monitoring**: Track drop creation rates, claim success rates, and failed transactions
**Maintenance**: Regular cleanup of expired drops to optimize storage costs
**Scaling**: Consider multi-contract architecture for high-volume deployments  
**Security**: Monitor for unusual claiming patterns that might indicate attacks

---

## Real-World Applications

### Case Study: Conference Onboarding

A blockchain conference wants to give attendees their first NEAR tokens:

1. **Pre-Event**: Create 1000 NEAR drops with 1 NEAR each
2. **Distribution**: Generate QR codes for registration packets
3. **Onboarding**: Attendees scan QR codes to create accounts and claim tokens
4. **Follow-up**: Claimed tokens enable immediate dApp exploration

**Key Success Factors:**
- Clear instructions for first-time users
- Sufficient drop amounts for meaningful transactions
- Mobile-optimized claiming interface
- On-site support for technical issues

### Case Study: NFT Art Drop

An artist launching a new collection uses NFT drops for community building:

1. **Creation**: Mint limited edition NFTs specifically for drops
2. **Community Building**: Share drop links with engaged social media followers  
3. **Scarcity**: Create urgency with limited quantities and time windows
4. **Utility**: NFTs include benefits like exclusive content or future drops

---

## Security Best Practices

### Key Management

**Generation**: Use cryptographically secure random number generators
**Distribution**: Secure channels prevent interception (HTTPS, encrypted messages)
**Rotation**: Regularly rotate keys for long-running drop campaigns
**Revocation**: Ability to disable compromised keys quickly

### Smart Contract Security

**Input Validation**: Sanitize all external inputs
**Access Controls**: Verify caller permissions for administrative functions  
**Reentrancy Protection**: Use proper patterns for external contract calls
**Overflow Protection**: Safe math operations for token amounts

### Operational Security

**Monitoring**: Automated alerts for unusual activity patterns
**Rate Limiting**: Prevent spam attacks on drop creation
**Geographic Restrictions**: IP-based limitations if required by regulations
**Audit Trail**: Comprehensive logging for compliance and debugging

---

## Advanced Features and Extensions

### Conditional Drops

Extend basic drops with additional requirements:
- **Time-based**: Drops only claimable during specific windows
- **Location-based**: Geographic restrictions using oracles
- **Social-based**: Require social media engagement proof
- **Skill-based**: Quiz or task completion requirements

### Batch Operations

Optimize for scale with batch functionality:
- **Mass Creation**: Deploy thousands of drops in single transactions
- **Bulk Distribution**: Automated link generation and delivery
- **Analytics Integration**: Track campaign performance across drop batches

### Cross-Contract Integration

Build ecosystem-wide drop systems:
- **Multi-token Drops**: Combine NEAR, FT, and NFT in single claims
- **Referral Systems**: Reward users who share drops successfully  
- **Loyalty Programs**: Progressive rewards based on claim history

---

## Troubleshooting Common Issues

### Drop Creation Problems

**Insufficient Funds**: Verify account balance covers tokens + storage costs
**Invalid Parameters**: Check token contract addresses and amount formats
**Key Generation Errors**: Ensure proper entropy sources for key creation

### Claiming Failures

**Expired Keys**: Check if Function Call keys have time restrictions
**Account Name Conflicts**: Handle duplicate account creation attempts gracefully
**Token Transfer Issues**: Verify token contract integration and allowances

### Performance Issues

**High Storage Costs**: Implement efficient cleanup mechanisms
**Slow Claims**: Optimize contract logic and reduce cross-contract calls
**Network Congestion**: Plan for peak usage periods and gas price fluctuations

---

## Conclusion

NEAR's drop system represents a significant advancement in blockchain user experience, removing traditional barriers while maintaining security and decentralization. The combination of Function Call keys, automatic account creation, and gasless transactions creates opportunities for mainstream adoption that weren't possible with earlier blockchain architectures.

Key takeaways for successful drop implementation:

**User Experience First**: Design for users who have never used blockchain before
**Security by Design**: Implement proper key management and access controls from the start  
**Plan for Scale**: Consider storage costs and operational overhead early
**Test Thoroughly**: Comprehensive testing prevents costly mistakes in production

The future of blockchain adoption depends on removing friction from user onboarding. Token drops, when implemented thoughtfully, provide a bridge between Web2 expectations and Web3 capabilities.

### Next Steps

1. **Experiment**: Deploy the example contract and create test drops
2. **Customize**: Modify the contract for your specific use case requirements
3. **Integrate**: Build frontend interfaces that hide blockchain complexity
4. **Scale**: Consider advanced features like conditional drops and batch operations
5. **Monitor**: Implement analytics to measure and improve user experience

Start simple, test thoroughly, and gradually add complexity as your understanding and requirements evolve.

:::note Versioning Information
At the time of this writing, this tutorial works with the following versions:
- near-cli: `0.17.0`
- rustc: `1.82.0`
:::

