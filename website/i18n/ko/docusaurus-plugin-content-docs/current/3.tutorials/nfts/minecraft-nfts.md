---
id: minecraft-nfts
title: Minecraft에서 NFT 만들기
sidebar_label: Minecraft NFTs
---

> 이 튜토리얼에서는 맞춤형 Minecraft 제작물을 가져와서, NEAR 블록체인의 NFT로 발행하는 방법을 배웁니다!

## 개요

이 튜토리얼은 모든 크기의 Minecraft 도면을 NEAR 블록체인에 발행하는 과정을 안내합니다. 마인크래프트 내 디자인을 복사하여 자신의 세계에 붙여넣을 수 있습니다. 이를 위해 WorldEdit를 사용하여 설계도를 다운로드하고 읽을 것이며, [IPFS](https://ipfs.io/)를 사용하여 온체인에 배치할 것입니다.

## 전제 조건

:::info It is recommended that you first complete the introductory **[minting NFTs tutorial](/tutorials/nfts/minting-nfts)** :::

이 튜토리얼을 성공적으로 완료하려면 다음이 필요합니다.

- [Minecraft 계정](https://www.minecraft.net/)
- [WorldEdit 설치](https://worldedit.enginehub.org/en/latest/install/)
- [NEAR 계정](#wallet)
- [NEAR 명령줄 인터페이스](/tools/near-cli#setup) (`near-cli`)

## 도면 만들기

이 섹션에서는 체인에 넣을 Minecraft 도면을 만들 것입니다.

### 설정

- [WorldEdit](https://worldedit.enginehub.org/en/latest/install/)이 설치되고 Minecraft가 로드되면, 다음을 실행하여 WorldEdit가 제대로 작동하는지 확인합니다.

```bash
//pos1
```

WorldEdit이 제대로 설치된 경우, 이는 `First position set to (X, Y, Z)`를 출력해야 합니다. X, Y 및 Z는 좌표를 의미합니다.

이 튜토리얼에서는 작은 마을 집을 만들 것입니다. 따라가려면 아래와 같이 발행하고자 하는 구조를 선택하세요.

![Village House Minecraft](/docs/assets/nfts/village-house-minecraft.png)

그런 다음 복사하려는 구조의 경계를 선택해야 합니다. 우리는 이것을 당신이나 다른 사람들이 다운로드하여 당신의 Minecraft 세계에 붙여넣을 수 있도록, 체인에 배치될 도면으로 바꿀 것입니다.

- 이렇게 하려면 WorldEdit을 사용하여 빌드의 경계를 지정해야 합니다. 빌드의 왼쪽 하단 모서리에 서서 다음을 실행합니다.

```bash
//pos1
```

- 그런 다음 오른쪽 상단으로 이동하여 다음을 실행할 수 있습니다.

```bash
//pos2
```

이 두 위치를 설정하면 빌드 주변에 큐브가 생성됩니다.

- 이제 다음을 실행하여 해당 빌드의 내용을 복사할 수 있습니다.

```bash
//copy
```

출력은 다음과 같아야 합니다.

![Copy Chat Message](/docs/assets/nfts/copy-chat-message-minecraft.png)

:::info 팁
복사할 때 플레이어의 위치를 ​​기록해 두십시오. 빌드를 복사하고 지붕에 서 있다고 가정하면, 빌드를 붙여넣을 때 지붕에 서 있는 방식으로 빌드를 붙여넣습니다.
:::

### 온전성 검사

방금 복사한 것을 세계의 다른 곳에 붙여넣어 빌드가 괜찮은지 확인하고 확인할 수 있습니다.

- 빌드를 붙여넣을 위치로 이동하고 다음을 실행합니다.

```bash
//paste
```

아래 예에서는 산호초 바이옴 위에 떠 있는 마을 집을 붙여넣었습니다. 클립보드를 붙여넣었다는 응답도 표시되어야 합니다. (아래 예시 참조)

![Pasted Minecraft House](/docs/assets/nfts/pasted-minecraft-house.png)

### 도면 파일 생성

방금 복사하여 붙여넣은 빌드가 만족스러우면 NFT에 생성할 도면 파일을 만들 차례입니다. 이를 위해 로컬 장치에 도면 파일을 저장하는 WorldEdit 명령을 실행합니다.

- 이렇게 하려면 선택한 이름으로 `FILE_NAME`을 대체하여 `schematic save FILE_NAME` 명령을 실행합니다.

그러면 Minecraft 폴더 내 `minecraft/config/worldedit/schematics`에 확장자가 `.schem`인 파일이 저장됩니다.

- 이제 `schematic load FILE_NAME`를 사용하여, 방금 저장한 도면을 로드하여 파일을 테스트합니다

이렇게 하면 도면이 클립보드에 로드되고, 자유롭게 붙여넣을 수 있습니다.

## 도면 발행하기

이 섹션에서는 IPFS 및 web3.storage를 사용하여, 방금 생성하고 블록체인에 배치한 도면 파일을 만들 것입니다. 계속 진행하려면, 마지막 섹션에서 생성한  `FILE_NAME.schem`을 찾아야 합니다. 이 파일은 Minecraft 폴더 내 `minecraft/config/worldedit/schematics`에서 찾을 수 있습니다. minecraft 폴더의 위치는 OS에 따라 다를 수 있습니다.

### 도면 업로드

도면을 업로드하기 위해, 오프체인 데이터를 저장하기 위한 무료 [web3.storage](https://web3.storage/) 서비스를 사용할 것입니다. Web3.storage는 [IPFS](https://ipfs.io/) 및 [Filecoin](https://filecoin.io/)에서 무료 탈중앙화 스토리지 및 대역폭을 제공합니다.

#### 단계

1. Register an account and log in to [web3.storage](https://web3.storage/) either via email or your GitHub.

2. [파일](https://web3.storage/) 섹션 으로 이동하여 [추가 파일 업로드](https://web3.storage/) 버튼을 클릭합니다.

   ![web3.storage](/docs/assets/nfts/web3-storage-upload.png)

3. 파일을 업로드하면, 컨텐츠에 대한 고유한 `CID`와, 다음과 같은 URL이 표시됩니다.
   ```
   https://bafybeidadhfilezx23dcdaueo3bjuafqeehokw33vyepkjtppigorrhbpy.ipfs.dweb.link/
   ```

:::info See the [web3.storage docs](https://docs.web3.storage/) for information on uploading multiple files and available API endpoints. :::

### 컨트랙트와 상호 작용

NEAR는 이미 사용자가 토큰을 자유롭게 발행할 수 있는 `nft.examples.testnet` 컨트랙트를 계정에 배포했습니다. 이는 우리가 NFT를 발행하기 위해 상호 작용할 계정입니다. 또한, 원래 튜토리얼 따를 때 컨트랙트를 배포한 경우에도 이를 사용할 수 있습니다.

:::info `nft_mint`를 호출할 때 위의 업로드 프로세스 3단계에서 얻은 IPFS 링크를 미디어 값으로 사용합니다. :::

- 다음 명령을 실행하고, NEAR CLI를 통해 `receiver_id` 필드와 `--accountId` 플래그를 [로그인한](/tools/near-cli#near-login) 계정 ID로 바꿉니다.

```bash
near call nft.examples.testnet nft_mint '{"token_id": "my-token-unique-id", "receiver_id": "YOUR_ACCOUNT", "metadata": { "title": "YOUR NFT TITLE", "description": "YOUR NFT DESCRIPTION", "media": "https://bafybeidadhfilezx23dcdaueo3bjuafqeehokw33vyepkjtppigorrhbpy.ipfs.dweb.link/", "copies": 1}}' --accountId YOUR_ACCOUNT --deposit 0.1
```
- 제목, 설명 및 미디어 URL을 자신의 것으로 바꾸세요.

<details>
<summary>응답 예시: </summary>
<p>

```json
{
  "token_id": "0",
  "owner_id": "YOUR_ACCOUNT",
  "metadata": {
    "title": "My awesome Minecraft NFT",
    "description": "Custom log cabin",
    "media": "https://bafybeidadhfilezx23dcdaueo3bjuafqeehokw33vyepkjtppigorrhbpy.ipfs.dweb.link/",
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
```

</p>
</details>

- `example-nft` 컨트랙트에서 계정이 소유한 토큰을 보려면, 다음 `near-cli` 명령을 통해 컨트랙트를 호출할 수 있습니다.

```bash
near view nft.examples.testnet nft_tokens_for_owner '{"account_id": "YOUR_ACCOUNT"}'
```

<details>
<summary>응답 예시: </summary>
<p>

```json
[
  {
    "token_id": "0",
    "owner_id": "YOUR_ACCOUNT",
    "metadata": {
      "title": "Some Art",
      "description": "My NFT media",
      "media": "https://bafybeidadhfilezx23dcdaueo3bjuafqeehokw33vyepkjtppigorrhbpy.ipfs.dweb.link/",
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

## 마을 도면 사용

이제 도면을 블록체인에 업로드했으므로, 누군가 이를 자신의 세계에 붙여넣기 위해 해야 할 일은 NFT를 생성한 IPFS 링크와 관련된 `*.schem` 파일을 다운로드하여 도면 폴더에 배치하는 것입니다.

테스트로 우리가 작업한 마을 도면을 포함하는 NFT를 생성하고, 이를 다운로드하여 자신의 세계에 붙여넣을 수 있습니다.

### 도면 파일 가져오기

가장 먼저 해야 할 일은 마을 도면에 대한 IPFS 링크를 포함하는 발행한 토큰의 메타데이터를 보는 것입니다. 현재 우리는 `village-schematic.testnet` 계정 내의 `village-schematic` ID로 토큰을 발행했습니다.

- 미디어 링크를 가져오려면 다음 명령을 실행합니다.

```bash
near view nft.examples.testnet nft_tokens_for_owner '{"account_id": "village-schematic.testnet"}'
```

<details>
<summary>예상 응답: </summary>
<p>

```bash
[
  {
    token_id: 'village-schematic',
    owner_id: 'village-schematic.testnet',
    metadata: {
      title: 'Village Schematic',
      description: 'Blockcraft Village Schematic Tutorial NFT',
      media: 'https://bafybeidadhfilezx23dcdaueo3bjuafqeehokw33vyepkjtppigorrhbpy.ipfs.dweb.link/',
      media_hash: null,
      copies: 1,
      issued_at: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference: null,
      reference_hash: null
    },
    approved_account_ids: {}
  }
]
```

</p>
</details>

- 그런 다음, 미디어 링크를 가져와 브라우저에 붙여넣을 수 있습니다. 다음과 같은 페이지로 이동해야 합니다.

![IPFS Village Schem](/docs/assets/nfts/IPFS-village-schem.png)

- `village-house.schem`이라는 파일을 클릭하면, 해당 파일을 다운로드할 수 있습니다.
- 그런 다음, 도면 파일을 복사하여 `minecraft/config/worldedit/schematics` 폴더에 붙여넣습니다.

### Minecraft에서 도면 파일 불러오기

- 도면 파일을 `minecraft/config/worldedit/schematics` 폴더에 붙여넣은 후, Minecraft 세계에서 다음 명령을 실행하여 도면을 클립보드에 로드할 수 있습니다.

```bash
//schematics load village-house
```

- 이제 간단하게 `//paste` 명령을 사용하여 세계 어디에나 파일을 붙여넣을 수 있습니다! 다음과 같은 내용이 표시됩니다.

![Final Village Pasting](/docs/assets/nfts/final-village-pasting.png)

축하합니다! 당신은 방금 Minecraft 도면 NFT를 만들고 그것을 당신의 세계에 로드하는 방법을 배웠습니다!

## 문서 버전 관리

이 글을 쓰는 시점에서 이 예제는 다음 버전에서 작동합니다.

- near-cli: `2.1.1`
