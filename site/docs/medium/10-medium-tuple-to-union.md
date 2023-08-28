# 10 - 元组转合集

[Source](https://github.com/lybenson/ts-checker/blob/master/src/10-medium-tuple-to-union/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/10-medium-tuple-to-union/test-cases.ts))

实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

例如

```ts
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

## Solution

```ts
type TupleToUnion<T> = T extends Array<infer R> ? R : never
```

传入的泛型 `T` , 由于不能获取其内部的类型，因此可以用 关键字 `infer` 来提取，`infer R` 相当于定义了类型变量 `R`，并根据条件来赋值

在 `TupleToUnion` 的类型定义中 `infer R` 相当于定义了类型变量 `R`, 值为数组元素
