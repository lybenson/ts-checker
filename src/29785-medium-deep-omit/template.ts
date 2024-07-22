type DeepOmit<T, S extends string> = S extends `${infer F}.${infer R}`
  ? {
      [P in keyof T]: P extends F ? DeepOmit<T[P], R> : T[P]
    }
  : Omit<T, S>
