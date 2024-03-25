---
id: utils
title: Utilities
sidebar_label: Utilities
---

### NEAR => yoctoNEAR {#near--yoctonear}

```js
// chuyển đổi số lượng NEAR thành yoctoNEAR (10^-24)

const { utils } = nearAPI;
const amountInYocto = utils.format.parseNearAmount("1");
```

[<span className="typedoc-icon typedoc-icon-function"></span> Function `parseNearAmount`](https://near.github.io/near-api-js/functions/_near_js_utils.format.parseNearAmount.html)

### YoctoNEAR => NEAR {#yoctonear--near}

```js
// chuyển đổi số lượng yoctoNEAR (10^-24) thành NEAR

const { utils } = nearAPI;
const amountInNEAR = utils.format.formatNearAmount("1000000000000000000000000");
```

[<span className="typedoc-icon typedoc-icon-function"></span> Function `formatNearAmount`](https://near.github.io/near-api-js/functions/_near_js_utils.format.formatNearAmount.html)
