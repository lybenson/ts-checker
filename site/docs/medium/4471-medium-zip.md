# 4471 - Zip

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/4471-medium-zip/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/4471-medium-zip/test-cases.ts)

实现一个类型 `Zip<T, U>`，T 和 U 必须是元组。
例如:

```ts
Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
Zip<[1, 2, 3], ['1', '2']> // expected to be [[1, '1'], [2, '2']]
```

## Solution

```ts
type Zip<
  T extends any[],
  U extends any[],
  C extends 0[] = []
> = C['length'] extends T['length'] | U['length']
  ? []
  : [[T[C['length']], U[C['length']]], ...Zip<T, U, [...C, 0]>]
```

本题目和 4425 题有些相似。

在 `Zip` 类型定义中, 泛型 `C` 的长度表示当前递归次数, 如果次数达到了 `T` 或 `U` 的长度表示递归结束。

否则, 构造数组子元素。
