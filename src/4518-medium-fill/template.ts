type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Index extends 0[] = [],
  Replace extends boolean = Index['length'] extends Start ? true : false
> = Index['length'] extends End
  ? T
  : T extends [infer F, ...infer R]
  ? Replace extends true
    ? [N, ...Fill<R, N, Start, End, [0, ...Index], Replace>]
    : [F, ...Fill<R, N, Start, End, [0, ...Index]>]
  : T
