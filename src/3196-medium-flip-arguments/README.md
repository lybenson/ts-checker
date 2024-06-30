# Reverse

实现 `loadash` 中 `_.flip` 类型版本

类型 `FlipArguments<T>` 需要函数类型 `T`，并返回一个新的函数类型，该函数类型具有与 `T` 相同的返回类型，但参数顺序相反。

例如：

```ts
type Flipped = FlipArguments<
  (arg0: string, arg1: number, arg2: boolean) => void
>
// (arg0: boolean, arg1: number, arg2: string) => void
```

## Solution

```ts
type FlipArguments<T extends Function> = T extends (...args: infer P) => infer R
  ? (...args: Reverse<P>) => R
  : never
```

利用 `infer` 提取出函数类型 `T` 的参数类型 `P` 和返回值类型 `R`

并参数数组类型 `P` 利用 3192 题进行翻转
