---
id: dao
title: Decentralized Autonomous Organizations
sidebar_label: Autonomous Organizations (DAO)
hide_table_of_contents: false
description: "Learn about Decentralized Autonomous Organizations (DAOs) on NEAR - self-organized groups that coordinate membership, decision-making, and funding through smart contract voting."
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

Decentralized Autonomous Organizations (DAOs) are self-organized groups that form around common purposes. Membership, decision-making, and funding are coordinated by publicly voting on proposals through a smart contract.

![dao](/docs/primitives/dao.png)

In contrast with [FT](ft.md) and [NFT](nft.md), DAO contract's are not standardized. Because of this, on this page we will use as
reference the [Astra dao](https://dev.near.org/astraplusplus.ndctools.near/widget/home?page=daos) [contract](https://github.com/near-daos/sputnik-dao-contract). The main concepts covered here should
easily generalizable to other DAO implementations.

:::tip
The simplest way to create and interact with a DAO is to go through the [AstraDAO UI](https://near.social/astraplusplus.ndctools.near/widget/home?page=daos).
:::

---

## Create a DAO

You can create a DAO by interacting with the `sputnik-dao` contract:

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

    ```js
    import { useEffect } from 'react';
    import { useWalletSelector } from '@near-wallet-selector/react-hook';

    const { callFunction } = useWalletSelector();

    const handleCreateDAO = async () => {
      const result = await callFunction({
        method: 'create',
        args: {
          name: 'primitives',
          args: btoa({
            config: {
              name: 'Primitives',
              purpose: 'Building primitives on NEAR',
              metadata: '',
            },
            policy: ['bob.near'],
          }),
        },
        contractId: DAO_FACTORY_CONTRACT_ADDRESS,
        gas: 300000000000000,
        deposit: 6000000000000000000000000,
      });
    };
    ```
    :::note
    The full list of roles and permissions you can find [here](https://github.com/near-daos/sputnik-dao-contract#roles-and-permissions).
    :::

   _The `callFunction` function comes from our [Wallet Selector](/tools/wallet-selector#sign-and-send-transaction)_
  
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

    ```bash
    export COUNCIL='["bob.near"]'
    export ARGS=`echo '{"config": {"name": "Primitives", "purpose": "Building primitives on NEAR", "metadata":""}, "policy": '$COUNCIL'}' | base64`

    near call sputnikv2.testnet create "{\"name\": \"primitives\", \"args\": \"$ARGS\"}" --accountId bob.near --amount 6 --gas 150000000000000
    ```

    :::note
    The full list of roles and permissions you can find [here](https://github.com/near-daos/sputnik-dao-contract#roles-and-permissions).
    :::
    
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/dao/create-dao.json" />

      :::note
      You can find the complete list of [roles and permissions here](https://github.com/near-daos/sputnik-dao-contract#roles-and-permissions).
      :::

  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">

    ```rust
    // Validator interface, for cross-contract calls
    #[ext_contract(ext_dao_factory_contract)]
    trait ExternalDaoFactoryContract {
      fn create(&mut self, name: AccountId, args: Base64VecU8) -> Promise;
    }

    // Implement the contract structure
    #[near]
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
  </TabItem>
</Tabs>

:::tip
The simplest way to create and interact with a DAO is to go through the [AstraDAO UI](https://near.social/astraplusplus.ndctools.near/widget/home?page=daos).
:::

<hr className="subsection" />

### Using Global Contract

You can deploy a new DAO using our global contract - a pre-deployed [a Sputnik DAO contract](https://github.com/near-daos/sputnik-dao-contract/tree/main/sputnikdao2) that you can reuse. [Global contracts](../smart-contracts/global-contracts.md) are deployed once and can be reused by any account without incurring high storage costs.

<Tabs groupId="code-tabs">
  <TabItem value="By AccountId" label="account">

    ```bash
    near contract deploy <account-id> use-global-account-id dao.globals.primitives.testnet \
      with-init-call new \
      json-args '{"config": {"name": "Primitives", "purpose": "Building primitives on NEAR", "metadata":""}, "policy": ["<account-id>"]}' \
      prepaid-gas '100.0 Tgas' \
      attached-deposit '0 NEAR' \
      network-config testnet \
      sign-with-keychain \
      send
    ```

  </TabItem>
  <TabItem value="By Hash" label="hash">

    ```bash
    near contract deploy <account-id> use-global-hash Ea8tHXFSQVszVwGASyzAfLq65DjcRDhkfab4FcPaRpgD \
      with-init-call new \
      json-args '{"config": {"name": "Primitives", "purpose": "Building primitives on NEAR", "metadata":""}, "policy": ["<account-id>"]}' \
      prepaid-gas '100.0 Tgas' \
      attached-deposit '0 NEAR' \
      network-config testnet \
      sign-with-keychain \
      send
    ```

  </TabItem>
</Tabs>

:::note
Deploying by **hash** creates an immutable contract that never changes. Deploying by **account ID** creates an updatable contract that changes when the referenced account's contract is updated. Choose based on whether you want your FT contract to be updatable or permanent.
:::

<hr className="subsection" />

### Voting policy
Currently, DAOs support two different types of [voting policies](https://github.com/near-daos/sputnik-dao-contract#voting-policy): `TokenWeight`, and `RoleWeight`.

When the vote policy is `TokenWeight`, the council votes using [tokens](ft.md). The weigh of a vote is the proportion of tokens used for voting over the token's total supply.

When the vote policy is `RoleWeight(role)`, the vote weigh is computed as "one over the total number of people with the role".

<details>
<summary> Voting Threshold </summary>
Both voting policies further include a `threshold` for passing a proposal, which can be a ratio or a fixed number.

The ratio indicates that you need a proportion of people/tokens to approve the proposal (e.g. half the people need to vote, and to vote positively). A fixed number indicated that you need a specific number of votes/tokens to pass the proposal (e.g. 3 people/tokens are enough to approve the proposal).
</details>

---

## List of DAOs

Query the list of DAOs existing in Sputnik Dao.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
  
    ```js
    import { useWalletSelector } from '@near-wallet-selector/react-hook';

    const DAO_FACTORY_CONTRACT_ADDRESS = 'sputnik-dao.near';
    const { viewFunction } = useWalletSelector();
    useEffect(() => {
      viewFunction({ 
        contractId: DAO_FACTORY_CONTRACT_ADDRESS, 
        method: 'get_dao_list' 
        })
        .then((response) => console.log(response));
    }, []);
    ```

  _The `viewFunction` function comes from our [Wallet Selector](/tools/wallet-selector#sign-and-send-transactions)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

      ```bash
      near view sputnik-dao.near get_dao_list '{}'
      ```
  <details>
  <summary>Example response</summary>
  <p>

      ```bash
      [
        'ref-finance.sputnik-dao.near'
        'gaming-dao.sputnik-dao.near',
        ...
      ]
      ```
  </p>
  </details>  
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
  <TryOutOnLantstool path="docs/2.build/5.primitives/dao/dao-list.json" />
  <details>
  <summary>Example response</summary>

  ```bash
  [
    'ref-finance.sputnik-dao.near'
    'gaming-dao.sputnik-dao.near',
    ...
  ]
  ```
  </details>
  </TabItem>
</Tabs>

---

## Query Existing Proposals

These snippets will enable you to query the proposals existing in a particular DAO.

<Tabs groupId="code-tabs">
 <TabItem value="🌐 WebApp" label="🌐 WebApp">
   
    ```js
    import { useWalletSelector } from '@near-wallet-selector/react-hook';

    const DAO_CONTRACT_ADDRESS = 'nearweek-news-contribution.sputnik-dao.near';
    const { viewFunction } = useWalletSelector();
    useEffect(() => {
      viewFunction({ 
        contractId: DAO_CONTRACT_ADDRESS, 
        method: 'get_proposals' 
        args: { from_index: 9262, limit: 2 },
        })
        .then((response) => console.log(response));
    }, []);
    ```
 _The `viewFunction` function comes from our [Wallet Selector](/tools/wallet-selector#sign-and-send-transactions)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

    ```bash
    near view nearweek-news-contribution.sputnik-dao.near get_proposals '{"from_index": 9262, "limit": 2}'
    ```
  <details>
    <summary>Example response</summary>
    <p>

    ```bash
    [
      {
        id: 9262,
        proposer: 'pasternag.near',
        description: 'NEAR, a top non-EVM blockchain, has gone live on Router’s Testnet Mandara. With Router Nitro, our flagship dApp, users in the NEAR ecosystem can now transfer test tokens to and from NEAR onto other supported chains. $$$$https://twitter.com/routerprotocol/status/1727732303491961232',
        kind: {
          Transfer: {
            token_id: '',
            receiver_id: 'pasternag.near',
            amount: '500000000000000000000000',
            msg: null
          }
        },
        status: 'Approved',
        vote_counts: { council: [ 1, 0, 0 ] },
        votes: { 'brzk-93444.near': 'Approve' },
        submission_time: '1700828277659425683'
      },
      {
        id: 9263,
        proposer: 'fittedn.near',
        description: 'How to deploy BOS component$$$$https://twitter.com/BitkubAcademy/status/1728003163318563025?t=PiN6pwS380T1N4JuQXSONA&s=19',
        kind: {
          Transfer: {
            token_id: '',
            receiver_id: 'fittedn.near',
            amount: '500000000000000000000000',
            msg: null
          }
        },
        status: 'InProgress',
        vote_counts: { 'Whitelisted Members': [ 1, 0, 0 ] },
        votes: { 'trendheo.near': 'Approve' },
        submission_time: '1700832601849419123'
      }
    ]
    ```
  </p>
  </details>
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
  <TryOutOnLantstool path="docs/2.build/5.primitives/dao/query-exist-proposals.json" />
  <details>
  <summary>Example response</summary>

  ```bash
  [
    {
      "id": 9262,
      "proposer": "pasternag.near",
      "description": "NEAR, a top non-EVM blockchain, has gone live on Router’s Testnet Mandara. With Router Nitro, our flagship dApp, users in the NEAR ecosystem can now transfer test tokens to and from NEAR onto other supported chains. $$$$https://twitter.com/routerprotocol/status/1727732303491961232",
      "kind": {
        "Transfer": {
          "token_id": "",
          "receiver_id": "pasternag.near",
          "amount": "500000000000000000000000",
          "msg": null
        }
      },
      "status": "Approved",
      "vote_counts": {
        "council": [1, 0, 0]
      },
      "votes": {
        "brzk-93444.near": "Approve"
      },
      "submission_time": "1700828277659425683"
    },
    {
      "id": 9263,
      "proposer": "fittedn.near",
      "description": "How to deploy BOS component$$$$https://twitter.com/BitkubAcademy/status/1728003163318563025?t=PiN6pwS380T1N4JuQXSONA&s=19",
      "kind": {
        "Transfer": {
          "token_id": "",
          "receiver_id": "fittedn.near",
          "amount": "500000000000000000000000",
          "msg": null
        }
      },
      "status": "Expired",
      "vote_counts": {
        "Whitelisted Members": [2, 0, 0]
      },
      "votes": {
        "trendheo.near": "Approve",
        "vikash.near": "Approve"
      },
      "submission_time": "1700832601849419123"
    }
  ]
  ```
  </details>
  </TabItem>
</Tabs>

---

## Create proposal

Create a proposal so other users can vote in favor or against it.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
   
    ```js
    import { useWalletSelector } from '@near-wallet-selector/react-hook';

    const DAO_CONTRACT_ADDRESS = 'primitives.sputnik-dao.near';
    const { callFunction } = useWalletSelector();

    const handleAddProposal = async () => {
      const result = await callFunction({
        method: 'add_proposal',
        args: {
          proposal: {
            description: 'My first proposal',
            kind: {
              Transfer: {
                token_id: '',
                receiver_id: 'bob.near',
                amount: '10000000000000000000000000',
              },
            },
          },
        },
        contractId: DAO_CONTRACT_ADDRESS,
        gas: 300000000000000,
        deposit: 100000000000000000000000,
      });
      console.log(result);
    };
    ```

   _The `callFunction` function comes from our [Wallet Selector](/tools/wallet-selector#sign-and-send-transaction)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    
   ```bash
    near call primitives.sputnik-dao.near add_proposal '{"proposal": {"description": "My first proposal", "kind": { "Transfer": {"token_id": "", "receiver_id": "bob.near", "amount": "10000000000000000000000000"}}}}'  --deposit 0.1 --gas 300000000000000 --accountId bob.near
  ```
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/dao/create-proposal.json" />
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
    
  ```rust
  // Account ID that represents a token in near-sdk v3
  // Need to keep it around for backward compatibility
  pub type OldAccountId = String;

  // How the voting policy votes get weighted.
  #[near(serializers = [json, borsh])
  #[derive(Clone, PartialEq)]
  #[cfg_attr(not(target_arch = "wasm32"), derive(Debug))]
  pub enum WeightKind {
    // Using token amounts and total delegated at the moment.
    TokenWeight,
    // Weight of the group role. Roles that don't have scoped group are not supported.
    RoleWeight,
  }

  // Direct weight or ratio to total weight, used for the voting policy
  #[near(serializers = [json, borsh])
  #[derive(Clone)]
  #[cfg_attr(not(target_arch = "wasm32"), derive(Debug, PartialEq))]
  #[serde(untagged)]
  pub enum WeightOrRatio {
    Weight(U128),
    Ratio(u64, u64),
  }

  // Defines configuration of the vote
  #[near(serializers = [json, borsh])
  #[derive(Clone)]
  #[cfg_attr(not(target_arch = "wasm32"), derive(Debug, PartialEq))]
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

  #[near(serializers = [json, borsh])]
  #[derive(Clone)]
  #[cfg_attr(not(target_arch = "wasm32"), derive(Debug, PartialEq))]
  pub enum RoleKind {
    // Matches everyone, who is not matched by other roles.
    Everyone,
    // Member greater or equal than given balance. Can use `1` as non-zero balance.
    Member(U128),
    // Set of accounts.
    Group(HashSet<AccountId>),
  }

  #[near(serializers = [json, borsh])]
  #[derive(Clone)]
  #[cfg_attr(not(target_arch = "wasm32"), derive(Debug, PartialEq))]
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
  #[near(serializers = [json, borsh])]
  #[derive(Clone)]
  #[cfg_attr(not(target_arch = "wasm32"), derive(Debug, PartialEq))]
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
  #[near(serializers = [json, borsh])]
  #[derive(Clone)]
  #[cfg_attr(not(target_arch = "wasm32"), derive(Debug, PartialEq))]
  pub enum VersionedPolicy {
    // Default policy with given accounts as council.
    Default(Vec<AccountId>),
    Current(Policy),
  }

  // Function call arguments
  #[near(serializers = [json, borsh])]
  #[cfg_attr(not(target_arch = "wasm32"), derive(Clone, Debug))]
  pub struct ActionCall {
    method_name: String,
    args: Base64VecU8,
    deposit: U128,
    gas: U64,
  }

  // Bounty information.
  #[near(serializers = [json, borsh])]
  #[derive(Clone)]
  #[cfg_attr(not(target_arch = "wasm32"), derive(Debug))]
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
  #[near(serializers = [json, borsh])]
  #[cfg_attr(not(target_arch = "wasm32"), derive(Clone, Debug))]
  pub struct FactoryInfo {
    pub factory_id: AccountId,
    pub auto_update: bool,
  }

  // Function call arguments
  #[near(serializers = [json, borsh])]
  #[cfg_attr(not(target_arch = "wasm32"), derive(Clone, Debug))]
  pub struct PolicyParameters {
    pub proposal_bond: Option<U128>,
    pub proposal_period: Option<U64>,
    pub bounty_bond: Option<U128>,
    pub bounty_forgiveness_period: Option<U64>,
  }

  // Votes recorded in the proposal
  #[near(serializers = [json, borsh])]
  #[derive(Clone, Debug)]
  pub enum Vote {
    Approve = 0x0,
    Reject = 0x1,
    Remove = 0x2,
  }

  // Configuration of the DAO
  #[near(serializers = [json, borsh])]
  #[derive(Clone, Debug)]
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
  #[near(serializers = [json, borsh])]
  #[cfg_attr(not(target_arch = "wasm32"), derive(Clone, Debug))]
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

  #[near(serializers = [json])]
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
  #[near]
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
     
  </TabItem>
</Tabs>

:::info
By default, only **council members** can create proposals.
:::

---

## Vote for proposal

These snippet will enable your users to cast a vote for proposal of a particular DAO.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

  ```js
  import { useEffect } from 'react';
  import { useWalletSelector } from '@near-wallet-selector/react-hook';

  const DAO_CONTRACT_ADDRESS = 'primitives.sputnik-dao.near';
  const { callFunction } = useWalletSelector();

  const handleVoteProposal = async () => {
    const result = await callFunction({
      method: 'act_proposal',
      args: { id: 0, action: 'VoteApprove' },
      contractId: DAO_CONTRACT_ADDRESS,
      gas: 300000000000000,
    });
    console.log(result);
  };
  ```

  :::note
  Available vote options: `VoteApprove`, `VoteReject`, `VoteRemove`.
  :::

  _The `callFunction` function comes from our [Wallet Selector](/tools/wallet-selector#sign-and-send-transaction)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    
  ```bash
  near call primitives.sputnik-dao.near act_proposal '{"id": 0, "action": "VoteApprove"}' --gas 300000000000000 --accountId bob.near
  ```
  :::note
  Available vote options: `VoteApprove`, `VoteReject`, `VoteRemove`.
  :::

  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/dao/vote-proposal.json" />

    :::note
    Available vote options: `VoteApprove`, `VoteReject`, `VoteRemove`.
    :::
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
    
  ```rust
// Set of possible action to take
#[near(serializers = [json, borsh])]
#[derive(Debug)]
pub enum Action {
  // Action to add proposal. Used internally.
  AddProposal,
  // Action to remove given proposal. Used for immediate deletion in special cases.
  RemoveProposal,
  // Vote to approve given proposal or bounty.
  VoteApprove,
  // Vote to reject given proposal or bounty.
  VoteReject,
  // Vote to remove given proposal or bounty (because it's spam).
  VoteRemove,
  // Finalize proposal, called when it's expired to return the funds
  // (or in the future can be used for early proposal closure).
  Finalize,
  // Move a proposal to the hub to shift into another DAO.
  MoveToHub,
}

// Validator interface, for cross-contract calls
#[ext_contract(ext_dao_contract)]
trait ExternalDaoContract {
  fn act_proposal(&mut self, id: u64, action: Action, memo: Option<String>) -> Promise;
}

// Implement the contract structure
#[near]
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
</TabItem>
</Tabs>

---

## Additional Resources

1. [NEAR Treasury](https://neartreasury.com/) - a Treasury management web app built on top of the Sputnik DAO Contract. Allows users to create and manage treasury funds with ease.
2. [List of DAOs as a NEAR component](https://dev.near.org/onboarder.near/widget/DAOSocialSearch)
