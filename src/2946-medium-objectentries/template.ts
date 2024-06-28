type ObjectEntries<T> = {
  [P in keyof T]-?: [
    P,
    Required<T>[P] extends never ? undefined : Required<T>[P]
  ]
}[keyof T]
