# 30958 - Pascal's triangle

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/30958-medium-pascals-triangle/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/30958-medium-pascals-triangle/test-cases.ts)

给定一个数 `N`，构造一个有 `N` 行的帕斯卡三角形。

## Solution

```ts
type Add<A extends number, B extends number> = [
  ...NumberToTuple<A>,
  ...NumberToTuple<B>
]['length']

type AccSum<T extends number[]> = T extends [
  infer A extends number,
  infer B extends number,
  ...infer R extends number[]
]
  ? [Add<A, B>, ...AccSum<[B, ...R]>]
  : []

type PascalNext<Prev extends number[]> = [1, ...AccSum<[...Prev, 0]>]

type Pascal<
  N extends number,
  C extends 0[] = [],
  P extends number[] = [],
  R extends number[][] = [P]
> = C['length'] extends N
  ? R
  : C['length'] extends 0
  ? Pascal<N, [0], [1]>
  : Pascal<N, [...C, 0], PascalNext<P>, [...R, PascalNext<P>]>
```
