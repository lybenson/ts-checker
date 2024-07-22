type SingleCheck<S> = S extends ''
  ? true
  : S extends `${infer C}${infer T}`
  ? '0' | '1' extends C
    ? false
    : SingleCheck<T>
  : false

type IsFixedStringLiteralType<S extends string, T = S> = [S] extends [never]
  ? false
  : S extends unknown
  ? [T] extends [S]
    ? SingleCheck<S>
    : false
  : false
