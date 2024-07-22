# 529 - Absolute

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/529-medium-absolute/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/529-medium-absolute/test-cases.ts)

实现一个接收 `string`, `number` 或 `bigInt` 类型参数的`Absolute`类型,返回一个正数字符串。

例如

```ts
type Test = -100
type Result = Absolute<Test> // expected to be "100"
```

## Solution

```ts
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}`
  ? R
  : `${T}`
```

`${T}` 将传入的泛型统一转换为了字符串类型, 之后通过

```ts
extends `-${infer R}`
```

判断存在字符串 `-`， 存在直接返回 `R`
