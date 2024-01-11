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
  near dev-deploy <factory-account> --wasmFile=<sputnikdao-factory> --accountId <your-account>

  # 2. Initialize factory contract
  near call <factory-account> new --accountId  <your-account> --gas 100000000000000

  # 3. Define a council and create DAO
  export COUNCIL='["<council-member-1>", "<council-member-2>"]'
  export ARGS=`echo '{"config": {"name": "<name>", "purpose": "<purpose>", "metadata":"<metadata>"}, "policy": '$COUNCIL'}' | base64`

  near call  <factory-account> create "{\"name\": \"<name>\", \"args\": \"$ARGS\"}" --accountId <your-account> --amount 10 --gas 150000000000000
  ```

  </TabItem>
</Tabs>

### 투표 정책
현재 DAO는 `TokenWeight` 및 `RoleWeight`라는 두 가지 유형의 [투표 정책](https://github.com/near-daos/sputnik-dao-contract#voting-policy)을 지원합니다

투표 정책이 `TokenWeight`인 경우, 위원회는 토큰을 사용하여 투표합니다. 투표의 가중치는 토큰의 총 공급량에 대한 투표에 사용된 토큰의 비율입니다.

투표 정책이 `RoleWeight(role)`인 경우, 투표 가중치는 "역할을 가진 총 사람 수 분의 1"로 계산됩니다.

두 투표 정책 제안 통과를 위한 "임계값"을 추가로 포함합니다. 임계값은 모두 비율 또는 고정 숫자가 될 수 있습니다. 비율은 제안을 승인하는 데 일정 비율의 사람/토큰이 필요함을 나타냅니다(예: 절반의 사람들이 투표 및 찬성해야 함). 고정된 숫자는 제안을 통과하기 위해 특정 수의 투표/토큰이 필요함을 나타냅니다(예: 3명/토큰이면 제안을 승인하기에 충분함).

<hr class="subsection" />

## 제안 추가
기본적으로 누구나 DAO에 제안을 추가할 수 있지만, 최소 1Ⓝ은 채권으로 첨부해야 합니다. 그러나 이는 [DAO에서 역할을 설정](https://github.com/near-daos/sputnik-dao-contract#roles-and-permissions)하여 변경할 수 있습니다. 추가할 수 있는 제안 유형은 미리 정의되어 있으며 다음과 같은 작업을 포함합니다.

1. 위원회에 구성원을 추가합니다.
2. 스마트 컨트랙트에서 메서드를 호출합니다.
3. NEAR 또는 FT를 일부 계정으로 전송합니다.

각 작업에는 고유한 종류의 인자가 있습니다. 작업의 전체 목록은 [여기](https://github.com/near-daos/sputnik-dao-contract#proposal-types)에서 찾을 수 있습니다.

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

<hr class="subsection" />

## 제안에 따른 작업
제안이 추가되면 **위원회 구성원**은 `act_proposal` 메서드를 호출하여 작업[label](https://docs.near.org/develop/relevant-contracts/dao)을 수행할 수 있습니다. 사용 가능한 작업은 AddProposal, RemoveProposal, VoteApprove, VoteReject, VoteRemove, Finalize 또는 MoveToHub 중 하나입니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <dao-account> act_proposal '{"id": <proposal-id>, "action": "<action>"}' --accountId <a-council-account-id>
  ```

  </TabItem>
</Tabs>

누군가가 제안에 대해 작업할 때마다, DAO는 제안이 승인되기에 충분한 투표권을 가지고 있는지 확인합니다. 제안이 승인되면 DAO는 제안을 실행합니다(예: 위원회에 새 구성원 추가).