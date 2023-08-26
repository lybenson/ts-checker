type Mutable<T extends Record<string, any>> = {
  -readonly [K in keyof T]: T[K]
}
