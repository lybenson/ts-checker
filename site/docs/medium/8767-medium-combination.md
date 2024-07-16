# 8767 - Combination

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/8767-medium-combination/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/8767-medium-combination/test-cases.ts)

给定一个字符串数组，进行排列组合。就像 `video` 元素的属性 `controlsList`

例如

```ts
// expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
type Keys = Combination<['foo', 'bar', 'baz']>
```

## Solution

```ts
type Combination<T extends string[], I = T[number]> = I extends string
  ? I | `${I} ${Combination<[Exclude<T[number], I>]>}`
  : never
```

`Combination` 接收了一个泛型 `I` 表示数组 `T` 中元素构成的联合类型。

因此对于 `I extends string` 则会分别对数组元素执行该语句。例如 `I = 'foo' | 'bar' | 'baz'`

则会分别执行

```ts
'foo' extends string ? 'foo' | `foo ${Combination<['bar' | 'baz']>}`

'bar' extends string ? 'bar' | `bar ${Combination<['foo' | 'baz']>}`

'baz' extends string ? 'baz' | `baz ${Combination<['foo' | 'bar']>}`
```

此时 `I` 将不再是联合类型, 而是联合类型中的单个元素。这也是为什么在 `Exclude` 用 `T[number]` 而不用 `I` 的原因。

在第二层递归中, 并没有遵循 `T` 是单个元素组成的数组类型。但并不影响 `I` 的类型值。

最后 `I` 为空时返回 `never`, 这是因为在联合类型中, `never` 会被自动消除。
