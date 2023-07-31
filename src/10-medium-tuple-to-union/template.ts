type TupleToUnion<T> = T extends Array<infer R> ? R : never
