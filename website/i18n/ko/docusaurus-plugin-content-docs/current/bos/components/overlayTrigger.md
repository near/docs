---
id: overlay-trigger
title: OverlayTrigger
sidebar_label: OverlayTrigger
---

import {WidgetEditor} from "@site/src/components/social-widget"

`OverlayTrigger`는 마우스가 DOM 요소 위에 있을 때 메시지 또는 아이콘을 표시하는 데 사용됩니다. 일반적인 사용 사례는 팝업 또는 도구 설명과 같을 수 있습니다.

<hr class="subsection" />

### 예시

<WidgetEditor id='1' height="200px">


```javascript
State.init({
  show: false,
});

const handleOnMouseEnter = () => {
  State.update({ show: true });
};
const handleOnMouseLeave = () => {
  State.update({ show: false });
};

const overlay = (
  <div
    className='border m-3 p-3 rounded-4 bg-white shadow'
    style={{ maxWidth: "24em", zIndex: 1070 }}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  >
    This is the overlay Message
  </div>
);

return (
  <OverlayTrigger
    show={state.show}
    trigger={["hover", "focus"]}
 delay={{ show: 250, hide: 300 }}
    placement='auto'
    overlay={overlay}
  >
    <span
      className='d-inline-flex'
      style={{ backgroundColor: "gray", borderRadius: "10px", padding: "10px" }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      Place Mouse Over Me
    </span>
  </OverlayTrigger>
);
```

</WidgetEditor>

OverlayTrigger 컴포넌트에는 동작을 사용자 정의할 수 있는 여러 가지 props가 있습니다:

| Prop        | 설명                                                                                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `show`      | 오버레이가 현재 표시되는지 여부를 결정하는 boolean 값입니다.                                                                                                                 |
| `trigger`   | 오버레이의 표시를 트리거하는 이벤트 배열입니다. 이 예에서 `trigger` prop은`["hover", "focus"]`로 설정됩니다. 즉, 사용자가 요소를 호버하거나 포커스를 맞출 때 오버레이가 표시됩니다.                                 |
| `delay`     | 오버레이를 표시하거나 숨길 때까지의 지연 시간을 지정하는 객체입니다. 이 예에서 `delay` prop은 `{ show: 250, hide: 300 }`으로 설정되어 있습니다. 즉, 오버레이는 250밀리초 간 지연된 후 표시되고, 300밀리초 지연 후에는 숨겨집니다. |
| `placement` | 트리거 요소를 기준으로 오버레이의 위치를 지정하는 문자열입니다. 이 예에서 `placement` prop은 `"auto"`로 설정되며, 이는 사용 가능한 공간에 따라 위치가 자동으로 결정됨을 의미합니다.                                     |
| `overlay`   | 오버레이에 표시될 내용입니다. 이 예에서 `overlay` 프롭은 "This is the overlay message" 메시지가 포함된 `<div>` 요소로 설정됩니다.                                                  |
