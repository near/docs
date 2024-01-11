---
id: styled
title: 스타일 컴포넌트
sidebar_label: 스타일
---

import {WidgetEditor} from "@site/src/components/social-widget"

[스타일 컴포넌트](https://styled-components.com/)는 CSS-in-JS를 사용하여 React 컴포넌트를 스타일링하는 데 널리 사용되는 라이브러리입니다. 사용을 위해 이 도구를 `near.social` 인프라로 가져왔습니다.. 설치하거나 가져올 필요 없이 바로 사용할 수 있습니다.

<hr class="subsection" />

### 예시

<WidgetEditor id='1' height="80px">

```js
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
`;

return (
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```

</WidgetEditor>