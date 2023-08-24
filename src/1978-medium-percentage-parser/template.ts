type CheckPrefix<T> = T extends '+' | '-' ? T : never

type CheckSuffix<T> = T extends `${infer P}%` ? [P, '%'] : [T, '']

type PercentageParser<A extends string> = A extends `${CheckPrefix<
  infer L
>}${infer R}`
  ? [L, ...CheckSuffix<R>]
  : ['', ...CheckSuffix<A>]
