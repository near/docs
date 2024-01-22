---
id: minting-nft-frontend
title: NFT 발행 프론트엔드
sidebar_label: 프론트엔드
---

import {Github} from "@site/src/components/codetabs"

# NFT 발행 프론트엔드

> 이 튜토리얼에서는 간단한 NFT 프론트엔드를 만들고, 웹 브라우저에서 직접 NEAR 블록체인에 "Go Team" NFT를 생성하는 방법을 배웁니다.

## 앱 개요

이 앱은 매우 간단합니다. 사용자는 로그인하고 <kbd>Mint NFT</kbd> 버튼을 누르기만 하면 됩니다. 사용자가 발행 버튼을 누르면 "Go Team" NFT가 발행되어 NEAR 지갑으로 전송됩니다.

![Front-end](/docs/assets/nfts/nft-mint-frontend.png)

## 스마트 컨트랙트 코드

NFT 스마트 컨트랙트용 코드는 [Zero to Hero NFT 튜토리얼](/tutorials/nfts/introduction)의 [GitHub 레퍼지토리](https://github.com/near-examples/nft-tutorial/tree/main/nft-contract/src)에서 찾을 수 있습니다(`main` 브랜치).

본 애플리케이션에서 사용하는 컨트랙트 메서드는 다음과 같습니다.

- `nft_mint`: 토큰을 발행하는 데 사용되는 함수입니다.
- `check_token`: 토큰의 존재를 확인하기 위해 생성된 커스텀 함수입니다. 이는 사용자당 하나의 토큰만 발행되는 것을 보장하는 데 도움이 됩니다.

## Front-end

컨트랙트의 프론트엔드는 `create-near-app`를 사용하여 구현되었습니다. [React Bootstrap](https://react-bootstrap.github.io/)은 애플리케이션의 스타일링에 사용되었습니다.

React 프론트엔드를 부트스트랩하려면, 터미널에서 다음 명령을 실행합니다.

```sh
npx create-near-app --frontend react --contract rust
```

그런 다음 `main` 브랜치에서 컨트랙트 파일을 가져오기만 하면, 애플리케이션을 실행하는 데 필요한 구조를 갖게 됩니다.

### 시작

애플리케이션의 구성 요소를 탑재할 때, 앱은 대체 불가능 토큰이 있는지 확인합니다.

<Github language="js" start="24" end="46" url="https://github.com/near-examples/nft-tutorial-frontend/blob/master/src/App.js" />

If no prior NFT has been minted, the mint button will be available for use.

### 발행 버튼

Here is the function behind the mint button. The meta data has been filled out for the user already:

- `token_id` 는 사용자의 계정 ID로 설정되며,
- `media` 링크는 IPFS에서 호스팅되는 `goteam-gif.gif`로 하드 코딩됩니다.

<Github language="js" start="7" end="23" url="https://github.com/near-examples/nft-tutorial-frontend/blob/master/src/Components/MintingTool.js" />

After hitting the <kbd>Mint NFT</kbd> button the user will be able to check out the newly minted NFT at [wallet.testnet.near.org](https://testnet.mynearwallet.com//?tab=collectibles), under the Wallet's `Collectibles` tab.

## 끝맺는 말

복제하고 실행할 전체 애플리케이션 레퍼지토리는 [GitHub](https://github.com/near-examples/nft-tutorial-frontend)에서 찾을 수 있습니다. 구성 폴더에서 이 스마트 컨트랙트가 `nft-frontend-simple-mint.blockhead.testnet`에 배포되었음을 확인할 수 있습니다.

<Github language="js" start="1" end="2" url="https://github.com/near-examples/nft-tutorial-frontend/blob/master/src/config.js" />

You can also check out the [explorer link here](https://testnet.nearblocks.io/address/nft-frontend-simple-mint.blockhead.testnet) to see how many individuals have been minting their own _Go Team_ NFTs. **즐거운 민팅 되세요!**

:::tip https://github.com/near-examples/nft-tutorial-frontend에서 이 예제를 복제하고 실행합니다. :::
