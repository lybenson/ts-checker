type Zip<
  T extends any[],
  U extends any[],
  C extends 0[] = []
> = C['length'] extends T['length'] | U['length']
  ? []
  : [[T[C['length']], U[C['length']]], ...Zip<T, U, [...C, 0]>]
