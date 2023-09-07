# 泛型

## 泛型定义

泛型是指在定义类型或函数、接口等时候，不指定具体的类型。而是由调用的时候确定。

例如给数组添加元素

```ts
function append<T>(arr: T[], value: T): T[] {
  arr.push(value)
  return arr
}

append([1, 2, 3], 4)
```

`append` 函数中定义了一个泛型 `T`，函数参数 `arr` 的类型是 `T[]`, 要添加的元素类型和数组元素是同一类型。这样保证返回的结果类型是 `T[]`。最后调用时自动推导 `T` 的的类型是 `number`

而如果不使用泛型，那么 `append` 就是一个针对具体类型的函数, 无法做到通用

## 多泛型类型参数

使用泛型的时候可以定义多个

```ts
function createTuple<T, U>(a: T, b: U): [T, U] {
  return [a, b]
}
```

`createTuple` 用来将传入的参数转为元组。

## 类型泛型

泛型不仅可以在定义变量的时候使用，还可以使用在类型定义中

```ts
type User = {
  id: number
  name: string
  age: number
}
type GetByIdParams<T> = {
  [P in keyof T as P extends 'id' ? P : never]: T[P]
}
type GetUserByIdParams = GetByIdParams<User>

// 等同于
type GetUserByIdParams = {
  id: number
}
```

`GetByIdParams` 定义泛型 `T`, 并返回 `T` 中只包含 `id` 属性构成的对象

`GetUserByIdParams` 使用类型 `GetByIdParams` 时, 指明泛型 `T` 为 `User` 类型

## 泛型约束

有时候希望定义的泛型是有约束的，从而可以使用其属性和方法。例如下面获取数组长度的例子

```ts
function getLength<T extends any[]>(arr: T) {
  return arr.length
}
getLength([1, 2, 3])
```

通过 `extends` 关键字约束泛型 `T` 必须是数组，因此可以使用其 `length` 属性。而如果不约束 `arr.length` 则会报错。
