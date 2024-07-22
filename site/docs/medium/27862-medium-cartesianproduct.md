# 27862 - CartesianProduct

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/27862-medium-cartesianproduct/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/27862-medium-cartesianproduct/test-cases.ts)

给定两个集合（并集），返回其笛卡尔积作为一个元组的集合

例如:

```ts
CartesianProduct<1 | 2, 'a' | 'b'>
// [1, 'a'] | [2, 'a'] | [1, 'b'] | [2, 'b']
```

## Solution

```ts
type CartesianProduct<T, U> = T extends T
  ? U extends U
    ? [T, U]
    : never
  : never
```

`extends` 左侧是联合类型时, 会对联合类型的各个元素分别应用条件类型。

例如 `T extends T`, 当 `T` 是 `1 | 2`, 会分别执行

```ts
1 extends 1 | 2 ? T : never
2 extends 1 | 2 ? T : never
```

条件类型内部的 `T` 将变成联合类型中的单个元素, 而不是联合类型本身
