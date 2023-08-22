type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false

type Includes<T extends readonly any[], U> = true extends {
  [I in keyof T]: Equal<T[I], U>
}[number]
  ? true
  : false
