---
id: predeployed-contract
title: 사전 배포된 컨트랙트
sidebar_label: 사전 배포된 컨트랙트
---

> 쉽게 사용할 수 있는 NFT 스마트 컨트랙트를 사용하여 소프트웨어 개발을 하지 않고도 대체 불가능 토큰(NFT)을 쉽게 만드는 방법을 알아보세요.


:::caution

JS-SDK는 현재 **[`Alpha`](https://github.com/near/near-sdk-js/releases/)** 버전입니다.

:::

## 전제 조건

이 튜토리얼을 성공적으로 완료하려면 다음이 필요합니다.

- [NEAR 지갑](https://testnet.mynearwallet.com/create)
- [NEAR-CLI](/tools/near-cli#setup)

## NFT 컨트랙트 사용

### 설정

- 터미널에서 다음 명령을 실행하여 새로 만든 계정에 `near-cli`로 로그인합니다.

```bash
near login
```

 - 이 튜토리얼에서 명령을 쉽게 복사하고 붙여넣을 수 있도록 계정 ID에 대한 환경 변수를 설정합니다.

```bash
export NEARID=YOUR_ACCOUNT_NAME
```
:::note

`.testnet`(또는 `mainnet`에 대해서는 `.near`)을 포함하여, `YOUR_ACCOUNT_NAME`를 방금 로그인한 계정 이름으로 바꾸세요.

:::

- 다음을 실행하여 환경 변수가 올바르게 설정되었는지 테스트합니다.

```bash
echo $NEARID
```

### NFT 발행

NEAR는 사용자가 토큰을 자유롭게 발행할 수 있도록 `nft.examples.testnet` 계정에 NFT 컨트랙트를 배포했습니다. 이 사전 배포된 컨트랙트를 사용하여 첫 번째 토큰을 발행해 봅시다!


- 터미널에서 이 명령을 실행합니다. **아래 `token_id` 값을 고유한 문자열로 바꿔야 합니다**.

```bash
near call nft.examples.testnet nft_mint '{"token_id": "TYPE_A_UNIQUE_VALUE_HERE", "receiver_id": "'$NEARID'", "metadata": { "title": "GO TEAM", "description": "The Team Goes", "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/", "copies": 1}}' --accountId $NEARID --deposit 0.1
```

:::tip `media` URL을 웹 서버에서 호스팅되는 이미지 파일에 대한 링크로 바꿀 수도 있습니다. :::

<details>
<summary>응답 예시: </summary>
<p>

```json
Log [nft.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"benjiman.testnet","token_ids":["TYPE_A_UNIQUE_VALUE_HERE"]}]}
Transaction Id 8RFWrQvAsm2grEsd1UTASKpfvHKrjtBdEyXu7WqGBPUr
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/8RFWrQvAsm2grEsd1UTASKpfvHKrjtBdEyXu7WqGBPUr
''
```

</p>
</details>

- 계정이 소유한 토큰을 보려면 다음 `near-cli` 명령을 사용하여 NFT 컨트랙트를 호출할 수 있습니다.

```bash
near view nft.examples.testnet nft_tokens_for_owner '{"account_id": "'$NEARID'"}'
```

<details>
<summary>응답 예시: </summary>
<p>

```json
[
  {
    "token_id": "0",
    "owner_id": "dev-xxxxxx-xxxxxxx",
    "metadata": {
      "title": "Some Art",
      "description": "My NFT media",
      "media": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Olympus_Mons_alt.jpg/1024px-Olympus_Mons_alt.jpg",
      "media_hash": null,
      "copies": 1,
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

</p>
</details>

***축하합니다! NEAR 블록체인에서 첫 번째 NFT 토큰을 발행했습니다!*** 🎉

👉 Now try going to your [NEAR Wallet](https://testnet.mynearwallet.com) and view your NFT in the "Collectibles" tab. 👈

---

## 끝맺는 말

이 기본 예제는 NEAR에서 NFT 스마트 컨트랙트를 호출하고 대체 불가능 토큰을 만들기 시작하는 데 필요한 모든 단계를 보여줍니다.

이제 프로세스에 익숙해졌으므로 [컨트랙트 아키텍처](/tutorials/nfts/js/skeleton)로 이동하여 스마트 컨트랙트 구조와 처음부터 자체 NFT 컨트랙트를 구축하는 방법에 대해 자세히 알아볼 수 있습니다.

***즐거운 민팅되세요!*** 🪙

:::note 문서 버전 관리

이 글을 쓰는 시점에서 이 예제는 다음 버전에서 작동합니다.

- near-cli: `3.0.0`
- NFT 표준: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), `1.0.0` 버전

:::
