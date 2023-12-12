---
id: ipfs
title: Image Uploader
---
import {WidgetEditor} from "@site/src/components/social-widget"

The `IpfsImageUpload` is a built-in component that enables users to directly upload an image to the InterPlanetary File System (IPFS).

<hr class="subsection" />

### Example

<WidgetEditor id='1' height="200px">

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