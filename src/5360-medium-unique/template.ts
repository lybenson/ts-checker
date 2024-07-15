type Unique<T extends any[], C extends any[] = []> = T extends [
  infer F,
  ...infer R
]
  ? IndexOf<C, F> extends -1
    ? Unique<R, [...C, F]>
    : Unique<R, C>
  : C
