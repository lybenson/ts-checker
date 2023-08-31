type RemoveIndexSignature<T, K = PropertyKey> = {
  [P in keyof T as K extends P ? never : P extends K ? P : never]: T[P]
}
