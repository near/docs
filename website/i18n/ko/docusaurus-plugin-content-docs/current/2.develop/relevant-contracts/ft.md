---
id: ft
title: Fungible Tokens (FT)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

기본 NEAR 토큰 외에도 NEAR 계정은 다양한 대체 가능한 토큰(예: [화이트리스트 토큰](https://guide.ref.finance/developers-1/cli-trading#query-whitelisted-tokens))에 액세스할 수 있습니다. 또한 사용자가 자신의 대체 가능한 토큰을 만드는 것도 가능합니다.

NEAR 기본 토큰과 달리 대체 가능 토큰(FT)은 사용자의 지갑에 **저장되지 않습니다**. 사실 각 FT는 **회계**를 담당하는 **자체 컨트랙트**에 따라 존재합니다. 즉, 컨트랙트는 각 사용자가 보유한 토큰 수를 추적하고 전송을 내부적으로 처리합니다.

컨트랙트가 FT 컨트랙트로 간주되려면 [**NEP-141 및 NEP-148 표준**](https://nomicon.io/Standards/FungibleToken/)을 따라야 합니다. **NEP-141** 및 **NEP-148** 표준은 구현에 필요한 **최소 인터페이스**와 예상 기능을 설명하는 문서입니다.

:::tip 참조 구현 배포 및 사용할 준비가 된 [FT 참조 구현](https://github.com/near-examples/FT)을 제공합니다. :::

<!-- ### Summary of Methods -->

---

## 대체 가능한 토큰 생성
새 FT를 생성하는 것은 새 FT 컨트랙트를 배포하고 초기화하는 것만큼 간단합니다. 초기화 시 이름(예: Ethereum), 기호(예: ETH) 및 총 공급량(예: 10M)과 같은 토큰의 메타데이터를 정의합니다. 또한 토큰 **총 공급량**을 소유할 `owner`도 정의합니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  # 1. Deploy the contract in a testnet account
  near create-account <account-id> --useFaucet
  near deploy <account-id> fungible_token.wasm

  # 2. Initialize the contract with metadata
  near call <ft-contract> new '{"owner_id": "<owner-account>", "total_supply": "1000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "Example Token Name", "symbol": "EXLT", "decimals": 8 }}' --accountId <ft-contract>

  ```

  </TabItem>
</Tabs>

:::info 초기화 시 **모든** 토큰을 소유할 **소유자**를 정의합니다. :::

<hr className="subsection" />

## 메타데이터 쿼리
`ft_metadata`를 호출하여 FT의 메타데이터를 쿼리할 수 있습니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near view <ft-contract> ft_metadata
  ```

  </TabItem>
</Tabs>

<hr className="subsection" />

## 사용자 등록
사용자가 토큰을 소유하고 전송하려면 먼저 컨트랙트에 **등록**해야 합니다. 이는 `storage_deposit`을 호출하여 0.00125Ⓝ를 첨부하는 방식으로 진행됩니다. 이 메서드를 사용하면, 다른 사용자가 등록하도록 비용을 지불할 수도 있습니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <ft-contract> storage_deposit '{"account_id": "<account-to-register>"}' --accountId <your-account> --amount 0.00125
  ```

  </TabItem>
</Tabs>

:::info 사용자에 대해 `storage_balance_of`가 0.00125 Ⓝ보다 큰지 확인하여 사용자가 등록되었는지 확인할 수 있습니다. :::

:::tip `storage_deposit`을 호출하면, FT가 NEAR 지갑에 나타날 것입니다. :::

<hr className="subsection" />

## 잔고 가져오기
사용자가 얼마나 많은 코인을 가지고 있는지 알려면, 메서드 `ft_balance_of`를 쿼리해야 합니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near view <ft-contract> ft_balance_of '{"account_id": "<users-account>"}'
  ```
  
  </TabItem>
</Tabs>

:::caution [메타데이터](#메타데이터-조회)에서 `decimals`를 염두에 두세요. 2 `decimals` 상태에서 `150 FT`만큼의 토큰 잔고는 실제로 `1.50 FT`를 나타냅니다. :::

<hr className="subsection" />

## 전송
FT를 다른 계정으로 보내려면, 받는 사람과 보내려는 FT 금액을 나타내는 `ft_transfer` 메서드를 사용합니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <ft-contract> ft_transfer '{"receiver_id": "<receiver-account>", "amount": "<amount>"}' --accountId <your-account> --depositYocto 1
  ```
  
  </TabItem>
</Tabs>

:::tip [실시간으로 FT 전송을 추적](../../4.tools/events.md)할 수 있도록 [이벤트](https://nomicon.io/Standards/Tokens/FungibleToken/Event)를 구현합니다. :::

:::warning 대체 가능한 토큰을 계정에 보내려면 발신자와 수신자 모두 FT 컨트랙트에 [등록](#사용자-등록)해야 합니다. :::

<hr className="subsection" />

## 호출에 FT 첨부
Natively, only NEAR tokens (Ⓝ) can be attached to a function calls. 그러나 FT 표준에서는 FT 컨트랙트를 중개자로 사용하여 호출에 대체 가능한 토큰을 첨부할 수 있습니다. This means that, instead of you attaching tokens directly to the call, you ask the FT-contract to do both a transfer and a function call in your name.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <ft-contract> ft_transfer_call '{"receiver_id": "<receiver-contract>", "amount": "<amount>", "msg": "<a-string-message>"}' --accountId <user_account_id> --depositYocto 1
  ```
  
  </TabItem>
</Tabs>

#### 예시
수신자 컨트랙트에 대한 호출에 일부 FT(🪙)를 첨부한다고 가정해 봅시다. 작업이 이루어지는 방식은 다음과 같습니다.
1. 🪙-컨트랙트에서 `ft_transfer_call`를 호출해서 수신자, 메시지 및 금액을 전달합니다.
2. FT 컨트랙트는 금액을 수신자에게 전송합니다.
3. FT 컨트랙트는 **`receiver.ft_on_transfer(sender, msg, amount)`**를 호출합니다.
4. FT 컨트랙트는 `ft_resolve_transfer` 콜백의 오류를 처리합니다.
5. FT 컨트랙트는 첨부된 금액 중 실제로 사용된 금액을 반환합니다.

#### ft_on_transfer 메서드
위의 작업 과정에서 호출하려는 수신자는 `ft_on_transfer` 메서드를 구현해야 합니다. 실행될 때, 이러한 메서드를 통해 다음과 같은 정보를 알 수 있습니다.
- 어떤 FT가 전송되었는지([`predecessor`](../contracts/environment/environment.md#predecessor-and-signer) 계정이기 때문)
- 누가 FT를 보내는지(매개변수이기 때문)
- 얼마나 많은 FT가 전송되었는지(매개변수이기 때문)
- 메시지로 인코딩된 매개변수가 있는지

`ft_on_transfer`는 **돌려주어야 하는 FT 토큰 수**를 반환**해야** 하므로, FT 컨트랙트는 이를 보낸 사람에게 돌려줍니다.

<hr className="subsection" />

## 이벤트
[FT 이벤트 표준](https://nomicon.io/Standards/Tokens/FungibleToken/Event)을 구현하여 실시간 이벤트(예: 전송)를 추적할 수 있습니다. `Events` are simple to use because they are just log messages formatted in a standardized way. 이렇게 기록된 메시지는 공개되므로, 서비스를 구축하여 이를 [실시간으로 추적](../../4.tools/events.md)할 수 있습니다.
