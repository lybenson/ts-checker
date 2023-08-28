# 2 - 获取函数返回类型

[Source](https://github.com/lybenson/ts-checker/blob/master/src/2-medium-return-type/template.ts)

不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 泛型。

```ts
const fn = (v: boolean) => {
  if (v) return 1
  else return 2
}

type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"
```

## Solution

我们需要定义类型 `MyReturnType` 用于获取函数的返回值类型

```ts
type MyReturnType<T extends Function> = T extends (...args: any) => infer R
  ? R
  : never
```

`MyReturnType` 接收一个泛型 `T`, 该泛型 `T` 需继承自 `Function` 类型。

在 **条件类型** `T extends (...args: any) => infer R ? R : never` 中，如果泛型 `T` 是一个函数则返回类型 `R`, 否则返回 `never`

由于传入的泛型 `T` 是一个函数类型，并不能获取这个函数的返回值类型，因此可以用 关键字 `infer` 来提取，`infer R` 相当于定义了类型变量 `R`, 其值是函数的返回值类型

下面的示例用于获取 `User` 全部属性中的类型

```ts
type User = {
  name: string
  age: number
}

type GetUserPropsType<T> = T extends { name: infer X; age: infer Y }
  ? [X, Y]
  : never

type userPropsType = GetUserPropsType<User> // [string, number]
```
