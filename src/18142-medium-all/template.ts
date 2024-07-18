type All<T extends any[], U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? All<R, U>
    : false
  : true
