# 25170 - Replace First

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/25170-medium-replace-first/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/25170-medium-replace-first/test-cases.ts)

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
