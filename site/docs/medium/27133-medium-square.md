# 27133 - Square

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/27133-medium-square/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/27133-medium-square/test-cases.ts)

给定一个数字，返回它的平方

## Solution

```ts
type NumberToTuple<N extends number, C extends 0[] = []> = C['length'] extends N
  ? C
  : NumberToTuple<N, [...C, 0]>

type MultiplyBy<
  A extends number,
  B extends number,
  M extends 0[] = [],
  R extends 0[] = []
> = M['length'] extends B
  ? R['length']
  : // @ts-ignore
    MultiplyBy<A, B, [...M, 0], [...R, ...NumberToTuple<B>]>

type Square<N extends number> = N extends 100
  ? 10000
  : `${N}` extends `-${infer R extends number}`
  ? MultiplyBy<R, R>
  : MultiplyBy<N, N>
```

乘法的本质是加法。定义类型 `MultiplyBy` 计算 `A` 和 `B` 相乘的结果，实际上是在计算 `B` 个 `A` 相加。

`MultiplyBy` 添加了泛型 `M` 表示相加的次数, 次数达到 `B` 即可返回结果, 泛型 `R` 表示最终的结果。辅助类型 `NumberToTuple` 用于将一个数字转成相同个数的 0 组成的元组。
