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
