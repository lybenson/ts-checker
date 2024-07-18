# 9989 - Count Element Number To Object

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/9989-medium-count-element-number-to-bject/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/9989-medium-count-element-number-to-bject/test-cases.ts)

通过实现一个 `CountElementNumberToObject`方法，统计数组中相同元素的个数
例如：

```ts
type Simple1 = CountElementNumberToObject<[]> // return {}
type Simple2 = CountElementNumberToObject<[1, 2, 3, 4, 5]>
// return {
//   1: 1,
//   2: 1,
//   3: 1,
//   4: 1,
//   5: 1
// }

type Simple3 = CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>
// return {
//   1: 2,
//   2: 2,
//   3: 2,
//   4: 1,
//   5: 1
// }
```

## Solution

```ts
type Count<T extends any[], I, C extends 0[] = []> = T extends [
  infer F,
  ...infer R
]
  ? F extends I
    ? Count<R, I, [...C, 0]>
    : Count<R, I, C>
  : C['length']

type CountElementNumberToObject<
  T extends any[],
  M extends any[] = Flatten<T>,
  N extends any[] = Unique<M>
> = {
  [P in N[number]]: Count<M, P>
}
```

`CountElementNumberToObject` 额外接收两个泛型

- `M` 利用[459](https://ts.syen.me/medium/medium-flatten), 接收 `T` 扁平化后的结果
- `N` 利用[5460](https://ts.syen.me/medium/medium-unique), 接收 `M` 去重后的结果

将 `T` 扁平化是因为其可能接收多层嵌套的数组。扁平化后可以方便进行递归计算。而将 `M` 去重的目的是为了避免重复计算。

辅助类型 `Count` 用来统计 `T` 中出现了多少次 `I`， 由于 `ts` 类型定义无法进行数学运算, 那么存储一个元素的出现次数只能用数组长度，这正是在 `Count`中定义泛型 `C` 的目的。

知道了 `Count` 类型的作用后，如果不将 `M` 去重, 意味着对于每一个相同元素都要调用一次 `Count`, 很显然，这是不必要的。
