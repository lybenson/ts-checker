# 10969 - Integer

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/10969-medium-integer/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/10969-medium-integer/test-cases.ts)

实现类型 `Integer<T>`，类型 `T` 从 `number` 继承，如果 `T` 是整数则返回它，否则返回 `never`。

## Solution

```ts
type Integer<T extends number> = `${T}` extends `${string}.${string}`
  ? never
  : number extends T
  ? never
  : T
```

首先判断 `T` 是否包含小数点，是则返回 `never`, 否则判断 `T` 是否是 `number` 类型, 是则返回 `never`, 不是返回其本身。

或者也可以利用 `bigint` 的特性实现本题

```ts
type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never
```

`bigint` 是一个不包含小数的大整数类型
