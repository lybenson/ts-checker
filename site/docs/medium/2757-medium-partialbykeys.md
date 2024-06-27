# 2757 - PartialByKeys

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/2757-medium-partialbykeys/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/2757-medium-partialbykeys/test-cases.ts)

实现一个通用的`PartialByKeys<T, K>`，它接收两个类型参数`T`和`K`。

`K` 指定应设置为可选的 `T` 的属性集。当没有提供 `K` 时，它就和普通的 `Partial<T>` 一样使所有属性都是可选的。

例如:

```ts
interface User {
  name: string
  age: number
  address: string
}

type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
```

## Solution

```ts
type PartialByKeys<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? P : never]?: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
} extends infer R
  ? {
      [P in keyof R]: R[P]
    }
  : never
```

`K extends keyof T = keyof T` 限制了 `K` 只能是来自 `keyof T`, 假设传入的 `T` 是示例中的 `User` 类型

```ts
{
  [P in keyof T as P extends K ? P : never]?: T[P]
}
```

假设此类型命名为 `A`, 其意思是将 `T` 中含有在 `K` 字段的属性变为可选，并返回对象, 代入示例得到

```ts
{
  name?: string
}
```

之后执行

```ts
{
  [P in keyof T as P extends K ? never : P]: T[P]
}
```

假设此类型命名为 `B`, 其意思是将 `T` 中不含有 `K` 字段的属性返回为对象， 代入示例得到

```ts
{
  age: number
  address: string
}
```

最后交叉 `A` 和 `B`, 并将交叉后 `A & B` 的类型命名为 `R`， 代入示例得到

```ts
{
  name?: string
} &
{
  age: number
  address: string
}
```

再将 `R` 进行一次类型映射

```ts
{
  [P in keyof R]: R[P]
}
```

得到最终结果， 代入示例得到

```ts
{
  name?: string
  age: number
  address: string
}
```
