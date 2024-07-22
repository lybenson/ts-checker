# Triangular number

给定一个数字N，找到第 N 个三角数，即1 + 2 + 3 + ... + N。

## Solution

```ts
type Triangular<
  N extends number,
  C extends 0[] = [],
  R extends 0[] = []
> = C['length'] extends N
  ? R['length']
  : Triangular<N, [...C, 0], [...R, ...C, 0]>
```
