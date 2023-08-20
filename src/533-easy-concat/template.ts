type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [
  ...T,
  ...U
]
