```js
const accountId = context.accountId ?? props.accountId;
const keypomContract = "v2.keypom.near";

const dropSupplyForOwner = Near.view(
  keypomContract,
  "get_drop_supply_for_owner",
  { account_id: accountId }
);

const dropsForOwner = Near.view(keypomContract, "get_drops_for_owner", {
  account_id: accountId,
  from_index: (dropSupplyForOwner - 1).toString(),
});

const dropId = dropsForOwner[dropsForOwner.length - 1].drop_id;
```
