# 3243 - FlattenDepth

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/3243-medium-flattendepth/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/3243-medium-flattendepth/test-cases.ts)

递归地将数组元素消除指定深度, 默认是1

例如：

```ts
// 将数组元素去掉两层深度
type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]

// 将数组元素去掉1层深度
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]].
```

## Solution

```ts
type FlattenDepth<
  T extends Array<any>,
  D extends number = 1,
  U extends Array<any> = []
> = T extends [infer F, ...infer R]
  ? F extends Array<any>
    ? U['length'] extends D
      ? [F, ...FlattenDepth<R, D, U>]
      : [...FlattenDepth<F, D, [0, ...U]>, ...FlattenDepth<R, D, U>]
    : [F, ...FlattenDepth<R, D, U>]
  : T
```

`FlattenDepth` 接收三个泛型参数

- `T`：待处理的数组类型
- `D`： 需消除的深度值
- `U`： 由于类型定义中无法进行数学运算, 在每次的递归中无法知道当前已消除的层数。定义数组类型 `U`, 每次消除后的往 `U` 中添加一个元素, 根据 `U` 长度判断已消除的层数

在 `FlattenDepth` 类型定义中, 首先通过 `infer` 取出数组的首元素, 判断首元素是否是数组。

- 如果首元素是数组, 需要根据参数 `D` 和 `U` 的长度判断是否需要消除层数，`U['length'] extends D`

  - 已达到需要消除的层数, 则继续递归剩余元素
  - 未达到需要消除的层数, 则继续递归首元素和剩余元素

- 如果首元素不是数组, 则继续递归剩余元素
