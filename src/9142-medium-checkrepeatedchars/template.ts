type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer E}`
  ? E extends `${string}${F}${string}`
    ? true
    : CheckRepeatedChars<E>
  : false
