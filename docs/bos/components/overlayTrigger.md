---
id: overlay-trigger
title: OverlayTrigger
sidebar_label: OverlayTrigger
---

import {WidgetEditor} from "@site/src/components/social-widget"

The `OverlayTrigger` is used to display a message or icon when the mouse is over a DOM element. Common use cases could be like a popover or a tooltip.

<hr class="subsection" />

### Example

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


The OverlayTrigger component has several props that allow you to customize its behavior:

| Prop        | Description                                                                                                                                                                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `show`      | A boolean value that determines whether the overlay is currently visible or not.                                                                                                                                                                                             |
| `trigger`   | An array of events that trigger the display of the overlay. In this example, the `trigger` prop is set to `["hover", "focus"]`, which means that the overlay will be displayed when the user hovers over or focuses on the element.                                          |
| `delay`     | An object that specifies the delay before the overlay is displayed or hidden. In this example, the `delay` prop is set to `{ show: 250, hide: 300 }`, which means that the overlay will be displayed after a 250-millisecond delay and hidden after a 300-millisecond delay. |
| `placement` | A string that specifies the position of the overlay relative to the trigger element. In this example, the `placement` prop is set to `"auto"`, which means that the position will be automatically determined based on available space.                                      |
| `overlay`   | The content that will be displayed in the overlay. In this example, the `overlay` prop is set to a `<div>` element containing the message "This is the overlay message."                                                                                                     |
