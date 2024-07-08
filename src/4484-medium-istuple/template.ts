type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
  ? number extends T['length']
    ? false
    : true
  : false
