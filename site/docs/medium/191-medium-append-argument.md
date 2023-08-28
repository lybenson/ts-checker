# 191 - 追加参数

[Source](https://github.com/lybenson/ts-checker/blob/master/src/191-medium-append-argument/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/191-medium-append-argument/test-cases.ts))

实现一个泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

```typescript
type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean>
// 期望是 (a: number, b: string, x: boolean) => number
```

## Solution

```ts
type AppendArgument<Fn extends (...args: any[]) => any, A> = Fn extends (
  ...args: infer Args
) => infer R
  ? (...args: [...Args, A]) => R
  : never
```

为避免传入的泛型不是函数类型, 对泛型 `Fn` 添加了类型约束 `Fn extends (...args: any[]) => any`

之后通过 `infer` 关键字获取到

- 函数类型的参数类型 `Args`, 其是一个数组类型, 数组中的每一项对应函数各个参数类型

- 返回值类型 `R`

```ts
Fn extends (...args: infer Args) => infer R
```

现在已知参数类型 `Args` , 返回值类型 `R`, 要添加的参数类型 `A`, 要返回满足条件的函数类型使用下面语句即可

```javascript
(...args: [...Args, A]) => R
```
