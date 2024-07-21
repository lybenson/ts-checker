# Replace First

实现类型 `ReplaceFirst<T, S, R>`，将元组 `T` 中首次出现的 `S` 替换为 `R`。

## Solution

```ts
type ReplaceFirst<T extends readonly unknown[], S, R> = T extends [
  infer F,
  ...infer L
]
  ? F extends S
    ? [R, ...L]
    : [F, ...ReplaceFirst<L, S, R>]
  : []
```
