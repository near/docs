---
id: near-drop-tutorial
title: "Mastering NEAR Token Distribution with Drop Contracts"
description: "Build powerful token distribution systems using NEAR's access key mechanics to eliminate user onboarding friction"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

# Mastering NEAR Token Distribution with Drop Contracts

Creating seamless token distribution experiences is crucial for blockchain adoption. NEAR's drop contracts revolutionize how we share tokens by eliminating the complexity of wallet setup, gas fees, and blockchain mechanics for end users.

This tutorial explores building distribution systems that work like magic links - users simply click and receive tokens, with accounts created automatically behind the scenes. We'll examine the innovative use of NEAR's access key system that makes this possible.

:::tip Real-World Impact
This tutorial covers the foundational patterns used by successful NEAR projects like [Keypom](https://keypom.xyz/) and NEAR's official [Token Drop Utility](https://dev.near.org/tools?tab=linkdrops) for user acquisition and engagement.
:::

---

## The Token Distribution Challenge

Modern blockchain applications face a fundamental chicken-and-egg problem: how do you give someone their first tokens when they don't have a wallet, don't understand gas fees, and have never interacted with a blockchain?

### Traditional Distribution Pain Points

**Account Prerequisites**: Users must create wallets, understand private keys, and manage accounts before receiving anything.

**Gas Fee Barriers**: Recipients need existing tokens to pay transaction fees, creating circular dependencies.

**Technical Complexity**: Users must understand blockchain concepts, transaction signing, and network mechanics.

**Poor Conversion Rates**: Complex onboarding flows lose 80-90% of potential users at each step.

### NEAR's Revolutionary Approach

NEAR solves these challenges through **programmable access keys** - a unique feature that enables contracts to act on behalf of users in controlled ways. This creates distribution experiences that feel like traditional web applications while maintaining blockchain security.

---

## Access Key Innovation Deep Dive

NEAR's access key system is fundamentally different from other blockchains. Instead of just "all or nothing" account control, NEAR supports **graduated permissions** that enable sophisticated user experiences.

### Full Access vs Function Call Keys

**Full Access Keys**: Complete account control - can transfer funds, deploy contracts, manage other keys, and delete accounts.

**Function Call Keys**: Restricted permissions - can only call specific methods on specific contracts with predefined gas limits.

### The Drop Contract Pattern

Drop contracts leverage Function Call keys to create a powerful distribution mechanism:

1. **Key Generation**: Contract generates ephemeral key pairs for each drop
2. **Permission Binding**: Public keys added as Function Call keys restricted to claim methods
3. **Secure Distribution**: Private keys shared via links, QR codes, or direct transfer
4. **Autonomous Claiming**: Users can claim tokens without existing NEAR accounts

### Security Through Restriction

Function Call keys provide security through **principle of least privilege**:
- Keys cannot access other accounts or contracts
- Keys cannot call unauthorized methods
- Keys cannot exceed predefined gas limits  
- Keys become worthless after successful claims

---

## Token Drop Architecture

The drop system supports three distinct asset types, each optimized for different distribution scenarios.

### Contract State Management

<Language value="rust" language="rust">
<Github fname="lib.rs" language="rust"
       url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
       start="22" end="29" />
</Language>

The contract maintains four critical data structures:

**`top_level_account`**: Account used for creating new user accounts (typically "testnet" or "mainnet")
**`next_drop_id`**: Monotonic counter ensuring unique drop identification
**`drop_id_by_key`**: Efficient lookup from public keys to their associated drops
**`drop_by_id`**: Complete drop metadata indexed by unique identifiers

### Drop Type Specifications

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

:::info Design Principle
Each drop contains exactly one asset type to maintain simplicity and predictable gas costs. Mixed-asset drops would require complex validation and could lead to partial failure scenarios.
:::

---

## Distribution Strategies by Asset Type

### NEAR Token Distribution

Native NEAR tokens serve as the foundation for all network activity. NEAR drops are ideal for:

**Ecosystem Onboarding**: Give new users their first NEAR tokens to cover future transaction fees
**Growth Marketing**: Reward social media engagement, referrals, or community participation  
**Event Distribution**: Provide attendees with participation tokens at conferences or meetups
**Developer Incentives**: Reward open source contributions or hackathon participation

**Use Case Example**: A DeFi protocol distributes 1 NEAR to users who complete educational modules, ensuring they have tokens for future protocol interaction.

### Fungible Token Distribution

Custom tokens following NEP-141 standard enable sophisticated tokenomics and utility systems:

**Loyalty Programs**: Distribute points that unlock premium features or discounts
**Governance Participation**: Give users voting tokens for DAO decisions
**Utility Access**: Provide tokens that grant access to paid services or premium content
**Rewards Systems**: Incentivize specific behaviors with token rewards

**Use Case Example**: A gaming platform distributes governance tokens to early players, enabling them to vote on game mechanics and earn rewards for participation.

### NFT Distribution

Unique digital assets create special experiences and proof of participation:

**Event Tickets**: Distribute access tokens that also serve as commemorative collectibles
**Achievement Badges**: Award unique tokens for completing challenges or milestones
**Exclusive Content**: Provide access tokens for premium content or experiences
**Identity Tokens**: Create verifiable credentials or membership indicators

**Use Case Example**: A music festival distributes NFT tickets that include backstage access, with the NFT becoming a valuable collectible after the event.

---

## Drop Creation Workflows

All drop types follow a consistent creation pattern while handling asset-specific requirements.

<Tabs>
  <TabItem value="NEAR" label="NEAR Token Drops">
    <Language value="rust" language="rust">
      <Github fname="create_near_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
        start="44" end="66" />
      <Github fname="near_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/near_drop.rs"
        start="63" end="95" />
    </Language>
  </TabItem>
  <TabItem value="FT" label="Fungible Token Drops">
    <Language value="rust" language="rust">
      <Github fname="create_ft_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/lib.rs"
        start="68" end="89" />
      <Github fname="ft_drop"
        url="https://github.com/near-examples/near-drop/blob/main/src/ft_drop.rs"
        start="108" end="142" />
    </Language>
  </TabItem>
  <TabItem value="NFT" label="NFT Drops">
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

### Creation Process Analysis

**Deposit Validation**: Each creation method first validates that sufficient assets have been provided to cover all requested drops plus associated storage costs.

**Key Registration**: Public keys are registered as Function Call keys on the contract itself, with permissions limited exclusively to claim methods.

**State Updates**: Drop metadata is stored efficiently, with mappings created between keys and drop identifiers for fast claim lookups.

**Event Emission**: Creation events are emitted for indexing and monitoring purposes, enabling analytics and user interfaces.

---

## Economic Considerations

### Storage Cost Breakdown

Drop creation incurs three distinct storage costs that creators must account for:

**Drop Metadata Storage**: Bytes required for storing the `Drop` struct containing all drop information
**Key Mapping Storage**: Space needed for maintaining `PublicKey -> DropId` relationships in contract state
**Access Key Registration**: Network fee for adding each Function Call key to the contract's account

The third cost is unique to NEAR's access key system - it's not just data storage but actually registering permissions with the network's access control system.

### Gas Optimization Strategies

**Batch Processing**: Create multiple drops in single transactions to amortize fixed costs across operations
**Efficient Data Structures**: Use minimal data representations to reduce storage requirements
**Lazy Cleanup**: Remove expired or claimed drop data to recover storage deposits
**Predictable Limits**: Set reasonable bounds on drop quantities to prevent gas exhaustion

---

## Claim Mechanisms

The contract provides two distinct claiming workflows optimized for different user scenarios.

<Tabs>
  <TabItem value="existing" label="Existing Account Claims">
    <Language value="rust" language="rust">
      <Github fname="claim_for"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="11" end="14" />
      <Github fname="internal_claim"
        url="https://github.com/near-examples/near-drop/blob/main/src/claim.rs"
        start="58" end="85" />
    </Language>
  </TabItem>
  <TabItem value="new" label="New Account Creation">
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

### Claim Flow Analysis

**Key Authentication**: The contract validates that the transaction is signed with a private key corresponding to a registered Function Call key.

**Drop Resolution**: Using the key-to-drop mapping, the contract identifies which drop is being claimed.

**Asset Transfer**: Appropriate tokens are transferred based on the drop type (NEAR, FT, or NFT).

**State Cleanup**: Drop counters are decremented, and fully-claimed drops are removed to recover storage costs.

**Access Revocation**: Used Function Call keys are removed to prevent reuse and maintain security.

### Account Creation Deep Dive

The new account creation flow demonstrates NEAR's sophisticated permission system:

1. **Cross-Contract Call**: Drop contract calls the account creation system
2. **Callback Handling**: Result handling through promise resolution
3. **Atomic Operations**: Account creation and token transfer happen atomically
4. **Error Recovery**: Failed account creation doesn't consume the drop

---

## Production Deployment Strategies

### Environment Setup

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Quick Setup">
   ```bash
  # Create deployment account
  near create-account <accountId> --useFaucet
  ```
  </TabItem>
   <TabItem value="full" label="Full Setup">
   ```bash
  # Create deployment account with full configuration
  near account create-account sponsor-by-faucet-service <my-drop-contract>.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
  ```
  </TabItem>
</Tabs>

### Contract Deployment

```bash
# Build optimized contract
cargo near build

# Deploy with initialization
cargo near deploy <accountId> with-init-call new json-args '{"top_level_account": "testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

### Operational Commands

<Tabs groupId="cli-tabs">
  <TabItem value="short" label="Essential Commands">
      ```bash
  # Create NEAR drop
  near call <contract> create_near_drop '{"public_keys": ["ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q"], "amount_per_drop": "1000000000000000000000000"}' --accountId <account> --deposit 2 --gas 100000000000000

  # Create FT drop
  near call <contract> create_ft_drop '{"public_keys": ["ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8"], "amount_per_drop": "100", "ft_contract": "<ft-contract>"}' --accountId <account> --gas 100000000000000

  # Create NFT drop
  near call <contract> create_nft_drop '{"public_key": "ed25519:5oN7Yk7FKQMKpuP4aroWgNoFfVDLnY3zmRnqYk9fuEvR", "nft_contract": "<nft-contract>"}' --accountId <account> --gas 100000000000000
  ```
  </TabItem>
   <TabItem value="full" label="Detailed Commands">
      ```bash
  # Create NEAR drop with full syntax
  near contract call-function as-transaction <contract> create_near_drop json-args '{"public_keys": ["ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q", "ed25519:4FMNvbvU4epP3HL9mRRefsJ2tMECvNLfAYDa9h8eUEa4"], "amount_per_drop": "1000000000000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '2 NEAR' sign-as <account> network-config testnet sign-with-keychain send

  # Create FT drop with full syntax
  near contract call-function as-transaction <contract> create_ft_drop json-args '{"public_keys": ["ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "ed25519:5oN7Yk7FKQMKpuP4aroWgNoFfVDLnY3zmRnqYk9fuEvR"], "amount_per_drop": "100", "ft_contract": "<ft-contract-id>"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <account> network-config testnet sign-with-keychain send

  # Create NFT drop with full syntax
  near contract call-function as-transaction <contract> create_nft_drop json-args '{"public_key": "ed25519:HcwvxZXSCX341Pe4vo9FLTzoRab9N8MWGZ2isxZjk1b8", "nft_contract": "<nft-contract-id>"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <account> network-config testnet sign-with-keychain send

  # Claim to existing account
  near contract call-function as-transaction <contract> claim_for json-args '{"account_id": "<recipient-account>"}' prepaid-gas '30.0 Tgas' attached-deposit '0 NEAR' sign-as <contract> network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:AvBVZDQrg8pCpEDFUpgeLYLRGUW8s5h57NGhb1Tc4H5q --signer-private-key ed25519:3yVFxYtyk7ZKEMshioC3BofK8zu2q6Y5hhMKHcV41p5QchFdQRzHYUugsoLtqV3Lj4zURGYnHqMqt7zhZZ2QhdgB send

  # Claim with account creation
  near contract call-function as-transaction <contract> create_account_and_claim json-args '{"account_id": "<new-account-name>"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as <contract> network-config testnet sign-with-plaintext-private-key --signer-public-key ed25519:4FMNvbvU4epP3HL9mRRefsJ2tMECvNLfAYDa9h8eUEa4 --signer-private-key ed25519:2xZcegrZvP52VrhehvApnx4McL85hcSBq1JETJrjuESC6v6TwTcr4VVdzxaCReyMCJvx9V4X1ppv8cFFeQZ6hJzU send
  ```
  </TabItem>
</Tabs>

---

## Quality Assurance and Testing

### Comprehensive Test Suite

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust Testing">
      ```bash
  cargo test
  ```
  </TabItem>
</Tabs>

:::tip Testing Environment
The integration tests utilize NEAR's sandbox environment, providing realistic simulation of mainnet conditions including actual token transfers and account creation.
:::

### Critical Test Scenarios

**Multi-Asset Validation**: Verify each drop type works correctly with proper token standards compliance
**Concurrent Claims**: Test behavior when multiple users attempt to claim simultaneously
**Edge Case Handling**: Validate responses to malformed inputs, insufficient deposits, and network errors
**Security Boundaries**: Confirm unauthorized keys cannot claim drops and access is properly restricted
**Performance Limits**: Test contract behavior under high load and maximum storage scenarios

### Production Readiness Checklist

- [ ] All test scenarios pass consistently
- [ ] Gas costs are optimized and predictable
- [ ] Storage costs are calculated and documented
- [ ] Error messages are user-friendly
- [ ] Monitoring and analytics are implemented
- [ ] Key generation is cryptographically secure
- [ ] Distribution channels are secure and reliable

---

## Enterprise Integration Patterns

### Marketing Campaign Integration

**Social Media Campaigns**: Generate drops for viral marketing, with each share or engagement earning tokens
**Influencer Partnerships**: Provide influencers with batches of drops to distribute to their audiences
**Event Marketing**: Create time-limited drops that create urgency and drive attendance
**Cross-Platform Promotion**: Use drops to bridge Web2 and Web3 audiences seamlessly

### Product Onboarding Flows

**Progressive Onboarding**: Start users with small NEAR drops, then provide FT/NFT drops as they engage more
**Feature Unlocking**: Use token drops to gradually introduce users to advanced platform features
**Achievement Systems**: Reward user milestones with appropriate token types based on their progression
**Retention Mechanics**: Implement recurring drops to maintain long-term user engagement

### DAO and Community Building

**Governance Bootstrap**: Distribute voting tokens to establish initial governance participation
**Proposal Incentives**: Reward quality proposal submissions with governance tokens
**Participation Rewards**: Provide drops for attending meetings, voting on proposals, or contributing to discussions
**Committee Formation**: Use NFT drops to create exclusive access groups for specialized DAO functions

---

## Monitoring and Analytics

### Key Performance Indicators

**Drop Creation Rate**: Monitor how quickly organizations are adopting the drop system
**Claim Success Rate**: Track percentage of created drops that are successfully claimed
**User Conversion**: Measure how many recipients become active NEAR users after claiming
**Cost Efficiency**: Analyze cost per acquisition compared to traditional marketing channels

### Operational Metrics

**Gas Usage Patterns**: Identify optimization opportunities in contract operations  
**Storage Growth**: Monitor state growth to predict scaling requirements
**Error Frequencies**: Track common failure modes to improve user experience
**Network Load**: Understand impact on NEAR network during high-volume campaigns

### Business Intelligence

**User Journey Analysis**: Track user behavior from drop receipt through ongoing platform engagement
**Campaign Effectiveness**: Compare different drop strategies and asset types for user acquisition
**Retention Correlation**: Analyze relationship between drop value/type and long-term user retention
**Network Effects**: Measure viral coefficients and organic growth from drop campaigns

---

## Advanced Implementation Considerations

### Security Hardening

**Rate Limiting**: Implement protections against rapid key exhaustion attacks
**Validation Enhancement**: Add additional checks for key format, deposit amounts, and contract interactions
**Access Monitoring**: Log all drop creation and claim activities for security auditing
**Emergency Controls**: Implement pause functionality for responding to security incidents

### Scalability Optimizations

**Horizontal Scaling**: Design patterns for distributing drops across multiple contract instances
**State Management**: Implement efficient cleanup strategies for managing large-scale drop campaigns
**Network Distribution**: Consider regional deployment strategies for global drop campaigns
**Load Balancing**: Design systems to handle viral campaign spikes without degradation

### Future-Proofing Architecture

**Upgrade Patterns**: Design contracts with upgradeability in mind for evolving requirements
**Standard Compliance**: Ensure compatibility with emerging NEAR standards and protocols
**Interoperability**: Consider integration points with other NEAR ecosystem tools and platforms
**Analytics Integration**: Build hooks for comprehensive business intelligence and user analytics

---

## Troubleshooting Production Issues

### Common Drop Creation Problems

**Insufficient Deposits**: Ensure attached deposits cover both drop amounts and all associated storage costs
**Invalid Key Formats**: Validate that all public keys follow proper ED25519 formatting standards  
**Storage Limitations**: Monitor contract storage usage to prevent hitting NEAR's storage limits
**Network Congestion**: Implement retry logic for handling temporary network unavailability

### Claim Process Failures

**Key Mismatch**: Verify private keys correspond exactly to registered public keys in the contract
**Account Conflicts**: Handle cases where desired account names are already taken during creation
**Token Contract Issues**: Ensure FT and NFT contracts are responsive and have sufficient token supplies
**Gas Estimation Errors**: Provide sufficient gas for complex operations like account creation with drops

### Performance and Reliability Issues  

**Transaction Timeout**: Implement proper timeout handling and retry mechanisms for failed operations
**State Synchronization**: Handle eventual consistency issues in high-frequency drop scenarios
**Monitoring Gaps**: Ensure comprehensive logging covers all critical operations and error conditions
**Recovery Procedures**: Document and test procedures for recovering from various failure scenarios

---

:::note Version Compatibility
This tutorial is compatible with:
- near-cli: `0.17.0`
- rustc: `1.82.0`
:::

---

## Conclusion

NEAR's token drop system represents a paradigm shift in blockchain user onboarding. By leveraging the unique properties of Function Call access keys, developers can create distribution experiences that eliminate traditional blockchain friction while maintaining security and decentralization.

The power of this system lies not just in its technical capabilities, but in its ability to bridge the gap between Web2 user expectations and Web3 possibilities. Users can receive and interact with blockchain assets through familiar patterns - clicking links, following simple instructions - while the underlying system handles complex cryptographic operations transparently.

As you implement drop systems, focus on the user experience first. The technical sophistication should be invisible to end users, creating experiences that feel magical while being cryptographically sound. Start with simple use cases and gradually expand to more sophisticated distribution strategies as you understand your users' needs and behaviors.

The future of blockchain adoption depends on reducing friction, and NEAR's drop contracts provide one of the most powerful tools available for achieving that goal.
