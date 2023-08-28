# 2070 - Drop Char

[Source](https://github.com/lybenson/ts-checker/blob/master/src/2070-medium-drop-char/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/2070-medium-drop-char/test-cases.ts)

从字符串中剔除指定字符。

例如：

```ts
type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
```

## Solution

```ts
type DropChar<S, C extends string> = S extends `${infer L}${C}${infer R}`
  ? DropChar<`${L}${R}`, C>
  : S
```
