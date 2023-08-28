# 4 - 实现 Pick

[Source](https://github.com/lybenson/ts-checker/blob/master/src/4-easy-pick/template.ts)

不使用 `Pick<T, K>` ，实现 TS 内置的 `Pick<T, K>` 的功能。

**从类型 `T` 中选出符合 `K` 的属性，构造一个新的类型**

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}
```

## Solution

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

`K extends keyof T` 限制 `K` 只能是 `keyof T`的子集, 之后通过映射类型, 遍历类型 `K` 返回新类型

示例：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}
```

传给 `MyPick` 参数后

- `T` => `Todo`
- `K` => `'title' | 'completed'`
- `keyof T` => `'title' | 'description' | 'completed'`

`[P in K]: T[P]` 开始遍历 K

`P` 为 `'title'`, 返回 `'title': Todo['title']`, 即 `'title': string`

`P` 为 `'completed'`, 返回 `'completed': Todo['completed']`, 即 `'completed': boolean`

最终返回类型

```ts
{
  title: string,
  completed: boolean
}
```
