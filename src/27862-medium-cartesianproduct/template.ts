type CartesianProduct<T, U> = T extends T
  ? U extends U
    ? [T, U]
    : never
  : never
