# Construct Tuple

构造一个给定长度的元组。

例如

```ts
type result = ConstructTuple<2> // 期望得到 [unknown, unkonwn]
```

## Solution

```ts
type ConstructTuple<
  L extends number,
  U extends unknown[] = []
> = U['length'] extends L ? U : ConstructTuple<L, [...U, unknown]>
```

在每次递归中，数组类型 `U` 都会增加一个元素 `unknown`, 直到 `U` 的长度达到 `L`
