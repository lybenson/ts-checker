# Filter

实现类型 `Filter<T, Predicate>` 接受一个数组 `T`，原始类型或联合原始类型 `Predicate`，并返回一个包含 `Predicate` 元素的数组。

## Solution

```ts
type Filter<T extends any[], P> = T extends [infer F, ...infer R]
  ? F extends P
    ? [F, ...Filter<R, P>]
    : Filter<R, P>
  : []
```
