type GetReadonlyKeys<T> = {
  [K in keyof T]-?: (<U>() => U extends { -readonly [P in K]: T[K] }
    ? 1
    : 2) extends <U>() => U extends { [P in K]: T[K] } ? 1 : 2
    ? never
    : K
}[keyof T]
