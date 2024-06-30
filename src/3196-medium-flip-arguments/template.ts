type FlipArguments<T extends Function> = T extends (...args: infer P) => infer R
  ? (...args: Reverse<P>) => R
  : never
