# Without

实现一个像 `Lodash.without` 函数一样的泛型 `Without<T, U>`，它接收数组类型的 `T` 和数字或数组类型的 `U` 为参数，会返回一个去除 `U` 中元素的数组 `T`。

例如：

```ts
type Res = Without<[1, 2], 1> // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]> // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]> // expected to be []
```

## Solution

```ts
type Without<T extends unknown[], U extends unknown[] | number> = T extends [
  infer F,
  ...infer R
]
  ? F extends Exclude<T[number], U extends unknown[] ? U[number] : U>
    ? [F, ...Without<R, U>]
    : Without<R, U>
  : T
```

通过将 `T extends [infer F, ...infer R]` 将泛型 `T` 分为两部分

- 首元素类型 `F`
- 剩余元素构成的数组类型 `R`

`T[number]` 返回数组 `T` 中元素构成的联合类型，并且会去重，如数组`[1, 1, 2, 4, 8]`, `T[number] = 1 | 2 | 4 | 8`

`Exclude<T[number], U extends unknown[] ? U[number] : U>` : 排除 `T[number]` 中包含的 `U[number]`, 是最终结果去重后的

如果 `F` 属于排除后的结果，则说明 `F` 是包含在最终结果中，之后继续遍历 `R` 即可.
