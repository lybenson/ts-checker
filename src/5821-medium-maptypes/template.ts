type MapTypes<T, R extends { mapFrom: any; mapTo: any }> = {
  [P in keyof T]: T[P] extends R['mapFrom']
    ? R extends { mapFrom: T[P] }
      ? R['mapTo']
      : never
    : T[P]
}
