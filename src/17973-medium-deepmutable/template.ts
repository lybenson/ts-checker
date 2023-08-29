type DeepMutable<T extends object> = T extends (...args: unknown[]) => unknown
  ? T
  : {
      -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P]
    }
