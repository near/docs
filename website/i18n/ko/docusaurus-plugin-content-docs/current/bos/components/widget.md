---
id: widgets
title: 위젯
---

import {WidgetEditor} from "@site/src/components/social-widget"

미리 정의된 구성요소인 `Widget`을 사용하면 기존 구성요소를 코드에 포함할 수 있으므로 구성요소를 구성하여 복잡한 애플리케이션을 만들 수 있습니다.

<WidgetEditor id='1' height="220px">

```ts
const user = "gagdiez.near";
const props = { name: "Anna" };

return (
  <>
    <div class="container ">

      <h3> 위젯 구성 </h3>
      <p> 위젯을 구성할 수 있습니다. </p>
      <hr />

      <Widget src={`${user}/widget/Greetings`} props={props} />
    </div>
  </>
);
```

</WidgetEditor>

