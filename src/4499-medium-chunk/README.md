# Chunk

实现 `lodash` 中的 `Chunk` 函数，`Chunk<T, N>`接受两个必需的类型参数，`T` 必须是一个元组，`N` 必须是一个大于等于 1 的整数

`Chunk` 将 `T` 分割成子元素长度不超过 `N` 的数组

例如:

```ts
type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
```

## Solution

```ts
type Chunk<
  T extends any[],
  N extends number = 1,
  C extends any[] = []
> = T extends [infer F, ...infer R]
  ? C['length'] extends N
    ? [C, ...Chunk<T, N>]
    : Chunk<R, N, [...C, F]>
  : C extends []
  ? C
  : [C]
```

对数组类型进行分割, 通常需要进行循环。而在 `ts` 中循环只能通过递归来实现。所以需要一个额外的泛型来存储当前递归的结果。

在当前递归结果达到深度值 `N` 时, 则继续递归剩余元素

在 `Chunk` 类型定义中, 定义了三个泛型

- `T` 当前需要分割的数组
- `N` 需要分割的子元素的长度
- `C` 当前递归的结果

先执行 `T extends [infer F, ...infer R]`, 除了用来判断提取首元素外，还可以用来判断 `T` 是否是空数组。

当需要分割的数组不是空数组, 则判断当前递归结果存储的子元素是否达到了需要分割的长度。

- 如果达到了, 则把 `C` 存入结果数组中，并继续递归剩余元素 `[C, ...Chunk<T, N>]`
- 如果未达到, 则把当前数组的首元素存入当前递归结果中, 并继续递归剩余元素 `Chunk<R, N, [...C, F]>`, 直到 `C` 达到需要指定的长度
