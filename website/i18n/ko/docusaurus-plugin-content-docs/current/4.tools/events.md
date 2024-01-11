---
id: realtime
title: Real-time Events (WebSocket)
---

탈중앙화 앱을 개발하는 동안, 실시간으로 특정 이벤트를 추적하고 싶을 수 있습니다. 예를 들어 특정 NFT 마켓플레이스에서 판매가 발생할 때마다 정보를 받고 싶을 수 있습니다. 이것이 가능하려면 다음과 같은 것들이 필요합니다.

1. 컨트랙트에서 이벤트가 발생했음을 알리는 방법
2. 이러한 이벤트를 실시간으로 추적하는 방법

이러한 문제를 해결하기 위해 [표준 이벤트 형식(NEP-297)](https://nomicon.io/Standards/EventsFormat)이 만들어졌습니다. [NEP-297](https://nomicon.io/Standards/EventsFormat)은 컨트랙트가 이벤트 발생을 알려주는 표준에 대해 정의합니다. 이러한 이벤트는 공개되므로, 웹소켓을 사용하여 실시간으로 이벤트를 추적하는 서비스를 구축할 수 있습니다.

---

## NEP-297 - 이벤트
NEAR에서는 `Events`는 컨트랙트의 표준 로그 기능을 사용하는데, 이는 모든 로그가 블록체인에 영원히 저장되기 때문입니다. 이러한 방식으로, 이벤트는 `EVENT_JSON:` 접두사로 시작하고 뒤에 유효한 JSON 문자열 한 개가 오는 일반 로그 항목과 같습니다. JSON 문자열은 다음과 같은 인터페이스로 객체를 코드화해야 합니다.

```ts
interface EventLogData {
    standard: string, // name of standard, e.g. nep171
    version: string, // e.g. 1.0.0
    event: string, // type of the event, e.g. nft_mint
    data?: unknown, // event data defined in the nep171
}
```

예제로 [NEP-297 페이지](https://nomicon.io/Standards/EventsFormat)를 참조하세요.

:::warning 로그를 캡쳐할 때 16kb 문자열 제한이 존재합니다. :::

---

## 이벤트 듣기 (Mainnet)

`mainnet`에서 이벤트를 들으려면, 안전한 웹소켓 `wss://events.near.stream/ws`에 연결하기만 하면 됩니다. **`testnet`에 대한** 웹소켓은 없습니다.

첫 번째 메시지로, 필터링하려는 이벤트 유형과 필요한 경우 제한 사항을 나타내는 객체를 전달해야 합니다. 예를 들어 아래 예시에서는 `nft.nearapps.near` 계정의 `nft_mint` 이벤트를 필터링합니다.

```json
{
  secret: "ohyeahnftsss",
  filter: [{
    "account_id": "nft.nearapps.near",
    "status": "SUCCESS",
    "event": {
      "standard": "nep171",
      "event": "nft_mint",
    }
  }],
  fetch_past_events: 20,
}
```

:::caution `testnet`에 대해 구현된 웹소켓은 없지만, 이 [수정된 인덱서](https://github.com/evgenykuzyakov/indexer-tutorials/tree/master/example-indexer)를 사용하여 데이터베이스를 이벤트로 채운 다음, [event-api 프로젝트](https://github.com/evgenykuzyakov/event-api)를 통해 해당 이벤트들을 제공하면 각자만의 웹소켓을 직접 실행할 수 있습니다. :::

:::tip 참조 구현 참조 구현이 필요한 경우, NEAR 네트워크의 모든 `nft_mint` 및 `nft_transfer` 이벤트를 수신하는 [Evgeny Kuzyakov의 프로젝트](https://github.com/evgenykuzyakov/nft-mints)가 있습니다. :::

---
