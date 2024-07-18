type Count<T extends any[], I, C extends 0[] = []> = T extends [
  infer F,
  ...infer R
]
  ? F extends I
    ? Count<R, I, [...C, 0]>
    : Count<R, I, C>
  : C['length']

type CountElementNumberToObject<
  T extends any[],
  M extends any[] = Flatten<T>,
  N extends any[] = Unique<M>
> = {
  [P in N[number]]: Count<M, P>
}
