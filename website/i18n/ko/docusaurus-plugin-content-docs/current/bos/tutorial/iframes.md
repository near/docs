---
id: using-iframes
title: IFrame 사용하기
---

# Iframes

In this tutorial you'll learn [how to use](#using-iframes-on-bos-vm) the `iframe` VM tag and the [Iframe resizer](#iframe-resizer) library, so you can embed external HTML or use custom DOM elements when building NEAR components. 승인된 나머지 VM 태그와 함께 이 태그를 사용하여 컴포넌트 개발을 간소화할 수 있습니다.


## Using IFrames on NEAR VM

Iframes는 외부 HTML을 포함하거나 사용자 정의 DOM 요소를 사용하는 데 쓰일 수 있습니다(예: `canvas`).

### 속성

`iframe` 태그는 다음 속성을 사용합니다: `className`, `style`, `src`, `srcDoc`, `title`, `message`및 `onMessage`. iframe은 스크립트만을 허용하도록 `sandbox="allow-scripts"`로 설정된 샌드박스 속성을 가지고 있습니다.

:::info

`message` 및 `onMessage`는 이 iframe 인스턴스와 통신하는 데에 사용됩니다.

:::

| 매개변수              | 설명                                                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `message`         | deep equal이 다르거나 iframe이 다시 생성될 때마다 iframe에 전달됩니다. 이 메시지는 iframe에서 ` contentWindow.postMessage(message, "*") `를 사용하여 전달됩니다. |
| `onMessage(data)` | iframe이 메시지를 `window.top`으로 전달할 때 호출됩니다. `event.data`만 `onMessage`로 전달됩니다.                                                  |

### 이벤트

VM에서 다음 `<iframe>` 이벤트를 표시합니다:
- `onLoad()`: 이벤트 정보 없이 `onLoad` 이벤트를 지원합니다.
   ```js
   <iframe onLoad={() => { console.log('iframe loaded') }}>
   ```

- `onResize()(`): `onResized`를 지원합니다. 새 `width`와 `height`만 포함하는 객체가 있는 [Iframe Resizer](#iframe-resizer) 이벤트입니다.
   ```js
   <iframe iframeResizer={{
      onResized: ({width, height}) => { console.log('iframe resized', width, height) },
   }}>
   ```

### 예시

다음 예시는 `eval`을 호출하는 iframe을 사용하는 방법을 설명합니다.
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

[Iframe Resizer](https://github.com/davidjbradshaw/iframe-resizer)는 반응형 iframe을 렌더링하는 중요한 라이브러리입니다. 이 라이브러리는 `iframe`을 자동으로 조정해 `iframe` 자체에 있는 스크롤바를 피하는 자식 컨텐츠 사이즈와 일치하게 만들어 줍니다.

:::caution 잊지 마세요

`iframe`에 의해 렌더링되는 자식 페이지는 이 스크립트를 **반드시 포함**해서 사이즈 조정이 동작하도록 해야 합니다:

```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"></script>
```

:::

:::note

NEAR VM uses the React flavor of [this plugin](https://github.com/davidjbradshaw/iframe-resizer-react).

:::

### 기본 예제

Iframe resizer 라이브러리는 다음과 같이 사용할 수 있습니다:

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

기본 동작을 재정의하는 옵션을 전달해야 하는 경우:

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

[이 예](https://near.org/near/widget/ComponentDetailsPage?src=calebjacob.near/widget/IframeResizerTest)에서 Iframe Resizer를 사용하여 전체 컴포넌트를 확인할 수 있습니다.

:::

### `srcDoc` 예제

`iframeResizer`를 사용하는 안전한 Iframe에 대한 유효한 `srcDoc`의 예:

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
