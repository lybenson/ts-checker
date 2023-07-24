# 实现 Omit

不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。

`Omit` 会创建一个省略 K 中字段的 T 对象。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false
}
```

`Omit` 用于从一个类型中剔除某些属性，并返回一个新的类型

```ts
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}
```

`MyOmit` 接收两个泛型

- `T` 需要剔除属性的类型
- `K` 需要剔除的属性名，并约束了属性名必须是 T 的属性名

`keyof T` 返回 `T` 中所有属性名组成的联合类型, 如

```ts
type User = {
  name: string
  age: number
}

type KeyOfUser = keyof User // 'name' | 'age'
```

在具体的实现中使用了 **映射类型**(Mapped Types), 可以将一个类型映射成另一个类型，语法如下：

```ts
type TypeName<T> = {
  [P in keyof T]: T[P]
}
```

`in` 相当于循环后面的联合类型, `P` 作为子项。`T[P]` 返回类型 `T` 中属性名为 `P` 的对应的类型

再回到 `MyOmit` 的实现

```ts
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}
```

`P in keyof T as P extends K ? never : P` 可以划分为 `(P in keyof T) as (P extends K ? never : P)`

- `P in keyof T` : 遍历 T 中的每个属性键，P 是代表每个属性键的变量
- `as P extends K ? never : P` : `as` 关键字后面的部分是对 类型P 的类型转换 。这是一个条件类型，如果 P 是 K 中的一部分，那么我们将其重命名为 never，否则我们保持其原来的名字 P

示例:

```ts
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false
}
```

`keyof T` 返回 `'title' | 'description' | 'completed'`

在 `[P in keyof T]` 中进行第一次循环 `P` 为 `'title'`, 得到

`'title' as ('title' extends 'description' | 'title' ? never : 'title')`

由于 `'title' extends 'description' | 'title'` 为 `true`, 所以返回 `never`, 不进行处理

`P` 为 `'description'` 时同理;

当 `P` 为 `completed` 时:

`'completed' as ('completed' extends 'description' | 'title' ? never : 'completed')`

由于 `'completed' extends 'description' | 'title'` 为 `false`, 返回 `'completed'`, 故返回类型 `'completed': T['completed']`
