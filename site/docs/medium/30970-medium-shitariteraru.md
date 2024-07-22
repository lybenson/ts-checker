# 30970 - IsFixedStringLiteralType

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/30970-medium-shitariteraru/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/30970-medium-shitariteraru/test-cases.ts)

有时你可能想要确定一个字符串字面量是否是确定的类型。例如，当你想检查作为类标识符指定的类型是否是固定的字符串字面量类型。

```ts
type Action<ID extends string> = { readonly id: ID }
```

以下类型将返回 `false`

- `never` 类型
- 字符串联合类型
- 包含 `string`、`number`、`bigint`、 `boolean` 的模板文字类型

确定给定的类型 `S` 是否为确定的字符串文字类型。

## Solution

```ts
type SingleCheck<S> = S extends ''
  ? true
  : S extends `${infer C}${infer T}`
  ? '0' | '1' extends C
    ? false
    : SingleCheck<T>
  : false

type IsFixedStringLiteralType<S extends string, T = S> = [S] extends [never]
  ? false
  : S extends unknown
  ? [T] extends [S]
    ? SingleCheck<S>
    : false
  : false
```
