---
id: tooltip
title: 툴팁 컴포넌트
sidebar_label: 툴팁
---

import {WidgetEditor} from "@site/src/components/social-widget"

이 특수 컴포넌트는 마우스가 특정 DOM 항목을 가리키면 메시지를 표시합니다. This component was imported into NEAR Social from `React-Bootstrap` and more info can be [found here](https://react-bootstrap.netlify.app/docs/components/overlays#tooltips).

<hr class="subsection" />

### 예시

코드는 `react-bootstrap` 문서 사이트에서 채택 및 수정되었습니다. 아래의 스니펫은 버튼을 통해 메시지를 구현하는 방법과 메시지의 위치를 변경하는 방법을 보여줍니다.

<WidgetEditor id='1' height="120px">

```js
return (
  <>
    {["top", "right", "bottom", "left"].map((placement) => (
      <div style={{ margin: "2.5rem 1rem", float: "left" }}>
        <OverlayTrigger
          key={placement}
          placement={placement}
          overlay={
            <Tooltip id={`tooltip-${placement}`}>
              Tooltip on <strong>{placement}</strong>.
            </Tooltip>
          }
        >
          <button variant="secondary">Tooltip on {placement}</button>
        </OverlayTrigger>
      </div>
    ))}
  </>
);
```

</WidgetEditor>
