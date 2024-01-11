---
id: typeahead
title: TypeAhead 구성요소
sidebar_label: TypeAhead
---

import {WidgetEditor} from "@site/src/components/social-widget"

`TypeAhead` 구성요소는 선택 목록에서 옵션을 선택할 수 있는 자동 검색 입력 필드를 제공합니다. 이 구성 요소는 `react-bootstrap-type ahead` 패키지에서 가져옵니다. 구성 요소에 대한 자세한 내용은 [여기에서](https://github.com/ericgio/react-bootstrap-typeahead) 확인할 수 있습니다.

<hr class="subsection" />

### 예시

아래 코드 예제에서는 `TypeAhead` 구성요소를 사용하여 옵션 목록에서 과일을 선택하기 위한 입력 필드를 만드는 방법을 보여 줍니다.

<WidgetEditor id='1' height="220px">

```js
const options = ["Apple", "Banana", "Cherry", "Durian", "Elderberry"];

return (
  <div class="container min-vh-100 ">
    <Typeahead
      options={options}
      multiple
 onChange={(value) > {State.update({choose: value})}}
      placeholder='Choose a fruit...'
    />
    <hr />
    <p> Selected: {JSON.stringify(state.choose)} </p>
  </div>
);
```

</WidgetEditor>