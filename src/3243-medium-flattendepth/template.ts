type FlattenDepth<
  T extends Array<any>,
  D extends number = 1,
  U extends Array<any> = []
> = T extends [infer F, ...infer R]
  ? F extends Array<any>
    ? U['length'] extends D
      ? [F, ...FlattenDepth<R, D, U>]
      : [...FlattenDepth<F, D, [0, ...U]>, ...FlattenDepth<R, D, U>]
    : [F, ...FlattenDepth<R, D, U>]
  : T
