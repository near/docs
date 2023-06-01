---
id: clipboard
title: Clipboard API
sidebar_label: Clipboard
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The VM implements a clipboard API that works like [Mozilla's Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText), providing write access to the contents of the system clipboard. The Clipboard API can be used to implement cut, copy, and paste features within a web application.

:::info
For extra safety, the VM has `isTrusted` as part of the stack. This allows to verify if the action was part of the stack originating from the `isTrusted` user's event.
:::

## writeText

The Clipboard interface's `writeText()` copies the specified text string to the system clipboard.

:::note
The event requires for the page to be in transient state (explicit user's click).
:::

 | param      |  required     | type               | description                                                           |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
 | `text`      |  **required** | string   | data to be copied to the clipboard.  |

### Examples

<Tabs>
<TabItem value="request" label="Request" default>

```jsx
return (
  <div>
    <div>
      <button
        onClick={() => {
          clipboard.writeText("HelloWorld!");
        }}
      >
        Copy "HelloWorld!" to clipboard
      </button>
    </div>
    <textarea className="form-control mt-2" placeholder="Test pasting here" />
  </div>
);
```

</TabItem>
<TabItem value="response" label="Response">

```json
// Copy "HelloWorld!" to clipboard
```

</TabItem>
</Tabs>
