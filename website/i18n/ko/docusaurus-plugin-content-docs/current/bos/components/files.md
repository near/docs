---
id: files
title: 파일
sidebar_label: 파일
---

import {WidgetEditor} from "@site/src/components/social-widget"

`Files`는 드래그 앤 드롭을 통해 파일을 입력할 수 있는 빌트인 컴포넌트입니다. 이 기능을 이용하려면, `Files` 컴포넌트를 사용하기만 하면 됩니다. 이 컴포넌트는 [`IpfsImageUpload`](./ipfsimageupload.md) 컴포넌트로부터의 의존성을 가지고 있습니다.

[여기](https://www.npmjs.com/package/react-files)서 `Files` 컴포넌트에 대해 더 많이 읽어보세요.

<hr class="subsection" />

### 예시

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
