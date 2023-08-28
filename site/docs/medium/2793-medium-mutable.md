# 2793 - Mutable

[Source](https://github.com/lybenson/ts-checker/blob/master/src/2793-medium-mutable/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/2793-medium-mutable/test-cases.ts)

实现一个通用的类型 `Mutable<T>`，使类型 `T` 的全部属性可变（非只读）。

例如：

```typescript
interface Todo {
  readonly title: string
  readonly description: string
  readonly completed: boolean
}

type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }
```

## Solution

```ts
type Mutable<T extends Record<string, any>> = {
  -readonly [K in keyof T]: T[K]
}
```

`-readonly` 用于将属性变为非只读
