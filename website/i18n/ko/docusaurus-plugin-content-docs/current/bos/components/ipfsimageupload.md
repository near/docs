---
id: ipfs
title: 이미지 업로더
---

import {WidgetEditor} from "@site/src/components/social-widget"

`IpfsImageUpload`는 사용자가 이미지를 IPFS(InterPlanetary File System)에 직접 업로드할 수 있도록 지원하는 기본 제공 컴포넌트입니다.

<hr class="subsection" />

### 예시

<WidgetEditor id='1' height="200px">

```javascript
State.init({
  img: null,
});
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