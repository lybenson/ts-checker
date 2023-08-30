type CheckRepeatedTuple<T extends unknown[]> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends Rest[number]
    ? true
    : CheckRepeatedTuple<Rest>
  : false
