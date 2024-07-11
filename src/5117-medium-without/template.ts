type Without<T extends unknown[], U extends unknown[] | number> = T extends [
  infer F,
  ...infer R
]
  ? F extends Exclude<T[number], U extends unknown[] ? U[number] : U>
    ? [F, ...Without<R, U>]
    : Without<R, U>
  : T
