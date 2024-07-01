---
id: approvals
title: 승인
sidebar_label: 승인
---

import {Github} from "@site/src/components/codetabs"

In this tutorial you'll learn the basics of an approval management system which will allow you to grant others access to transfer NFTs on your behalf.

This is the backbone of all NFT marketplaces and allows for some complex yet beautiful scenarios to happen. If you're joining us for the first time, feel free to clone [this repository](https://github.com/near-examples/nft-tutorial) and go to the `nft-contract-basic/` folder to follow along.

```bash
cd nft-contract-basic/
```

:::tip If you wish to see the finished code for this _Approval_ tutorial, you can find it on the `nft-contract-approval/` folder. :::

---

## ## 소개

Up until this point you've created a smart contract that allows users to mint and transfer NFTs as well as query for information using the [enumeration standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration). As we've been doing in the previous tutorials, let's break down the problem into smaller, more digestible, tasks.

Let's first define some of the end goals that we want to accomplish as per the [approval management](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement) extension of the standard. We want a user to have the ability to:

- 다른 계정에 토큰별로 NFT를 전송할 수 있는 액세스 권한을 부여합니다.
- 계정에 특정 토큰에 대한 액세스 권한이 있는지 확인합니다.
- 특정 계정의 NFT 전송 승인을 취소합니다.
- NFT를 전송할 수 있는 다른 **모든** 계정의 승인을 취소합니다.

If you look at all these goals, they are all on a per token basis. This is a strong indication that you should change the `Token` struct which keeps track of information for each token.

---

## 계정에서 NFT 전송 허용

Let's start by trying to accomplish the first goal. How can you grant another account access to transfer an NFT on your behalf?

The simplest way that you can achieve this is to add a list of approved accounts to the `Token` struct. When transferring the NFT, if the caller is not the owner, you could check if they're in the list.

Before transferring, you would need to clear the list of approved accounts since the new owner wouldn't expect the accounts approved by the original owner to still have access to transfer their new NFT.

<hr className="subsection" />

### 문제점 {#the-problem}

On the surface, this would work, but if you start thinking about the edge cases, some problems arise. Often times when doing development, a common approach is to think about the easiest and most straightforward solution. Once you've figured it out, you can start to branch off and think about optimizations and edge cases.

Let's consider the following scenario. Benji has an NFT and gives two separate marketplaces access to transfer his token. By doing so, he's putting the NFT for sale (more about that in the [marketplace integrations](#marketplace-integrations) section). Let's say he put the NFT for sale for 1 NEAR on both markets. The tokens list of approved account IDs would look like the following:

```
Token: {
    owner_id: Benji
    approved_accounts_ids: [marketplace A, marketplace B]
}
```

Josh then comes along and purchases the NFT on marketplace A for 1 NEAR. This would take the sale down from the marketplace A and clear the list of approved accounts. Marketplace B, however, still has the token listed for sale for 1 NEAR and has no way of knowing that the token was purchased on marketplace A by Josh. The new token struct would look as follows:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: []
}
```

Let's say Josh is low on cash and wants to flip this NFT and put it for sale for 10 times the price on marketplace B. He goes to put it for sale and for whatever reason, the marketplace is built in a way that if you try to put a token up for sale twice, it keeps the old sale data. This would mean that from marketplace B's perspective, the token is still for sale for 1 NEAR (which was the price that Benji had originally listed it for).

Since Josh approved the marketplace to try and put it for sale, the token struct would look as follows:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: [marketplace A, marketplace B]
}
```

If Mike then comes along and purchases the NFT for only 1 NEAR on marketplace B, the marketplace would go to try and transfer the NFT and since technically, Josh approved the marketplace and it's in the list of approved accounts, the transaction would go through properly.

<hr className="subsection" />

### 해결책 {#the-solution}

Now that we've identified a problem with the original solution, let's think about ways that we can fix it. What would happen now if, instead of just keeping track of a list of approved accounts, you introduced a specific ID that went along with each approved account. The new approved accounts would now be a map instead of a list. It would map an account to it's `approval id`.

For this to work, you need to make sure that the approval ID is **always** a unique, new ID. If you set it as an integer that always increases by 1 whenever u approve an account, this should work. Let's consider the same scenario with the new solution.

Benji puts his NFT for sale for 1 NEAR on marketplace A and marketplace B by approving both marketplaces. The "next approval ID" would start off at 0 when the NFT was first minted and will increase from there. This would result in the following token struct:

```
Token: {
    owner_id: Benji
    approved_accounts_ids: {
        marketplace A: 0
        marketplace B: 1
    }
    next_approval_id: 2
}
```

When Benji approved marketplace A, it took the original value of `next_approval_id` which started off at 0. The marketplace was then inserted into the map and the next approval ID was incremented. This process happened again for marketplace B and the next approval ID was again incremented where it's now 2.

Josh comes along and purchases the NFT on marketplace A for 1 NEAR. Notice how the next approval ID stayed at 2:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: {}
    next_approval_id: 2
}
```

Josh then flips the NFT because he's once again low on cash and approves marketplace B:

```
Token: {
    owner_id: Josh
    approved_accounts_ids: {
        marketplace B: 2
    }
    next_approval_id: 3
}
```

The marketplace is inserted into the map and the next approval ID is incremented. From marketplace B's perspective it stores it's original approval ID from when Benji put the NFT up for sale which has a value of 1. If Mike were to go and purchase the NFT on marketplace B for the original 1 NEAR sale price, the NFT contract should panic. This is because the marketplace is trying to transfer the NFT with an approval ID 1 but the token struct shows that it **should** have an approval ID of 2.

<hr className="subsection" />

### `Token` 및 `JsonToken` 구조체 확장

Now that you understand the proposed solution to the original problem of allowing an account to transfer your NFT, it's time to implement some of the logic. The first thing you should do is modify the `Token` and `JsonToken` structs to reflect the new changes. Let's switch over to the `nft-contract-basic/src/metadata.rs` file:

<Github language="rust" start="41" end="64" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/metadata.rs" />

You'll then need to initialize both the `approved_account_ids` and `next_approval_id` to their default values when a token is minted. Switch to the `nft-contract-basic/src/mint.rs` file and when creating the `Token` struct to store in the contract, let's set the next approval ID to be 0 and the approved account IDs to be an empty map:

<Github language="rust" start="31" end="38" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/mint.rs" />

<hr className="subsection" />

### 계정 승인

Now that you've added the support for approved account IDs and the next approval ID on the token level, it's time to add the logic for populating and changing those fields through a function called `nft_approve`. This function should approve an account to have access to a specific token ID. Let's move to the `nft-contract-basic/src/approval.rs` file and edit the `nft_approve` function:

<Github language="rust" start="38" end="95" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/approval.rs" />

The function will first assert that the user has attached **at least** one yoctoNEAR (which we'll implement soon). This is both for security and to cover storage. When someone approves an account ID, they're storing that information on the contract. As you saw in the [minting tutorial](/tutorials/nfts/minting), you can either have the smart contract account cover the storage, or you can have the users cover that cost. The latter is more scalable and it's the approach you'll be working with throughout this tutorial.

After the assertion comes back with no problems, you get the token object and make sure that only the owner is calling this method. Only the owner should be able to allow other accounts to transfer their NFTs. You then get the next approval ID and insert the passed in account into the map with the next approval ID. If it's a new approval ID, storage must be paid. If it's not a new approval ID, no storage needs to be paid and only attaching 1 yoctoNEAR would be enough.

You then calculate how much storage is being used by adding that new account to the map and increment the tokens `next_approval_id` by 1. After inserting the token object back into the `tokens_by_id` map, you refund any excess storage.

You'll notice that the function contains an optional `msg` parameter. This message can be used by NFT marketplaces. 함수에 메시지가 있는 경우, 액세스 권한이 부여된 계정에 대한 교차 컨트랙트 호출(Cross Contract Call)을 수행합니다. 이 교차 컨트랙트 호출은 메시지를 구문 분석하고 그에 따라 작동하는 `nft_on_approve` 함수를 호출합니다.

It is up to the approving person to provide a properly encoded message that the marketplace can decode and use. 이것은 일반적 으로 유용한 방식으로 `msg`를 구성하는 방법을 알고 있는 마켓플레이스의 프론트엔드 앱을 통해 수행됩니다.

<hr className="subsection" />

### 내부 함수

이제 계정 승인을 위한 핵심 로직이 완료되었으므로 `assert_at_least_one_yocto` 및 `bytes_for_approved_account` 함수를 구현해야 합니다. `nft-contract/src/internal.rs` 파일로 이동하여 `assert_one_yocto` 함수 바로 아래에 다음 함수를 복사합니다.

<Github language="rust" start="49" end="55" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/internal.rs" />

다음으로 계정 ID를 저장하는 데 드는 비용을 계산하는 로직을 복사해야 합니다. 이 함수를 페이지 맨 위에 두세요.

<Github language="rust" start="1" end="9" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/internal.rs" />

이제 계정 승인 로직이 완료되었으므로, 전송 제한을 변경해야 합니다.


#### NFT 전송 제한 변경

현재 NFT는 소유자**만** 전송할 수 있습니다. 승인된 사람들도 NFT를 전송할 수 있도록 해당 제한을 변경해야 합니다. 또한 승인 ID가 통과되면, 보안을 강화하고, 이체하려는 계정이 모두 승인 목록에 있으며 올바른 승인 ID에 해당하는지 확인할 수 있도록 만들 것 입니다. 이것은 이전에 발생한 문제를 해결하기 위한 것입니다.

`internal.rs` 파일에서 제한이 적용되는 `internal_transfer` 메서드의 로직을 변경해야 합니다. 내부 전송 함수를 다음과 같이 변경합니다.

<Github language="rust" start="130" end="227" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/internal.rs" />

보낸 사람이 소유자가 아닌지 확인한 다음, 소유자가 아니면 보낸 사람이 승인 목록에 있는지 확인합니다. 승인 ID가 함수에 전달된 경우 컨트랙트에 저장된 발신자의 실제 승인 ID가 전달된 것과 일치하는지 확인합니다.

<hr className="subsection" />

#### 전송 시 스토리지 환불

내부 파일에 있는 동안, NFT가 전송될 때 컨트랙트에 승인된 계정을 저장하기 위해 지불한 사용자를 환불하는 방법을 추가해야 합니다. 이는 NFT가 전송될 때마다 `approved_account_ids` 객체를 지우고, 스토리지가 더 이상 사용되지 않기 때문입니다.

`bytes_for_approved_account_id` 함수 바로 아래에서, 다음 두 함수를 복사합니다.

<Github language="rust" start="11" end="29" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/internal.rs" />

이는 새 승인 로직을 포함하도록 `nft_core` 함수를 변경하는 다음 섹션에서 유용합니다.

<hr className="subsection" />

### `nft_core.rs` 내 변경 사항

Head over to the `nft-contract-basic/src/nft_core.rs` file and the first change that you'll want to make is to add an `approval_id` to both the `nft_transfer` and `nft_transfer_call` functions. 이는 소유자가 아닌 토큰을 전송하려는 사람이 위에서 본 문제를 해결하기 위해 승인 ID를 전달해야 하기 때문입니다. 소유자인 경우 `internal_transfer` 함수에서 본 승인 ID가 사용되지 않습니다.

<Github language="rust" start="8" end="29" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/nft_core.rs" />

그런 다음 `nft_resolve_transfer`의 매개변수에 `approved_account_ids` 맵을 추가해야 합니다. 이는 전송이 제대로 이루어졌을 경우 목록을 환불할 수 있도록 하기 위한 것입니다.

<Github language="rust" start="47" end="66" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/nft_core.rs" />

`nft_transfer` 함수로 이동해서, 승인 ID를 `internal_transfer` 함수에 전달한 다음, 전송이 완료된 후 이전 토큰 승인 계정 ID를 환불하기만 하면 됩니다.

<Github language="rust" start="71" end="99" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/nft_core.rs" />

다음으로 `nft_transfer_call`에 대해 동일한 작업을 수행해야 하지만, 전송이 취소될 가능성이 있기 때문에, 즉시 환불하는 대신 이전 토큰의 승인된 계정 ID를 `nft_resolve_transfer`에 첨부해야 합니다.

<Github language="rust" start="101" end="158" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/nft_core.rs" />

또한 `nft_token`에서 반환되는 `JsonToken` 토큰에 승인된 계정 ID를 추가해야 합니다.

<Github language="rust" start="160" end="176" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/nft_core.rs" />

마지막으로 `nft_resolve_transfer`에서 승인된 계정 ID를 환불하기 위한 로직을 추가해야 합니다. 이전이 완료되면 토큰 `approved_account_ids` 필드를 재설정하여 해제되는 스토리지에 대해 소유자에게 환불해야 합니다. 그러나 전송을 되돌려야 하는 경우 아무에게도 환불하지 않는 것만으로는 충분하지 않습니다. 수신자가 토큰을 잠시 소유했기 때문에 승인된 자체 계정 ID를 추가할 수 있기 때문입니다. 따라서 그렇게 한 경우, 환불해야 합니다.

<Github language="rust" start="181" end="279" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/nft_core.rs" />

완료되면 다음 작업으로 이동하여 완료할 시간입니다.

---

## 계정 승인 확인

이제 계정 승인 및 환불을 위한 핵심 로직이 마련되었으므로, 이 시점부터 원활하게 진행되어야 합니다. 이제 계정이 승인되었는지 확인하는 로직을 구현해야 합니다. 여기에는 계정 및 토큰 ID와 선택적 승인 ID가 필요합니다. 승인 ID가 제공되지 않은 경우, 계정 승인 여부를 반환해야 합니다.

승인 ID가 제공된 경우, 계정이 승인되었는지 여부와 제공된 승인 ID가 동일한지 여부를 반환해야 합니다. Let's move to the `nft-contract-basic/src/approval.rs` file and add the necessary logic to the `nft_is_approved` function.

<Github language="rust" start="98" end="125" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/approval.rs" />

이제 계속해서 계정 해지 로직을 추가해 보겠습니다.

---

## 계정 해지

튜토리얼의 다음 단계는 사용자가 자신의 NFT에 대한 액세스 권한을 갖지 못하도록 특정 계정을 취소하도록 허용하는 것입니다. 가장 먼저 해야 할 일은 보안을 위해 하나의 yocto를 첨부하도록 요구하는 것입니다. 그런 다음 호출자가 토큰의 소유자인지 확인해야 합니다. 이러한 확인 과정을 거치면, 토큰 승인 계정 ID에서 전달된 계정을 제거하고 해제되는 스토리지에 대해 소유자에게 환불해야 합니다.

<Github language="rust" start="127" end="151" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/approval.rs" />

---

## 모든 계정 해지

튜토리얼의 마지막 단계는 사용자가 NFT에 대한 액세스 권한이 없는 모든 계정을 취소할 수 있도록 허용하는 것입니다. 이것은 또한 보안 목적을 위해 하나의 yocto를 요구하고 호출자가 토큰의 소유자인지 확인해야 합니다. 그런 다음 소유자에게 맵의 모든 계정을 해제하는 데에 대한 금액을 환불하고, `approved_account_ids`를 비우면 됩니다.

<Github language="rust" start="153" end="173" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-approval/src/approval.rs" />

완료되면 컨트랙트를 배포하고 테스트를 시작할 때입니다.

---

## 새 변경 사항 테스트 {#testing-changes}

이러한 변경 사항은 다른 모든 토큰에 영향을 미치고, 상태가 새 코드에 의해 자동으로 상속될 수 없기 때문에 단순히 컨트랙트를 재배포하면 오류가 발생합니다. For this reason, it's best practice to create a new account and deploy the contract there.

<hr className="subsection" />

### Deployment and initialization

Next, you'll deploy this contract to the network.

```bash
export APPROVAL_NFT_CONTRACT_ID=<accountId>
near account create-account sponsor-by-faucet-service $APPROVAL_NFT_CONTRACT_ID autogenerate-new-keypair save-to-legacy-keychain network-config testnet create
```

Using the cargo-near, deploy and initialize the contract as you did in the previous tutorials:

```bash
cargo near deploy $APPROVAL_NFT_CONTRACT_ID with-init-call new_default_meta json-args '{"owner_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

<hr className="subsection" />

### Minting {#minting}

다음으로 토큰을 발행해야 합니다. 이 명령을 실행하면 `"approval-token"`이라는 토큰 ID로 토큰을 발행하고, 수신자가 새 계정이 됩니다.

```bash
near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_mint json-args '{"token_id": "approval-token", "metadata": {"title": "Approval Token", "description": "testing out the new approval extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $APPROVAL_NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

열거 함수 중 하나를 호출하여 모든 것이 제대로 진행되었는지 확인할 수 있습니다.

```bash
near contract call-function as-read-only $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner json-args '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}' network-config testnet now
```

그러면 다음과 유사한 출력이 반환됩니다.

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "approval.goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": {}
  }
]
```

이제 승인된 계정 ID가 함수에서 어떻게 반환되는지 확인해 보세요. 이는 좋은 징조입니다! 이제 토큰에 액세스할 수 있도록 계정을 승인하고 진행할 준비가 되었습니다.

<hr className="subsection" />

### 계정 승인 {#approving-an-account}

이 시점에서 두 개의 계정이 있어야 합니다. 하나는 환경 변수 `$NFT_CONTRACT_ID` 아래에 저장되고 다른 하나는 환경 변수 `$APPROVAL_NFT_CONTRACT_ID` 아래에 저장됩니다. 이 두 계정을 모두 사용하여 테스트할 수 있습니다. 이전 계정을 승인하면 NFT를 자신에게 전송할 수 있는 기능이 있어야 합니다.

다음 명령을 실행하여 `$NFT_CONTRACT_ID` 내 저장된 계정이 당신의 `"approval-token"` ID로 NFT를 전송할 수 있도록 액세스 권한을 승인합니다. 이전 계정은 `nft_on_approve` 함수를 구현하지 않았으므로 메시지를 전달할 필요가 없습니다. 또한 컨트랙트에 계정을 저장하는 비용을 충당하기에 충분한 NEAR를 첨부해야 합니다. 0.1 NEAR 이상이어야 하며, 사용하지 않은 초과분은 환불됩니다.

```bash
near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_approve json-args '{"token_id": "approval-token", "account_id": "'$NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

이전과 동일한 열거 메서드를 호출하면 승인된 새 계정 ID가 반환되는 것을 볼 수 있습니다.

```bash
near contract call-function as-read-only $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner json-args '{"account_id": "'$APPROVAL_NFT_CONTRACT_ID'", "limit": 10}' network-config testnet now
```

그러면 다음과 유사한 출력이 반환됩니다.

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "approval.goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": { "goteam.examples.testnet": 0 }
  }
]
```

<hr className="subsection" />

### 승인된 계정으로 NFT 전송 {#transferring-the-nft}

이제 토큰을 전송하도록 다른 계정을 승인했으므로 해당 동작을 테스트할 수 있습니다. 다른 계정을 사용해서, 승인된 계정 ID를 재설정해야 하는 NFT를 자신에게 전송할 수 있어야 합니다. 잘못된 승인 ID로 NFT 전송을 테스트해 보겠습니다.

```bash
near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_transfer json-args '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 1}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

<details>
<summary>응답 예시: </summary>
<p>

```bash
kind: {
    ExecutionError: "Smart contract panicked: panicked at 'assertion failed: `(left == right)`\n" +
      '  left: `0`,\n' +
      " right: `1`: The actual approval_id 0 is different from the given approval_id 1', src/internal.rs:165:17"
  },
```

</p>
</details>

올바른 승인 ID인 `0`​​을 전달하면 모든 것이 잘 작동하는 것을 볼 수 있습니다.

```bash
near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_transfer json-args '{"receiver_id": "'$NFT_CONTRACT_ID'", "token_id": "approval-token", "approval_id": 0}' prepaid-gas '100.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

열거 메서드를 다시 호출하면 소유자가 업데이트되고 승인된 계정 ID가 재설정되는 것을 볼 수 있습니다.

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": {}
  }
]
```

이제 다른 소유자 간에 증가하는 승인 ID를 테스트해 보겠습니다. If you approve the account that originally minted the token, the approval ID should be 1 now.

```bash
near contract call-function as-transaction $APPROVAL_NFT_CONTRACT_ID nft_approve json-args '{"token_id": "approval-token", "account_id": "'$APPROVAL_NFT_CONTRACT_ID'"}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NFT_CONTRACT_ID network-config testnet sign-with-legacy-keychain send
```

Calling the view function again show now return an approval ID of 1 for the account that was approved.

```bash
near contract call-function as-read-only $APPROVAL_NFT_CONTRACT_ID nft_tokens_for_owner json-args '{"account_id": "'$NFT_CONTRACT_ID'", "limit": 10}' network-config testnet now
```

<details>
<summary>응답 예시: </summary>
<p>

```json
[
  {
    "token_id": "approval-token",
    "owner_id": "goteam.examples.testnet",
    "metadata": {
      "title": "Approval Token",
      "description": "testing out the new approval extension of the standard",
      "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
      "media_hash": null,
      "copies": null,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": { "approval.goteam.examples.testnet": 1 }
  }
]
```

</p>
</details>

테스트가 완료되면, 표준에 대한 승인 확장을 성공적으로 구현한 것입니다!

---

## 결론

오늘 [승인 확장](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement)을 구현하기 위해 많은 로직을 거쳤으므로, 수행한 작업을 정확히 분석해 보겠습니다.

먼저 문제를 해결하는 방법에 대한 [기본 접근 방식](#basic-solution)을 살펴보았습니다. 그런 다음 해당 솔루션의 몇 가지 [문제점](#the-problem)을 살펴보고 [이를 수정](#the-solution)하는 방법을 배웠습니다.

승인 확장을 구현하기 위해 수행해야 하는 작업을 이해한 후, 컨트랙트에서 JsonToken 및 Token 구조를 [수정](#expanding-json-and-token)하였습니다. 그런 다음 [계정 승인](#approving-accounts) 로직을 구현하고 [마켓플레이스](#marketplace-integrations)에 통합하는 방법도 확인했습니다.

계정 승인 로직을 구현한 후 NFT 전송에 필요한 [제한 사항을 변경](#changing-restrictions)했습니다. 승인 로직을 마무리하기 위해 수행한 마지막 단계는, 돌아가서 새 변경 사항과 호환되도록 [nft_core](#nft-core-changes) 파일을 편집하는 것입니다.

이 시점에서 계정을 승인할 수 있기 위한 모든 것이 구현되었으며, 승인된 계정이 토큰을 전송할 수 있도록 [핵심 표준](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core)의 기능을 확장했습니다.

또한, 계정이 승인되었는지 [확인](#check-if-account-approved)하고 튜토리얼의 코딩 파트를 완료하기 위해 view 메서드를 구현하고 [계정을 해지](#revoke-account) 및 [모든 계정을 해지](#revoke-all-accounts)하는 데 필요한 로직을 구현했습니다.

After this, the contract code was finished and it was time to move onto testing where you created an [account](#deployment) and tested the [approving](#approving-an-account) and [transferring](#transferring-the-nft) for your NFTs.

In the [next tutorial](6-royalty.md), you'll learn about the royalty standards and how you can interact with NFT marketplaces.

:::note 문서 버전 관리

글을 작성하는 시점에서, 해당 예제는 다음 버전에서 작동합니다.

- rustc: `1.77.1`
- near-cli-rs: `0.11.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- 열거 표준: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), `1.0.0` 버전
- Approval standard: [NEP178](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement), version `1.1.0`

:::
