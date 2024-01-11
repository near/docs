---
id: introduction
sidebar_label: 홈
title: NEAR RPC API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ContactUs from '@site/src/components/ContactUs.mdx';

RPC API를 사용하면 NEAR 네트워크와 직접 통신할 수 있습니다. 예를 들어, [near-api-js](/tools/near-api-js/quick-reference)와 같은 도구는 RPC 호출을 만드는 추상화일 뿐입니다.

<hr class="subsection" />

## RPC 제공자

[선택할 수 있는 여러 RPC 공급자](./providers.md)가 있습니다. 이러한 공급자는 NEAR 네트워크와 상호 작용하는 데 도움이 되는 중개자 역할을 합니다.

<hr class="subsection" />

## NEAR RPC - 빠른 링크

| API                                                          | 설명                                      |
| ------------------------------------------------------------ | --------------------------------------- |
| [액세스 키](/api/rpc/access-keys)                                | 계정의 액세스 키에 대한 정보를 검색합니다.                |
| [계정 / 컨트랙트](/api/rpc/contracts)                              | 계정 및 컨트랙트에 대한 세부 정보를 보고 컨트랙트 호출을 수행합니다. |
| [블록 / 청크](/api/rpc/block-chunk)                              | 네트워크를 쿼리하고 특정 블록 또는 청크에 대한 세부 정보를 얻습니다. |
| [가스](/api/rpc/gas)                                           | 특정 블록 또는 해시에 대한 가스 가격을 가져옵니다.           |
| [프로토콜](/api/rpc/protocol)                                    | 현재 제네시스 및 프로토콜 구성을 검색합니다.               |
| [네트워크](/api/rpc/network)                                     | 노드 및 밸리데이터에 대한 상태 정보를 반환합니다.            |
| [트랜잭션](/api/rpc/transactions)                                | 트랜잭션을 보내고 상태를 쿼리합니다.                    |
| [유지 관리 기간(Maintenance Window)](/api/rpc/maintenance-windows) | 밸리데이터에 대해 현재 에포크 내 유지 관리 기간을 쿼리합니다.     |

:::tip [Postman](/api/rpc/setup#postman-setup), [JavaScript](/api/rpc/setup#javascript-setup) 및 [HTTPie](/api/rpc/setup#httpie-setup)를 사용하여 JSON RPC 2.0 엔드포인트에 액세스할 수 있습니다. :::

<hr class="subsection" />

<ContactUs />
