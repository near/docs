---
id: widgets
title: Widget
---
import {WidgetEditor} from "@site/src/components/social-widget"

The predefined component `Widget` allows you to include an existing component into your code, thus enabling to create complex applications by composing components.

<WidgetEditor id='1' height="220px">

```ts
const user = "gagdiez.near";
const props = { name: "Anna" };

return (
  <>
    <div class="container min-vw-100">

      <h3> Composing Widgets </h3>
      <p> Widgets can be composed </p>
      <hr />

      <Widget src={`${user}/widget/Greetings`} props={props} />
    </div>
  </>
);
```

</WidgetEditor>