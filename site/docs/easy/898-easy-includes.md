# 898 - Includes

[Source](https://github.com/lybenson/ts-checker/blob/master/src/898-easy-includes/template.ts)

在类型系统里实现 JavaScript 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true` 要么是 `false`。

例如：

```ts
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
```

## Solution

```ts
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false

type Includes<T extends readonly any[], U> = true extends {
  [I in keyof T]: Equal<T[I], U>
}[number]
  ? true
  : false
```

`keyof T` 返回由数组索引构成的联合类型，如 `0 | 1 | 2 | ...`

`[I in keyof T]` 遍历索引的联合类型, `Equal` 判断两个类型是否相同

```ts
{
  [I in keyof T]: Equal<T[I], U>
}
```

最终结果是

```ts
{
  0: true or false,
  1: true or false
  ...
}
```

最后通过索引 `[number]` 获取是否是 `true` 或 `false` 时，直接返回
