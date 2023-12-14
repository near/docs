---
id: smart-contract
title: Smart Contract
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section will explain how a smart contract can create DAO or interact with them.

---

### Base Contract

The examples assume that the contract is defined as follows:

```rust
use std::collections::{HashMap, HashSet};
use near_sdk::ext_contract;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::{Base64VecU8, U128, U64, Base58CryptoHash};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, log, Gas, AccountId, Promise, PromiseError};

const DAO_FACTORY_CONTRACT: &str = "sputnikv2.testnet";
const DAO_CONTRACT: &str = "primitives.sputnikv2.testnet";

const TGAS: u64 = 1_000_000_000_000;

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
  dao_factory_contract: AccountId,
  dao_contract: AccountId
}

impl Default for Contract {
    // The default trait with which to initialize the contract
    fn default() -> Self {
        Self {
          dao_factory_contract: DAO_FACTORY_CONTRACT.parse().unwrap(),
          dao_contract: DAO_CONTRACT.parse().unwrap()
        }
    }
}

// Implement the contract structure
#[near_bindgen]
impl Contract {}
```

---

## Create DAO

This snippet will enable your contract to create a DAO.

```rust
// Validator interface, for cross-contract calls
#[ext_contract(ext_dao_factory_contract)]
trait ExternalDaoFactoryContract {
  fn create(&mut self, name: AccountId, args: Base64VecU8) -> Promise;
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
  #[payable]
  pub fn create_dao(&mut self, name: AccountId, args: Base64VecU8) -> Promise {
    let promise = ext_dao_factory_contract::ext(self.dao_factory_contract.clone())
      .with_attached_deposit(env::attached_deposit())
      .with_static_gas(Gas(30*TGAS))
      .create(name, args);

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .with_static_gas(Gas(50*TGAS))
      .external_common_callback()
    )
  }

  #[private] // Public - but only callable by env::current_account_id()
  pub fn external_common_callback(&self, #[callback_result] call_result: Result<(), PromiseError>) {
    // Check if the promise succeeded
    if call_result.is_err() {
      log!("There was an error contacting external contract")
    }
  }
}
```

---

## Create proposal

This snippet assumes that the contract has permissions to create DAO proposals and want to do it.

```rust
// Account ID that represents a token in near-sdk v3
// Need to keep it around for backward compatibility
pub type OldAccountId = String;

// How the voting policy votes get weighted.
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone, PartialEq)]
#[cfg_attr(not(target_arch = "wasm32"), derive(Debug))]
#[serde(crate = "near_sdk::serde")]
pub enum WeightKind {
    // Using token amounts and total delegated at the moment.
    TokenWeight,
    // Weight of the group role. Roles that don't have scoped group are not supported.
    RoleWeight,
}

// Direct weight or ratio to total weight, used for the voting policy
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[cfg_attr(not(target_arch = "wasm32"), derive(Debug, PartialEq))]
#[serde(crate = "near_sdk::serde")]
#[serde(untagged)]
pub enum WeightOrRatio {
    Weight(U128),
    Ratio(u64, u64),
}

// Defines configuration of the vote
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[cfg_attr(not(target_arch = "wasm32"), derive(Debug, PartialEq))]
#[serde(crate = "near_sdk::serde")]
pub struct VotePolicy {
    // Kind of weight to use for votes.
    pub weight_kind: WeightKind,
    // Minimum number required for vote to finalize.
    // If weight kind is TokenWeight - this is minimum number of tokens required.
    //     This allows to avoid situation where the number of staked tokens from total supply is too small.
    // If RoleWeight - this is minimum number of votes.
    //     This allows to avoid situation where the role is got too small but policy kept at 1/2, for example.
    pub quorum: U128,
    // How many votes to pass this vote.
    pub threshold: WeightOrRatio,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[cfg_attr(not(target_arch = "wasm32"), derive(Debug, PartialEq))]
#[serde(crate = "near_sdk::serde")]
pub enum RoleKind {
    // Matches everyone, who is not matched by other roles.
    Everyone,
    // Member greater or equal than given balance. Can use `1` as non-zero balance.
    Member(U128),
    // Set of accounts.
    Group(HashSet<AccountId>),
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[cfg_attr(not(target_arch = "wasm32"), derive(Debug, PartialEq))]
#[serde(crate = "near_sdk::serde")]
pub struct RolePermission {
    // Name of the role to display to the user.
    pub name: String,
    // Kind of the role: defines which users this permissions apply.
    pub kind: RoleKind,
    // Set of actions on which proposals that this role is allowed to execute.
    // <proposal_kind>:<action>
    pub permissions: HashSet<String>,
    // For each proposal kind, defines voting policy.
    pub vote_policy: HashMap<String, VotePolicy>,
}

// Defines voting / decision making policy of this DAO
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[cfg_attr(not(target_arch = "wasm32"), derive(Debug, PartialEq))]
#[serde(crate = "near_sdk::serde")]
pub struct Policy {
    // List of roles and permissions for them in the current policy.
    pub roles: Vec<RolePermission>,
    // Default vote policy. Used when given proposal kind doesn't have special policy.
    pub default_vote_policy: VotePolicy,
    // Proposal bond.
    pub proposal_bond: U128,
    // Expiration period for proposals.
    pub proposal_period: U64,
    // Bond for claiming a bounty.
    pub bounty_bond: U128,
    // Period in which giving up on bounty is not punished.
    pub bounty_forgiveness_period: U64,
}

// Versioned policy
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[cfg_attr(not(target_arch = "wasm32"), derive(Debug, PartialEq))]
#[serde(crate = "near_sdk::serde", untagged)]
pub enum VersionedPolicy {
    // Default policy with given accounts as council.
    Default(Vec<AccountId>),
    Current(Policy),
}

// Function call arguments
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[cfg_attr(not(target_arch = "wasm32"), derive(Clone, Debug))]
#[serde(crate = "near_sdk::serde")]
pub struct ActionCall {
    method_name: String,
    args: Base64VecU8,
    deposit: U128,
    gas: U64,
}

// Bounty information.
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[cfg_attr(not(target_arch = "wasm32"), derive(Debug))]
#[serde(crate = "near_sdk::serde")]
pub struct Bounty {
    /// Description of the bounty.
    pub description: String,
    /// Token the bounty will be paid out.
    /// Can be "" for $NEAR or a valid account id.
    pub token: OldAccountId,
    /// Amount to be paid out.
    pub amount: U128,
    /// How many times this bounty can be done.
    pub times: u32,
    /// Max deadline from claim that can be spend on this bounty.
    pub max_deadline: U64,
}

// Info about factory that deployed this contract and if auto-update is allowed
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[cfg_attr(not(target_arch = "wasm32"), derive(Clone, Debug))]
#[serde(crate = "near_sdk::serde")]
pub struct FactoryInfo {
    pub factory_id: AccountId,
    pub auto_update: bool,
}

// Function call arguments
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[cfg_attr(not(target_arch = "wasm32"), derive(Clone, Debug))]
#[serde(crate = "near_sdk::serde")]
pub struct PolicyParameters {
    pub proposal_bond: Option<U128>,
    pub proposal_period: Option<U64>,
    pub bounty_bond: Option<U128>,
    pub bounty_forgiveness_period: Option<U64>,
}

// Votes recorded in the proposal
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum Vote {
    Approve = 0x0,
    Reject = 0x1,
    Remove = 0x2,
}

// Configuration of the DAO
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Config {
    // Name of the DAO.
    pub name: String,
    // Purpose of this DAO.
    pub purpose: String,
    // Generic metadata. Can be used by specific UI to store additional data.
    // This is not used by anything in the contract.
    pub metadata: Base64VecU8,
}

// Kinds of proposals, doing different action
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[cfg_attr(not(target_arch = "wasm32"), derive(Clone, Debug))]
#[serde(crate = "near_sdk::serde")]
pub enum ProposalKind {
    // Change the DAO config.
    ChangeConfig { config: Config },
    // Change the full policy.
    ChangePolicy { policy: VersionedPolicy },
    // Add member to given role in the policy. This is short cut to updating the whole policy.
    AddMemberToRole { member_id: AccountId, role: String },
    // Remove member to given role in the policy. This is short cut to updating the whole policy.
    RemoveMemberFromRole { member_id: AccountId, role: String },
    // Calls `receiver_id` with list of method names in a single promise.
    // Allows this contract to execute any arbitrary set of actions in other contracts.
    FunctionCall {
        receiver_id: AccountId,
        actions: Vec<ActionCall>,
    },
    // Upgrade this contract with given hash from blob store.
    UpgradeSelf { hash: Base58CryptoHash },
    // Upgrade another contract, by calling method with the code from given hash from blob store.
    UpgradeRemote {
        receiver_id: AccountId,
        method_name: String,
        hash: Base58CryptoHash,
    },
    // Transfers given amount of `token_id` from this DAO to `receiver_id`.
    // If `msg` is not None, calls `ft_transfer_call` with given `msg`. Fails if this base token.
    // For `ft_transfer` and `ft_transfer_call` `memo` is the `description` of the proposal.
    Transfer {
        // Can be "" for $NEAR or a valid account id.
        token_id: OldAccountId,
        receiver_id: AccountId,
        amount: U128,
        msg: Option<String>,
    },
    // Sets staking contract. Can only be proposed if staking contract is not set yet.
    SetStakingContract { staking_id: AccountId },
    // Add new bounty.
    AddBounty { bounty: Bounty },
    // Indicates that given bounty is done by given user.
    BountyDone {
        bounty_id: u64,
        receiver_id: AccountId,
    },
    // Just a signaling vote, with no execution.
    Vote,
    // Change information about factory and auto update.
    FactoryInfoUpdate { factory_info: FactoryInfo },
    // Add new role to the policy. If the role already exists, update it. This is short cut to updating the whole policy.
    ChangePolicyAddOrUpdateRole { role: RolePermission },
    // Remove role from the policy. This is short cut to updating the whole policy.
    ChangePolicyRemoveRole { role: String },
    // Update the default vote policy from the policy. This is short cut to updating the whole policy.
    ChangePolicyUpdateDefaultVotePolicy { vote_policy: VotePolicy },
    // Update the parameters from the policy. This is short cut to updating the whole policy.
    ChangePolicyUpdateParameters { parameters: PolicyParameters },
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct ProposalInput {
    /// Description of this proposal.
    pub description: String,
    /// Kind of proposal with relevant information.
    pub kind: ProposalKind,
}

// Validator interface, for cross-contract calls
#[ext_contract(ext_dao_contract)]
trait ExternalDaoContract {
  fn add_proposal(&mut self, proposal: ProposalInput) -> Promise;
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
  #[payable]
  pub fn create_proposal(&mut self, proposal: ProposalInput) -> Promise {
    let promise = ext_dao_contract::ext(self.dao_contract.clone())
      .with_attached_deposit(env::attached_deposit())
      .with_static_gas(Gas(5*TGAS))
      .add_proposal(proposal);

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .with_static_gas(Gas(50*TGAS))
      .external_proposal_callback()
    )
  }

  #[private] // Public - but only callable by env::current_account_id()
  pub fn external_proposal_callback(&self, #[callback_result] call_result: Result<u64, PromiseError>) -> Option<u64> {
    if call_result.is_err() {
      log!("There was an error contacting external contract");
      return None;
    }

    // Return the proposal id
    let id = call_result.unwrap();
    return Some(id);
  }
}
```

---

## Vote for proposal

This snippet assumes that the contract has permissions to vote on DAO proposals and want to do it.

```rust
// Set of possible action to take
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum Action {
    /// Action to add proposal. Used internally.
    AddProposal,
    /// Action to remove given proposal. Used for immediate deletion in special cases.
    RemoveProposal,
    /// Vote to approve given proposal or bounty.
    VoteApprove,
    /// Vote to reject given proposal or bounty.
    VoteReject,
    /// Vote to remove given proposal or bounty (because it's spam).
    VoteRemove,
    /// Finalize proposal, called when it's expired to return the funds
    /// (or in the future can be used for early proposal closure).
    Finalize,
    /// Move a proposal to the hub to shift into another DAO.
    MoveToHub,
}

// Validator interface, for cross-contract calls
#[ext_contract(ext_dao_contract)]
trait ExternalDaoContract {
  fn act_proposal(&mut self, id: u64, action: Action, memo: Option<String>) -> Promise;
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
  #[payable]
  pub fn act_proposal(&mut self, id: u64, action: Action, memo: Option<String>) -> Promise {
    let promise = ext_dao_contract::ext(self.dao_contract.clone())
      .with_attached_deposit(env::attached_deposit())
      .with_static_gas(Gas(10*TGAS))
      .act_proposal(id, action, memo);

    return promise.then( // Create a promise to callback query_greeting_callback
      Self::ext(env::current_account_id())
      .external_common_callback()
    )
  }

  #[private] // Public - but only callable by env::current_account_id()
  pub fn external_common_callback(&self, #[callback_result] call_result: Result<(), PromiseError>) {
    // Check if the promise succeeded
    if call_result.is_err() {
      log!("There was an error contacting external contract")
    }
  }
}
```
