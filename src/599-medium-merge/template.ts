type Merge<
  F extends Record<string, unknown>,
  S extends Record<string, unknown>
> = {
  [K in keyof (F & S)]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never
}
