type ReplaceFirst<T extends readonly unknown[], S, R> = T extends [
  infer F,
  ...infer L
]
  ? F extends S
    ? [R, ...L]
    : [F, ...ReplaceFirst<L, S, R>]
  : []
