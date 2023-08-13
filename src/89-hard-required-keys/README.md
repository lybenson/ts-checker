# 必需的键

实现高级工具类型 `RequiredKeys<T>`，该类型返回 T 中所有必需属性的键组成的一个联合类型。

例如

```ts
type Result = RequiredKeys<{ foo: number; bar?: string }>
// expected to be “foo”
```

## Solution

```ts
type RequiredKeys<T> = keyof GetRequired<T>
```

利用 57 题的答案， 获得必需的属性后，通过 `keyof` 获取所有的 `key` 即可
