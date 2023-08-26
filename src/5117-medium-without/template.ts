type Without<T extends unknown[], U extends unknown[] | number> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends Exclude<T[number], U extends unknown[] ? U[number] : U>
    ? [First, ...Without<Rest, U>]
    : Without<Rest, U>
  : T
