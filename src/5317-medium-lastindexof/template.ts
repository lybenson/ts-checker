// type LastIndexOf<
//   T extends any[],
//   U,
//   C extends 0[] = [],
//   I extends number = -1
// > = T extends [infer F, ...infer R]
//   ? Equal<F, U> extends true
//     ? LastIndexOf<R, U, [0, ...C], C['length']>
//     : LastIndexOf<R, U, [0, ...C], I>
//   : I

type LastIndexOf<T extends any[], U, Count extends any[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? LastIndexOf<Rest, U, [...Count, 1]> extends -1
    ? (<G>() => G extends First ? 1 : 2) extends <G>() => G extends U ? 1 : 2
      ? Count['length']
      : -1
    : LastIndexOf<Rest, U, [...Count, 1]>
  : never
