type LastIndexOf<
  T extends any[],
  U,
  C extends 0[] = [],
  I extends number = -1
> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? LastIndexOf<R, U, [0, ...C], C['length']>
    : LastIndexOf<R, U, [0, ...C], I>
  : I
