# 57 - 获得必需的属性

[Source](https://github.com/lybenson/ts-checker/blob/master/src/57-hard-get-required/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/57-hard-get-required/test-cases.ts))

实现高级工具类型 `GetRequired<T>`，该类型保留所有必需的属性

例如

```ts
type I = GetRequired<{ foo: number; bar?: string }> // expected to be { foo: number }
```

## Solution

```ts
type GetRequired<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P]
}
```

看成两部分

`(P in keyof T) as (T[P] extends Required<T>[P] ? P : never)`

在 `T` 等于 `{ foo: number; bar?: string }` 时

`keyof T` 等于 `'foo' | 'bar'`, 此时会遍历该联合类型

`P` 为 `'foo'`, 得到 `'foo' as (number extends number ? 'foo' : never)`, 返回 `foo`

`P` 为 `'bar'`, 得到 `'bar' as ((string | undefined) extends string ? 'bar' : never)` 返回 `never`

为 `never` 时忽略，为 `'foo'` 时 返回 `foo: T['foo']`, 即 `foo: number`
