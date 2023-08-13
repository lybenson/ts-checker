type TrimRight<S extends string> = S extends `${infer R}${Space}`
  ? TrimRight<R>
  : S

type Trim<S extends string> = TrimRight<TrimLeft<S>>
