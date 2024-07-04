# 4182 - Fibonacci Sequence

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/4182-medium-fibonacci-sequence/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/4182-medium-fibonacci-sequence/test-cases.ts)

实现一个通用的 `Fibonacci<T>`，它接收一个数字 `T` 并返回对应的斐波那契数。 序列开始为：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

例如:

```ts
type Result1 = Fibonacci<3> // 2
type Result2 = Fibonacci<8> // 21
```

## Solution

```ts
type Fibonacci<
  T extends number,
  Index extends number[] = [1],
  Result extends number[] = [1],
  Next extends number[] = [1]
> = Index['length'] extends T
  ? Result['length']
  : Fibonacci<T, [...Index, 1], Next, [...Next, ...Result]>
```

在 `ts` 类型定义中无法进行数学运算，要获得运算结果, 可以尝试用数组元素个数来替代

在 `Fibonacci` 类型定义中, 定义了4个泛型

- `T` 总共需要循环的次数
- `Index` 当前循环索引
- `Result` 当前结果, 初始化为 [1], 来自于上一次 `Next` 和 `Result` 拓展的结果
- `Next` 用于下一次递归的结果集
