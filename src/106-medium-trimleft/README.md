# 去除左侧空白

实现 `TrimLeft<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。

例如

```ts
type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '
```

## Solution

```ts
type Space = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Space}${infer R}`
  ? TrimLeft<R>
  : S
```

判断字符串类型是否有一个空白字符，存在则进行递归

对于字符串 `\t foo`, 期望得到 `foo`, 递归过程如下

```ts
'\t foo' extends `${Space}${infer R}` ? TrimLeft<R>: S
```

得到 `R` 为 `' foo'`, 继续递归

```ts
' foo' extends `${Space}${infer R}` ? TrimLeft<R>: S
```

得到 `R` 为 `'foo'`, 继续递归, 得到最终 `'foo'`
