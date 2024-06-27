# 9142 - CheckRepeatedChars

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/9142-medium-checkrepeatedchars/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/9142-medium-checkrepeatedchars/test-cases.ts)

判断一个string类型中是否有相同的字符

```ts
type CheckRepeatedChars<'abc'>   // false
type CheckRepeatedChars<'aba'>   // true
```

## Solution

```ts
type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer E}`
  ? E extends `${string}${F}${string}`
    ? true
    : CheckRepeatedChars<E>
  : false
```
