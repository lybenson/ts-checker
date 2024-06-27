# 8 - 对象部分属性只读

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/8-medium-readonly-2/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/8-medium-readonly-2/test-cases.ts)

实现一个泛型`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。

类型 `K` 指定 `T` 中要被设置为只读 (readonly) 的属性。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

例如

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false
}

todo.title = 'Hello' // Error: cannot reassign a readonly property
todo.description = 'barFoo' // Error: cannot reassign a readonly property
todo.completed = true // OK
```

## Solution

```ts
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
}
```

- `readonly [P in K]: T[P]` : 遍历 `K`, 将给定的属性变为 `readonly`

- `[P in keyof T as P extends K ? never : P]: T[P]` : 分别两部分 (P in keyof T) as (P extends K ? never : P)

  - `P in keyof T` : 遍历 `T` 中的属性名

  - `P extends K ? never : P` : `P` 是 `K` 的子集，说明需要设置为 `readonly`, 由于前面已经设置过了，只需返回 `never`, 不是 `K` 的子集，则返回 `P`
