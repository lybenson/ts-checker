# 9896 - 获取数组的中间元素

[Source](https://github.com/lybenson/ts-checker/blob/master/src/9896-medium-get-middle-element/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/9896-medium-get-middle-element/test-cases.ts)

通过实现一个 `GetMiddleElement` 方法，获取数组的中间元素，用数组表示

> 如果数组的长度为奇数，则返回中间一个元素
> 如果数组的长度为偶数，则返回中间两个元素

```ts
  type simple1 = GetMiddleElement<[1, 2, 3, 4, 5]>, // 返回 [3]
  type simple2 = GetMiddleElement<[1, 2, 3, 4, 5, 6]> // 返回 [3, 4]
```

## Solution

```ts
type GetMiddleElement<T extends any[]> = T['length'] extends 0 | 1 | 2
  ? T
  : T extends [any, ...infer M, any]
  ? GetMiddleElement<M>
  : never
```

首先判断数组长度是否是 0 或者 1 或者 2, 若是则直接返回数组

否则, 通过 `extends` 和 `infer` 组合将数组拆分成三部分， 中间部分类型命名为 `M`
