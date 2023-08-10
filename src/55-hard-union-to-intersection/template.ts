type UnionToIntersection<U> = (
  U extends U ? (arg: U) => unknown : never
) extends (arg: infer R) => unknown
  ? R
  : never
