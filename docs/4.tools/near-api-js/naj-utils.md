---
id: utils
title: Utils
sidebar_label: Utils
---

### NEAR => yoctoNEAR {#near--yoctonear}

```js
// converts NEAR amount into yoctoNEAR (10^-24)

const { utils } = nearAPI;
const amountInYocto = utils.format.parseNearAmount("1");
```

[<span class="typedoc-icon typedoc-icon-function"></span> Function `parseNearAmount`](https://near.github.io/near-api-js/modules/utils_format.html#parsenearamount)

### YoctoNEAR => NEAR {#yoctonear--near}

```js
// converts yoctoNEAR (10^-24) amount into NEAR

const { utils } = nearAPI;
const amountInNEAR = utils.format.formatNearAmount("1000000000000000000000000");
```

[<span class="typedoc-icon typedoc-icon-function"></span> Function `formatNearAmount`](https://near.github.io/near-api-js/modules/utils_format.html#formatnearamount)

