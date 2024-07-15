// type IndexOf<
//   T extends unknown[],
//   U,
//   Index extends 0[] = []
// > = Index['length'] extends T['length']
//   ? -1
//   : Equal<T[Index['length']], U> extends true
//   ? Index['length']
//   : IndexOf<T, U, [...Index, 0]>

type IndexOf<T extends any[], U, I extends 0[] = []> = T extends [
  infer F,
  ...infer R
]
  ? Equal<F, U> extends true
    ? I['length']
    : IndexOf<R, U, [0, ...I]>
  : -1
