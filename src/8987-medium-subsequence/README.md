# Subsequence

给定一个没有重复元素的数组，返回所有可能得子序列。子序列是可以通过从数组中删除一些或不删除任何元素而得到的序列，而不改变剩余元素的顺序。

例如

```ts
type A = Subsequence<[1, 2]> // [] | [1] | [2] | [1, 2]
```

## Solution

```ts
type Subsequence<T extends any[]> = T extends [infer F, ...infer R]
  ? [F] | Subsequence<R> | [F, ...Subsequence<R>]
  : []
```
