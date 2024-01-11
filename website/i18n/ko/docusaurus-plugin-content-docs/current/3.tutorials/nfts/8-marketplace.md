---
id: marketplace
title: 마켓플레이스
sidebar_label: 마켓플레이스
---

이 튜토리얼에서는 $NEAR에 대해 대체 불가능 토큰(NFT)을 사고 팔 수 있는 NFT 마켓플레이스 컨트랙트의 기본 사항을 배웁니다. 이전 튜토리얼에서는 [NFT 표준](https://nomicon.io/Standards/NonFungibleToken)에 있는 모든 표준을 통합하는 완전한 NFT 컨트랙트를 작성했습니다.

## 소개

이 튜토리얼을 통해 마켓플레이스 컨트랙트가 NEAR에서 작동하는 방법을 배우게 됩니다. 이것은 예시용이며 표준 구현체는 없습니다. 당신의 기호에 맞게 이 컨트랙트를 자유롭게 나누고 수정하세요.

이전 튜토리얼과 동일한 레퍼지토리를 사용하여 `8.marketplace` 브랜치를 확인하면, 튜토리얼을 완료하는 데 필요한 파일이 있어야 합니다.

```bash
git checkout 8.marketplace
```

## 파일 구조 {#file-structure}

변경 사항에는 `market-contract`라는 새로운 루트 레벨의 디렉토리가 포함됩니다. 여기에는 아래에 설명된 대로 빌드 스크립트, 의존성(dependency) 및 실제 컨트랙트 코드가 모두 포함됩니다.

```
market-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
├── build.sh
└── src
    ├── external.rs
    ├── internal.rs
    ├── lib.rs
    ├── nft_callbacks.rs
    ├── sale.rs
    └── sale_views.rs
```

일반적으로 모두 동일한 레퍼지토리에 속하는 여러 스마트 컨트랙트에서 작업을 수행할 때, 이 튜토리얼에서 수행한 대로 자체 폴더에 구성하는 것이 좋습니다. 두 스마트 컨트랙트를 쉽게 빌드할 수 있도록 레퍼지토리의 `package.json` 파일도 수정해 두었기 때문에, 이 스마트 컨트랙트 두 개를 빌드할 때 다음 명령을 실행할 수 있습니다.

```bash
yarn build
```
이렇게 하면 두 컨트랙트에 대한 의존성이 설치되고 아래 디렉터리에 저장된 `wasm` 파일로 컴파일됩니다.

```
nft-tutorial
└── out
    ├── main.wasm
    └── market.wasm
```

## 컨트랙트 이해하기

처음에는 컨트랙트가 상당히 버거울 수 있지만, 모든 부가 기능을 제외하고 핵심 기능만 파헤치면 실제로는 매우 간단합니다. 이 컨트랙트는 사람들이 NEAR를 위해 NFT를 사고 팔 수 있도록 한다는 단 한 가지를 위해 설계되었습니다. 여기에는 로열티 지불, 판매 가격 업데이트, 판매 제거 및 스토리지 비용 지불에 대한 지원이 포함됩니다.

몇 가지 중요한 기능을 하는 파일과 함수들을 살펴 봅시다.

## lib.rs {#lib-rs}

이 파일은 컨트랙트에 저장되는 정보와 아래에서 배우게 될 몇 가지 주요 함수에 대해 설명합니다.

### 초기화 함수 {#initialization-function}

처음으로 살펴볼 함수는 생성자 함수입니다. 이것은 유일한 매개변수로 `owner_id`를 사용하며, 모든 스토리지 컬렉션을 기본값으로 설정합니다.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/8.marketplace/market-contract/src/lib.rs#L85-L105
```

### 스토리지 관리 모델 {#storage-management-model}

다음으로 이 컨트랙트를 위해 선택한 스토리지 관리 모델에 대해 이야기하겠습니다. NFT 컨트랙트에서, 사용자는 비용을 지불해야 하는 스토리지 호출에 $NEAR를 첨부했습니다. 예를 들어 누군가 NFT를 발행하는 경우, 컨트랙트에 데이터를 저장하는 비용을 충당하기 위해 `x` NEAR 만큼의 금액을 첨부해야 합니다.

그러나 이 마켓플레이스 컨트랙트에서는 스토리지 모델이 약간 다릅니다. 사용자는 스토리지 비용을 충당하기 위해 $NEAR를 마켓플레이스에 보증금으로 예치해야 합니다. 누군가 NFT를 판매할 때마다 마켓플레이스는 $NEAR 비용으로 해당 정보를 저장해야 합니다. 사용자는 스토리지에 대해 다시는 걱정할 필요가 없도록 원하는 만큼 NEAR를 입금하거나, 필요에 따라 1회 판매를 충당하기 위한 최소 금액을 입금할 수 있습니다.

리스팅된 NFT가 구매될 때 시나리오에 대해 생각해 볼 수 있습니다. 현재 컨트랙트에서 해제되는 스토리지는 어떻게 되나요? 이것이 우리가 스토리지 출금 기능을 도입한 이유입니다. 이를 통해 사용자는 사용하지 않는 초과 스토리지에 대한 비용을 출금할 수 있습니다. 로직을 이해하기 위해 몇 가지 시나리오를 살펴보겠습니다. 1회 판매에 필요한 저장 공간은 마켓플레이스 컨트랙트에서 0.01 NEAR입니다.

**시나리오 A**

- Benji는 시장에 자신의 NFT를 리스팅하고 싶지만, 스토리지 비용을 지불한 적이 없습니다.
- 그는 `storage_deposit` 메서드를 사용하여 정확히 0.01 NEAR를 예치합니다. 이것은 한 번의 판매를 커버할 것입니다.
- 그는 마켓플레이스에 자신의 NFT를 리스팅하였고, 현재 선불 판매 1개 중 1개를 사용하고 있기 때문에 더 이상 스토리지 공간이 남아 있지 않습니다. 그가 `storage_withdraw`를 호출하면 아무 일도 일어나지 않을 것입니다.
- Dorian은 Benji의 NFT를 좋아하고, 다른 사람보다 먼저 빠르게 구매했습니다. 이는 Benji의 판매가 이제 중단되었으며(구매한 이후) Benji는 선불 판매 1개 중 0개를 사용하고 있음을 의미합니다. 즉, 그는 1 판매 또는 0.01 NEAR가 남습니다.
- Benji는 이제 `storage_withdraw` 호출을 할 수 있으며, 그의 0.01 NEAR를 다시 돌려받을 것입니다. 컨트랙트 측면에서, 그는 출금 후 판매 금액이 0이 되며, 이제 NFT를 리스팅하기 전에 스토리지 보증금을 예치해야 합니다.

**시나리오 B**

- Dorian은 100개의 아름다운 NFT를 소유하고 있으며, 모든 NFT를 리스팅하고 싶습니다.
- NFT를 나열할 때마다 `storage_deposit`를 호출할 필요가 없도록, 그는 한 번만 호출하였습니다. Dorian은 성공한 사람이기 때문에 1000개의 판매를 커버하기에 충분한 10개의 NEAR를 첨부하였습니다. 이후, 그는 이제 9 NEAR 또는 900 판매를 초과했습니다.
- Dorian은 다른 일을 위해 9 NEAR가 필요하지만, 100개의 리스팅을 삭제하고 싶지는 않습니다. 그는 9 NEAR가 남았기 때문에 쉽게 인출할 수 있고 여전히 100개의 목록을 보유할 수 있습니다. `storage_withdraw` 호출을 하고 9 NEAR를 받으면 그는 0개의 판매 가능 수량을 가지게 될 것입니다.

이 동작을 염두에 두고 두 함수는 다음과 같이 로직을 설명합니다.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/8.marketplace/market-contract/src/lib.rs#L110-L173
```

이 컨트랙트에서 각 판매에 필요한 스토리지는 0.01 NEAR이지만, `storage_minimum_balance` 함수를 사용하여 해당 정보를 쿼리할 수 있습니다. 또한, 해당 계정이 지불한 스토리지 공간을 확인하려면 `storage_balance_of` 함수로 쿼리할 수 있습니다.

그 방법으로, `nft_callbacks.ts` 파일로 이동하여 NFT가 판매되는 방법을 볼 수 있습니다.

## nft_callbacks.rs {#nft_callbacks-rs}

이 파일은 NFT를 판매하는 데 사용되는 로직을 담당합니다. 승인 튜토리얼의 [마켓플레이스 섹션](/tutorials/nfts/approvals#marketplace-integrations)에서 기억한다면 사용자가 `nft_approve`를 호출하여 메시지를 전달할 때, `receiver_id` 컨트랙트에 대한 교차 컨트랙트 호출(cross-contract call)을 수행하고 `nft_on_approve` 메서드를 호출합니다. 이 `nft_callbacks.rs` 파일은 해당 함수를 구현합니다.

### 리스팅 로직 {#listing-logic}

주목해야 할 첫 번째 중요한 사항은 `SaleArgs` 구조체입니다. 이는 마켓플레이스 컨트랙트가 사용자가 NFT 컨트랙트 내 `nft_approve`로 전달하는 메시지를 기대하는 것입니다. 여기에는 나열된 NFT에 대한 yoctoNEAR의 판매 가격이 요약되어 있습니다.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/8.marketplace/market-contract/src/nft_callbacks.rs#L5-L10
```

`nft_on_approve` 함수는 NFT 컨트랙트에 의한 교차 컨트랙트 호출을 통해 호출됩니다. 이는 서명자가 다른 판매를 추가할 수 있는 충분한 스토리지 공간이 있는지 확인할 것입니다. 그런 다음 메시지에서 `SaleArgs`를 가져오고 리스팅을 생성하려고 시도할 것입니다.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/8.marketplace/market-contract/src/nft_callbacks.rs#L32-L134
```

## sale.rs {#sale-rs}

이제 스토리지를 추가하고 마켓플레이스에 NFT를 리스팅하는 프로세스에 익숙해졌으므로, 판매가 올라가면 수행할 수 있는 작업을 살펴보겠습니다. 이 `sale.rs` 파일은 가격 업데이트, 제거 및 NFT 구매를 위한 함수들에 대해 설명하고 있습니다.

### 판매 객체 {#sale-object}

컨트랙트는 각 판매 객체에 대해 저장하는 정보를 이해하는 것이 중요합니다. 마켓플레이스에는 서로 다른 NFT 컨트랙트에서 나온 많은 NFT가 나열되어 있기 때문에, 단순히 토큰 ID를 저장하는 것만으로는 서로 다른 NFT를 구별하기에 충분하지 않습니다. 이것이 토큰 ID와 NFT가 발생한 컨트랙트를 모두 추적해야 하는 이유입니다. 또한 각 목록에 대해 컨트랙트는 NFT 전송을 위해 제공된 승인 ID를 추적해야 합니다. 마지막으로 소유자 및 판매 조건이 필요합니다.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/8.marketplace/market-contract/src/sale.rs#L7-L18
```

### 리스팅 제거 {#removing-sales}

리스팅을 제거하려면, 소유자가 `remove_sale` 함수를 호출하고 NFT 컨트랙트 및 토큰 ID를 전달해야 합니다. 내부적으로, 이는 `internal.rs` 파일에서 찾을 수 있는 `internal_remove_sale` 함수를 호출합니다. 이것은 보안상의 이유로 1 yoctoNEAR를 요구합니다.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/8.marketplace/market-contract/src/sale.rs#L23-L34
```

### 가격 업데이트 {#updating-price}

토큰의 리스팅 가격을 업데이트하려면 소유자가 `update_price` 함수를 호출하고 컨트랙트, 토큰 ID 및 원하는 가격을 전달해야 합니다. 이렇게 하면 판매 객체를 가져오고 판매 조건을 변경한 다음 다시 삽입할 것입니다. 보안상의 이유로 이 함수는 1 yoctoNEAR를 요구합니다.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/8.marketplace/market-contract/src/sale.rs#L36-L65
```

### NFT 구매 {#purchasing-nfts}

NFT를 구매하려면 `offer` 함수를 호출해야 합니다. 이는 매개변수로 `nft_contract_id`와 `token_id`를 사용합니다. 구매하고 싶다면, 정확한 양의 NEAR를 호출에 첨부해야 합니다. 내부적으로, 이는 당신의 금액이 정가보다 큰지 확인하고, `process_purchase` 함수를 호출합니다. 해당 함수는 NFT 컨트랙트에 대한 교차 컨트랙트 호출을 수행하여 `nft_transfer_payout` 함수를 호출합니다. 이렇게 하면, 이전에 배운 [승인 관리](https://nomicon.io/Standards/NonFungibleToken/ApprovalManagement.html) 표준을 사용하여 NFT를 전송하고, 로열티가 포함된 `Payout` 객체를 반환합니다.

그런 다음 마켓플레이스는 `resolve_purchase`를 호출하여 악의적인 지불 객체를 확인하고, 모든 것이 잘 진행되면 올바른 계정에 지불합니다.

```rust reference
https://github.com/near-examples/nft-tutorial/blob/8.marketplace/market-contract/src/sale.rs#L67-L99
```

## sale_view.rs {#sale_view-rs}

마지막으로 살펴볼 파일은 `sale_view.rs` 파일입니다. 여기에 열거 메서드 중 일부가 설명되어 있습니다. 이를 통해 사용자는 판매에 관한 중요한 정보를 쿼리할 수 있습니다.

### Creating a sub-account

Run the following command to create a sub-account marketplace of your main account with an initial balance of 25 NEAR which will be transferred from the original to your new account.

```bash
near create-account marketplace.$NFT_CONTRACT_ID --masterAccount $NFT_CONTRACT_ID --initialBalance 25
```

Next, you'll want to export an environment variable for ease of development:

```bash
export MARKETPLACE_CONTRACT_ID=marketplace.$NFT_CONTRACT_ID
```

Using the build script, deploy the contract as you did in the previous tutorials:

```bash
near deploy --wasmFile out/market.wasm --accountId
 $MARKETPLACE_CONTRACT_ID
```

### Initialization and minting

Since this is a new contract, you'll need to initialize it. Use the following command to initialize the contract:

```bash
near call $MARKETPLACE_CONTRACT_ID new '{"owner_id": "'$MARKETPLACE_CONTRACT_ID'"}' --accountId $MARKETPLACE_CONTRACT_ID
```

### 총 공급량 {#total-supply}

마켓플레이스에 등록된 NFT의 총 공급량을 쿼리하려면 `get_supply_sales` 함수를 호출하면 됩니다. 아래에서 예를 볼 수 있습니다.

```bash
near view $MARKETPLACE_CONTRACT_ID get_supply_sales
```

### 소유자가 가진 총 공급량 {#total-supply-by-owner}

마켓플레이스의 특정 소유자가 나열한 NFT의 총 공급량을 쿼리하려면 `get_supply_by_owner_id` 함수를 호출하면 됩니다. 아래에서 예를 볼 수 있습니다.

```bash
near view $MARKETPLACE_CONTRACT_ID get_supply_by_owner_id '{"account_id": "benji.testnet"}'
```

### 컨트랙트에 의한 총 공급량 {#total-supply-by-contract}

특정 컨트랙트에 속하는 NFT의 총 공급량을 쿼리하려면 `get_supply_by_nft_contract_id` 함수를 호출하면 됩니다. 아래에서 예를 볼 수 있습니다.

```bash
near view $MARKETPLACE_CONTRACT_ID get_supply_by_nft_contract_id '{"nft_contract_id": "fayyr-nft.testnet"}'
```

### 리스팅 정보 쿼리 {#query-listing-information}

특정 리스팅에 대한 중요한 정보를 쿼리하기 위해 `get_sale` 함수를 호출할 수 있습니다. 이를 위해서 `nft_contract_token`을 통과해야 합니다. 이는 본질적으로 앞서 설명한 대로 마켓플레이스 컨트랙트 판매에 대한 고유 식별자입니다. 이는 NFT 컨트랙트와 `DELIMITER`, 토큰 ID로 구성됩니다. 이 컨트랙트에서, `DELIMITER`는 단순한 기간입니다: `.`.  이 쿼리의 예시는 아래에서 볼 수 있습니다.

```bash
near view $MARKETPLACE_CONTRACT_ID get_sale '{"nft_contract_token": "fayyr-nft.testnet.token-42"}'
```

또한 `get_sales_by_owner_id` 함수를 호출하여, 지정된 소유자의 목록에 대한 정보를 쿼리할 수 있습니다.

```bash
near view $MARKETPLACE_CONTRACT_ID get_sales_by_owner_id '{"account_id": "benji.testnet", "from_index": "5", "limit": 10}'
```

마지막으로 `get_sales_by_nft_contract_id` 함수를 호출하여 지정된 NFT 컨트랙트에서 발생한 리스팅에 대한 정보를 쿼리할 수 있습니다

```bash
near view $MARKETPLACE_CONTRACT_ID get_sales_by_nft_contract_id '{"nft_contract_id": "fayyr-nft.testnet", "from_index": "5", "limit": 10}'
```

## 결론

이 튜토리얼에서는 마켓플레이스 컨트랙트의 기본 사항과 작동 방식에 대해 배웠습니다. [lib.rs](#lib-rs) 파일을 훑어보며 [스토리지 관리](#storage-management-model) 모델 외에 [초기화 함수](#initialization-function)에 대해서도 배웠습니다.

그런 다음 [nft_callbacks](#nft_callbacks-ts) 파일을 검토하여 [NFT를 리스팅](#listing-logic)하는 방법을 이해했습니다. 또한 NFT를 나열한 후 필요한 몇 가지 중요한 함수에 대해 살펴보았습니다. 여기에는 [리스팅 제거](#removing-sales), [가격 업데이트](#updating-price) 및 [NFT 구매](#purchasing-nfts)가 포함됩니다.

마지막으로 [`sale_view`](#sale_view-rs) 파일에 있는 열거 메서드를 살펴보았습니다. 이를 통해 마켓플레이스 컨트랙트에 있는 중요한 정보를 쿼리할 수 있습니다.

이제 NEAR의 NFT 및 마켓플레이스 대해 확실하게 이해하셨을 것입니다. 자유롭게 수정하고 이러한 컨트랙트를 확장하여 원하는 멋진 애플리케이션을 만들 수 있습니다. [다음 튜토리얼](9-series.md)에서는 기존 NFT 컨트랙트를 사용하여 다음을 허용하도록 최적화하는 방법을 배웁니다.
- 게으른 발행(Lazy Minting)
- 컬렉션 만들기
- 허용 목록 기능
- 최적화된 스토리지 모델

:::note 문서 버전 관리

이 글을 쓰는 시점에서 이 예제는 다음 버전에서 작동합니다.

- near-cli: `3.0.0`
- NFT 표준: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), `1.0.0` 버전

:::
