type PublicType<T extends object> = {
  [K in keyof T as K extends `_${string}` ? never : K]: T[K]
}
