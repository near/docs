---
id: built-in-components
title: List of Native Components
---

import {WidgetEditor} from "@site/components/social-widget"

A list of all the built-in components to be used on Near Components.

---

## Widget

The predefined component `Widget` allows you to include an existing component into your code, thus enabling to create complex applications by composing components.

<WidgetEditor id='1' height="100px">

```ts
const user = "gagdiez.near";
const props = { name: "Anna" };

return <Widget src={`${user}/widget/Greetings`} props={props} />;
```

</WidgetEditor>

---

## IpfsImageUpload

A built-in component that enables users to directly upload an image to the InterPlanetary File System (IPFS).

<WidgetEditor id='2' height="200px">

```javascript
State.init({
  img: null,
});

return (
  <div className='container row'>
    <div>
      Image upload: <br />
      <IpfsImageUpload image={state.img} />
    </div>
    <div>
      Raw State:
      <pre>{JSON.stringify(state)}</pre>
    </div>
    <div className='mt-2'>
      {state.img.cid && (
        <img
          src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
          alt='uploaded'
        />
      )}
    </div>
  </div>
);
```

</WidgetEditor>

---

## Files

A built-in component that enables to input files with drag and drop support. Read more about the `Files` component [here](https://www.npmjs.com/package/react-files).

<WidgetEditor id='3' height="220px">

```ts
State.init({ img: null });

const uploadFileUpdateState = (body) => {
  asyncFetch(
    "https://ipfs.near.social/add",
    {
      method: "POST",
      headers: { Accept: "application/json" },
      body
    }
  ).then(
    (res) => {
      const cid = res.body.cid;
      State.update({ img: { cid } });
    }
  )
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ img: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};

return (
  <div className="d-inline-block">
    { state.img?
      <img class="rounded w-100 h-100"
        style={{ objectFit: "cover" }}
        src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
        alt="upload preview" />
      : ""
    }
    <Files
      multiple={false}
      accepts={["image/*"]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={filesOnChange}
    >
      { state.img?.uploading ? <> Uploading </> : "Upload an Image" }
    </Files>
  </div>
);
```

</WidgetEditor>

---

## Markdown

A component that enables to render Markdown.

<WidgetEditor id='4' height="60px">

```jsx
return <Markdown text={"This is some example **markdown** content, with _text_ example \n ## Subtitle \n Text"} />;
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

```ts
const allNumbers = Array.from(Array(100).keys())

State.init({
  displayNums: [],
  lastNumber: 0,
});

const loadNumbers = (page) => {
  allNumbers
    .slice(state.lastNumber, state.lastNumber + 10)
    .map((n) => numberToElem(n))
    .forEach((i) => state.displayNums.push(i));
  state.lastNumber += 10;
  State.update();
};

const numberToElem = (number) => <div> {number} </div>;

return (
  <div>
    <InfiniteScroll
      loadMore={loadNumbers}
      hasMore={state.displayNums.length < allNumbers.length}
    >
      <p>{state.displayNums}</p>
    </InfiniteScroll>
  </div>
);
```

</WidgetEditor>

### Example: Meme Feed

<WidgetEditor id='7' height="260px">

```ts
const data = Social.keys(`*/post/meme`, "final", { return_type: "History" });

if (!data) { return "Loading"; }

const processData = (data) => {
  const accounts = Object.entries(data);

  const allMemes = accounts
    .map((account) => {
      const accountId = account[0];
      const blockHeights = account[1].post.meme;
      return blockHeights.map((blockHeight) => ({
        accountId,
        blockHeight,
      }));
    })
    .flat();

  allMemes.sort((a, b) => b.blockHeight - a.blockHeight);
  return allMemes;
};

const memeToWidget = ({accountId, blockHeight}) => {
  return <div style={{ minHeight: "200px" }}>
    <a href={`#/mob.near/widget/Meme?accountId=${accountId}&blockHeight=${blockHeight}`}
      class="text-decoration-none" >
      <Widget src="mob.near/widget/Meme" props={{accountId, blockHeight}} />
    </a>
  </div >
};

State.init({
  allMemes: processData(data),
  widgets: [],
});

const makeMoreMemes = () => {
  const newMemes = state.allMemes
    .slice(state.widgets.length, state.widgets.length + 10)
    .map(memeToWidget);
  newMemes.forEach((meme) => state.widgets.push(meme));
  State.update();
};

return (
  <div className="px-2 mx-auto" >
    <InfiniteScroll
      loadMore={makeMoreMemes}
      hasMore={state.widgets.length < state.allMemes.length}
    >
      <div>{state.widgets}</div>
    </InfiniteScroll>
  </div>
);
```

</WidgetEditor>

---

## TypeAhead

Provides a type-ahead input field for selecting an option from a list of choices. More information about the component can be found [here](https://github.com/ericgio/react-bootstrap-typeahead).

<WidgetEditor id='8' height="220px">

```jsx
const options = ["Apple", "Banana", "Cherry", "Durian", "Elderberry"];

return (
  <div class="container min-vh-100 min-vw-100">
    <Typeahead
      options={options}
      multiple
      onChange={(value) => {State.update({choose: value})}}
      placeholder='Choose a fruit...'
    />
    <hr />
    <p> Selected: {JSON.stringify(state.choose)} </p>
  </div>
);
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

Displays a message once the mouse hovers over a particular item. This component was imported from [`React-Bootstrap`](https://react-bootstrap.netlify.app/components/overlays/#tooltips).

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