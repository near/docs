<MainAs>

```ts
import { storage, logging } from "near-sdk-as";

// Public - get value of counter
export function get_num(): i8 {
  return storage.getPrimitive<i8>("counter", 0);
}

// Public - increment the counter
export function increment(): void {
  safeguard_overflow()
  const new_val = storage.getPrimitive<i8>("counter", 0) + 1;
  storage.set<i8>("counter", new_val);
  logging.log(`Increased number to ${new_val}`);
}

// Internal - safeguard against underflow
function safeguard_overflow()() {
    let value = get_num()
    assert(value < 127, "Already at maximum")
}
```

</MainAs>