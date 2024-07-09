type Chunk<
  T extends any[],
  N extends number = 1,
  C extends any[] = []
> = T extends [infer F, ...infer R]
  ? C['length'] extends N
    ? [C, ...Chunk<T, N>]
    : Chunk<R, N, [...C, F]>
  : C extends []
  ? C
  : [C]
