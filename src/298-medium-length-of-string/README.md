# Length of String

计算字符串的长度，类似于 `String#length` 。

## Solution

```ts
type StringToArray<S extends string> = S extends `${infer I}${infer F}`
  ? [I, ...StringToArray<F>]
  : []

type LengthOfString<S extends string, L = 0> = StringToArray<S>['length']
```

由于类型定义中不支持逻辑运算，因此无法记录递归次数。也就无法获取字符串长度

但如果能将字符串转为由字符串的字符构成的数组，再通过数组的 `length` 属性即可获取字符串长度
