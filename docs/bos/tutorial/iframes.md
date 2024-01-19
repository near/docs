---
id: using-iframes
title: Using IFrames
---

# Iframes

In this tutorial you'll learn [how to use](#using-iframes-on-bos-vm) the `iframe` VM tag and the [Iframe resizer](#iframe-resizer) library, so you can embed external HTML or use custom DOM elements when building NEAR components.
You can use it along the rest of approved VM tags to simplify your component development.


## Using IFrames on NEAR VM

Iframes can be used to embed external HTML or to use custom DOM
elements, for example `canvas`.

### Properties

The `iframe` tag takes the following properties: `className`, `style`, `src`,
`srcDoc`, `title`, `message`, and `onMessage`. The iframe has a sandbox property
set to `sandbox="allow-scripts"`, which only allows scripts.

:::info

`message` and `onMessage` are used to communicate with this iframe
instance.

:::

| param | description |
|-------|-------------|
| `message` | it's passed to the iframe every time the deep equal is different, or the iframe is recreated. The message is passed using `contentWindow.postMessage(message, "*")` on the iframe. |
| `onMessage(data)` | it's called when the iframe passes a message to `window.top`. Only `event.data` is passed to the `onMessage` |

### Events

The VM exposes the following `<iframe>` events:
- `onLoad()`: support for `onLoad` event without any event info
   ```js
   <iframe onLoad={() => { console.log('iframe loaded') }}>
   ```

- `onResized()`: support for `onResized` [Iframe Resizer](#iframe-resizer) event with an object only containing the new `width` and `height`
   ```js
   <iframe iframeResizer={{
      onResized: ({width, height}) => { console.log('iframe resized', width, height) },
   }}>
   ```

### Example

The following example demonstrates how you can use an iframe to call
`eval`:
```js
State.init({
  text: `"b" + "a" + +"a" + "a"`,
});

const code = `
<div>Expression: <pre id="exp" /></div>
<div>Results: <pre id="res" /></div>

<script>
    window.top.postMessage("loaded", "*");
    window.addEventListener("message", (event) => {
        const data = event.data
        document.getElementById("exp").innerHTML = JSON.stringify(data);
        try {
            const result = eval(data.exp);
            document.getElementById("res").innerHTML = result;
            event.source.postMessage(result, "*");
        } catch (e) {
            // ignore
        }
    }, false);
</script>
`;

return (
  <div>
    <input
      value={state.text || ""}
      onChange={(e) => State.update({ text: e.target.value })}
    />
    Iframes below
    <div className="d-flex">
      <iframe
        className="w-50 border"
        srcDoc={code}
        message={{ exp: state.text || "" }}
        onMessage={(res1) => State.update({ res1 })}
      />
      <iframe
        className="w-50 border"
        srcDoc={code}
        message={{ exp: (state.text || "") + " + ' banana'" }}
        onMessage={(res2) => State.update({ res2 })}
      />
    </div>
    Result:{" "}
    <pre>
      res1 = {JSON.stringify(state.res1)}
      res2 = {JSON.stringify(state.res2)}
    </pre>
  </div>
);
```

![iframes](https://user-images.githubusercontent.com/470453/216140589-801a49e8-9ff1-4b76-9019-499b375989cc.png)


## Iframe Resizer

[Iframe Resizer](https://github.com/davidjbradshaw/iframe-resizer) is a critical library for rendering responsive iframes. This library automatically resizes the `iframe` to match the child content size to avoid scrollbars on the `iframe` itself.

:::caution don't forget 

The child page rendered by the `iframe` **must include** this script in order for the resizing to work:

```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"></script>
```

:::

:::note

NEAR VM uses the React flavor of [this plugin](https://github.com/davidjbradshaw/iframe-resizer-react).

:::

### Basic Example

You can use the Iframe resizer library like this:

```js
return (
  <div>
    <iframe
      iframeResizer
      src="https://davidjbradshaw.com/iframe-resizer/example/frame.content.html"
    />
  </div>
);
```

If you need to pass in options to override the default behavior:

```js
return (
  <div>
    <iframe
      iframeResizer={{ log: true }}
      src="https://davidjbradshaw.com/iframe-resizer/example/frame.content.html"
    />
  </div>
);
```

![iframe resizer](https://user-images.githubusercontent.com/1475067/231292519-51f571c6-5f7b-4076-a1bb-91fd8a99c775.png)

:::tip

You can check [this example](https://near.org/near/widget/ComponentDetailsPage?src=calebjacob.near/widget/IframeResizerTest) to see a complete component using Iframe Resizer.

:::

### `srcDoc` Example

An example of a valid `srcDoc` for a secure Iframe using `iframeResizer`:

```js
const code = `
<script>
// ...your code...

// define message handler
const handleMessage = (m) => {
  console.log('received message', m)
  document.getElementById("messageText").innerHTML = m;
};

// finally, configure iframe resizer options before importing the script
window.iFrameResizer = {
    onMessage: handleMessage
  }
</script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"></script>
<p id="messageText">loading...</p>
`;

return (
  <div>
    <iframe
      iframeResizer
      className="w-100"
      srcDoc={code}
      message="my message"
    />
  </div>
);
```
