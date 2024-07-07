type GreaterThan<
  T extends number,
  U extends number,
  C extends 0[] = []
> = C['length'] extends T
  ? false
  : C['length'] extends U
  ? true
  : GreaterThan<T, U, [...C, 0]>
