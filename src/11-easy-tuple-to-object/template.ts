type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P
}
