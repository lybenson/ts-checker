type Combination<T extends string[], I = T[number]> = I extends string
  ? I | `${I} ${Combination<[Exclude<T[number], I>]>}`
  : never
