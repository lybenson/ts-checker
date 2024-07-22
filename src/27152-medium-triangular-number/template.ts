type Triangular<
  N extends number,
  C extends 0[] = [],
  R extends 0[] = []
> = C['length'] extends N
  ? R['length']
  : Triangular<N, [...C, 0], [...R, ...C, 0]>
