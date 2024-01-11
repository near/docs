---
id: clipboard
title: 클립보드
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

VM는 [Mozilla의 클립보드](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)처럼 작동하는 클립보드 API를 구현하여 시스템 클립보드의 내용에 대한 쓰기 액세스를 제공합니다. 클립보드 API를 사용하여 웹 애플리케이션 내에서 잘라내기, 복사 및 붙여넣기 기능을 구현할 수 있습니다.

:::info
추가적인 안전을 위해 VM은 스택의 일부로 `isTrusted`를 가지고 있습니다. 이를 통해 Action이 `isTrusted` 사용자 이벤트에서 발생한 스택의 일부였는지 확인할 수 있습니다.
:::

## writeText

클립보드 인터페이스의 `writeText()`는 지정한 텍스트 문자열을 시스템 클립보드에 복사합니다.

:::note
이벤트를 수행하려면 페이지가 일시적인 상태여야 합니다(명시적인 사용자 클릭).
:::

 | 매개변수   | 필수 여부     | 자료형 | 설명             |
 | ------ | --------- | --- | -------------- |
 | `text` | **필수 여부** | 문자열 | 클립보드에 복사될 데이터. |

### 예시

<Tabs>
<TabItem value="request" label="Request" default>

```js
return (
  <div>
    <div>
      <button
        onClick={() > {
          clipboard.writeText("HelloWorld!");
        }}
      >
        Copy "HelloWorld!" to clipboard
      </button>
    </div>
    <textarea className="form-control mt-2" placeholder="여기에 붙여넣기 테스트" />
  </div>
);
```

</TabItem>
<TabItem value="response" label="Response">

```json
// Copy "HelloWorld!" to clipboard
```

</TabItem>
</Tabs>
