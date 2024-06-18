---
id: builtin-components
title: List of Native Components
---

:::warning What is the state of BOS (NEAR Components)?

We no longer recommend building on BOS due to its limited capabilities and discontinued security maintenance. Developers with active projects on BOS are encouraged to migrate to another deployment strategy.

See [here](/build/web3-apps/frontend#bos-socialvm) for more info

:::

import {WidgetEditor} from "@site/src/components/widget-editor"

A list of all the built-in components to be used on Near Components.

---

## Widget

The predefined component `Widget` allows you to include an existing component into your code, thus enabling to create complex applications by composing components.

<WidgetEditor id='1' height="100px">

```ts
const props = { name: "Anna", amount: 3 };

return <Widget src="influencer.testnet/widget/Greeter" props={props} />;
```

</WidgetEditor>

---

## IpfsImageUpload

A built-in component that enables users to directly upload an image to the InterPlanetary File System (IPFS).

<WidgetEditor id='2' height="200px">

```js
State.init({image: {}})

return <>
  <p> Raw State: {JSON.stringify(state.image)} </p>
  <IpfsImageUpload image={state.image} />
</>
```

</WidgetEditor>

---

## Files

A built-in component that enables to input files with drag and drop support. Read more about the `Files` component [here](https://www.npmjs.com/package/react-files).

<WidgetEditor id='3' height="220px">

```js
const [img, setImg] = useState(null);
const [msg, setMsg] = useState('Upload an Image')

const uploadFile = (files) => {
  setMsg('Uploading...')

  const file = fetch(
    "https://ipfs.near.social/add",
    {
      method: "POST",
      headers: { Accept: "application/json" },
      body: files[0]
    }
  )

  setImg(file.body.cid)
  setMsg('Upload an Image')
}

return <>
  <Files
    multiple={false}
    accepts={["image/*"]}
    clickable
    className="btn btn-outline-primary"
    onChange={uploadFile}
  >
    {msg}
  </Files>
  {img ? <div><img src={`https://ipfs.near.social/ipfs/${img}`} /></div> : ''}
</>;
```

</WidgetEditor>

---

## Markdown

A component that enables to render Markdown.

<WidgetEditor id='4' height="60px">

```jsx
const markdown = (`
## A title

This is some example **markdown** content, with _styled_ text
`)

return <Markdown text={markdown} />;
```

</WidgetEditor>

:::tip Markdown Editor

Checkout this [Markdown Editor](https://near.social/#/mob.near/widget/MarkdownEditorIframeExample), and [its source code](https://near.social/mob.near/widget/WidgetSource?src=mob.near/widget/MarkdownEditorIframeExample).
:::

---

## OverlayTrigger

Used to display a message or icon when the mouse is over a DOM element.

<WidgetEditor id='5' height="200px">

```javascript
const [show, setShow] = useState(false);

const overlay = (
  <div className='border m-3 p-3'>
    This is the overlay Message
  </div>
);

return (
  <OverlayTrigger
    show={show}
    delay={{ show: 250, hide: 300 }}
    placement='auto'
    overlay={overlay}
  >
    <button
      className="btn btn-outline-primary"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      Place Mouse Over Me
    </button>
  </OverlayTrigger>
);
```

</WidgetEditor>

<details markdown="1">

<summary> Component props </summary>

The OverlayTrigger component has several props that allow you to customize its behavior:

| Prop        | Description                                                                                                                                                                                                                                                                  |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `show`      | A boolean value that determines whether the overlay is currently visible or not.                                                                                                                                                                                             |
| `trigger`   | An array of events that trigger the display of the overlay. In this example, the `trigger` prop is set to `["hover", "focus"]`, which means that the overlay will be displayed when the user hovers over or focuses on the element.                                          |
| `delay`     | An object that specifies the delay before the overlay is displayed or hidden. In this example, the `delay` prop is set to `{ show: 250, hide: 300 }`, which means that the overlay will be displayed after a 250-millisecond delay and hidden after a 300-millisecond delay. |
| `placement` | A string that specifies the position of the overlay relative to the trigger element. In this example, the `placement` prop is set to `"auto"`, which means that the position will be automatically determined based on available space.                                      |
| `overlay`   | The content that will be displayed in the overlay. In this example, the `overlay` prop is set to a `<div>` element containing the message "This is the overlay message.                                                                                                      |
</details>

---

## InfiniteScroll

Infinitely load a grid or list of items. This component allows you to create a simple, lightweight infinite scrolling page or element by supporting both window and scrollable elements.

Read more about the [react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller) package.

<WidgetEditor id='6' height="200px">

```js
const allNumbers = Array.from(Array(100).keys())
const [lastNumber, setLastNumber] = useState(0);
const [display, setDisplay] = useState([]);

const loadNumbers = (page) => {
  const toDisplay = allNumbers
    .slice(0, lastNumber + page*10)
    .map(n => <p>{n}</p>)

  console.log(lastNumber + page*10)
  setDisplay(toDisplay);
  setLastNumber(lastNumber + page*10);
};

return (
  <InfiniteScroll
    loadMore={loadNumbers}
    hasMore={lastNumber < allNumbers.length}
    useWindow={false}
  >
    {display}
  </InfiniteScroll>
);
```

</WidgetEditor>

---

## TypeAhead

Provides a type-ahead input field for selecting an option from a list of choices. More information about the component can be found [here](https://github.com/ericgio/react-bootstrap-typeahead).

<WidgetEditor id='7' height="300px">

```jsx
const [selected, setSelected] = useState([]);
const options = ["Apple", "Banana", "Cherry", "Durian", "Elderberry"];

return <>
  <Typeahead
    options={options}
    multiple
    onChange={v => setSelected(v)}
    placeholder='Choose a fruit...'
  />
  <hr />
  <p> Selected: {selected.join(', ')} </p>
</>;
```

</WidgetEditor>

---

## Styled Components

[Styled Components](https://styled-components.com/) is a popular library for styling React components using CSS-in-JS.

<WidgetEditor id='8' height="80px">

```jsx
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

---

## Tooltip

Displays a message once the mouse hovers over a particular item. This component was imported from [`React-Bootstrap`](https://react-bootstrap-v3.netlify.app/components/tooltips/).

<WidgetEditor id='9' height="120px">

```js
const tooltip = (
  <Tooltip id="tooltip">
    <strong>Holy guacamole!</strong> Check this info.
  </Tooltip>
);

return <>
  <OverlayTrigger placement="left" overlay={tooltip}>
    <button>Holy guacamole!</button>
  </OverlayTrigger>

  <OverlayTrigger placement="top" overlay={tooltip}>
    <button>Holy guacamole!</button>
  </OverlayTrigger>

  <OverlayTrigger placement="bottom" overlay={tooltip}>
    <button>Holy guacamole!</button>
  </OverlayTrigger>

  <OverlayTrigger placement="right" overlay={tooltip}>
    <button>Holy guacamole!</button>
  </OverlayTrigger>
</>
```

</WidgetEditor>