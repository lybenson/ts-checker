# 去除两端空白字符

实现`Trim<T>`，它接受一个明确的字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。

例如

```ts
type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
```

## Solution

```ts
type Space = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Space}${infer R}`
  ? TrimLeft<R>
  : S
type TrimRight<S extends string> = S extends `${infer R}${Space}`
  ? TrimRight<R>
  : S

type Trim<S extends string> = TrimRight<TrimLeft<S>>
```

在 106 题的基础上, 添加 `TrimRight`, 之后将传入的字符串类型先经过 `TrimLeft` 得到左边无空白符的字符串类型，再经过`TrimRight`
得到右边无空白符的字符串类型
