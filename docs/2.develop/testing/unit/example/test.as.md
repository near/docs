<TestAs>

```ts
import { get_num, increment } from '../main';
import { context, storage } from 'near-sdk-as';

describe("Counter ", () => {
  it("should increment by one", () => {
    increment();
    expect(get_num()).toBe(1, "Error on increment()");
  });

  it("get_num is the same as reading from storage", () => {
    const storage_value: u8 = storage.getPrimitive<i8>("counter", 0)
    expect(storage_value).toBe(get_num(), "Error in get_num()");
  });

  it("should panic on overflow", () => {
    storage.set<i8>("counter", 127)
    expect(() => {increment()}).toThrow("Overflow did not panic");
  });
});

```

</TestAs>