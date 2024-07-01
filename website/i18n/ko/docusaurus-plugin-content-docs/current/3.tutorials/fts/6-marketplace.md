---
id: marketplace
title: NFT 마켓플레이스에 FT 결제 통합하기
sidebar_label: 마켓플레이스에 FT 추가하기
---

import {Github} from "@site/src/components/codetabs"

이 튜토리얼에서는 NFT 마켓플레이스 컨트랙트가 작동하는 방식과 대체 가능한 토큰(FT)을 사용하여 NFT를 구매할 수 있도록 컨트랙트를 수정하는 방법에 대한 기본 사항을 배웁니다. 이전 튜토리얼에서는 [FT 표준](https://nomicon.io/Standards/Tokens/FungibleToken/Core)에 있는 모든 표준을 통합하는 본격적인 FT 컨트랙트를 작성했습니다.

---

## 소개

이 튜토리얼을 통해 마켓플레이스 컨트랙트가 NEAR에서 작동하는 방법을 배우게 됩니다. 이것은 예시용이며 표준 구현은 없습니다. 당신의 요구에 맞게 이 컨트랙트를 자유롭게 나누고 수정하세요.

이전 튜토리얼과 동일한 레퍼지토리를 사용하여 `market-contract` 디렉토리를 들어가면, 튜토리얼을 완료하는 데 필요한 파일이 있어야 합니다.

---

## 파일 구조 {#file-structure}

This directory contains the actual contract code and dependencies as outlined below.

```
market-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
└── src
    ├── external.rs
    ├── ft_balances.rs
    ├── internal.rs
    ├── lib.rs
    ├── nft_callbacks.rs
    ├── sale.rs
    └── sale_views.rs
```

완성된 FT 컨트랙트와 마켓플레이스 컨트랙트를 모두 구축하는 것으로 시작하겠습니다. 루트 디렉터리에 있는지 확인하고 터미널에서 다음 명령을 실행합니다.


```bash
cd market-contract && cargo near build && cd ..
```

이렇게 하면 마켓플레이스 컨트랙트와 FT 컨트랙트에 대한 의존성이 설치됩니다. Note that there's also `ft-tutorial/out` directory with pre-build nft contract wasm file which you'll use to place the NFTs for sale.

```
ft-tutorial
└── out
    └── nft-contract.wasm
```

---

## 컨트랙트 이해하기

이 튜토리얼에서 사용되는 마켓플레이스 컨트랙트는 NFT Zero to Hero 튜토리얼 마지막에 생성된 컨트랙트의 수정된 버전입니다. NFT가 판매되는 방식의 근간과 NFT가 발행/판매되는 프로세스에 대해 알아보려면 [NFT zero to hero 튜토리얼](/tutorials/nfts/marketplace)을 확인하세요.

핵심 기능은 이 컨트랙트와 NFT Zero to Hero에 구축된 마켓플레이스 컨트랙트 모두 다음과 같은 기능을 가지고 있다는 점에서 동일합니다.
- 사용자는 NFT를 판매하고 판매 조건을 지정할 수 있습니다.
- 사용자는 NFT를 판매하기 위해 스토리지 보증금을 지불해야 하며, 언제든지 보증금을 인출할 수 있습니다.
- 사용자는 NFT 가격을 업데이트하거나 판매를 완전히 제거할 수 있습니다.
- 구매자는 `offer`를 호출하여 NFT를 구매할 수 있습니다

유일한 차이점은 이 마켓플레이스에서 `$NEAR`로 NFT를 구매할 수 있는 기능을 제거하고, 대신 사용자가 대체 가능한 토큰으로 NFT를 구매할 수 있다는 것입니다. 대체 가능한 토큰은 컨트랙트가 초기화될 때 지정되며, NFT 구매에는 **1가지 유형의 대체 가능한 토큰**만 사용할 수 있습니다. 예를 들어 NFT에 100개의 팀 토큰을 제공하고 다른 NFT에 5000개의 Mike 토큰을 제공할 수 없습니다.

또한 마켓플레이스는 로열티를 지원하지 **않습니다**. 이는 FT 전송이 일반 $NEAR 전송보다 가스 효율성이 떨어지기 때문입니다. 또한 각 사용자를 등록해야 하며 "판매자님, NFT가 판매되기 전에 등록했는지 확인하세요"라고 말하는 것이 지불 대상의 판매자와 **모든** 계정을 등록하도록 강요하는 것보다 훨씬 쉽습니다. NFT가 판매되면 전체 가격이 판매자에게 직접 전송됩니다.

<hr className="subsection" />

### 구매 흐름

NFT를 구매하기 위해 컨트랙트는 FT 컨트랙트가 제공하는 "전송 및 호출" 워크플로우를 활용합니다. 마켓플레이스 컨트랙트는 누군가가 마켓플레이스 컨트랙트로 FT를 전송할 때마다 호출되는 `ft_on_transfer` 메서드를 구현합니다.

마켓플레이스는 각 사용자가 컨트랙트에 보낸 FT 수를 요약한 잔액을 추적합니다. `ft_on_transfer`가 호출될 때마다, 마켓플레이스 컨트랙트가 사용자의 잔액을 업데이트합니다. 해당 사용자가 NFT를 구매하기를 원하면, `offer`를 호출하여 사용하려는 토큰의 양을 전달합니다. 그런 다음 마켓플레이스는 잔액에서 해당 금액을 차감하고, NFT를 구매자에게 전송하거나 FT를 판매자에게 보냅니다.

판매가 이루어지기 전에 판매자가 FT 컨트랙트에 등록되어 있어야 **한다는** 점에 유의하는 것이 중요합니다. 그렇지 않으면 `ft_transfer` 메서드는 패닉 상태가 되고, 판매자는 어떠한 토큰도 받을 수 없습니다.

---

## 코드 살펴보기

대부분의 코드는 [NFT zero to hero 튜토리얼](/tutorials/nfts/marketplace)에 설명된 것과 동일하지만, 처음 사용하거나 일부 세부 정보를 잊은 경우를 대비하여 다시 살펴보겠습니다.

<hr className="subsection" />

### 메인 라이브러리 파일

`lib.rs` 파일에서 시작하여, 컨트랙트에 저장되는 정보와 아래에서 배우게 될 기타 중요한 기능에 대해 설명합니다.

<hr className="subsection" />

### 초기화 함수 {#initialization-function}

처음으로 살펴볼 함수는 초기화 함수입니다. 이것은 매개변수로 `owner_id`뿐만 아니라 `ft_id`를 취하며, 모든 스토리지 컬렉션을 기본값으로 설정합니다. `ft_id`는 컨트랙트에서 허용하는 대체 가능한 토큰의 계정 ID를 설명합니다.

<Github language="rust" start="93" end="114" url="https://github.com/near-examples/ft-tutorial/blob/main/market-contract/src/lib.rs" />

<hr className="subsection" />

### 스토리지 관리 모델 {#storage-management-model}

Next, let's talk about the storage management model chosen for this contract. Users will need to deposit $NEAR onto the marketplace to cover the storage costs. Whenever someone puts an NFT for sale, the marketplace needs to store that information which costs $NEAR. Users can either deposit a large amount of $NEAR so that they never have to worry about storage again or they can deposit the minimum amount to cover 1 sale on an as-needed basis.

You might be thinking about the scenario when a sale is purchased. What happens to the storage that is now being released on the contract? This is why we have a storage withdrawal function. This allows users to withdraw any excess storage that is not being used. Let's go through some scenarios to understand the logic. The required storage for 1 sale is 0.01 NEAR on the marketplace contract.

**Scenario A**

- Benji는 마켓플레이스에 자신의 NFT를 리스팅하고 싶지만, 스토리지 비용을 지불한 적이 없습니다.
- 그는 `storage_deposit` 메서드를 사용하여 정확히 0.01 NEAR를 예치합니다. 이것은 한 번의 판매를 커버할 것입니다.
- 그는 마켓플레이스에 자신의 NFT를 리스팅하고, 현재 선불 판매 1개 중 1개를 사용하고 있기 때문에 더 이상 스토리지 공간이 남아 있지 않습니다. 그가 `storage_withdraw`를 호출하면 아무 일도 일어나지 않을 것입니다.
- Dorian은 Benji의 NFT를 좋아하고, 다른 사람보다 먼저 빠르게 구매했습니다. 이는 Benji의 판매가 이제 중단되었으며(구매한 이후) Benji는 선불 판매 1개 중 0개를 사용하고 있음을 의미합니다. 즉, 그는 1 판매 또는 0.01 NEAR가 남습니다.
- Benji는 이제 `storage_withdraw` 호출을 할 수 있으며, 그의 0.01 NEAR를 다시 돌려받을 것입니다. 컨트랙트 측면에서, 그는 출금 후 판매 금액이 0이 되며, 이제 NFT를 리스팅하기 전에 스토리지를 예치해야 합니다.

**Scenario B**

- Dorian은 100개의 아름다운 NFT를 소유하고 있으며, 모든 NFT를 리스팅하고 싶습니다.
- NFT를 나열할 때마다 `storage_deposit`를 호출할 필요가 없도록, 그는 한 번만 호출하였습니다. Dorian은 성공한 사람이기 때문에 1000개의 판매를 커버하기에 충분한 10개의 NEAR를 첨부하였습니다. 이후, 그는 이제 9 NEAR 또는 900 판매를 초과했습니다.
- Dorian은 다른 일을 위해 9 NEAR가 필요하지만, 100개의 리스팅을 삭제하고 싶지는 않습니다. 그는 9 NEAR가 남았기 때문에 쉽게 인출할 수 있고 여전히 100개의 목록을 보유할 수 있습니다. `storage_withdraw` 호출을 하고 9 NEAR를 받으면 그는 0개의 판매 가능 수량을 가지게 될 것입니다.

With this behavior in mind, the following two functions outline the logic.

<Github language="rust" start="119" end="182" url="https://github.com/near-examples/ft-tutorial/blob/main/market-contract/src/lib.rs" />

이 컨트랙트에서 각 판매에 필요한 스토리지는 0.01 NEAR이지만, `storage_minimum_balance` 함수를 사용하여 해당 정보를 쿼리할 수 있습니다. 또한, 해당 계정이 지불한 스토리지 공간을 확인하려면 `storage_balance_of` 함수로 쿼리할 수 있습니다.

---

## FT 보증금

NFT가 판매되는 방법에 대해 자세히 알아보려면 [NFT zero to hero 튜토리얼](/tutorials/nfts/marketplace)을 확인하세요. NFT가 판매되면 소유자는 세 가지 옵션이 있습니다.
- NFT 가격 업데이트
- 시장에서 리스팅 제거
- 누군가의 구매를 대기

NFT를 구매하기 위해서는 구매자가 컨트랙트에 FT를 예치하고 `offer` 함수를 호출해야 합니다. FT 보증금에 대한 모든 로직은 `src/ft_balances.rs` 파일에 요약되어 있습니다. Starting with the `ft_on_transfer` function, this is called when a user transfers FTs to the marketplace contract. 로직은 아래에서 볼 수 있습니다.

<Github language="rust" start="39" end="77" url="https://github.com/near-examples/ft-tutorial/blob/main/market-contract/src/ft_balances.rs" />

FT가 컨트랙트에 입금되면, 사용자는 FT를 인출하거나 이를 사용하여 NFT를 구매할 수 있습니다. 인출 흐름은 `ft_withdraw` 함수에 설명되어 있습니다. `ft_transfer` 함수를 호출하기 **전에** 사용자의 잔액을 차감해야 한다는 것(전송이 성공한 경우)을 기억해야 합니다. 이는 `ft_withdraw_`를 스팸 공격하는 일반적인 해킹 시나리오를 피하기 위함입니다. A better pattern is to decrement their balance before the transfer and then if the promise was **unsuccessful**, revert the balance back to what it was before.

<Github language="rust" start="79" end="154" url="https://github.com/near-examples/ft-tutorial/blob/main/market-contract/src/ft_balances.rs" />

---

## NFT 구매

이제 스토리지를 추가하고 시장에 FT를 예치하는 프로세스에 익숙해졌으므로 판매가 리스팅되면 수행할 수 있는 작업에 대해 살펴보겠습니다. 이 `src/sale.rs` 파일은 가격 업데이트, 제거 및 NFT 구매 기능을 설명합니다. 이 튜토리얼에서는 구매 흐름**에만** 초점을 맞춥니다. 판매 대상, 가격 업데이트 및 판매 제거에 대해 알아보려면 [NFT zero to hero 튜토리얼](/tutorials/nfts/marketplace)을 확인하세요.

NFT를 구매하려면 `offer` 함수를 호출해야 합니다. 이를 위해, `nft_contract_id`, `token_id` 및 매개변수로 제공하려는 금액이 필요합니다. 내부적으로 이 함수는 제안 금액이 정가보다 크고 충분한 FT가 예치되었는지 확인합니다. 그런 다음 NFT 컨트랙트에 대한 교차 컨트랙트 호출을 수행하여 NFT가 판매자에게 전송되는 `nft_transfer` 함수를 호출하는 프라이빗 메서드 `process_purchase`를 호출합니다.

<Github language="rust" start="68" end="145" url="https://github.com/near-examples/ft-tutorial/blob/main/market-contract/src/sale.rs" />

전송이 완료되면, 컨트랙트가 전송 상태를 확인하는 `resolve_purchase`를 호출합니다. 이는 전송이 성공하면 판매자에게 FT를 보내고, 전송에 실패하면 구매자의 FT 잔액이 증가합니다(환불).


<Github language="rust" start="147" end="191" url="https://github.com/near-examples/ft-tutorial/blob/main/market-contract/src/sale.rs" />

## View 메서드

마켓플레이스 컨트랙트가 노출하는 몇 가지 view 함수가 있습니다. 이러한 모든 함수들은 우리가 추가한 하나의 추가 함수를 제외하고는 [NFT zero to hero 튜토리얼](/tutorials/nfts/marketplace)과 동일합니다. `src/ft_balances.rs` 파일에 `ft_balance_of` 함수를 추가했습니다. 이 함수는 주어진 계정의 잔액을 반환합니다.

---

## 테스트

이제 마켓플레이스 컨트랙트의 작동 방식과 FT 표준의 권한을 사용하여 NFT를 구매할 수 있는 방법을 *잘* 이해했으므로 모든 것을 테스트해 보겠습니다.

### 컨트랙트 배포 및 초기화

가장 먼저 할 일은 새로운 FT, NFT 및 마켓플레이스 컨트랙트를 배포하는 것입니다.

```bash
cd market-contract && cargo near build && cd ..
```

To deploy the FT contract and export an environment variable, run the following command:

```bash
export FT_CONTRACT=<new-ft-account-id>
near create-account $FT_CONTRACT --useFaucet
cd 5.transfers/ && cargo near deploy $FT_CONTRACT with-init-call new_default_meta json-args '{"owner_id": "'$FT_CONTRACT'", "total_supply": "1000000000000000000000000000"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send && cd ../
```

다음으로 NFT 및 마켓플레이스 컨트랙트를 배포합니다.

```bash
export NFT_CONTRACT=<new-nft-account-id>
near create-account $NFT_CONTRACT --useFaucet
near deploy $NFT_CONTRACT out/nft-contract.wasm
```

```bash
export MARKETPLACE_CONTRACT=<new-marketplace-account-id>
near create-account $MARKETPLACE_CONTRACT --useFaucet
cd market-contract/ && cargo near deploy $MARKETPLACE_CONTRACT with-init-call new json-args '{"owner_id": "'$MARKETPLACE_CONTRACT'", "ft_id": "'$FT_CONTRACT'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send && cd ../
```

다음 명령을 실행하여 환경 변수가 모두 올바른지 확인하세요. 각 출력은 달라야 합니다.

```bash
echo $FT_CONTRACT && echo $MARKETPLACE_CONTRACT && echo $NFT_CONTRACT
```
출력 예는 다음과 같습니다.

```bash
ft-contract.testnet
marketplace-contract.testnet
nft-contract.testnet
```

Once that's finished, go ahead and initialize NFT contract by running the following command (FT and marketplace contract were initialized during deploying process above).

```bash
near call $NFT_CONTRACT new_default_meta '{"owner_id": "'$NFT_CONTRACT'"}' --accountId $NFT_CONTRACT
```

각 컨트랙트가 제대로 초기화되었는지 확인해 봅시다. FT 및 NFT 컨트랙트의 메타데이터를 확인하여 이를 수행할 수 있습니다.

```bash
near view $FT_CONTRACT ft_metadata && near view $NFT_CONTRACT nft_metadata
```
또한 Marketplace 컨트랙트의 판매를 확인할 수 있으며 0을 반환해야 합니다.

```bash
near view $MARKETPLACE_CONTRACT get_supply_sales
```

<hr className="subsection" />

### 토큰 판매 리스팅

이제 마켓플레이스와 NFT 컨트랙트가 초기화되었으므로 판매용 토큰을 배치해 보겠습니다. 다음 명령을 실행하여 새 구매자 및 판매자 계정을 생성하여 시작하세요. 이 경우 FT 컨트랙트의 하위 계정(sub-account)을 생성합니다.

```bash
near create-account buyer.$FT_CONTRACT --masterAccount $FT_CONTRACT --initialBalance 2 && export BUYER_ID=buyer.$FT_CONTRACT
```

```bash
near create-account seller.$FT_CONTRACT --masterAccount $FT_CONTRACT --initialBalance 2 && export SELLER_ID=seller.$FT_CONTRACT
```

다음 명령을 실행하여 모든 것이 잘 되었는지 확인합니다.

```bash
echo $BUYER_ID && echo $SELLER_ID
```
이는 다음과 유사한 결과를 반환해야 합니다.
```bash
buyer.ft-contract.testnet
seller.ft-contract.testnet
```

다음으로 해야 할 일은 판매자에게 토큰을 발행하는 것입니다.

```bash
near call $NFT_CONTRACT nft_mint '{"token_id": "market-token", "metadata": {"title": "Marketplace Token", "description": "testing out the marketplace", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$SELLER_ID'"}' --accountId $NFT_CONTRACT --amount 0.1
```
이제 토큰을 판매용으로 배치해야 합니다. 이를 위해서는 스토리지 비용을 지불하고 `nft_approve` 함수를 호출해야 합니다.

```bash
near call $MARKETPLACE_CONTRACT storage_deposit --accountId $SELLER_ID --amount 0.1
```
이 경우 우리는 토큰을 `10 gtNEAR`에 판매할 것입니다.
```bash
near call $NFT_CONTRACT nft_approve '{"token_id": "market-token", "account_id": "'$MARKETPLACE_CONTRACT'", "msg": "{\"sale_conditions\":\"10000000000000000000000000\"}"}' --accountId $SELLER_ID --amount 0.1
```

이제 마켓플레이스에서 판매 공급량을 다시 쿼리하면 1이어야 합니다.

```bash
near view $MARKETPLACE_CONTRACT get_supply_sales
```

또한 소유자 ID로 판매를 쿼리하면 `10 gtNEAR`라는 가격이 반영되어야 합니다.

```bash
near view $MARKETPLACE_CONTRACT get_sales_by_owner_id '{"account_id": "'$SELLER_ID'"}'
```

예상 출력:

```bash
[
  {
    owner_id: 'seller.ft-contract.testnet',
    approval_id: 0,
    nft_contract_id: 'nft-contract.testnet',
    token_id: 'market-token',
    sale_conditions: '10000000000000000000000000'
  }
]
```

<hr className="subsection" />

### 마켓플레이스에 FT 입금

마켓플레이스 컨트랙트에서 `10 gtNEAR`에 판매할 NFT가 있으므로, 구매자는 일부 FT를 예치해야 합니다. 가장 먼저 해야 할 일은 마켓플레이스 컨트랙트와 구매자를 모두 FT 컨트랙트에 등록하는 것입니다. 그렇지 않으면 FT를 전송할 수 없습니다.

```bash
near call $FT_CONTRACT storage_deposit '{"account_id": "'$MARKETPLACE_CONTRACT'"}' --accountId $FT_CONTRACT --amount 0.1
```
```bash
near call $FT_CONTRACT storage_deposit '{"account_id": "'$BUYER_ID'"}' --accountId $FT_CONTRACT --amount 0.1
```
그런 다음, 몇 개의 FT를 구매자에게 보내서 최소 `10 gtNEAR`를 예치할 수 있도록 하여야 합니다. `50 gtNEAR`부터 시작하겠습니다. 다음 명령을 실행하여 FT 컨트랙트 소유자를 대신하여 구매자 FT를 보냅니다.

```bash
near call $FT_CONTRACT ft_transfer '{"receiver_id": "'$BUYER_ID'", "amount": "50000000000000000000000000", "memo": "Go Team!"}' --accountId $FT_CONTRACT --depositYocto 1
```

이제 해당 토큰을 마켓플레이스 컨트랙트에 예치해야 합니다.

```bash
near call $FT_CONTRACT ft_transfer_call '{"receiver_id": "'$MARKETPLACE_CONTRACT'", "amount": "50000000000000000000000000", "msg": "Wooooooo!"}' --accountId $BUYER_ID --depositYocto 1 --gas 200000000000000
```

이제 마켓플레이스 컨트랙트에서 잔액을 쿼리하면, `50 gtNEAR`가 되어야 합니다.

```bash
near view $MARKETPLACE_CONTRACT ft_deposits_of '{"account_id": "'$BUYER_ID'"}'
```

<hr className="subsection" />

### NFT 구매

이제 구매자가 FT를 마켓플레이스에 입금했고, 토큰이 판매 중이므로 계속해서 제안을 합시다! 가지고 있는 것보다 더 많은 FT를 제공하려고 하면 컨트랙트가 패닉 상태가 됩니다. 마찬가지로 판매 가격보다 낮게 제안하려고 해도, 컨트랙트가 패닉 상태가 됩니다. 판매 가격이 `10 gtNEAR`이므로, `20 gtNEAR`를 제안하고 어떤 일이 일어나는지 봅시다. 예상 결과는 다음과 같습니다.
- NFT는 구매자에게 전송됩니다.
- 판매자에게 `20 gtNEAR`를 보냅니다.
- 구매자에게는 `30 gtNEAR`가 남아있을 것입니다.

그런데 우리가 잊고 있는 것이 하나 있습니다. 판매자가 FT 컨트랙트에 등록되어 있는지 확인해야 하므로 지금 진행하겠습니다.

```bash
near call $FT_CONTRACT storage_deposit '{"account_id": "'$SELLER_ID'"}' --accountId $FT_CONTRACT --amount 0.1
```

이제 제안을 해봅시다!

```bash
near call $MARKETPLACE_CONTRACT offer '{"nft_contract_id": "'$NFT_CONTRACT'", "token_id": "market-token", "amount": "20000000000000000000000000"}' --accountId $BUYER_ID --depositYocto 1 --gas 300000000000000
```

모든 것이 잘 되었다면 터미널에 2개의 이벤트가 표시되어야 합니다. 하나의 이벤트는 토큰이 판매자에서 구매자로 전송될 때, NFT 컨트랙트에서 오는 NFT 전송입니다. 다른 이벤트는 판매자가 대체 가능한 토큰을 받을 때의 FT 전송입니다.

```bash
Log [dev-1660831638497-73655245450834]: Memo: payout from market
Log [dev-1660831638497-73655245450834]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_transfer","data":[{"authorized_id":"dev-1660831638497-73655245450834","old_owner_id":"seller.dev-1660831615048-16894106456797","new_owner_id":"buyer.dev-1660831615048-16894106456797","token_ids":["market-token"],"memo":"payout from market"}]}
Receipt: BBvHig5zg1n2vmxFPTpxED4FNCAU1ZzZ3H8EBqqaeRw5
Log [dev-1660831638497-73655245450834]: EVENT_JSON:{"standard":"nep141","version":"1.0.0","event":"ft_transfer","data":[{"old_owner_id":"dev-1660831638497-73655245450834","new_owner_id":"seller.dev-1660831615048-16894106456797","amount":"20000000000000000000000000","memo":"Sale from marketplace"}]}
```

모든 것이 잘 되었는지 다시 확인하기 위해 몇 가지 view 메서드를 호출해 봅시다. 먼저 판매자가 현재 `20 gtNEAR`을 가지고 있는지 확인해 봅시다.

```bash
near view $FT_CONTRACT ft_balance_of '{"account_id": "'$SELLER_ID'"}'
```

다음으로 구매자의 출금 가능 금액이 `30 gtNEAR`만큼 남았는지 확인합시다.

```bash
near view $MARKETPLACE_CONTRACT ft_deposits_of '{"account_id": "'$BUYER_ID'"}'
```

마지막으로 NFT가 이제 구매자의 소유인지 확인합시다.

```bash
near view $NFT_CONTRACT nft_token '{"token_id": "market-token"}'
```

<hr className="subsection" />

### 초과입금액 출금

이제 구매자가 `20 gtNEAR`로 NFT를 구매했으므로, 출금 가능 금액이  `30 gtNEAR`만큼 남았어야 합니다. 토큰을 인출하면, FT 컨트랙트에 `30 gtNEAR`만큼의 잔액이 남아 있어야 합니다.

```bash
near call $MARKETPLACE_CONTRACT ft_withdraw '{"amount": "30000000000000000000000000"}' --accountId $BUYER_ID --depositYocto 1 --gas 300000000000000
```

이제 구매자의 잔액을 쿼리하면 `30 gtNEAR`이어야 합니다.

```bash
near view $FT_CONTRACT ft_balance_of '{"account_id": "'$BUYER_ID'"}'
```

이렇게 하면 작업이 완료됩니다! NFT를 판매하고 대체 가능한 토큰을 사용하여 구매했습니다! **화이팅** 🚀

---

## 결론

이 튜토리얼에서는 마켓플레이스 컨트랙트의 기본 사항과 작동 방식에 대해 배웠습니다. 높은 수준에서 핵심 로직을 살펴보고 코드를 살펴보았습니다. NFT, 마켓플레이스 및 FT 컨트랙트를 배포하고, 모두 초기화한 다음, NFT를 판매용으로 넣고 대체 가능한 토큰으로 판매했습니다! 정말 놀라운 경험이었습니다! 필요한 모든 것들을 구현하고 싶다면, 이러한 컨트랙트를 확장하세요. 세상은 당신의 것입니다! 이 튜토리얼 시리즈를 따라 주셔서 대단히 감사합니다. 저희 디스코드나 소셜 미디어 채널에서 무엇이든 주저하지 말고 도움이나 설명을 요청하세요. **화이팅!**

---

:::note Versioning for this article
At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-sdk-rs: `5.1.0` (with enabled `legacy` feature)
- cargo-near: `0.6.1`
- near-cli: `4.0.13`
:::
