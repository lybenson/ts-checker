# CheckRepeatedChars

判断一个 `string` 类型中是否有相同的字符

```ts
type CheckRepeatedChars<'abc'>   // false
type CheckRepeatedChars<'aba'>   // true
```

## Solution

```ts
type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer E}`
  ? E extends `${string}${F}${string}`
    ? true
    : CheckRepeatedChars<E>
  : false
```
