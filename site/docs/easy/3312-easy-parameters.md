# 3312 - Parameters

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/3312-easy-parameters/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/3312-easy-parameters/test-cases.ts)

实现内置的 `Parameters<T>` 类型。获取函数参数的类型数组

例如：

```ts
const foo = (arg1: string, arg2: number): void => {}

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
```

## Solution

```ts
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never
```

通过 `infer` 关键字提取出函数参数类型 `P`，由于 `P` 已经是数组了，直接返回即可
