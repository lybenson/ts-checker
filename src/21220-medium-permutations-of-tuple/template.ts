type PermutationsOfTuple<T extends unknown[]> = T extends [
  infer F,
  ...infer R,
  infer L
]
  ?
      | [F, ...PermutationsOfTuple<R>, L]
      | [F, L, ...PermutationsOfTuple<R>]
      | [L, ...PermutationsOfTuple<R>, F]
      | [L, F, ...PermutationsOfTuple<R>]
      | [...PermutationsOfTuple<R>, F, L]
      | [...PermutationsOfTuple<R>, L, F]
  : T
