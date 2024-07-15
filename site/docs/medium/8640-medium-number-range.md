# 8640 - Number Range

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/8640-medium-number-range/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/8640-medium-number-range/test-cases.ts)

有时候我们想要限制数字的范围...例如。

例如

```ts
type result = NumberRange<2, 9> //  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

## Solution

```ts
type NumberRange<
  L,
  H,
  C extends number[] = [],
  I extends 0[] = [],
  S extends boolean = I['length'] extends L ? true : false
> = I['length'] extends H
  ? C[number] | H
  : S extends true
  ? NumberRange<L, H, [...C, I['length']], [0, ...I], S>
  : NumberRange<L, H, C, [0, ...I]>
```
