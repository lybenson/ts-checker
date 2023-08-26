type Trim<S extends string> = S extends
  | `${' ' | '\t' | '\n'}${infer T}`
  | `${infer T}${' ' | '\t' | '\n'}`
  ? Trim<T>
  : S
