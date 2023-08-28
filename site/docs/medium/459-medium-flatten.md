# 459 - Flatten

[Source](https://github.com/lybenson/ts-checker/blob/master/src/459-medium-flatten/template.ts)

在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。

例如:

```ts
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```

## Solution

```ts
type Flatten<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : []
```

`infer First` 获取类型数组第一个元素，紧接着判断其是否是数组 `First extends unknown[]`

- 是, 则分别继续递归 `First` 和 剩余的数组元素 `Rest`, 需要注意的是 `Flatten<First>` 前需要加拓展运算符, `Flatten` 返回的是一个数组, 加拓展运算符用以展开数组元素
- 不是, 则说明 `First` 已是最中的元素, 只需要剩余的数组元素 `Rest` 即可

假设 `T = [1, [2]]`

**第一层:**

经过 `T extends [infer First, ...infer Rest]`, 运算后得到 `First=1`, `Rest=[[2]]`

接着判断 `First` 是否是数组, 不是则返回 `[1, ...Flatten<[[2]]>]`

**第二层:**

递归运算 `Flatten<[[2]]>` 时 `T=[[2]]`, 经过 `T extends [infer First, ...infer Rest]`, 运算后得到 `First=[2]`, `Rest=[]`

判断 `First` 是否是数组, 是数组，返回 `[...Flatten<[2]>, ...Flatten<[]>]`

**第三层:**

递归运算 `Flatten<[2]>` 时 `T=[2]`, 经过 `T extends [infer First, ...infer Rest]`, 运算后得到 `First=2`, `Rest=[]`

判断 `First` 是否是数组, 不是返回 `[2, ...Flatten<[]>]`

因为`Flatten<[]>` 返回 `[]`, 所以：

- 第三层计算出 `Flatten<[2]> = [2, ...Flatten<[]>] = [2]`

- 第二层计算出 `Flatten<[[2]]> = [...Flatten<[2]>, ...Flatten<[]>] = [...[2]] = [2]`

- 第一层计算出 `Flatten<[1, [2]]> = [1, ...Flatten<[[2]]>] = [1, ...[2]] = [1, 2]`
