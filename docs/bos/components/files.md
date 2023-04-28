---
id: files
title: Files
sidebar_label: Files
---

import {WidgetEditor} from "@site/src/components/social-widget"

`Files` is a built-in component that enables to input files with drag and drop support. To use this feature, simply use the `Files` component. This component is a dependency from the [`IpfsImageUpload`](./ipfsimageupload.md) component.

Read more about the `Files` component [here](https://www.npmjs.com/package/react-files).

<hr class="subsection" />

### Example

<WidgetEditor id='1' height="220px">

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
