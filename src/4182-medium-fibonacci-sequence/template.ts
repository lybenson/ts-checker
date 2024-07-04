type Fibonacci<
  T extends number,
  Index extends number[] = [1],
  Result extends number[] = [1],
  Next extends number[] = [1]
> = Index['length'] extends T
  ? Result['length']
  : Fibonacci<T, [...Index, 1], Next, [...Next, ...Result]>
