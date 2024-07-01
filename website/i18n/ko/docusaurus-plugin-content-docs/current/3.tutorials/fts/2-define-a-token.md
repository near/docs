---
id: defining-a-token
title: 대체 가능한 토큰 정의
sidebar_label: 토큰 정의
---

import {Github} from "@site/src/components/codetabs"

이것은 모든 NEAR [FT 표준](https://nomicon.io/Standards/Tokens/FungibleToken/Core)을 준수하는 완전한 FT 스마트 컨트랙트를 처음부터 만드는 시리즈의 많은 튜토리얼 중 첫 번째입니다. 오늘은 FT가 무엇이고, NEAR 블록체인에서 이를 어떻게 정의할 수 있는지를 배웁니다. 여기서는, 이 기능을 추가하는 데 필요한 필수 코드 스니펫을 작성하여 중요한 [스마트 컨트랙트의 뼈대](/tutorials/fts/skeleton)를 수정하게 됩니다.

---

## 소개

시작하려면 레퍼지토리 내 `1.skeleton` 브랜치로 전환하세요. 레퍼지토리를 복제하지 않은 경우 [컨트랙트 아키텍처](/tutorials/fts/skeleton)를 참조하여 시작하세요.

튜토리얼의 이 부분에 대한 완성된 코드를 보려면 `2.defining-a-token` 폴더에서 찾을 수 있습니다.

---

## 뼈대 컨트랙트 수정 {#modifications}

본질적으로 대체 가능한 토큰(FT)은 **나눌 수 있지만** **고유하지 않은** 교환 가능한 자산입니다. 예를 들어, Benji가 1 캐나다 달러를 가지고 있다면, 이는 Matt의 캐나다 달러와 똑같은 가치가 있을 것입니다. 두 달러 모두 대체 가능하고 교환 가능합니다. 이 경우 대체 가능한 토큰은 캐나다 달러입니다. 모든 화폐는 대체 가능하고 교환 가능합니다.

반면에 대체 불가능한 토큰(NFT)은 집이나 자동차와 같이 **고유**하고 **나눌 수 없습니다**. 남들과 정확히 동일한 다른 자산을 가질 수 **없습니다**. Corvette 1963 C2 Stingray와 같은 특정 자동차 모델이 있더라도, 각 자동차에는 서로 다른 주행 킬로미터 등 별도의 일련 번호가 있습니다.

이제 대체 가능한 토큰이 무엇인지 이해했으므로, 컨트랙트 자체에서 토큰을 정의하는 방법을 살펴보겠습니다.

<hr className="subsection" />

### 대체 가능한 토큰(FT) 정의 {#defining-a-fungible-token}

Start by navigating to the `1.skeleton/src/metadata.rs` file. This is where you'll define the metadata for the fungible token itself. There are several ways NEAR allows you to customize your token, all of which are found in the [metadata](https://nomicon.io/Standards/Tokens/FungibleToken/Core#metadata) standard. Let's break them up into the optional and non-optional portions.

Required:
- **spec**: 컨트랙트에서 사용하는 표준의 버전을 나타냅니다. `ft-1.0.0`로 설정해야 합니다.
- **name**: "Wrapped NEAR" 또는 "TEAM Tokens"와 같이 사람이 읽을 수 있는 토큰 이름입니다.
- **symbol**: `wNEAR` 또는 `gtNEAR`와 같은 토큰의 약어입니다.
- **decimals**: 토큰의 적절한 유효 숫자를 표시하기 위해 프론트엔드에서 사용됩니다. 이 개념은 이 [OpenZeppelin 게시물](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals)에 잘 설명되어 있습니다.

Optional:
- **icon**: 토큰의 이미지([데이터 URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)이어야 함)입니다.
- **reference**: 오프 체인에 저장된 토큰에 대한 추가 JSON 세부 정보에 대한 링크입니다.
- **reference_hash**: 참조된 JSON의 해시입니다.

With this finished, you can now add these fields to the metadata in the contract.

<Github language="rust" start="8" end="19" url="https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/metadata.rs" />

Now that you've defined what the metadata will look like, you need someway to store it on the contract. Switch to the `1.skeleton/src/lib.rs` file and add the following to the `Contract` struct. You'll want to store the metadata on the contract under the `metadata` field.

<Github language="rust" start="18" end="24" url="https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/lib.rs" />

You've now defined *where* the metadata will live but you'll also need someway to pass in the metadata itself. This is where the initialization function comes into play.

<hr className="subsection" />

#### 초기화 함수

You'll now create what's called an initialization function; you can name it `new`. This function needs to be invoked when you first deploy the contract. It will initialize all the contract's fields that you've defined with default values. It's important to note that you **cannot** call these methods more than once.

<Github language="rust" start="58" end="74" url="https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/lib.rs" />

More often than not when doing development, you'll need to deploy contracts several times. You can imagine that it might get tedious to have to pass in metadata every single time you want to initialize the contract. For this reason, let's create a function that can initialize the contract with a set of default `metadata`. You can call it `new_default_meta`.

<Github language="rust" start="38" end="54" url="https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/lib.rs" />

This function is simply calling the previous `new` function and passing in some default metadata behind the scenes.

At this point, you've defined the metadata for your fungible tokens and you've created a way to store this information on the contract. The last step is to introduce a getter that will query for and return the metadata. Switch to the `1.skeleton/src/metadata.rs` file and add the following code to the `ft_metadata` function.

<Github language="rust" start="21" end="31" url="https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/metadata.rs" />

This function will get the `metadata` object from the contract which is of type `FungibleTokenMetadata` and will return it.

---

## 온체인에서 컨트랙트와 상호 작용

Now that the logic for defining a custom fungible token is complete and you've added a way to query for the metadata, it's time to build and deploy your contract to the blockchain.

### Deploying and initializing the contract {#deploy-the-contract}

You can build a contract using the following command:

```bash
cd 2.define-a-token
cargo near build
```

콘솔에 경고 목록이 표시되지만, 튜토리얼이 진행됨에 따라 이러한 경고는 사라집니다.

배포하려면 로컬 기기에 키가 저장된 NEAR 계정이 필요합니다. Navigate to the [NEAR wallet](https://testnet.mynearwallet.com/) site and create an account.

기존 컨트랙트가 없는 계정에 컨트랙트를 배포했는지 확인하세요. 새 계정을 만들거나 이 튜토리얼의 하위 계정(sub-account)을 만드는 것이 가장 쉽습니다.
:::

Log in to your newly created account with `near-cli-rs` by running the following command in your terminal.

```bash
near account import-account using-web-wallet network-config testnet
```

이 튜토리얼을 더 쉽게 복사/붙여넣기할 수 있도록, 계정 ID에 대한 환경 변수를 설정하겠습니다. 아래 명령에서 `YOUR_ACCOUNT_NAME`를  `.testnet` 부분을 포함하여 방금 로그인한 계정 이름으로 바꿉니다.

```bash
export FT_CONTRACT_ID="YOUR_ACCOUNT_NAME.testnet"
```

다음을 실행하여 환경 변수가 올바르게 설정되었는지 테스트합니다.

```bash
echo $FT_CONTRACT_ID
```

터미널에 올바른 계정 ID가 출력되어 있는지 확인하세요. 모든 것이 올바르게 보이면 이제 컨트랙트를 배포할 수 있습니다. 단순화를 위해 CLI에서 수동으로 메타데이터를 입력할 필요가 없도록, 이전에 작성한 기본 메타데이터 초기화 함수를 호출해 보겠습니다. FT 프로젝트의 루트에서 다음 명령을 실행하여 스마트 컨트랙트를 배포합니다.

```bash
cargo near deploy $FT_CONTRACT_ID with-init-call new_default_meta json-args '{"owner_id": "'$FT_CONTRACT_ID'", "total_supply": "0"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

At this point, the contract should have been deployed to your account and initialized.

<hr className="subsection" />

### 컨트랙트 메타데이터 보기

이제 컨트랙트가 초기화되었으므로 이전에 작성한 일부 함수를 호출할 수 있습니다.

```bash
near contract call-function as-read-only $FT_CONTRACT_ID ft_metadata json-args {} network-config testnet now
```

그러면 다음과 유사한 출력이 반환됩니다.

```js
{
  spec: 'ft-1.0.0',
  name: 'Team Token FT Tutorial',
  symbol: 'gtNEAR',
  icon: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/
        /*
        ...lots of base64 data...
        */
        j4Mvhy9H9NlnieJ4iwoo9ZlyLGx4pnrPWeB4CVGRZZcJ7Vohwhi0z5MJY4cVL4MdP/Z',
  reference: null,
  reference_hash: null,
  decimals: 24
}
```

**완료되었습니다!** 이제 모든 것이 올바르게 작동함을 확인했으며, 대체 가능한 토큰을 정의했습니다!

다음 튜토리얼에서는, 총 공급량을 생성하고 지갑에서 토큰을 보는 방법에 대해 배웁니다.

---

## 결론

이 튜토리얼에서는 컨트랙트 뼈대를 사용하여 블록체인에서 대체 가능한 토큰을 생성하는 로직을 설정하고 이해하는 기본 사항을 살펴보았습니다.

먼저 [대체 가능한 토큰이 무엇](#modifications)이고, 이것이 대체 불가능한 토큰과 어떻게 다른지 살펴보았습니다. 그런 다음 자신만의 대체 가능한 토큰을 사용자 정의하고 생성하는 방법과 이를 달성하기 위해 뼈대 컨트랙트를 수정하는 방법을 배웠습니다. 마지막으로 컨트랙트를 구축 및 배포하고 NEAR CLI를 사용하여 컨트랙트와 상호 작용했습니다.

## 다음 단계

[다음 튜토리얼](/tutorials/fts/circulating-supply)에서는 토큰의 초기 공급을 생성하고 NEAR 지갑에 표시하는 방법을 알아봅니다.

---

:::note Versioning for this article
At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-sdk-rs: `5.1.0` (with enabled `legacy` feature)
- cargo-near: `0.6.1`
- near-cli-rs: `0.11.0`
:::
