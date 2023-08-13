# 可选类型的键

实现高级工具类型`OptionalKeys<T>`，该类型将 T 中所有可选属性的键合并为一个联合类型。

## Solution

```ts
type OptionalKeys<T> = keyof GetOptional<T>
```

利用 59 题的答案， 获得可选属性后，通过 `keyof` 获取所有的 `key` 即可
