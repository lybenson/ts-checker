# 17 - 柯里化 1

[Source](https://github.com/lybenson/ts-checker/blob/master/src/17-hard-currying-1/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/17-hard-currying-1/test-cases.ts))

> 在此挑战中建议使用TypeScript 4.0

[柯里化](https://en.wikipedia.org/wiki/Currying) 是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术。

例如：

```ts
const add = (a: number, b: number) => a + b
const three = add(1, 2)

const curriedAdd = Currying(add)
const five = curriedAdd(2)(3)
```

传递给 `Currying` 的函数可能有多个参数，您需要正确输入它的类型。

在此挑战中，柯里化后的函数每次仅接受一个参数。接受完所有参数后，它应返回其结果。

## Solution

```ts
declare function Currying<F>(fn: F): Curried<F>

type Curried<F> = F extends (...args: infer A) => infer R
  ? A extends [infer First, ...infer Other]
    ? (
        arg: First
      ) => Other['length'] extends 0 ? R : Curried<(...args: Other) => R>
    : () => R
  : never
```
