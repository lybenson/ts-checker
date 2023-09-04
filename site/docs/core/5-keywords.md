# 关键字

## keyof

`keyof T` 用于获取类型 `T` 的所有属性名，并返回属性名构成的联合类型，如

```ts
type User = {
  id: number
  name: string
  age: number
}
type UserKey = keyof User // 'id' | 'name' | 'age'
```

如果 `T` 是数组，则返回包含数组索引的字符串字面量联合类型

```ts
const arr = [1, 2, 3] as const
type Keys = keyof typeof arr // "0" | "1" | "2"
```

## typeof

`typeof` 用于获取变量的类型

```ts
const user = {
  id: 1,
  name: 'lybenson',
  age: 18
}
type User = typeof user

// 相当于
type User = {
  id: number
  name: string
  age: number
}
```

## infer

常用在存在泛型的类型定义中。由于在泛型中无法直接获得泛型内部相关参数的类型，因此可以使用 `infer` 并接合 `extends` 用于类型推导。

例如：获取函数的返回值类型

```ts
type GetFunctionReturnType<T extends Function> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never

type ReturnType = GetFunctionReturnType<() => string> // string
```

`GetFunctionReturnType` 约束泛型 `T` 必须是函数, 具体实现中通过 `extends` 和 `infer` 关键字获取函数的返回值类型

## in

`in` 可以安全的检查一个对象上是否存在一个属性

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}
interface User {
  id: number
  name: string
  age: number
}

function getName(instance: User | Todo): string {
  // 检查 instance 是否有 name 字段
  if ('name' in instance) {
    return instance.name
  }
  return ''
}
```
