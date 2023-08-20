type StringToUnion<T extends string> = T extends `${infer Letter}${infer Rest}`
  ? Letter | StringToUnion<Rest>
  : never
