// type Combs<T extends string[] = ModifierKeys> = T extends [
//   infer F extends string,
//   ...infer R extends string[]
// ]
//   ? `${F} ${R[number]}` | Combs<R>
//   : never

type Combs<T extends any[]> = T extends [
  infer F extends string,
  ...infer R extends string[]
]
  ? `${F} ${R[number]}` | Combs<R>
  : never

type C<T extends any[]> = T extends [
  infer F extends string,
  ...infer R extends string[]
]
  ? `${F} ${R[number]}`
  : 1

type D = C<['cmd', 'ctrl', 'opt', 'fn']>
