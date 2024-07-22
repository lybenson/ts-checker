# Permutation

实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。

```typescript
type perm = Permutation<'A' | 'B' | 'C'> // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

## Solution

```ts
type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation<Exclude<T, K>>]
  : never
```

在 `Permutation` 类型定义中，新添加了一个泛型 `K` 等于 `T`, 用于保留 `T` 的副本，达到排除联合类型中的某个元素的目的。

假设不添加 `K`, 要遍历联合类型。通常要用 `T extends T`。

`T` 是联合类型时, 假设 `T = 'A' | 'B'`

`T extends T` 会被拆分成

```ts
'A' extends 'A' | 'B' ? Condition : never
'B' extends 'A' | 'B' ? Condition : never
```

则 `Condition` 内部的 `T` 就变成了 `'A'` 或 `'B'`, 导致无法拿到初始传入的 `T`

存储泛型 `K`, 则意味着保留了一份 `T` 的复制。用 `K` 做 `extends` 判断, 此时在 `Condition` 内部的 `T` 仍是初始传入的 `T`

用 `Exclude` 即可排除联合类型中的某个元素
