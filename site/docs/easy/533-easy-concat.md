# 533 - Concat

[Source](https://github.com/lybenson/ts-checker/blob/master/src/533-easy-concat/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/533-easy-concat/test-cases.ts))

在类型系统里实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

例如：

```ts
type Result = Concat<[1], [2]> // expected to be [1, 2]
```

## Solution

```ts
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [
  ...T,
  ...U
]
```
