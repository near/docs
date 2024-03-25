---
id: nft
title: Non Fungible Tokens (NFT)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[대체 가능한 토큰](ft.md)과 달리, 대체 불가능 토큰(NFT)은 단일하고 고유한 특성을 가집니다. 따라서 NFT는 디지털 콘텐츠 또는 이벤트 티켓과 같은 자산의 소유권을 나타내는 데 이상적입니다.

대체 가능한 토큰과 마찬가지로, NFT는 사용자의 지갑에 **저장되지 않고** **NFT 컨트랙트**에 존재합니다. NFT 컨트랙트는 회계 역할을 하며 NFT의 생성, 저장 및 전송을 처리합니다.

컨트랙트가 NFT 컨트랙트로 간주되려면 [**NEP-171 및 NEP-177 표준**](https://nomicon.io/Standards/Tokens/NonFungibleToken)을 따라야 합니다. **NEP-171** 및 **NEP-177** 표준은 구현에 필요한 **최소 인터페이스**와 예상 기능을 설명합니다.

:::tip 참조 구현 배포 및 사용할 준비가 된 [참조 구현](https://github.com/near-examples/NFT)이 제공되어 있습니다. :::

:::info NFT & 마켓플레이스
NFT와 NFT 마켓플레이스를 혼동하지 않도록 주의하세요. NFT는 단순히 정보(메타데이터)를 저장하는 반면, NFT 마켓플레이스는 NFT를 나열하고 교환할 수 있는 컨트랙트입니다.
:::

---


## NFT 발행
새로운 NFT를 생성(일명 민팅)하려면, 먼저 [NFT 컨트랙트](https://github.com/near-examples/NFT)를 배포하고 `owner`로 초기화해야 합니다. 현재 `owner`는 단순히 내부 변수(`Contract.owner_id`)를 설정합니다. 즉, `owner`는 발행된 모든 NFT의 **기본 소유자가 아닙니다**.

배포 및 초기화되면, `nft_mint` 메서드를 호출할 수 있습니다. 매개변수로 고유 ID, 소유자, 토큰의 메타데이터 및 (선택 사항) 로열티를 전달해야 합니다. 메타데이터에는 제목, 설명 및 관련 미디어에 대한 URL과 같은 정보가 포함됩니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  # 1. Deploy the contract in a testnet account
  near create-account <account-id> --useFaucet
  near deploy <account-id> non_fungible_token.wasm

  # 2. Initialize NFT contract

  # 3. Mint an NFT
  near call <nft-contract> nft_mint '{"token_id": "<token-unique-id>", "receiver_id": "<nft-owner-account>", "token_metadata": {"title": "<title>", "description": "<description>", "media": "<url>" }, "royalties": {"<account>" : <percentage>, "<account>" : <percentage>}}' --accountId <your-account>

  ```

  </TabItem>
</Tabs>

:::info `TokenMetadata`의 전체 매개변수 목록은 [메타데이터 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata)을 참조하세요. :::

:::tip [실시간으로 NFT 민팅을 추적](../../4.tools/events.md)할 수 있도록 [이벤트](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event)를 구현합니다. :::


<hr className="subsection" />

## 메타데이터 쿼리
`nft_metadata`를 호출하여 NFT의 메타데이터를 쿼리할 수 있습니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near view <nft-contract> nft_metadata
  ```

  </TabItem>
</Tabs>

<hr className="subsection" />

## 사용자 승인
다른 사용자가 소유한 NFT를 전송하도록 승인할 수 있습니다. 이는, 예를 들어 NFT를 마켓플레이스에 나열하는 데 유용합니다. 이러한 시나리오에서 당신은 마켓플레이스가 일정 이상의 금액을 받을 때만 NFT를 전송할 것이라고 **믿습니다**.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <nft-contract> nft_approve '{
   "token_id": "<token-unique-id>",
   "account_id": "<authorized-account>",
   "msg": "<json-structure>"
  }' --accountId <your-account> --depositYocto 1

  ```

  </TabItem>
</Tabs>

:::info `msg` 매개변수가 포함된 경우, `<authorized_account>.nft_on_approve(msg)`에 대한 교차 컨트랙트 호출(cross-contract call)이 이루어집니다. 그러면 NFT 컨트랙트에서 `nft_resolve_transfer`로의 콜백이 이루어집니다. :::


<hr className="subsection" />

## NFT 전송
NFT 전송은 두 가지 시나리오에서 발생할 수 있습니다. (1) NFT 전송을 요청하고 (2) 승인된 계정이 NFT 전송을 요청합니다. 두 경우 모두 토큰 ID, 수신자 및 (선택 사항) [approval_id](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement)를 나타내는 `nft_transfer` 메서드를 호출해야 합니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <nft-contract> nft_transfer '{"receiver_id": "<receiver-account>", "token_id": "<token-unique-id>"}' --accountId <your-account> --depositYocto 1
  ```
  
  </TabItem>
</Tabs>

:::tip [실시간으로 NFT 전송을 추적](../../4.tools/events.md)할 수 있도록 [이벤트](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event)를 구현하세요. :::

<hr className="subsection" />

## 호출에 NFT 첨부
Natively, only NEAR tokens (Ⓝ) can be attached to a function calls. 그러나 NFT 표준은 NFT 컨트랙트를 중개자로 사용하여 호출에 대체 불가능한 토큰을 첨부할 수 있습니다. This means that, instead of you attaching tokens directly to the call, you ask the NFT-contract to do both a transfer and a function call in your name.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <nft-contract> nft_transfer_call '{"receiver_id": "<receiver-contract>", "token_id": "<token_id>", "msg": "<a-string-message>"}' --accountId <your-account> --depositYocto 1
  ```
  
  </TabItem>
</Tabs>

:::info 선택적으로 [`memo` 매개변수](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core#nft-interface)를 전달하여 컨트랙트에 더 많은 정보를 제공할 수 있습니다. :::

### 어떻게 작동하나요?
수신자 컨트랙트에 대한 호출에 NFT(🎫)를 첨부한다고 가정합니다. 작업이 진행되는 방식은 다음과 같습니다.
1. NFT 컨트랙트 내 `nft_transfer_call`을 호출하여 수신자, 메시지 및 🎫의 토큰 ID를 전달합니다.
2. NFT 컨트랙트는 NFT 🎫를 수신자에게 전송합니다.
3. NFT 컨트랙트는 **`receiver.nft_on_transfer(sender, token-owner, token-id, msg)`**를 호출합니다.
4. NFT 컨트랙트는 `nft_resolve_transfer` 콜백 내 오류를 처리합니다.
5. NFT 컨트랙트는 성공하면 `true`를 반환합니다.

#### nft_on_transfer 메서드
위의 작업 방식에서, 호출하려는 수신자는 `nft_on_transfer` 메서드를 구현해야 합니다. 실행될 때, 해당 메서드를 통해 다음과 같은 것들을 알 수 있습니다.
- NFT를 보내는 사람(매개변수이기 때문)
- 현재 소유자(매개변수이기 때문)
- 어느 NFT가 전송되었는지(매개변수이기 때문)
- 메시지로 인코딩된 매개변수가 있는지

NFT가 발신자에게 **환불**되어야 하는 경우, `nft_on_transfer`는 **true를 반환해야 합니다**.

<hr className="subsection" />

## 이벤트
[NFT 이벤트 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event)을 구현하여 실시간 이벤트(예: 전송)를 추적할 수 있습니다. `Events`는 표준화된 방식으로 형식화된 로그인 메시지이기 때문에, 사용이 간편합니다. 이렇게 기록된 메시지는 공개되므로 서비스를 구축하여 [실시간으로 추적](../../4.tools/events.md)할 수 있습니다.