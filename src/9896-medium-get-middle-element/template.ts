type GetMiddleElement<T extends any[]> = T['length'] extends 0 | 1 | 2
  ? T
  : T extends [any, ...infer M, any]
  ? GetMiddleElement<M>
  : never
