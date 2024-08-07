type Transpose<M extends number[][], R = M['length'] extends 0 ? [] : M[0]> = {
  [X in keyof R]: {
    [Y in keyof M]: X extends keyof M[Y] ? M[Y][X] : never
  }
}
