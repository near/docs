<MainAs>

```ts
import { storage, logging } from "near-sdk-as";

// Public method - Returns the counter value
export function get_num(): i8 {
  return storage.getPrimitive<i8>("counter", 0);
}

// Public method - Increment the counter
export function increment(): void {
  safeguard_overflow()
  const new_value = get_num() + 1;
  storage.set<i8>("counter", new_value);
  logging.log("Increased number to " +  new_value.toString());
}

// Private method - Safeguard against overflow
function safeguard_overflow(): void{
  const value = get_num()
  assert(value < 127, "Counter is at maximum")
}
```

</MainAs>