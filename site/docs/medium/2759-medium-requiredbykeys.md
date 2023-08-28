# 2759 - RequiredByKeys

[Source](https://github.com/lybenson/ts-checker/blob/master/src/2759-medium-requiredbykeys/template.ts)

实现一个通用的 `RequiredByKeys<T, K>` ，它接收两个类型参数 `T` 和 `K` 。

`K` 指定应设为必选的 `T` 的属性集。当没有提供 `K `时，它就和普通的 `Required<T>` 一样使所有的属性成为必选的。

例如:

```ts
interface User {
  name?: string
  age?: number
  address?: string
}

type UserRequiredName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }
```

## Solution

```ts
type RequiredByKeys<T, K extends keyof T = keyof T> = {
  [P in keyof T as P extends K ? P : never]-?: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
} extends infer R
  ? {
      [P in keyof R]: R[P]
    }
  : never
```

思路同 2757 类型

- 将 `T` 中属于 `K` 类型的字段, 变为非可选. `-?` 表示非可选
- 将 `T` 中不属于 `K` 类型的字段返回
- 交叉上述结果并转换为单一对象
