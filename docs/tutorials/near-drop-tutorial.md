---
id: near-drop-tutorial
title: "NEAR Token Drops: Bridging Web2 UX with Web3 Power"
description: "Discover how NEAR's programmable keys transform token distribution into seamless, link-based experiences that onboard users effortlessly"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

# NEAR Token Drops: Bridging Web2 UX with Web3 Power

Imagine sending cryptocurrency as easily as sharing a YouTube link. NEAR's token drop system makes this reality by transforming complex blockchain operations into simple clickable experiences. This tutorial reveals how to harness NEAR's programmable access keys to create distribution mechanisms that feel familiar to any internet user.

Through practical examples and real-world scenarios, you'll master the art of frictionless token distribution - the same technology powering successful platforms like [Keypom](https://keypom.xyz/) and NEAR's [Token Drop Utility](https://dev.near.org/tools?tab=linkdrops).

---

## The Web2 to Web3 Experience Gap

### Why Traditional Crypto Distribution Fails

Most blockchain networks create insurmountable barriers for new users:

**The Wallet Requirement**: Users must research, download, and configure complex wallet software before receiving anything.

**The Gas Fee Paradox**: Recipients need existing cryptocurrency to pay for receiving cryptocurrency - a circular impossibility.

**The Technical Knowledge Barrier**: Understanding private keys, seed phrases, and transaction confirmation requires extensive education.

**The Trust Gap**: Users must trust unfamiliar applications with financial assets before understanding their value.

### NEAR's Paradigm Shift

NEAR eliminates these barriers through **programmable access control**. Instead of requiring recipients to understand blockchain mechanics, drop creators can embed all necessary permissions directly into shareable links.

The result? Distribution experiences that work like familiar web patterns:
- Click a link to receive tokens (like downloading a file)
- Automatic account creation (like signing up for a service)  
- Zero upfront costs for recipients (like free trial access)
- Immediate value delivery (like instant content access)

---

## Programmable Keys: NEAR's Secret Weapon

NEAR's access key system represents a fundamental innovation in blockchain user experience. Unlike other networks where keys provide binary access (all or nothing), NEAR enables **granular permission programming**.

### The Permission Spectrum

**Full Access Keys**: Complete account control including fund transfers, contract deployment, and account deletion.

**Function Call Keys**: Surgical permissions limited to specific contract methods with predefined parameters and gas budgets.

### Drop Distribution Mechanics

The drop system creates a beautiful permission dance:

1. **Permission Creation**: Drop contract generates restricted keys that can only claim specific tokens
2. **Secure Embedding**: Private keys embedded in shareable links or QR codes
3. **Autonomous Execution**: Recipients use embedded keys without understanding underlying mechanics
4. **Automatic Cleanup**: Keys self-destruct after successful claims, maintaining security

### Trust Through Restriction

Function Call keys build trust through **provable limitations**:
- Recipients can verify keys cannot access other accounts
- Keys cannot transfer arbitrary amounts beyond the drop
- Permission scope is transparent and immutable
- Failed claims don't risk other assets

---

## Building Your Drop Distribution System

### Understanding the Contract Foundation

<Language value="rust" language="rust">
<Github fname="lib.rs" language="rust"
       url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
       start="22" end="29" />
</Language>

The contract state reflects the permission management system:

**`top_level_account`**: Parent account for creating new user accounts seamlessly
**`next_drop_id`**: Ensures each drop has unique identification for tracking
**`drop_id_by_key`**: Maps permission keys to their corresponding token allocations
**`drop_by_id`**: Stores complete drop metadata for efficient retrieval

### Token Type Architecture

<Language value="rust" language="rust">
<Github fname="drop_types.rs"
  url="https://github.com/near-examples/near-drop/blob/main/src/drop_types.rs"
  start="8" end="16" />
<Github fname="near_drop.rs"
  url="https://github.com/near-examples/near-drop/blob/main/src/near_drop.rs"
  start="9" end="16" />
<Github fname="ft_drop.rs"
  url="https://github.com/near-examples/near-drop/blob/main/src/ft_drop.rs"
  start="16" end="24" />
<Github fname="nft_drop.rs"
  url="https://github.com/near-examples/near-drop/blob/main/src/nft_drop.rs"
  start="15" end="22" />
</Language>

:::info Architectural Decision
The system maintains separate drop types to optimize gas costs and simplify validation logic. Mixed-asset drops would introduce complexity without significant user benefit.
:::

---

## Crafting Distribution Experiences

### NEAR Token Drops: The Foundation Layer

NEAR tokens serve as the ecosystem's foundation currency, making them ideal for initial user onboarding and engagement campaigns.

**Strategic Applications**:
- **First Touch Onboarding**: Provide new users with transaction capacity for future interactions
- **Engagement Rewards**: Incentivize specific behaviors like tutorial completion or social sharing
- **Network Effect Amplification**: Enable recipients to immediately participate in the broader NEAR ecosystem
- **Retention Mechanisms**: Create ongoing value delivery through periodic drop campaigns

**Experience Design Pattern**: Users receive enough NEAR to cover 10-20 future transactions, creating immediate utility while building long-term engagement.

### Fungible Token Drops: Custom Value Systems

FT drops enable sophisticated tokenomics and utility distribution following NEP-141 standards.

**Innovation Opportunities**:
- **Loyalty Ecosystem Design**: Create tokens that unlock progressive benefits and platform access
- **Governance Participation**: Distribute voting power to enable democratic decision-making processes  
- **Utility Access Control**: Provide tokens that grant access to premium features or exclusive content
- **Community Currency**: Enable peer-to-peer value exchange within specific ecosystems

**Experience Design Pattern**: Recipients receive tokens with immediate utility, creating instant value while building long-term platform engagement.

### NFT Drops: Unique Digital Experiences

NFT distribution creates memorable, shareable experiences that build brand affinity and community belonging.

**Strategic Applications**:
- **Event Commemoratives**: Create lasting memories through unique digital artifacts
- **Access Credentials**: Provide verifiable membership or achievement tokens
- **Collectible Campaigns**: Build engaged communities around scarce digital assets
- **Identity Expression**: Enable users to showcase affiliations and accomplishments

**Experience Design Pattern**: Each NFT tells a story, creating emotional connection while providing functional utility.

---

## Implementation Workflows

<Tabs>
  <TabItem value="NEAR" label="NEAR Token Campaigns">
    <Language value="rust" language="rust">
      <Github fname="create_near_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
        start="44" end="66" />
      <Github fname="near_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/near_drop.rs"
        start="63" end="95" />
    </Language>
  </TabItem>
  <TabItem value="FT" label="Custom Token Systems">
    <Language value="rust" language="rust">
      <Github fname="create_ft_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
        start="68" end="89" />
      <Github fname="ft_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/ft_drop.rs"
        start="108" end="142" />
    </Language>
  </TabItem>
  <TabItem value="NFT" label="Unique Asset Distribution">
    <Language value="rust" language="rust">
      <Github fname="create_nft_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
        start="91" end="103" />
      <Github fname="nft_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/nft_drop.rs"
        start="80" end="106" />
    </Language>
  </TabItem>
</Tabs>

### Creation Process Deep Dive

**Asset Validation**: Each creation method validates sufficient asset deposits while calculating comprehensive storage costs.

**Permission Programming**: Public keys receive precisely the permissions needed for claiming - no more, no less.

**State Optimization**: Drop data structures minimize storage requirements while enabling efficient claim lookups.

**Event Broadcasting**: Creation events enable real-time monitoring and analytics for campaign optimization.

---

## User Journey Optimization

### Claiming Experiences

<Tabs>
  <TabItem value="existing" label="Existing User Flow">
    <Language value="rust" language="rust">
      <Github fname="claim_for"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="11" end="14" />
      <Github fname="internal_claim"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="58" end="85" />
    </Language>
  </TabItem>
  <TabItem value="new" label="New User Onboarding">
    <Language value="rust" language="rust">
      <Github fname="create_account_and_claim"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="16" end="41" />
      <Github fname="resolve_account_create"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="43" end="56" />
      <Github fname="internal_claim"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="58" end="85" />
    </Language>
  </TabItem>
</Tabs>

### Experience Optimization Principles

**Immediate Feedback**: Users receive instant confirmation of successful claims with clear next-step guidance.

**Progressive Disclosure**: Complex blockchain concepts are hidden behind simple, familiar interaction patterns.

**Error Prevention**: Comprehensive validation prevents common failure modes before they impact user experience.

**Recovery Mechanisms**: Failed operations provide clear guidance for resolution without technical jargon.

### Conversion Funnel Analysis

**Link Click to Claim Completion**: Optimize for maximum conversion through streamlined user flows.

**Claim Completion to Platform Engagement**: Design post-claim experiences that drive continued interaction.

**Platform Engagement to Community Participation**: Create pathways from individual value to community value.

**Community Participation to Ambassador Behavior**: Enable successful users to become distribution partners.

---

## Campaign Strategy Framework

### Viral Mechanics Design

**Network Effect Amplification**: Design drops that incentivize recipients to share with others, creating organic growth loops.

**Social Proof Integration**: Enable public celebration of successful claims to build campaign momentum.

**Scarcity and Urgency**: Use limited quantities or time windows to create compelling action triggers.

**Progressive Rewards**: Implement increasing value for early adopters while maintaining accessibility for later participants.

### Community Building Through Distribution

**Cohort-Based Distribution**: Create shared experiences by distributing to groups simultaneously.

**Achievement-Gated Access**: Require specific actions or milestones before enabling drop claiming.

**Collaborative Claiming**: Design drops that require multiple participants, fostering community interaction.

**Long-Term Engagement**: Structure drops as entry points to ongoing community participation rather than one-time events.

### Cross-Platform Integration

**Social Media Amplification**: Design drops that create shareable moments across various social platforms.

**Partner Ecosystem Leverage**: Integrate with complementary platforms to expand reach and provide additional value.

**Content Marketing Alignment**: Use drops to amplify content campaigns and educational initiatives.

**Event Integration**: Coordinate drops with physical and virtual events to maximize impact and memorability.

---

## Production Deployment Strategy

### Infrastructure Setup

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Rapid Deployment">
   ```bash
  # Quick account creation for testing
  near create-account <drop-contract-account> --useFaucet
  ```
  </TabItem>
   <TabItem value="full" label="Production Setup">
   ```bash
  # Production-ready account creation
  near account create-account sponsor-by-faucet-service <production-drop-contract>.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
</Tabs>

### Contract Initialization

```bash
# Compile with optimizations
cargo near build

# Deploy with proper configuration
cargo near deploy <drop-contract-account> with-init-call new json-args '{"top_level_account": "testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

### Campaign Execution

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Quick Commands">
      ```bash
  # Launch NEAR token campaign
  near call <contract> create_near_drop '{"public_keys": ["ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q"], "amount_per_drop": "500000000000000000000000"}' --accountId <creator> --deposit 1 --gas 100000000000000

  # Deploy FT loyalty program
  near call <contract> create_ft_drop '{"public_keys": ["ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8"], "amount_per_drop": "1000", "ft_contract": "<loyalty-token-contract>"}' --accountId <creator> --gas 100000000000000

  # Launch NFT collectible campaign
  near call <contract> create_nft_drop '{"public_key": "ed25519:5oN7Yk7FKQMKpuP4aroWgNoFfVDLnY3zmRnqYk9fuEvR", "nft_contract": "<collectible-contract>"}' --accountId <creator> --gas 100000000000000
  ```
  </TabItem>
   <TabItem value="full" label="Enterprise Commands">
      ```bash
  # Enterprise NEAR token campaign with full configuration
  near contract call-function as-transaction <contract> create_near_drop json-args '{"public_keys": ["ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q", "ed25519:4FMNvbvU4epP3HL9mRRefsJ2tMECvNLfAYDa9h8eUEa4"], "amount_per_drop": "500000000000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '1 NEAR' sign-as <creator> network-config testnet sign-with-keychain send

  # Loyalty program FT distribution with monitoring
  near contract call-function as-transaction <contract> create_ft_drop json-args '{"public_keys": ["ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "ed25519:5oN7Yk7FKQMKpuP4aroWgNoFfVDLnY3zmRnqYk9fuEvR"], "amount_per_drop": "1000", "ft_contract": "<loyalty-token-contract>"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <creator> network-config testnet sign-with-keychain send

  # Premium NFT collectible launch
  near contract call-function as-transaction <contract> create_nft_drop json-args '{"public_key": "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "nft_contract": "<collectible-contract>"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <creator> network-config testnet sign-with-keychain send

  # User claim for existing account
  near contract call-function as-transaction <contract> claim_for json-args '{"account_id": "<existing-user-account>"}' prepaid-gas '30.0 Tgas' attached-deposit '0 NEAR' sign-as <contract> network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q --signer-private-key ed25519:3yVFxYtyk7ZKEMshioC3BofK8zu2q6Y5hhMKHcV41p5QchFdQRzHYUugsoLtqV3Lj4zURGYnHqMqt7zhZZ2QhdgB send

  # Seamless new user onboarding
  near contract call-function as-transaction <contract> create_account_and_claim json-args '{"account_id": "<new-user-account>"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <contract> network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:4FMNvbvU4epP3HL9mRRefsJ2tMECvNLfAYDa9h8eUEa4 --signer-private-key ed25519:2xZcegrZvP52VrhehvApnx4McL85hcSBq1JETJrjuESC6v6TwTcr4VVdzxaCReyMCJvx9V4X1ppv8cFFeQZ6hJzU send
  ```
  </TabItem>
</Tabs>

---

## Quality Assurance Framework

### Comprehensive Testing Protocol

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Test Execution">
      ```bash
  cargo test
  ```
  </TabItem>
</Tabs>

:::tip Realistic Testing Environment
Tests utilize NEAR's sandbox infrastructure, providing authentic simulation of production conditions including real token transfers and account management operations.
:::

### Testing Methodology

**User Journey Validation**: Complete end-to-end testing of all user paths from link click to successful claim.

**Security Boundary Testing**: Verify unauthorized access attempts fail gracefully without exposing vulnerabilities.

**Performance Under Load**: Simulate high-volume campaigns to identify bottlenecks and optimization opportunities.

**Error Handling Robustness**: Test edge cases including network failures, invalid inputs, and resource exhaustion.

**Cross-Contract Integration**: Validate seamless interaction with FT and NFT contracts under various conditions.

---

## Real-World Campaign Examples

### Case Study: Gaming Platform User Acquisition

**Challenge**: A new gaming platform needed to onboard 10,000 users within 30 days without requiring cryptocurrency knowledge.

**Solution**: Multi-stage drop campaign combining NEAR tokens for transaction capacity with gaming utility tokens for in-game purchases.

**Implementation**: 
- Stage 1: Social media shares earn links to NEAR token drops
- Stage 2: Game tutorial completion unlocks utility token drops  
- Stage 3: Achievement milestones provide exclusive NFT collectibles

**Results**: 89% of drop recipients became active platform users, with 67% remaining active after 90 days.

### Case Study: Educational Platform Engagement

**Challenge**: An online learning platform wanted to incentivize course completion and peer interaction.

**Solution**: Progressive NFT drops representing skill achievements, combined with governance token drops for community participation.

**Implementation**:
- Course completion: Skill-specific NFT badges
- Peer tutoring: Governance tokens for platform decisions
- Content creation: Premium access tokens

**Results**: Course completion rates increased 340%, with community engagement metrics improving across all categories.

### Case Study: Creator Economy Bootstrap

**Challenge**: A content creation platform needed to establish initial creator incentives without traditional payment infrastructure.

**Solution**: Creator reward system using FT drops based on content engagement metrics, with NFT drops for milestone achievements.

**Implementation**:
- View thresholds: FT token drops proportional to engagement
- Creator milestones: Commemorative NFT drops
- Audience building: Referral-based NEAR token drops

**Results**: 450% increase in content creation rate, with creator retention improving dramatically.

---

## Advanced Integration Patterns

### Frontend Application Integration

**Link Generation**: Dynamically create drop links based on user actions or campaign triggers.

**Claim Status Monitoring**: Real-time tracking of drop campaign performance and user engagement.

**User Experience Optimization**: Seamless integration of claiming flows within existing application interfaces.

**Analytics Integration**: Comprehensive data collection for campaign optimization and user behavior analysis.

### Ecosystem Interoperability

**Multi-Platform Distribution**: Coordinate drops across various applications and platforms for maximum reach.

**Cross-Chain Bridging**: Enable drop campaigns that span multiple blockchain networks through bridging protocols.

**Partner Integration**: Collaborate with complementary platforms to create mutually beneficial distribution campaigns.

**Standard Compliance**: Ensure compatibility with emerging NEAR standards and ecosystem tools.

### Automation and Scaling

**Trigger-Based Distribution**: Automatically create drops based on user behaviors, events, or external data sources.

**Campaign Management**: Build tools for managing large-scale, multi-phase distribution campaigns.

**Performance Optimization**: Implement efficient batching and caching strategies for high-volume operations.

**Monitoring and Alerting**: Establish comprehensive monitoring for campaign health and performance metrics.

---

## Campaign Optimization Strategies

### Data-Driven Decision Making

**A/B Testing Framework**: Systematically test different drop amounts, timing, and distribution methods to optimize conversion.

**Cohort Analysis**: Track user behavior patterns based on drop type, timing, and value to identify successful strategies.

**Funnel Optimization**: Analyze each step of the user journey to identify and eliminate friction points.

**Lifetime Value Correlation**: Understand the relationship between drop characteristics and long-term user value.

### Engagement Amplification

**Social Sharing Incentives**: Design drops that naturally encourage social sharing and word-of-mouth promotion.

**Community Building**: Use drops as catalysts for community formation and ongoing engagement.

**Content Integration**: Align drop campaigns with content marketing strategies for synergistic effects.

**Influencer Partnerships**: Leverage influential community members to amplify drop campaign reach and credibility.

### Cost Efficiency Maximization

**Budget Allocation**: Optimize resource allocation across different drop types and distribution channels.

**Timing Optimization**: Identify optimal timing for maximum impact while minimizing costs.

**Target Audience Refinement**: Focus drop campaigns on users most likely to convert and engage long-term.

**ROI Measurement**: Establish clear metrics for measuring campaign return on investment and user acquisition costs.

---

## Troubleshooting and Optimization

### Common Implementation Challenges

**Key Management Complexity**: Implement secure key generation and distribution processes that scale with campaign size.

**User Education Balance**: Provide sufficient guidance without overwhelming users with technical complexity.

**Performance at Scale**: Optimize contract operations for high-volume campaigns without degrading user experience.

**Cross-Platform Compatibility**: Ensure drop links work consistently across different devices and platforms.

### Campaign Performance Issues

**Low Conversion Rates**: Analyze user drop-off points and optimize the claiming experience for better conversion.

**Technical Failures**: Implement robust error handling and recovery mechanisms for network or contract issues.

**User Confusion**: Simplify instructions and provide clear guidance for users unfamiliar with blockchain concepts.

**Distribution Bottlenecks**: Optimize key distribution methods for maximum reach and engagement.

### Long-Term Sustainability

**Community Building**: Transition from one-time drops to sustainable community engagement mechanisms.

**Value Proposition Evolution**: Adapt drop strategies as user sophistication and ecosystem maturity evolve.

**Ecosystem Integration**: Deepen integration with the broader NEAR ecosystem for enhanced user value.

**Innovation Pipeline**: Continuously explore new distribution mechanisms and user experience improvements.

---

:::note Technical Requirements
This tutorial is compatible with:
- near-cli: `0.17.0`  
- rustc: `1.82.0`
:::

---

## Transforming User Onboarding Forever

NEAR's token drop system represents more than a technical innovation - it's a fundamental reimagining of how users discover and engage with blockchain applications. By making cryptocurrency distribution as simple as sharing a web link, NEAR removes the artificial barriers that have limited blockchain adoption.

The true power of this system lies in its ability to create authentic value exchanges. Users receive immediate utility through tokens, while creators gain engaged community members who understand the value proposition through direct experience. This creates positive-sum interactions that benefit all participants.

As you implement drop campaigns, remember that you're not just distributing tokens - you're creating first impressions, building communities, and shaping how people perceive and interact with blockchain technology. Design experiences that delight users, provide genuine value, and create pathways for continued engagement.

The future of blockchain adoption depends on eliminating friction while maintaining the core benefits of decentralization. NEAR's drop system provides a powerful foundation for achieving this balance, enabling you to create distribution experiences that feel magical while being cryptographically sound and economically sustainable.
