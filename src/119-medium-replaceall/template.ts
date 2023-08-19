type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer H}${From}${infer T}`
  ? `${H}${To}${ReplaceAll<T, From, To>}`
  : S
