---
id: predeployed-contract
title: 사전 배포된 컨트랙트
sidebar_label: 사전 배포된 컨트랙트
---

Create your first non-fungible token by using a pre-deployed NFT smart contract which works exactly as the one you will build on this tutorial.

---

## 전제 조건

To complete this tutorial successfully, you'll need [a NEAR Wallet](https://testnet.mynearwallet.com/create) and [NEAR CLI RS](../../4.tools/cli-rs.md#setup)

---

## NFT 컨트랙트 사용

Minting an NFT token on NEAR is a simple process that involves calling a smart contract function.

To interact with the contract you will need to first login to your NEAR account through `near-cli`.

<hr class="subsection" />

### 설정

터미널에서 다음 명령을 실행하여 새로 만든 계정에 `near-cli`로 로그인합니다.

```bash
near account import-account using-web-wallet network-config testnet
```

이 튜토리얼에서 명령을 쉽게 복사하고 붙여넣을 수 있도록 계정 ID에 대한 환경 변수를 설정합니다.

```bash
export NEARID=YOUR_ACCOUNT_NAME
```

<hr class="subsection" />

### NFT 발행

We have already deployed an NFT contract to `nft.examples.testnet` which allows users to freely mint tokens. Let's use it to mint our first token.

Run this command in your terminal, remember to replace the `token_id` with a string of your choice. This string will uniquely identify the token you mint.

```bash
near contract call-function as-transaction nft.examples.testnet nft_mint json-args '{"token_id": "TYPE_A_UNIQUE_VALUE_HERE", "receiver_id": "'$NEARID'", "metadata": { "title": "GO TEAM", "description": "The Team Goes", "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/", "copies": 1}}' prepaid-gas '100.0 Tgas' attached-deposit '0.1 NEAR' sign-as $NEARID network-config testnet sign-with-legacy-keychain send
```

<details>
<summary>응답 예시: </summary>
<p>

```json
Log [nft.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"nft-1.0.0","event":"nft_mint","data":[{"owner_id":"benjiman.testnet","token_ids":["TYPE_A_UNIQUE_VALUE_HERE"]}]}
Transaction Id 8RFWrQvAsm2grEsd1UTASKpfvHKrjtBdEyXu7WqGBPUr
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/8RFWrQvAsm2grEsd1UTASKpfvHKrjtBdEyXu7WqGBPUr
''
```

</p>
</details>

:::tip `media` URL을 웹 서버에서 호스팅되는 이미지 파일에 대한 링크로 바꿀 수도 있습니다. :::

<hr class="subsection" />

### Querying your NFT

계정이 소유한 토큰을 보려면 다음 `near-cli` 명령을 사용하여 NFT 컨트랙트를 호출할 수 있습니다.

```bash
near contract call-function as-read-only nft.examples.testnet nft_tokens_for_owner json-args '{"account_id": "'$NEARID'"}' network-config testnet now
```

<details>
<summary>응답 예시: </summary>
<p>

```json
[
  {
    "token_id": "Goi0CZ",
    "owner_id": "bob.testnet",
    "metadata": {
      "title": "GO TEAM",
      "description": "The Team Goes",
      "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/",
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

**Congratulations!** You just minted your first NFT token on the NEAR blockchain! 🎉

Now try going to your [NEAR Wallet](https://testnet.mynearwallet.com) and view your NFT in the "Collectibles" tab.

---

## 끝맺는 말

이 기본 예제는 NEAR에서 NFT 스마트 컨트랙트를 호출하고 대체 불가능 토큰을 만들기 시작하는 데 필요한 모든 단계를 보여줍니다.

이제 프로세스에 익숙해졌으므로 [컨트랙트 아키텍처](/tutorials/nfts/skeleton)로 이동하여 스마트 컨트랙트 구조와 처음부터 자체 NFT 컨트랙트를 구축하는 방법에 대해 자세히 알아볼 수 있습니다.

***즐거운 민팅되세요!*** 🪙

:::note 문서 버전 관리

이 글을 쓰는 시점에서 이 예제는 다음 버전에서 작동합니다.

- near-cli-rs: `0.11.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
