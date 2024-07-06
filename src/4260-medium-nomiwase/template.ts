// StringToUnion from 531

type AllCombinations<S extends string, U extends string = StringToUnion<S>> = [
  U
] extends [never]
  ? ''
  : '' | { [K in U]: `${K}${AllCombinations<never, Exclude<U, K>>}` }[U]

type C = `A${'' | 'B'}`
