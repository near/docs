---
id: markdown
title: Markdown Viewer
sidebar_label: Markdown
---

import {WidgetEditor} from "@site/src/components/social-widget"

`Markdown` is a built-in component that enables to render Markdown. To use this feature, simply use the `Markdown` component:

<hr class="subsection" />

### Example

<WidgetEditor id='1' height="200px">

```ts
const text = `
  #### Markdown Section
  Example of **markdown** *code* with an [url](example.com)
`;

return (
  <>
    <div class="container border border-info pt-3 min-vw-100 text-center">
      <Markdown text={text} />
    </div>
  </>
);
```

</WidgetEditor>

---

## Markdown Editor
<!-- TODO: Create a widget -->
The user can input static text, as demonstrated above. However, for a more robust experience, checkout this component that also contains a Markdown Editor (accessible at https://near.social/#/mob.near/widget/MarkdownEditorIframeExample). Hit the `View Source` Button to see how this editor was created.

![](https://i.imgur.com/XJO8tEz.png)
