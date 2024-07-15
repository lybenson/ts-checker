type NumberRange<
  L,
  H,
  C extends number[] = [],
  I extends 0[] = [],
  S extends boolean = I['length'] extends L ? true : false
> = I['length'] extends H
  ? C[number] | H
  : S extends true
  ? NumberRange<L, H, [...C, I['length']], [0, ...I], S>
  : NumberRange<L, H, C, [0, ...I]>
