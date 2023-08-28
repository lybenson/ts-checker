# 59 - 获得可选属性

[Source](https://github.com/lybenson/ts-checker/blob/master/src/59-hard-get-optional/template.ts)

实现高级工具类型 `GetOptional<T>`，该类型保留所有可选属性

例如

```ts
type I = GetOptional<{ foo: number; bar?: string }> // expected to be { bar?: string }
```

## Solution

```ts
type GetOptional<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P]
}
```

原理类似于 57 题

看成两部分

`(P in keyof T) as (T[P] extends Required<T>[P] ? never : P)`

在 `T` 等于 `{ foo: number; bar?: string }` 时

`keyof T` 等于 `'foo' | 'bar'`, 此时会遍历该联合类型

`P` 为 `'foo'`, 得到 `'foo' as (number extends number ? 'never' : 'foo')`, 返回 `never`

`P` 为 `'bar'`, 得到 `'bar' as ((string | undefined) extends string ? never : 'bar')` 返回 `bar`

为 `never` 时忽略，为 `'bar'` 时 返回 `bar: T['bar']`, 即 `bar?: string`
