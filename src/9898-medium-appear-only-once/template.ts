type FindEles<T extends any[], C extends any[] = []> = T extends [
  infer F,
  ...infer R
]
  ? F extends C[number]
    ? FindEles<R, [...C, F]>
    : F extends R[number]
    ? FindEles<R, [...C, F]>
    : [F, ...FindEles<R, [...C, F]>]
  : []
