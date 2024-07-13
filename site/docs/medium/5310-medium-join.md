# 5310 - Join

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/5310-medium-join/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/5310-medium-join/test-cases.ts)

实现 `Array.join` 类型版本，`Join<T, U>` 接受数组 `T` 和字符串或数字 `U`，并返回用 `U` 拼接起来的数组 `T`。

例如：

```ts
type Res = Join<['a', 'p', 'p', 'l', 'e'], '-'> // expected to be 'a-p-p-l-e'
type Res1 = Join<['Hello', 'World'], ' '> // expected to be 'Hello World'
type Res2 = Join<['2', '2', '2'], 1> // expected to be '21212'
type Res3 = Join<['o'], 'u'> // expected to be 'o'
```

## Solution

```ts
type Join<T extends unknown[], U extends string | number = ','> = T extends [
  infer F,
  ...infer R
]
  ? R['length'] extends 0
    ? `${F & string}`
    : `${F & string}${U}${Join<R, U>}`
  : ''
```

在通过 `infer` 提取数组元素的时候,

- `R` 默认会推断为 `unknown[]`, 所以将 `T` 约束为了 `unknown[]`
- 或者也可以通过 `...infer R extends string[]` 指定 `R` 是 `string[]`, 这样 `T` 就可以约束为 `string[]`

由于递归到最后一个元素时, 不需要添加分隔符 `U`, 故通过 `R['length'] extends 0` 判断是否到最后一个元素了

由于用到模版字符串的缘故, `F & string` 可以强制将结果作为字符串类型

```ts
type F = string | number | bigint | boolean | null | undefined

type S = F & string // S = string
```
