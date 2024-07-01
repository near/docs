---
id: marketplace
title: 마켓플레이스
sidebar_label: 마켓플레이스
---

import {Github} from "@site/src/components/codetabs"

이 튜토리얼에서는 $NEAR에 대해 대체 불가능 토큰(NFT)을 사고 팔 수 있는 NFT 마켓플레이스 컨트랙트의 기본 사항을 배웁니다. 이전 튜토리얼에서는 [NFT 표준](https://nomicon.io/Standards/NonFungibleToken)에 있는 모든 표준을 통합하는 완전한 NFT 컨트랙트를 작성했습니다.

---

## 소개

Throughout this tutorial, you'll learn how a marketplace contract **could** work on NEAR. This is meant to be **an example** as there is no **canonical implementation**. 당신의 기호에 맞게 이 컨트랙트를 자유롭게 나누고 수정하세요.

```bash
cd market-contract/
```

This folder contains both the actual contract code and dependencies as outlined below.

```
market-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
└── src
    ├── external.rs
    ├── internal.rs
    ├── lib.rs
    ├── nft_callbacks.rs
    ├── sale.rs
    └── sale_views.rs
```

---

## 컨트랙트 이해하기

처음에는 컨트랙트가 상당히 버거울 수 있지만, 모든 부가 기능을 제외하고 핵심 기능만 파헤치면 실제로는 매우 간단합니다. 이 컨트랙트는 사람들이 NEAR를 위해 NFT를 사고 팔 수 있도록 한다는 단 한 가지를 위해 설계되었습니다. 여기에는 로열티 지불, 판매 가격 업데이트, 판매 제거 및 스토리지 비용 지불에 대한 지원이 포함됩니다.

몇 가지 중요한 기능을 하는 파일과 함수들을 살펴 봅시다.

---

## lib.rs {#lib-rs}

이 파일은 컨트랙트에 저장되는 정보와 아래에서 배우게 될 몇 가지 주요 함수에 대해 설명합니다.

### 초기화 함수 {#initialization-function}

처음으로 살펴볼 함수는 생성자 함수입니다. 이것은 유일한 매개변수로 `owner_id`를 사용하며, 모든 스토리지 컬렉션을 기본값으로 설정합니다.

<Github language="rust" start="92" end="107" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/lib.rs" />

<hr className="subsection" />

### 스토리지 관리 모델 {#storage-management-model}

Next, let's talk about the storage management model chosen for this contract. On the NFT contract, users attached $NEAR to the calls that needed storage paid for. For example, if someone was minting an NFT, they would need to attach `x` amount of NEAR to cover the cost of storing the data on the contract.

On this marketplace contract, however, the storage model is a bit different. Users will need to deposit $NEAR onto the marketplace to cover the storage costs. Whenever someone puts an NFT for sale, the marketplace needs to store that information which costs $NEAR. Users can either deposit as much NEAR as they want so that they never have to worry about storage again or they can deposit the minimum amount to cover 1 sale on an as-needed basis.

You might be thinking about the scenario when a sale is purchased. What happens to the storage that is now being released on the contract? This is why we've introduced a storage withdrawal function. This allows users to withdraw any excess storage that is not being used. Let's go through some scenarios to understand the logic. The required storage for 1 sale is 0.01 NEAR on the marketplace contract.

**Scenario A**

- Benji는 시장에 자신의 NFT를 리스팅하고 싶지만, 스토리지 비용을 지불한 적이 없습니다.
- 그는 `storage_deposit` 메서드를 사용하여 정확히 0.01 NEAR를 예치합니다. 이것은 한 번의 판매를 커버할 것입니다.
- 그는 마켓플레이스에 자신의 NFT를 리스팅하였고, 현재 선불 판매 1개 중 1개를 사용하고 있기 때문에 더 이상 스토리지 공간이 남아 있지 않습니다. 그가 `storage_withdraw`를 호출하면 아무 일도 일어나지 않을 것입니다.
- Dorian은 Benji의 NFT를 좋아하고, 다른 사람보다 먼저 빠르게 구매했습니다. 이는 Benji의 판매가 이제 중단되었으며(구매한 이후) Benji는 선불 판매 1개 중 0개를 사용하고 있음을 의미합니다. 즉, 그는 1 판매 또는 0.01 NEAR가 남습니다.
- Benji는 이제 `storage_withdraw` 호출을 할 수 있으며, 그의 0.01 NEAR를 다시 돌려받을 것입니다. 컨트랙트 측면에서, 그는 출금 후 판매 금액이 0이 되며, 이제 NFT를 리스팅하기 전에 스토리지 보증금을 예치해야 합니다.

**Scenario B**

- Dorian은 100개의 아름다운 NFT를 소유하고 있으며, 모든 NFT를 리스팅하고 싶습니다.
- NFT를 나열할 때마다 `storage_deposit`를 호출할 필요가 없도록, 그는 한 번만 호출하였습니다. Dorian은 성공한 사람이기 때문에 1000개의 판매를 커버하기에 충분한 10개의 NEAR를 첨부하였습니다. Then he lists his 100 NFTs and now he has an excess of 9 NEAR or 900 sales.
- Dorian은 다른 일을 위해 9 NEAR가 필요하지만, 100개의 리스팅을 삭제하고 싶지는 않습니다. 그는 9 NEAR가 남았기 때문에 쉽게 인출할 수 있고 여전히 100개의 목록을 보유할 수 있습니다. `storage_withdraw` 호출을 하고 9 NEAR를 받으면 그는 0개의 판매 가능 수량을 가지게 될 것입니다.

With this behavior in mind, the following two functions outline the logic.

<Github language="rust" start="111" end="139" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/lib.rs" />
<Github language="rust" start="144" end="175" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/lib.rs" />

이 컨트랙트에서 각 판매에 필요한 스토리지는 0.01 NEAR이지만, `storage_minimum_balance` 함수를 사용하여 해당 정보를 쿼리할 수 있습니다. 또한, 해당 계정이 지불한 스토리지 공간을 확인하려면 `storage_balance_of` 함수로 쿼리할 수 있습니다.

With that out of the way, it's time to move onto the `sale.rs` file where you'll look at how NFTs are put for sale.

---

## sale.rs {#sale}

This file is responsible for the internal marketplace logic.

### 리스팅 로직 {#listing-logic}

In order to put an NFT on sale, a user should:

1. Approve the marketplace contract on an NFT token (by calling `nft_approve` method on the NFT contract)
2. Call the `list_nft_for_sale` method on the marketplace contract.

#### nft_approve
This method has to be called by the user to [approve our marketplace](5-approval.md), so it can transfer the NFT on behalf of the user. In our contract, we only need to implement the `nft_on_approve` method, which is called by the NFT contract when the user approves our contract.

In our case, we left it blank, but you could implement it to do some additional logic when the user approves your contract.

<Github language="rust" start="23" end="33" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/nft_callbacks.rs" />


#### list_nft_for_sale
The `list_nft_for_sale` method lists an nft for sale, for this, it takes the id of the NFT contract (`nft_contract_id`), the `token_id` to know which token is listed, the [`approval_id`](5-approval.md), and the price in yoctoNEAR at which we want to sell the NFT.

<Github language="rust" start="33" end="74" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

The function first checks if the user has [enough storage available](#storage-management-model-storage-management-model), and makes two calls in parallel to the NFT contract. The first is to check if this marketplace contract is authorized to transfer the NFT. The second is to make sure that the caller (`predecessor`) is actually the owner of the NFT, otherwise, anyone could call this method to create fake listings. This second call is mostly a measure to avoid spam, since anyways, only the owner could approve the marketplace contract to transfer the NFT.

Both calls return their results to the `process_listing` function, which executes the logic to store the sale object on the contract.

#### process_listing

The `process_listing` function will receive if our marketplace is authorized to list the NFT on sale, and if this was requested by the NFTs owner. If both conditions are met, it will proceed to check if the user has enough storage, and store the sale object on the contract.

<Github language="rust" start="264" end="344" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

<hr class="subsection" />

### 판매 객체 {#sale-object}

컨트랙트는 각 판매 객체에 대해 저장하는 정보를 이해하는 것이 중요합니다. 마켓플레이스에는 서로 다른 NFT 컨트랙트에서 나온 많은 NFT가 나열되어 있기 때문에, 단순히 토큰 ID를 저장하는 것만으로는 서로 다른 NFT를 구별하기에 충분하지 않습니다. 이것이 토큰 ID와 NFT가 발생한 컨트랙트를 모두 추적해야 하는 이유입니다. 또한 각 목록에 대해 컨트랙트는 NFT 전송을 위해 제공된 승인 ID를 추적해야 합니다. 마지막으로 소유자 및 판매 조건이 필요합니다.

<Github language="rust" start="5" end="20" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

<hr className="subsection" />

### 리스팅 제거 {#removing-sales}

리스팅을 제거하려면, 소유자가 `remove_sale` 함수를 호출하고 NFT 컨트랙트 및 토큰 ID를 전달해야 합니다. 내부적으로, 이는 `internal.rs` 파일에서 찾을 수 있는 `internal_remove_sale` 함수를 호출합니다. 이것은 보안상의 이유로 1 yoctoNEAR를 요구합니다.

<Github language="rust" start="76" end="87" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

<hr className="subsection" />

### 가격 업데이트 {#updating-price}

토큰의 리스팅 가격을 업데이트하려면 소유자가 `update_price` 함수를 호출하고 컨트랙트, 토큰 ID 및 원하는 가격을 전달해야 합니다. 이렇게 하면 판매 객체를 가져오고 판매 조건을 변경한 다음 다시 삽입할 것입니다. 보안상의 이유로 이 함수는 1 yoctoNEAR를 요구합니다.

<Github language="rust" start="90" end="118" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

<hr className="subsection" />

### NFT 구매 {#purchasing-nfts}

NFT를 구매하려면 `offer` 함수를 호출해야 합니다. 이는 매개변수로 `nft_contract_id`와 `token_id`를 사용합니다. 구매하고 싶다면, 정확한 양의 NEAR를 호출에 첨부해야 합니다. 내부적으로, 이는 당신의 금액이 정가보다 큰지 확인하고, `process_purchase` 함수를 호출합니다. 해당 함수는 NFT 컨트랙트에 대한 교차 컨트랙트 호출을 수행하여 `nft_transfer_payout` 함수를 호출합니다. 이렇게 하면, 이전에 배운 [승인 관리](https://nomicon.io/Standards/NonFungibleToken/ApprovalManagement.html) 표준을 사용하여 NFT를 전송하고, 로열티가 포함된 `Payout` 객체를 반환합니다.

그런 다음 마켓플레이스는 `resolve_purchase`를 호출하여 악의적인 지불 객체를 확인하고, 모든 것이 잘 진행되면 올바른 계정에 지불합니다.

<Github language="rust" start="121" end="151" url="https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale.rs" />

---

## sale_view.rs {#sale_view-rs}

The final file is [`sale_view.rs`](https://github.com/near-examples/nft-tutorial/blob/main/market-contract/src/sale_view.rs) file. 여기에 열거 메서드 중 일부가 설명되어 있습니다. 이를 통해 사용자는 판매에 관한 중요한 정보를 쿼리할 수 있습니다.

---

## Deployment and Initialization

Next, you'll deploy this contract to the network.

```bash
export MARKETPLACE_CONTRACT_ID=<accountId>
near account create-account sponsor-by-faucet-service $MARKETPLACE_CONTRACT_ID autogenerate-new-keypair save-to-legacy-keychain network-config testnet create
```

Using the build script, deploy the contract as you did in the previous tutorials:

```bash
cargo near deploy $MARKETPLACE_CONTRACT_ID with-init-call new json-args '{"owner_id": "'$MARKETPLACE_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

<hr className="subsection" />

### Minting and approving

Let's mint a new NFT token and approve a marketplace contract:

```bash
near contract call-function as-transaction $NFT_CONTRACT_ID nft_mint json-args '{"token_id": "token-1", "metadata": {"title": "My Non Fungible Team Token", "description": "The Team Most Certainly Goes :)", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

```bash
near contract call-function as-transaction $NFT_CONTRACT_ID nft_approve json-args '{"token_id": "token-1", "account_id": "'$MARKETPLACE_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

<hr className="subsection" />

### Listing NFT on sale

```bash
near contract call-function as-transaction $MARKETPLACE_CONTRACT_ID list_nft_for_sale json-args '{"nft_contract_id": "'$NFT_CONTRACT_ID'", "token_id": "token-1", "approval_id": 0, "msg": "{\"sale_conditions\": \"1\"}"}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

<hr className="subsection" />

### 총 공급량 {#total-supply}

마켓플레이스에 등록된 NFT의 총 공급량을 쿼리하려면 `get_supply_sales` 함수를 호출하면 됩니다. 아래에서 예를 볼 수 있습니다.

```bash
near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_supply_sales json-args {} network-config testnet now
```

<hr className="subsection" />

### 소유자가 가진 총 공급량 {#total-supply-by-owner}

마켓플레이스의 특정 소유자가 나열한 NFT의 총 공급량을 쿼리하려면 `get_supply_by_owner_id` 함수를 호출하면 됩니다. 아래에서 예를 볼 수 있습니다.

```bash
near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_supply_by_owner_id json-args '{"account_id": "'$NFT_CONTRACT_ID'"}' network-config testnet now
```

<hr className="subsection" />

### 컨트랙트에 의한 총 공급량 {#total-supply-by-contract}

특정 컨트랙트에 속하는 NFT의 총 공급량을 쿼리하려면 `get_supply_by_nft_contract_id` 함수를 호출하면 됩니다. 아래에서 예를 볼 수 있습니다.

```bash
near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_supply_by_nft_contract_id json-args '{"nft_contract_id": "'$NFT_CONTRACT_ID'"}' network-config testnet now
```

<hr className="subsection" />

### 리스팅 정보 쿼리 {#query-listing-information}

특정 리스팅에 대한 중요한 정보를 쿼리하기 위해 `get_sale` 함수를 호출할 수 있습니다. 이를 위해서 `nft_contract_token`을 통과해야 합니다. 이는 본질적으로 앞서 설명한 대로 마켓플레이스 컨트랙트 판매에 대한 고유 식별자입니다. 이는 NFT 컨트랙트와 `DELIMITER`, 토큰 ID로 구성됩니다. 이 컨트랙트에서, `DELIMITER`는 단순한 기간입니다: `.`.  이 쿼리의 예시는 아래에서 볼 수 있습니다.

```bash
near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_sale json-args '{"nft_contract_token": "'$NFT_CONTRACT_ID'.token-1"}' network-config testnet now
```

또한 `get_sales_by_owner_id` 함수를 호출하여, 지정된 소유자의 목록에 대한 정보를 쿼리할 수 있습니다.

```bash
near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_sales_by_owner_id json-args '{"account_id": "'$NFT_CONTRACT_ID'", "from_index": "0", "limit": 5}' network-config testnet now
```

마지막으로 `get_sales_by_nft_contract_id` 함수를 호출하여 지정된 NFT 컨트랙트에서 발생한 리스팅에 대한 정보를 쿼리할 수 있습니다

```bash
near contract call-function as-read-only $MARKETPLACE_CONTRACT_ID get_sales_by_nft_contract_id json-args '{"nft_contract_id": "'$NFT_CONTRACT_ID'", "from_index": "0", "limit": 5}' network-config testnet now
```

---

## 결론

이 튜토리얼에서는 마켓플레이스 컨트랙트의 기본 사항과 작동 방식에 대해 배웠습니다. [lib.rs](#lib-rs) 파일을 훑어보며 [스토리지 관리](#storage-management-model) 모델 외에 [초기화 함수](#initialization-function)에 대해서도 배웠습니다.

You went through the [NFTs listing process](#listing-logic). In addition, you went through some important functions needed after you've listed an NFT. 여기에는 [리스팅 제거](#removing-sales), [가격 업데이트](#updating-price) 및 [NFT 구매](#purchasing-nfts)가 포함됩니다.

마지막으로 [`sale_view`](#sale_view-rs) 파일에 있는 열거 메서드를 살펴보았습니다. 이를 통해 마켓플레이스 컨트랙트에 있는 중요한 정보를 쿼리할 수 있습니다.

이제 NEAR의 NFT 및 마켓플레이스 대해 확실하게 이해하셨을 것입니다. 자유롭게 수정하고 이러한 컨트랙트를 확장하여 원하는 멋진 애플리케이션을 만들 수 있습니다. [다음 튜토리얼](9-series.md)에서는 기존 NFT 컨트랙트를 사용하여 다음을 허용하도록 최적화하는 방법을 배웁니다.
- 게으른 발행(Lazy Minting)
- 컬렉션 만들기
- 허용 목록 기능
- 최적화된 스토리지 모델

:::note 문서 버전 관리

이 글을 쓰는 시점에서 이 예제는 다음 버전에서 작동합니다.

- rustc: `1.77.1`
- near-cli-rs: `0.11.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
