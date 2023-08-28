# 5 - 获取只读属性

[Source](https://github.com/lybenson/ts-checker/blob/master/src/5-extreme-readonly-keys/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/5-extreme-readonly-keys/test-cases.ts))

实现泛型`GetReadonlyKeys<T>`，`GetReadonlyKeys<T>`返回由对象 T 所有只读属性的键组成的联合类型。

例如

```ts
interface Todo {
  readonly title: string
  readonly description: string
  completed: boolean
}

type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"
```

## Solution

```ts
type GetReadonlyKeys<T> = {
  [K in keyof T]-?: (<U>() => U extends { -readonly [P in K]: T[K] }
    ? 1
    : 2) extends <U>() => U extends { [P in K]: T[K] } ? 1 : 2
    ? never
    : K
}[keyof T]
```

- `[K in keyof T]` 遍历 `T` 中的所有键

- `-?` 表示非可选的, 即将映射类型的属性去除可选标记

- `U extends { -readonly [P in K]: T[K] } ? 1 : 2` 将 `T[K]` 去除只读属性后，如果 `U` 是其子集，则返回1, 否则返回2

- `<U>() => U extends { [P in K]: T[K] } ? 1 : 2` 如果 `U` 是 `T[K]` 的子集，则返回1, 否则返回2

- `(...) extends (...) ? never : K` 如果前面的函数类型可以赋值给后面的函数类型，则结果是 `never`，否则结果是 `K`。这一步实际上在检测 `K` 是否为只读属性，因为如果K不是只读属性，它就可以从 `-readonly` 的类型赋值到没有 `-readonly` 的类型，反之则不行。

- `[keyof T]` 是TypeScript的**索引访问类型**，它取出前面类型的所有可能值，也就是 `T` 的所有只读属性的键

总体上 遍历 `keyof T`, 如果 `U extends { -readonly [P in K]: T[K] } ? 1 : 2` 是 `<U>() => U extends { [P in K]: T[K] } ? 1 : 2` 的子集, 则返回 `never`, 否则返回属性 `K`

示例:

```ts
interface Todo {
  readonly title: string
  readonly description: string
  completed: boolean
}

type ReadonlyKeys = GetReadonlyKeys<Todo> // 'title' | 'description'

type GetReadonlyKeys<T> = {
  [K in keyof T]-?: (<U>() => U extends { -readonly [P in K]: T[K] }
    ? 1
    : 2) extends <U>() => U extends { [P in K]: T[K] } ? 1 : 2
    ? never
    : K
}[keyof T]
```

`[K in keyof T]` 中开始逐个遍历联合类型 `'title' | 'description' | 'completed'`

`K` 为 `'title'`时:

```
{ -readonly [P in K]: T[K] }
=> { -readonly [P in 'title']: Todo['title'] }
=> { title: string }

{ [P in K]: T[K] }
=> { [P in 'title']: Todo['title'] }
=> { readonly title: string }
```

```
<U>() => U extends { -readonly [P in K]: T[K] } ? 1 : 2
=> <U>() => U extends { title: string } ? 1 : 2

<U>() => U extends { [P in K]: T[K] } ? 1 : 2
=> <U>() => U extends { readonly title: string } ? 1 : 2
```

不相同，返回 `{ 'title': 'title' }`

`K` 为 `'description'`时, 同理，返回 `{ 'description': 'description' }`

`K` 为 `'completed'`时,

```
{ -readonly [P in K]: T[K] }
=> { -readonly [P in 'completed']: Todo['completed'] }
=> { completed: boolean }

{ [P in K]: T[K] }
=> { [P in 'completed']: Todo['completed'] }
=> { completed: boolean }
```

```
<U>() => U extends { -readonly [P in K]: T[K] } ? 1 : 2
=> <U>() => U extends { completed: boolean } ? 1 : 2

<U>() => U extends { [P in K]: T[K] } ? 1 : 2
=> <U>() => U extends { completed: boolean } ? 1 : 2
```

相同，返回 `{ completed: never }`

遍历结束后，返回类型

```ts
{
  title: 'title'
  description: 'description'
  completed: never
}
```

再经过索引类型

```ts
type GetReadonlyKeys = {
  title: 'title'
  description: 'description'
  completed: never
}['title' | 'description' | 'completed']
```

得到最终结果 `'title' | 'description'`
