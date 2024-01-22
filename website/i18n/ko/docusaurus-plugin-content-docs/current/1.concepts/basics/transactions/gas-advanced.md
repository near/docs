---
id: gas-advanced
title: 가스 - 고급
---

## 복잡한 Action의 비용 {#costs-of-complex-actions}

컨트랙트 및 함수 호출 배포와 같은 좀 더 복잡한 가스 계산에 대해 다뤄보겠습니다.

### 컨트랙트 배포 {#deploying-contracts}

기본 Action 비용에는 컨트랙트 배포를 위한 두 가지 다른 값이 포함됩니다. 단순화하면 다음과 같습니다.

    deploy_contract_cost: 184765750000,
    deploy_contract_cost_per_byte: 64572944,

이러한 값은 [`protocol_config`](/api/rpc/protocol#protocol-config) RPC 엔드포인트를 사용하여 쿼리할 수 있습니다.

첫 번째는 컨트랙트 규모에 관계없는 기본 비용입니다. `send`와 `execute` 비용에 대해 각각 2를 곱해야 하고, Receipt를 보내고 실행 해야 한다는 점을 염두에 두어야 합니다. 가스 단위는 다음과 같습니다.

    2 * 184765750000 +
    2 * contract_size_in_bytes * 64572944 +
    2 * 108059500000

(TGas 값으로 표현하려면 결과 숫자를 10¹²로 나눕니다!)

여기에는 스토리지에 바이트를 업로드하고 쓰는 비용이 포함되지만, 이러한 바이트를 스토리지에 보관하는 비용은 포함되지 **않습니다** . 장기 스토리지는 스토리지 스테이킹을 통해 보상되는데, 여기서 스토리지 스테이킹은 컨트랙트 배포 중에 계정에서 차감되는 복구 가능한 바이트당 비용을 의미합니다.

16kb 컨트랙트를 배포하려면 트랜잭션 수수료로 2.65 TGas (따라서 최소 가스 가격으로 0.265mN)가 필요하고, 1.5N은 스토리지 스테이킹을 위해 락업됩니다.

### 함수 호출 {#function-calls}

NEAR의 범용적인 특성을 고려할 때, 함수 호출은 가장 복잡한 가스 계산을 필요로 합니다. 주어진 함수 호출은 예측하기 어려운 양의 CPU, 네트워크 및 IO를 사용하며 각각의 양은 컨트랙트에 이미 저장된 데이터 양에 따라 변경될 수도 있습니다!

이러한 복잡성으로, 가스 계산의 각 항목([`protocol_config`](/api/rpc/protocol#protocol-config) RPC 엔드포인트를 사용한 `wasm_config` 내 `ext_costs`를 참조하세요)을 열거하는 예제를 살펴보는 것은 더 이상 유용하지 않습니다([원하는 경우](https://github.com/near/nearcore/pull/3038) 직접 조사해도 좋습니다). 대신, 두 가지 다른 각도에서 접근해 보겠습니다. 대신, 두 가지 다른 관점으로 접근해 봅시다: Ethereum에 대한 볼파크 비교와, 자동화 테스트를 통한 정확한 추정치를 얻는 것입니다.

<blockquote class="lesson">
**스마트 컨트랙트 계정에 30% 보상으로 들어가는 가스비는 얼마인가요?**

NEAR 백서는 [모든 가스 수수료의 30%](https://near.org/papers/the-official-near-white-paper/)가 수수료가 지출되는 스마트 컨트랙트 계정으로 간다고 언급합니다. 

이 금액은 두 가지 방법으로 함수 호출에 대해 계산될 수 있습니다. 1. 가스 프로파일 내 모든 값을 합산합니다. 2. 트랜잭션을 위해 소진된 총 가스에서 정적 실행 가스(Receipt 전송에 소비된 가스 양과 동일)를 뺍니다. Both these numbers are available on the [NEAR Explorer](https://nearblocks.io/) overview page for a transaction.

두 번째 접근 방식은 더 짧고 기억하기 더 쉽습니다. So here's an example: 

- An account calls the method `submit` on `aurora`
  - Converting the transaction to receipt burned a total of ~0.00024Ⓝ
  - Executing the receipt burned a total of ~0.00376Ⓝ

The 30% reward for the smart contract owner (in this case aurora) would be: (0.00376Ⓝ - 0.00024Ⓝ) * 0.3 = 0.001056Ⓝ 

This transaction can also be found [here](https://nearblocks.io/txns/GzRn9yhDaQ8f3ReJguCBGxdi4iJEeBguJ5MWufMcu1JP) on NEAR Explorer, feel free to have a look around!

여러 컨트랙트가 포함된 호출의 경우, 이 방법으로 각 컨트랙트에 대한 보상을 계산하는 것은 NEAR 익스플로러(2022년 6월)에 표시된 데이터만으로는 불가능할 것입니다. 익스플로러는 두 번째(및 기타) Receipt에 대한 변환 비용을 표시하지 않기 때문입니다.

</blockquote>

#### Ethereum과 볼파크 비교 {#ballpark-comparisons-to-ethereum}

NEAR와 마찬가지로 Ethereum은 가스 단위를 사용하여 작업의 계산 복잡성을 모델링합니다. NEAR와 같이 예측 가능한 가스 가격을 사용하는 대신, Ethereum은 동적인 경매 기반 시장을 사용합니다. 이 사실은 Ethereum의 가스 가격과 비교하는 것을 약간 까다롭게 만들지만, 최선을 다해보겠습니다.

Etherscan은 [Ethereum 가스 가격 차트](https://etherscan.io/chart/gasprice)를 제공합니다. 이 가격들은 "Gwei" 또는 Gigawei 형태로 표현되며, 여기서 wei는 가능한 최소의 ETH 금액인 10⁻¹⁸ ETH를 의미합니다. 2017년 11월부터 2020년 7월까지 평균 가스 가격은 21Gwei였습니다. 이를 "평균" 가스 가격이라고 부르겠습니다. 2020년 7월 평균 가스 가격은 57Gwei까지 올랐습니다. 이것을 "높은" 이더리움 가스 수수료라고 불러봅시다.

이더리움의 가스 단위에 가스 가격을 곱하면 일반적으로 NEAR의 TGas를 milliNEAR로 변환한 것과 같은 방식으로 milliETH(mE)로 표시하기 쉬운 금액이 됩니다. 몇 가지 일반적인 작업의 경우를 나란히 살펴보고 ETH의 가스 단위를 NEAR의 가스 단위와 비교하고 위의 "평균" 및 "높은" 가스 가격으로 변환해 보겠습니다.

| 작업                          | ETH 가스 단위 | 평균 mE | 높은 mE | NEAR TGas             | mN                           |
| --------------------------- | --------- | ----- | ----- | --------------------- | ---------------------------- |
| 네이티브 토큰 전송 (ETH or NEAR)    | 21k       | 0.441 | 1.197 | 0.45                  | 0.045                        |
| [대체 가능한 토큰][] 컨트랙트 배포 및 초기화 | [1.1M][]  | 23.3  | 63.1  | [9][]<super>†</super> | 0.9 ([스토리지 스테이킹][]에 1.5Ⓝ 추가) |
| 대체 가능 토큰 전송                 | [~45k][]  | 0.945 | 2.565 | [14][]                | 1.4                          |
| 대체 가능 토큰에 대한 에스크로 설정        | [44k][]   | 0.926 | 2.51  | [8][]                 | 0.8                          |
| 대체 가능 토큰 잔액 확인              | 0         | 0     | 0     | 0                     | 0                            |

<super>†</super> 함수 호출은 VM을 가동하고 컴파일된 모든 Wasm 바이트를 메모리에 로드해야 하므로 기본 작업에 대한 비용을 증가시킵니다.

이러한 작업 중 일부는 이더리움에 비해 10배 정도 개선된 것처럼 보이지만, NEAR의 총 공급량은 10억 개 이상인 반면 이더리움의 총 공급량은 1억 개에 가깝습니다. 따라서 총 공급량의 퍼센티지로 따지자면, NEAR의 가스 요금은 이더리움보다 약 10배 더 낮습니다. 또한 NEAR의 가격이 크게 오르면 네트워크에서 설정한 최소 가스 요금을 낮출 수 있습니다.

대부분의 경우 네트워크가 최소 가스 가격에 머물 것으로 예상됩니다. [Economics 백서](https://near.org/papers/economics-in-sharded-blockchain/#transaction-and-storage-fees)에서 자세히 알아보세요.

#### 자동화된 테스트로 가스 비용 예측하기 {#accurate-estimates-with-automated-tests}

스마트 컨트랙트 기능을 실행하기 위한 가스 단위 비용은 `testnet`을 통해 정확하게 예측할 수 있습니다. 일반적으로 `testnet`은 `mainnet`보다 높은 버전의 프로토콜을 실행합니다. 그러나 가스 비용 계산은 자주 변경되지 않으므로 이는 `mainnet`에서 함수의 가스 비용을 파악하는 좋은 방법입니다.

가스 비용을 추정하기 위해 Rust의 `near-workspaces` [크레이트](https://github.com/near/workspaces-rs/tree/main/examples/src) 또는 JavaScript 내 비슷한 이름의 [패키지](https://github.com/near/workspaces-js)를 사용할 수 있습니다.

`call` 메서드에서 반환된 `CallExecutionDetails` 구조체에서 `total_gas_burnt` 필드를 추출할 수 있습니다. ([더 읽어보기](../../../sdk/rust/testing/integration-tests.md#profiling-gas))

```rust 
println!("Burnt gas (all): {}", res.total_gas_burnt);
```

JS에서는 `result.receipts_outcome[0].outcome.gas_burnt`에서 Receipt 실행을 위해 소비된 가스 단위의 양과 `result.transaction_outcome.outcome.gas_burnt`를 더하여 이 값을 계산할 수 있습니다.

`api.gasbuddy.tech`를 사용하여 주어진 함수 호출에 대한 가스 비용 추정치를 얻을 수 있습니다. 이 API는 실험적으로 만들어졌으며, 향후 제거될 수 있습니다. 다음 JSON 본문과 함께 `https://api.gasbuddy.tech/profile`로 POST 요청을 보내 주어진 함수 호출에 대한 가스 비용 추정치를 얻을 수 있습니다.

```json
{
  "contract_id": "<your-contract-account-id>",
  "method": "<your-contract-method-name>",
  "args": {
    "arg1": "value1",
    "arg2": "value2"
  }
}
```
:::

#### SDK에서 가스 비용 추정 {#gas-cost-estimation-in-the-sdk}

우리 [SDK 환경](../../../2.develop/contracts/environment/environment.md)은 `used gas` 메서드를 통해 지금까지 얼마나 많은 가스가 사용되었는지 알려줍니다.

두 지점 사이에 사용된 가스의 차이를 간단히 계산하여 특정 메서드(또는 그의 일부)가 사용하는 가스의 양을 벤치마킹할 수 있습니다.

```ts
function myMethod(){
  // take gas usage
  const used_gas_point_A = environment.used_gas()

  // --- some code goes here ---

  const used_gas_point_B = environment.used_gas()

  log("Used gas", used_gas_point_B - used_gas_point_A )
}
```

---

## 비관적인 가스 가격 인플레이션

트랜잭션이 완료되기까지 여러 블록이 걸릴 수 있습니다. 동적 가스 가격 조정으로 인해 이후 블록의 가스 가격은 거래가 서명되었을 때보다 높을 수 있습니다. 트랜잭션이 여전히 완료될 수 있도록 하기 위해 *비관적 인플레이션 규칙* 에 의해 트랜잭션 시작 시 예약되는 토큰의 양이 증가합니다

비관적 인플레이션 규칙은 트랜잭션이 도달할 수 있는 가장 높은 이론적 가스 가격으로 가스를 구매해야 함을 의미합니다. 추가 지출은 일시적일 뿐이며, 비관적 가격과 실제 가격의 차액은 트랜잭션이 완료되면 환불됩니다. 이것이 익스플로러에서 모든 가스가 소비된 경우에도 하나 이상의 블록에 걸쳐 있는 거의 모든 트랜잭션에 환불이 포함된 이유입니다.

가격은 얼마나 부풀려질까요? 트랜잭션이 차지하는 블록 수에 따라 다릅니다. 다음과 같이 한 계정에서 다른 계정으로만 토큰을 보내는 간단한 트랜잭션은 2-3 블록 정도 걸릴 수 있습니다.
- 서명자의 계정에서 돈을 빼기 위해서는 하나의 블록이 걸립니다.
- 수신자 계정에 자금을 추가하기 위해서는 하나의 블록이 걸립니다.
- 수신자가 다른 샤드에 있고 Receipt 신청이 지연되는 경우, 또 하나의 블록이 더 걸릴 수 있습니다.

따라서 비관적으로 부풀려진 가격은 3% 증가하거나 `gas_price` ⨉ 1.03으로 계산됩니다. 추가 교차 샤드 통신마다 또 1.03이 곱해집니다.

함수 호출의 경우, 최대 블록 지연은 부착된 총 가스를 다른 함수를 호출하는 데 필요한 최소 가스량으로 나눈 값으로 계산됩니다. 따라서 트랜잭션에 추가하는 가스가 많을수록 가스 가격이 높아집니다. 그러나 다시 말하지만 인상된 가격은 일시적이며, 네트워크가 실제로 혼잡하지 않는 한 환불됩니다. 매번 추가 지연이 발생하려면 가격은 매 블록마다 최대치까지 올라야 하고, Receipt가 매우 운이 좋지 않아야 합니다.

---

## 지금 가스 가격은 얼마인가요? {#whats-the-price-of-gas-right-now}

RPC 메소드 `gas_price`를 사용하여 특정 블록의 가스 가격에 대해 NEAR 플랫폼에서 직접 쿼리할 수 있습니다. 이 가격은 네트워크 부하에 따라 변경될 수 있습니다. 가격은 yoctoNEAR(10^-24 NEAR)로 표시됩니다.

1. Take any recent block hash from the blockchain using [NearBlocks Explorer](https://testnet.nearblocks.io/blocks)

   _작성 당시, `SqNPYxdgspCT3dXK93uVvYZh18yPmekirUaXpoXshHv`가 최신 블록 해시였습니다._

2. `gas_price` 메서드를 사용하여 이 블록의 가스 가격에 대한 RPC 요청을 발행합니다. [[여기에 설명](/api/rpc/gas#gas-price)되어 있습니다.](/api/rpc/gas#gas-price)

   ```bash
   http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='["SqNPYxdgspCT3dXK93uVvYZh18yPmekirUaXpoXshHv"]' id=dontcare
   ```

3. 결과를 관찰합니다.

   ```json
   {
     "id": "dontcare",
     "jsonrpc": "2.0",
     "result": {
       "gas_price": "5000"
     }
   }
   ```

이 블록에서 가스 1단위의 가격은 5000 yoctoNEAR (10^-24 NEAR)입니다.

---

## 백서에서의 몇 가지 마무리 생각 {#some-closing-thoughts-from-the-whitepaper}

<blockquote class="info">
기본적으로 NEAR 플랫폼은 자발적인 참여자 간의 시장입니다.  공급 측면에서, 밸리데이터 노드 및 기타 기본 인프라의 운영자는 "커뮤니티 클라우드"를 구성하는 서비스를 제공하는 데에 있어 인센티브를 받아야 합니다.  수요 측면에서, 이를 사용하는 플랫폼의 개발자와 최종 사용자는 간단하고 명확하며 일관된 방식으로 서비스 사용에 대한 비용을 지불할 수 있어야 합니다.

블록체인 기반 클라우드는 그 위에서 실행되는 애플리케이션에 몇 가지 특정 리소스를 제공합니다. - **컴퓨팅 (CPU)**: 이는 컨트랙트에서 코드를 실행하는 실제 컴퓨터 처리(및 즉시 사용 가능한 RAM)입니다.
- **대역폭 ("네트워크")**: 트랜잭션을 제출하는 메시지와 블록을 전파하는 메시지를 포함하는, 참가자와 사용자 간의 네트워크 트래픽입니다.
- **스토리지**: 일반적으로 스토리지 공간과 시간의 함수로 표현되는 체인의 영구 데이터 저장소입니다.

Ethereum과 같은 기존 블록체인은 각각에 대해 별도로 계산하지만, 궁극적으로 개발자나 사용자에게 단일 수수료로 한 번만 청구하는 단일 선불 트랜잭션 수수료를 통해 이들 모두를 설명합니다. 이것은 일반적으로 "가스"로 표시되는, 높은 변동성을 가지는 수수료입니다.

개발자는 최종 사용자에게 예산을 책정하고 가격을 제공할 수 있도록 예측 가능한 가격을 선호합니다. NEAR에서 위에서 언급한 리소스에 대한 가격은 완전한 경매 기반이 아니라 시스템 사용량에 따라 천천히 조정되는 금액입니다(그리고 극단적인 사용량에 대한 리샤딩의 스무딩 효과에 따라 다름). 이는 개발자가 트랜잭션 실행 또는 스토리지 유지 비용을 보다 예측 가능하게 알 수 있음을 의미합니다.

</blockquote>

가스가 NEAR에서 작동하는 방식과 이유에 대해 자세히 알아보려면, 기본 백서의 [Economics](https://near.org/papers/the-official-near-white-paper/#economics) 섹션과 Economics 백서의 [트랜잭션 및 스토리지 수수료](https://near.org/papers/economics-in-sharded-blockchain/#transaction-and-storage-fees) 섹션을 확인하세요.

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::

[대체 가능한 토큰]: https://github.com/near-examples/FT/pull/42
[1.1M]: https://github.com/chadoh/erc20-test
[9]: https://testnet.nearblocks.io/txns/GsgH2KoxLZoL8eoutM2NkHe5tBPnRfyhcDMZaBEsC7Sm
[스토리지 스테이킹]: /concepts/storage/storage-staking
[~45k]: https://ethereum.stackexchange.com/questions/71235/gas-limit-for-erc-20-tokens
[14]: https://testnet.nearblocks.io/txns/5joKRvsmpEXzhVShsPDdV8z5EG9bGMWeuM9e9apLJhLe
[8]: https://testnet.nearblocks.io/txns/34pW67zsotFsD1DY8GktNhZT9yP5KHHeWAmhKaYvvma6
[44k]: https://github.com/chadoh/erc20-test
