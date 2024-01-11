---
id: infinite-scroll
title: InfiniteScroll
sidebar_label: InfiniteScroll
---

import {WidgetEditor} from "@site/src/components/social-widget"

Infinitely load a grid or list of items. This component allows you to create a simple, lightweight infinite scrolling page or element by supporting both window and scrollable elements.

Read more about the [react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller) package.

<hr class="subsection" />

### Example

<WidgetEditor id='1' height="200px">

```ts
const allNumbers = Array.from(Array(100).keys())

const [displayNums, setDisplayNums] = useState([]);
const [lastNumber, setLastNumber] = useState(0);

const loadNumbers = (page) => {
  setLastNumber(lastNumber + 10);
  setDisplayNums(allNumbers.slice(0, lastNumber + 10).map(n => <p> {n} </p>));
};

return (
  <div>
    <InfiniteScroll
      loadMore={loadNumbers}
      hasMore={lastNumber < allNumbers.length}
    >
      <p>{displayNums}</p>
    </InfiniteScroll>
  </div>
);
```

</WidgetEditor>

---

### Example: Loading Memes in NEAR Social

<WidgetEditor id='2' height="260px">

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
  </div>
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
