# Fill

实现 `Fill` 函数的类型版本, `fill` 函数用于将数组的元素替换为一个固定值。

`Fill<T, N, Start?, End?>` 接收 4 个参数:

- `T` 和 `N` 是必需参数, `T` 表示要替换元素的数组, `N` 表示用什么值来替换数组元素
- `Start` 和 `End` 是可选参数, 且必须是大于或等于 0 的整数。`Start` 表示填充开始的位置, `End` 表示填充结束的位置

```ts
// 将数组[1, 2, 3] 中的元素用 0 替换
type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
```

## Solution

```ts
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Index extends 0[] = [],
  Replace extends boolean = Index['length'] extends Start ? true : false
> = Index['length'] extends End
  ? T
  : T extends [infer F, ...infer R]
  ? Replace extends true
    ? [N, ...Fill<R, N, Start, End, [0, ...Index], Replace>]
    : [F, ...Fill<R, N, Start, End, [0, ...Index]>]
  : T
```

假设将要替换的数组看成是一个变量, 而不是类型, 要实现这样的功能。那么避免不了要使用循环。但是在 `ts` 类型定义中, 我们知道无法使用循环，那么只能用递归来代替循环。

既然要递归，肯定需要一个泛型用来存储已递归的次数，或者上一次递归的结果。

在 `Fill` 类型定义中, 我们只需要存储递归次数，就能满足要求。而递归次数都需要用数组类型来存储，这是因为 `ts` 类型定义没有数学运算的能力, 因此不能在每次的递归中实现 +1 这样的操作来存储递归次数。用数组后，每次递归只需要往数组中加入一个元素，就能通过数组的长度得到递归次数。

所以在 `Fill` 类型定义中, 额外加了两个泛型

- `Index` 记录递归次数, 只有次数在 `Start` 和 `End` 范围内才需要替换
- `Replace` 是否可替换

`Fill` 开始先判断

```ts
Index['length'] extends End
```

递归次数是否达到了区间下限, 达到则直接结束，返回 `T`

否则通过 `infer` 关键字提取数组的首元素 `F` 和 剩余元素 `R`, 接着判断是否可以替换(递归次数达到了区间上限)

- 可替换：需要将数组首元素换成 `N`, 接着递归剩余元素 `R`。递归次数 +1, 同时还要将 `Replace` 传递给下一次递归。因此当前递归已经达到了可替换的区间。
- 不可替换：则将首元素原封不动的放到数组中, 并继续递归剩余元素。同时递归次数 +1。
