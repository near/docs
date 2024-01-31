---
id: utils
title: Utilities
sidebar_label: Utilities
---

### NEAR => yoctoNEAR {#near--yoctonear}

```js
// converts NEAR amount into yoctoNEAR (10^-24)

const { utils } = nearAPI;
const amountInYocto = utils.format.parseNearAmount("1");
```

[<span className="typedoc-icon typedoc-icon-function"></span> Function `parseNearAmount`](https://near.github.io/near-api-js/functions/_near_js_utils.format.parseNearAmount.html)

### YoctoNEAR => NEAR {#yoctonear--near}

```js
// converts yoctoNEAR (10^-24) amount into NEAR

const { utils } = nearAPI;
const amountInNEAR = utils.format.formatNearAmount("1000000000000000000000000");
```

[<span className="typedoc-icon typedoc-icon-function"></span> Function `formatNearAmount`](https://near.github.io/near-api-js/functions/_near_js_utils.format.formatNearAmount.html)
