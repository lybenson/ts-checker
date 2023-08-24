# Percentage Parser

实现类型 PercentageParser<T extends string>。根据规则 `/^(\+|\-)?(\d*)?(\%)?$/` 匹配类型 T。

匹配的结果由三部分组成，分别是：[`正负号`, `数字`, `单位`]，如果没有匹配，则默认是空字符串。

例如：

```ts
type PString1 = ''
type PString2 = '+85%'
type PString3 = '-85%'
type PString4 = '85%'
type PString5 = '85'

type R1 = PercentageParser<PString1> // expected ['', '', '']
type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
type R5 = PercentageParser<PString5> // expected ["", "85", ""]
```

## Solution

```ts
type CheckPrefix<T> = T extends '+' | '-' ? T : never

type CheckSuffix<T> = T extends `${infer P}%` ? [P, '%'] : [T, '']

type PercentageParser<A extends string> = A extends `${CheckPrefix<
  infer L
>}${infer R}`
  ? [L, ...CheckSuffix<R>]
  : ['', ...CheckSuffix<A>]
```

将传入的泛型 `A` 与模板字符串 `${CheckPrefix<infer L>}${infer R}` 进行匹配

如果字符串的前缀可以被 `CheckPrefix` “捕获”（也就是 '+' 或 '-'），那么就“保存”那个前缀到 L 中。但如果不能，L 就不会被赋值，匹配尝试就会失败。

- 匹配成功, 返回 `[L, ...CheckSuffix<R>]`
- 匹配失败, 返回 `['', ...CheckSuffix<A>]`
