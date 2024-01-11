---
id: defining-a-token
title: 대체 가능한 토큰 정의
sidebar_label: 토큰 정의
---

이것은 모든 NEAR [FT 표준](https://nomicon.io/Standards/Tokens/FungibleToken/Core)을 준수하는 완전한 FT 스마트 컨트랙트를 처음부터 만드는 시리즈의 많은 튜토리얼 중 첫 번째입니다. 오늘은 FT가 무엇이고, NEAR 블록체인에서 이를 어떻게 정의할 수 있는지를 배웁니다. 여기서는, 이 기능을 추가하는 데 필요한 필수 코드 스니펫을 작성하여 중요한 [스마트 컨트랙트의 뼈대](/tutorials/fts/skeleton)를 수정하게 됩니다.

## 소개

시작하려면 레퍼지토리 내 `1.skeleton` 브랜치로 전환하세요. 레퍼지토리를 복제하지 않은 경우 [컨트랙트 아키텍처](/tutorials/fts/skeleton)를 참조하여 시작하세요.

튜토리얼의 이 부분에 대한 완성된 코드를 보려면 `2.defining-a-token` 폴더에서 찾을 수 있습니다.

## 뼈대 컨트랙트 수정 {#modifications}

본질적으로 대체 가능한 토큰(FT)은 **나눌 수 있지만** **고유하지 않은** 교환 가능한 자산입니다. 예를 들어, Benji가 1 캐나다 달러를 가지고 있다면, 이는 Matt의 캐나다 달러와 똑같은 가치가 있을 것입니다. 두 달러 모두 대체 가능하고 교환 가능합니다. 이 경우 대체 가능한 토큰은 캐나다 달러입니다. 모든 화폐는 대체 가능하고 교환 가능합니다.

반면에 대체 불가능한 토큰(NFT)은 집이나 자동차와 같이 **고유**하고 **나눌 수 없습니다**. 남들과 정확히 동일한 다른 자산을 가질 수 **없습니다**. Corvette 1963 C2 Stingray와 같은 특정 자동차 모델이 있더라도, 각 자동차에는 서로 다른 주행 킬로미터 등 별도의 일련 번호가 있습니다.

이제 대체 가능한 토큰이 무엇인지 이해했으므로, 컨트랙트 자체에서 토큰을 정의하는 방법을 살펴보겠습니다.

### 대체 가능한 토큰(FT) 정의 {#defining-a-fungible-token}

`1.skeleton/src/metadata.rs` 파일로 가서 시작합니다. 여기에서 대체 가능한 토큰 자체에 대한 메타데이터를 정의합니다. NEAR를 통해 토큰을 사용자 정의할 수 있는 여러 가지 방법이 있으며, 모두 [메타데이터](https://nomicon.io/Standards/Tokens/FungibleToken/Core#metadata) 표준에서 찾을 수 있습니다. 이를 선택적 부분과 필수 파트로 나누겠습니다.

필수:
- **spec**: 컨트랙트에서 사용하는 표준의 버전을 나타냅니다. `ft-1.0.0`로 설정해야 합니다.
- **name**: "Wrapped NEAR" 또는 "TEAM Tokens"와 같이 사람이 읽을 수 있는 토큰 이름입니다.
- **symbol**: `wNEAR` 또는 `gtNEAR`와 같은 토큰의 약어입니다.
- **decimals**: 토큰의 적절한 유효 숫자를 표시하기 위해 프론트엔드에서 사용됩니다. 이 개념은 이 [OpenZeppelin 게시물](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals)에 잘 설명되어 있습니다.

선택:
- **icon**: 토큰의 이미지([데이터 URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)이어야 함)입니다.
- **reference**: 오프 체인에 저장된 토큰에 대한 추가 JSON 세부 정보에 대한 링크입니다.
- **reference_hash**: 참조된 JSON의 해시입니다.

이 작업이 완료되면 이제 이러한 필드를 컨트랙트의 메타데이터에 추가할 수 있습니다.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/metadata.rs#L8-L18
```

이제 메타데이터의 모양을 정의했으므로 컨트랙트에 저장할 방법이 필요합니다. `1.skeleton/src/lib.rs` 파일로 이동해서, `Contract` 구조체에 다음을 추가합니다. `metadata` 필드 아래의 컨트랙트에 메타데이터를 저장하고 싶을 것입니다.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/lib.rs#L18-L23
```

이제 메타데이터가 있는 *위치를* 정의했지만 메타데이터 자체를 전달해야 합니다. 여기에서 초기화 함수가 작동합니다.

#### 초기화 함수

이제 초기화 함수라고 하는 것을 생성합니다. 이를 `new`라고 부를 수 있습니다. 이 함수는 컨트랙트를 처음 배포할 때 호출해야 합니다. 이는 기본값으로 정의한 모든 컨트랙트 필드를 초기화합니다. 이러한 메서드를 두 번 이상 호출 할 수 **없다는** 점에 유의해야 합니다.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/lib.rs#L56-L72
```

개발을 할 때 종종 컨트랙트를 여러 번 배포해야 합니다. 컨트랙트를 초기화할 때마다 메타데이터를 전달해야 하는 것이 지루할 수 있다고 생각할 수 있습니다. 이러한 이유로, 기본 `metadata` 집합으로 컨트랙트를 초기화할 수 있는 함수를 만들어 봅시다. 당신은 이를 `new_default_meta`라고 부를 수 있습니다.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/lib.rs#L36-L52
```

이 함수는 단순히 이전 `new` 함수를 호출하고, 내부적으로는 일부 기본 메타데이터를 전달합니다.

이 시점에서 대체 가능한 토큰에 대한 메타데이터를 정의했고 이 정보를 컨트랙트에 저장하는 방법을 만들었습니다. 마지막 단계는 메타데이터를 쿼리하고 반환하는 게터를 도입하는 것입니다. `1.skeleton/src/metadata.rs` 파일로 이동하여 `ft_metadata` 함수에 다음 코드를 추가합니다.

```rust reference
https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/metadata.rs#L20-L30
```

이 함수는 컨트랙트에서 `FungibleTokenMetadata` 자료형을 가진 `metadata` 객체를 가져와서 반환합니다.

## 온체인에서 컨트랙트와 상호 작용

이제 사용자 지정 대체 가능한 토큰을 정의하는 논리가 완성되었고 메타데이터를 쿼리하는 방법을 추가했으므로 이제 컨트랙트를 구축하고 블록체인에 배포할 차례입니다.

### 컨트랙트 배포 {#deploy-the-contract}

이 튜토리얼 전체에서는 bash 스크립트를 사용하여 컨트랙트를 쉽게 구축할 수 있도록 하였습니다. 다음 명령은 컨트랙트를 작성하고 `.wasm` 파일을 `out/contract.wasm` 폴더로 복사합니다. 빌드 스크립트는 `1.skeleton/build.sh` 파일에서 찾을 수 있습니다.

```bash
cd 1.skeleton && ./build.sh && cd ..
```

콘솔에 경고 목록이 표시되지만, 튜토리얼이 진행됨에 따라 이러한 경고는 사라집니다. 이제 내부에 `contract.wasm` 파일이 있는 `out/` 폴더가 표시됩니다. 이것이 우리가 블록체인에 배포할 것입니다.

배포하려면 로컬 기기에 키가 저장된 NEAR 계정이 필요합니다. Navigate to the [NEAR wallet](https://testnet.mynearwallet.com//) site and create an account.

기존 컨트랙트가 없는 계정에 컨트랙트를 배포했는지 확인하세요. 새 계정을 만들거나 이 튜토리얼의 하위 계정(sub-account)을 만드는 것이 가장 쉽습니다.
:::

터미널에서 다음 명령을 실행하여 새로 만든 계정에 `near-cli`로 로그인합니다.

```bash
near login
```

이 튜토리얼을 더 쉽게 복사/붙여넣기할 수 있도록, 계정 ID에 대한 환경 변수를 설정하겠습니다. 아래 명령에서 `YOUR_ACCOUNT_NAME`를  `.testnet` 부분을 포함하여 방금 로그인한 계정 이름으로 바꿉니다.

```bash
export FT_CONTRACT_ID="YOUR_ACCOUNT_NAME"
```

다음을 실행하여 환경 변수가 올바르게 설정되었는지 테스트합니다.

```bash
echo $FT_CONTRACT_ID
```

터미널에 올바른 계정 ID가 출력되어 있는지 확인하세요. 모든 것이 올바르게 보이면 이제 컨트랙트를 배포할 수 있습니다. FT 프로젝트의 루트에서 다음 명령을 실행하여 스마트 컨트랙트를 배포합니다.

```bash
near deploy --wasmFile out/contract.wasm --accountId $FT_CONTRACT_ID
```

이 시점에서 컨트랙트가 당신의 계정에 배포되었어야 하며, 대체 가능한 토큰 발행 작업으로 이동할 준비가 된 것입니다.

### 대체 가능한 토큰 생성 {#initialize-contract}

컨트랙트가 배포되면 가장 먼저 해야 할 일은 컨트랙트를 초기화하는 것입니다. 단순화를 위해 CLI에서 수동으로 메타데이터를 입력할 필요가 없도록, 이전에 작성한 기본 메타데이터 초기화 함수를 호출해 보겠습니다.

```bash
near call $FT_CONTRACT_ID new_default_meta '{"owner_id": "'$FT_CONTRACT_ID'", "total_supply": "0"}' --accountId $FT_CONTRACT_ID
```

### 컨트랙트 메타데이터 보기

이제 컨트랙트가 초기화되었으므로 이전에 작성한 일부 함수를 호출할 수 있습니다.

```bash
near view $FT_CONTRACT_ID ft_metadata
```

그러면 다음과 유사한 출력이 반환됩니다.

```bash
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

## 결론

이 튜토리얼에서는 컨트랙트 뼈대를 사용하여 블록체인에서 대체 가능한 토큰을 생성하는 로직을 설정하고 이해하는 기본 사항을 살펴보았습니다.

먼저 [대체 가능한 토큰이 무엇](#modifications)이고, 이것이 대체 불가능한 토큰과 어떻게 다른지 살펴보았습니다. 그런 다음 자신만의 대체 가능한 토큰을 사용자 정의하고 생성하는 방법과 이를 달성하기 위해 뼈대 컨트랙트를 수정하는 방법을 배웠습니다. 마지막으로 컨트랙트를 구축 및 배포하고 NEAR CLI를 사용하여 컨트랙트와 상호 작용했습니다.

## 다음 단계

[다음 튜토리얼](/tutorials/fts/circulating-supply)에서는 토큰의 초기 공급을 생성하고 NEAR 지갑에 표시하는 방법을 알아봅니다.
