type Reverse<T extends unknown[]> = T extends [...infer Rest, infer Last]
  ? [Last, ...Reverse<Rest>]
  : T
