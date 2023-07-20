# 获取函数返回类型

不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 泛型。

```ts
const fn = (v: boolean) => {
  if (v) return 1
  else return 2
}

type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"
```

我们需要定义类型 `MyReturnType` 用于获取函数的返回值类型

```ts
type MyReturnType<T extends Function> = T extends (...args: any) => infer R
  ? R
  : never
```

`MyReturnType` 接收一个泛型 `T`, 该泛型 `T` 需继承自 `Function` 类型。

在 **条件类型** &nbsp; `T extends (...args: any) => infer R ? R : never` 中, 如果 T

关键字 `infer`
