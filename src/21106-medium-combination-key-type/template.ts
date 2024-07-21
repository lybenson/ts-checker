type Combs<T extends any[]> = T extends [
  infer F extends string,
  ...infer R extends string[]
]
  ? `${F} ${R[number]}` | Combs<R>
  : never
