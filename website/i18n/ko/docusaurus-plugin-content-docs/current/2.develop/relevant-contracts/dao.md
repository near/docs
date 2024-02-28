---
id: dao
sidebar_label: Autonomous Organizations (DAO)
title: 탈중앙화 자율 조직(DAO)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

탈중앙화 자율 조직(DAO)는 공통된 목적을 중심으로 형성되는 자체 조직 그룹입니다. 멤버십, 의사 결정 및 자금 조달은 스마트 컨트랙트를 통한 제안에 대한 공개 투표를 통해 조정됩니다.

[FT](ft.md)나 [NFT](nft.md)와 달리, DAO 컨트랙트는 표준화되지 않았습니다. 그렇기 때문에 이 페이지에서는 [sputnik dao 구현](https://github.com/near-daos/sputnik-dao-contract)을 참고하여 진행합니다. 여기서 다루는 주요 개념은 다른 DAO 구현에 쉽게 일반화될 수 있어야 합니다.

---

## DAO 생성
DAO를 생성하려면 먼저 [DAO 컨트랙트 팩토리](https://github.com/near-daos/sputnik-dao-contract#setup)를 배포하고 초기화해야 합니다.

배포 및 초기화되면, 팩토리에 새 DAO를 `create`해 달라고 요청할 수 있습니다. 생성 시, DAO의 이름, 목적 및 위원회와 같은 매개변수를 정의해야 합니다. 올바른 위원회를 정의하는 것은 중요한데, 이는 위원들만이 제안에 투표할 수 있는 **유일한** 계정이기 때문입니다.


<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  # 1. Deploy the contract in a testnet account
  near create-account <factory-account> --useFaucet
  near deploy <factory-account> <sputnikdao-wasm> --accountId <your-account>

  # 2. Initialize factory contract
  near call <factory-account> new --accountId  <your-account> --gas 100000000000000

  # 3. Define a council and create DAO
  export COUNCIL='["<council-member-1>", "<council-member-2>"]'
  export ARGS=`echo '{"config": {"name": "<name>", "purpose": "<purpose>", "metadata":"<metadata>"}, "policy": '$COUNCIL'}' | base64`

  near call  <factory-account> create "{\"name\": \"<name>\", \"args\": \"$ARGS\"}" --accountId <your-account> --amount 10 --gas 150000000000000
  ```

  </TabItem>
</Tabs>

### Voting policy
Currently, the DAO supports two different types of [voting policies](https://github.com/near-daos/sputnik-dao-contract#voting-policy): `TokenWeight`, and `RoleWeight`.

When the vote policy is `TokenWeight`, the council votes using [tokens](ft.md). The weigh of a vote is the proportion of tokens used for voting over the token's total supply.

When the vote policy is `RoleWeight(role)`, the vote weigh is computed as "one over the total number of people with the role".

Both voting policies further include a "threshold" for passing a proposal, which can be a ratio or a fixed number. The ratio indicates that you need a proportion of people/tokens to approve the proposal (e.g. half the people need to vote, and to vote positively). A fixed number indicated that you need a specific number of votes/tokens to pass the proposal (e.g. 3 people/tokens are enough to approve the proposal).

<hr className="subsection" />

## Adding a Proposal
By default, anyone can add a proposal to the DAO, but a minimum of 1Ⓝ needs to be attached as a bond. This however can be changed by [setting roles in the DAO](https://github.com/near-daos/sputnik-dao-contract#roles-and-permissions). The type of proposals that can be added [is predefined](https://github.com/near-daos/sputnik-dao-contract#proposal-types), and include actions such as:

1. Adding a member to the council.
2. Calling a method in a smart contract.
3. Transferring NEAR or a FT to some account.

Each action has its own kind of arguments. The complete list of actions can be [found here](https://github.com/near-daos/sputnik-dao-contract#proposal-types).

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <dao-account> add_proposal \
'{"proposal": {"description": "<description>", "kind": {"<proposalKind>": {"<argument>": "<value>", "<argument>": "<value>"}}}}' \
--accountId proposer.testnet \
--amount 1

  ```

  </TabItem>
</Tabs>

<hr className="subsection" />

## Acting on a Proposal
Once a proposal is added, **council members** can act on them calling the `act_proposal` method. The available actions are one of the following: AddProposal, RemoveProposal, VoteApprove, VoteReject, VoteRemove, Finalize, or MoveToHub.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <dao-account> act_proposal '{"id": <proposal-id>, "action": "<action>"}' --accountId <a-council-account-id>
  ```

  </TabItem>
</Tabs>

Each time somebody acts on the proposal, the DAO checks if the proposal has enough votes to be approved. If the proposal is approve, then the DAO executes the proposal (for example, adding a new member to the council).