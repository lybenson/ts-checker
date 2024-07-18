type DeepMutable<T extends object> = T extends (...args: any[]) => any
  ? T
  : {
      -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P]
    }
