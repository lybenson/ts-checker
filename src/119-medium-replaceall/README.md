# ReplaceAll

实现 `ReplaceAll<S, From, To>` 将一个字符串 `S` 中的所有子字符串 `From` 替换为 `To`。

例如

```ts
type replaced = ReplaceAll<'t y p e s', ' ', ''> // 期望是 'types'
```

## Solution

```ts
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer H}${From}${infer T}`
  ? `${H}${To}${ReplaceAll<T, From, To>}`
  : S
```

思路同116题, 通过 `infer` 关键字拆分字符串类型。之后通过递归去替换剩余字符串。
