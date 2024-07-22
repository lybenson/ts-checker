# CartesianProduct

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

`extends` 左侧是联合类型时, 会对联合类型的各个元素分别应用条件类型
