type Hanoi<
  N extends number,
  From extends string = 'A',
  To extends string = 'B',
  Intermediate extends string = 'C',
  C extends 0[] = []
> = C['length'] extends N
  ? []
  : [
      ...Hanoi<N, From, Intermediate, To, [...C, 0]>,
      [From, To],
      ...Hanoi<N, Intermediate, To, From, [...C, 0]>
    ]
