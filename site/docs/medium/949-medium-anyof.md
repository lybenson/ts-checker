# 949 - AnyOf

[Source](https://github.com/lybenson/ts-checker/blob/master/src/949-medium-anyof/template.ts)

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

`T[number]` 返回数组中元素构成的联合类型

例如 `T = [1, '', false, [], {}]`, 则 `T[number] = 1 | '' | false | [] | {}`

所以语句就变成了

```ts
1 | '' | false | [] | {} extends Falsy ? false : true
```

`extends` 前面是联合类型的话则会对每个类型执行一个循环, 等同于

```ts
1 extends Falsy ? false : true // true
'' extends Falsy ? false : true // false
false extends Falsy ? false : true // false
[] extends Falsy ? false : true // false
{} extends Falsy ? false : true // false
```

因为有一个元素的结果返回 `true`, 因此整个语句返回 `true`
