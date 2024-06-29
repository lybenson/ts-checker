type TupleToNestedObject<T, U> = T extends [infer F, ...infer R]
  ? {
      [K in F & string]: TupleToNestedObject<R, U>
    }
  : U
