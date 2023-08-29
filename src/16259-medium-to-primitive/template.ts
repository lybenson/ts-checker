type ToPrimitive<T> = T extends object
  ? T extends (...args: unknown[]) => unknown
    ? Function
    : {
        [Key in keyof T]: ToPrimitive<T[Key]>
      }
  : T extends { valueOf: () => infer P }
  ? P
  : T
