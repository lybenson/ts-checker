type IndexOf<
  T extends unknown[],
  U,
  Index extends 0[] = []
> = Index['length'] extends T['length']
  ? -1
  : Equal<T[Index['length']], U> extends true
  ? Index['length']
  : IndexOf<T, U, [...Index, 0]>
