# Greater Than

实现一个类型 `GreaterThan<T, U>` 判断 `T` 是否大于 `U`, 不需要考虑负数

例如:

```ts
GreaterThan<2, 1> //should be true
GreaterThan<1, 1> //should be false
GreaterThan<10, 100> //should be false
GreaterThan<111, 11> //should be true
```

## Solution

```ts
type GreaterThan<
  T extends number,
  U extends number,
  C extends 0[] = []
> = C['length'] extends T
  ? false
  : C['length'] extends U
  ? true
  : GreaterThan<T, U, [...C, 0]>
```

由于 `ts` 中无法进行数学运算, 故涉及到数学运算的内容，通常需要将数字转换成对应长度的数组, 再通过数组的 `length` 属性和 `extends` 关键字来进行运算

在 `GreaterThan` 类型定义中也遵循了这样的方式。通过接收泛型 `C` 的长度来表示当前循环的次数, 并分别与 `T` 和 `U` 比较，以此来找到 `T` 和 `U` 中较小的那个数

如果 `C['length'] extends T` 结果为 `true`, 则表示 `T` 是较小的那个数, 直接返回 `false`

如果 `C['length'] extends U` 结果为 `true`, 则表示 `U` 是较小的那个数, 直接返回 `true`

如果这轮没有找到较小的那个数, 则把 `C` 添加一个元素, 表示循环次数加1, 之后再继续递归, 直到找到较小的那个数

> 由于数组的最大长度受限, 故无法满足大数的比较
