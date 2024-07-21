# 25270 - Transpose

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/25270-medium-transpose/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/25270-medium-transpose/test-cases.ts)

矩阵的转置是一个将矩阵沿对角线翻转的运算符；也就是说，它通过生成另一个矩阵（通常表示为 $A^T$）来交换矩阵A的行和列的索引。

例如：

```ts
type Matrix = Transpose<[[1]]> // expected to be [[1]]
type Matrix1 = Transpose<[[1, 2], [3, 4]]> // expected to be [[1, 3], [2, 4]]
type Matrix2 = Transpose<[[1, 2, 3], [4, 5, 6]]> // expected to be [[1, 4], [2, 5], [3, 6]]
```

## Solution

```ts
type ReplaceFirst<T extends readonly unknown[], S, R> = T extends [
  infer F,
  ...infer L
]
  ? F extends S
    ? [R, ...L]
    : [F, ...ReplaceFirst<L, S, R>]
  : []
```
