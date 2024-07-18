// type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never

type Integer<T extends number> = `${T}` extends `${string}.${string}`
  ? never
  : number extends T
  ? never
  : T
