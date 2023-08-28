# 16 - 排除最后一项

[Source](https://github.com/lybenson/ts-checker/blob/master/src/16-medium-pop/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/16-medium-pop/test-cases.ts))

> 在此挑战中建议使用TypeScript 4.0

实现一个泛型`Pop<T>`，它接受一个数组`T`，并返回一个由数组`T`的前 N-1 项（N 为数组`T`的长度）以相同的顺序组成的数组。

例如

```ts
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]
```

**额外**：同样，您也可以实现`Shift`，`Push`和`Unshift`吗？

## Solution

```ts
type Pop<T extends any[]> = T extends [...infer R, infer _] ? R : []
```

既然要排除数组中最后一个类型, 只需要将最后一个类型跟前面的类型分开即可，即通过 `[...infer R, infer _]` 将数组分为左右两部分
