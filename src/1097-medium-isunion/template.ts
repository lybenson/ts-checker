// your answers
type IsUnion<T, B = T> = [T] extends [never]
  ? false
  : T extends B
  ? [B] extends [T]
    ? false
    : true
  : never
