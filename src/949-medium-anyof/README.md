# AnyOf

在类型系统中实现类似于 Python 中 `any` 函数。类型接收一个数组，如果数组中任一个元素为真，则返回 `true`，否则返回 `false`。如果数组为空，返回 `false`。

例如：

```ts
type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.
```

## Solution

```ts
type Falsy = '' | [] | false | { [key: string]: never } | 0 | undefined | null

type AnyOf<T extends readonly any[]> = T[number] extends Falsy ? false : true
```
