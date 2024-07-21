# Permutations of Tuple

给定一个通用的元组类型 `T extends unknown[]`, 编写一个类型，将 `T` 的所有排列组合作为联合类型生成。

## Solution

```ts
type PermutationsOfTuple<T extends unknown[]> = T extends [
  infer F,
  ...infer R,
  infer L
]
  ?
      | [F, ...PermutationsOfTuple<R>, L]
      | [F, L, ...PermutationsOfTuple<R>]
      | [L, ...PermutationsOfTuple<R>, F]
      | [L, F, ...PermutationsOfTuple<R>]
      | [...PermutationsOfTuple<R>, F, L]
      | [...PermutationsOfTuple<R>, L, F]
  : T
```

在之前的排列组合的题目中

- [296]()
- [4260]()
- [8787]()

都是通过将原始类型 `T` 直接或间接转换为联合类型, 再通过 `Exclude` 排除某个元素来实现结果。

但在该题中, 是无法将 `T` 转换成联合类型的。这是因为输入数组中存在一些特殊类型。例如:

`[any, unknown, never]` 转换成联合类型

```ts
type C = any | unknwon | never
```

`C` 的最终类型是 `any`。

再比如 `[1, number]` 转换成联合类型

```ts
type C = 1 | number
```

`C` 的最终类型是 `number`

所以将 `T` 转成联合类型无法实现排列组合。

因此尝试将数组 `T` 分为三部分:

- 首元素 `F`
- 中间元素数组 `R`
- 最后元素 `L`

这三个元素的排列组合结果有6种, 因此只需要写出6种组合就能实现排列组合的目的。
