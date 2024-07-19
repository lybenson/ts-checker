type FindAll<
  T extends string,
  P extends string,
  C extends 0[] = []
> = P extends ''
  ? []
  : T extends `${string}${infer R}`
  ? T extends `${P}${string}`
    ? [C['length'], ...FindAll<R, P, [...C, 0]>]
    : FindAll<R, P, [...C, 0]>
  : []
