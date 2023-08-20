type StringToArray<S extends string> = S extends `${infer First}${infer Rest}`
  ? [First, ...StringToArray<Rest>]
  : []

type LengthOfString<S extends string> = StringToArray<S>['length']
