# Trim Right

实现 `TrimRight<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串结尾的空白字符串。

例如

```ts
type Trimed = TrimRight<'  Hello World  '> // 应推导出 '  Hello World'
```

## Solution

```ts
type TrimRight<S extends string> = S extends `${infer R}${' ' | '\n' | '\t'}`
  ? TrimRight<R>
  : S
```

如果 `S` 是值, 而不是类型。要去除结尾的空白字符串都需要用到循环。但在类型定义中对于循环只能用递归来实现。

故在 `TrimRight` 类型定义中, 通过 `infer` 拿到末尾的字符。如果是空白字符,则递归末尾前的字符串。否则直接返回。
