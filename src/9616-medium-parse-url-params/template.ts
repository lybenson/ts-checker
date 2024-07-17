type ParseUrlParams<T> = T extends `${string}:${infer Rest}`
  ? Rest extends `${infer Left}/${infer Right}`
    ? Left | ParseUrlParams<Right>
    : Rest
  : never
