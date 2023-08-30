# CheckRepeatedTuple

判断一个元组类型中是否有相同的成员

例如：

```ts
type CheckRepeatedTuple<[1, 2, 3]>   // false
type CheckRepeatedTuple<[1, 2, 1]>   // true
```

## Solution

```ts
type CheckRepeatedTuple<T extends unknown[]> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends Rest[number]
    ? true
    : CheckRepeatedTuple<Rest>
  : false
```

通过 `extends` 和 `infer` 组合将数组类型分离出首元素类型 `First` 和剩余元素类型 `Rest`

`Rest` 是一个数组 `Rest[number]` 返回数组元素组成的联合类型。

通过 `First extends Rest[number]` 可以确定 `First` 是否包含在剩余元素中

- 包含，则说明有重复元素，返回 `true`
- 不包含，则继续递归检查剩余元素
