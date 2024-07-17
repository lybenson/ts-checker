type FirstUniqueCharIndex<
  T extends string,
  C extends string[] = []
> = T extends `${infer F}${infer R}`
  ? F extends C[number]
    ? FirstUniqueCharIndex<R, [...C, F]>
    : R extends `${string}${F}${string}`
    ? FirstUniqueCharIndex<R, [...C, F]>
    : C['length']
  : -1
