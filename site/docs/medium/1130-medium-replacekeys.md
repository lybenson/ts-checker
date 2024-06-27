# 1130 - ReplaceKeys

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/1130-medium-replacekeys/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/1130-medium-replacekeys/test-cases.ts)

实现类型 `ReplaceKeys`，用于替换联合类型中的键值。如果某个类型没有这个键，则跳过替换操作

例如：

```ts
type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type Nodes = NodeA | NodeB | NodeC

type ReplacedNodes = ReplaceKeys<
  Nodes,
  'name' | 'flag',
  { name: number; flag: string }
> // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', { aa: number }> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
```

## Solution

```ts
type ReplaceKeys<U, T, Y> = U extends Record<string, unknown>
  ? {
      [P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : U[P]
    }
  : never
```

当 `extends` 前面是联合类型，将会对联合类型的各个子类型分别进行判断

`U extends Record<string, unknown>` 此时 `U` 为单个类型

```ts
{
  [P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : U[P]
}
```

遍历 `U` 中的 `key`, 如果 `key` 属于 `T` 则说明需要被替换, 此时检查 `Y` 中是否有对应的 `key`，找到则返回类型 `Y[P]`, 否则返回 `never`, 如果 `key` 不属于 `T`，则直接返回原类型 `U[P]`
