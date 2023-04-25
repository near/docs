---
id: tooltip
title: ToolTip Component
sidebar_label: ToolTip
---

import {WidgetEditor} from "@site/src/components/social-widget"

This special component displays a message once the mouse hovers over a particular DOM item. This component was imported into NEAR Social from `React-Bootstrap` and more info can be [found here](https://react-bootstrap.netlify.app/components/overlays/#tooltips).

<hr class="subsection" />

### Example

The code has been adopted and modified from the `react-bootstrap` documentation website. The snippet below demonstrates how to implement the message over a button and how to reposition it.

<WidgetEditor id='1' height="120px">

```jsx
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