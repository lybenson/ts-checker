type Subsequence<T extends any[]> = T extends [infer F, ...infer R]
  ? [F] | Subsequence<R> | [F, ...Subsequence<R>]
  : []
