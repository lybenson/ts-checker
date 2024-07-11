# Trunc

实现 `Math.trunc` 的类型版本，该函数接受字符串或数字类型，并通过移除任意小数部分返回整数部分。

例如：

```ts
type A = Trunc<12.34> // 12
```

## Solution

```ts
type Trunc<T extends string | number> = `${T}` extends `${infer L}.${infer _}`
  ? L extends '' | '-'
    ? `${L}0`
    : L
  : `${T}`
```

通过 `infer` 将字符串分为左右两部分

如果左边部分是空字符或者是 `'-'` 则返回 `${L}0`, 否则直接返回 `L`

如果不能将字符串分为左右两部分, 说明字符串没有 `.`, 即整个字符串都是整数部分，直接返回整个字符串即可。
