---
id: markdown
title: 마크다운 뷰어
sidebar_label: 마크다운
---

import {WidgetEditor} from "@site/src/components/social-widget"

`Markdown`은 마크다운을 렌더링할 수 있는 기본 제공 컴포넌트입니다. 이 기능을 사용하려면 `Markdown` 컴포넌트를 사용하면 됩니다:

<hr class="subsection" />

### 예시

<WidgetEditor id='1' height="120px">

```js
return (
  <>
    {["Example **markdown** content", "Some _other_ example"].map((placement) => (
      <div class="container border border-info pt-3  text-center">
        <Markdown text={placement} />
      </div>
    ))}
  </>
);
```

</WidgetEditor>

---

## 마크다운 에디터

위에서 설명한 것처럼, 사용자는 정적 텍스트를 입력할 수 있습니다. However, for a more robust experience, checkout this component that also contains a [Markdown Editor](https://near.social/#/mob.near/widget/MarkdownEditorIframeExample). 이 에디터가 어떻게 생성되었는지 보려면 `View Source` 버튼을 누릅니다.

![](https://i.imgur.com/XJO8tEz.png)
