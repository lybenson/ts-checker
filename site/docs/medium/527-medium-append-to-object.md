# 527 - Append to object

[Source](https://github.com/lybenson/ts-checker/blob/master/src/527-medium-append-to-object/template.ts)

实现一个为接口添加一个新字段的类型。该类型接收三个参数，返回带有新字段的接口类型。

例如:

```ts
type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
```

## Solution

```ts
type AppendToObject<T, U extends string, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V
}
```

`keyof T` 返回由 `T` 中 `key` 组成的联合类型，`T | U` 即再联合一个 `U`, 之后对组成的联合类型进行循环, 依次取出其中的单个元素执行 `K extends keyof T ? T[K] : V`
