type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}`
  ? R
  : `${T}`
