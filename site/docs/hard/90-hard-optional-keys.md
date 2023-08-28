# 90 - 可选类型的键

[Source](https://github.com/lybenson/ts-checker/blob/master/src/90-hard-optional-keys/template.ts)

实现高级工具类型`OptionalKeys<T>`，该类型将 T 中所有可选属性的键合并为一个联合类型。

## Solution

```ts
type OptionalKeys<T> = keyof GetOptional<T>
```

利用 59 题的答案， 获得可选属性后，通过 `keyof` 获取所有的 `key` 即可
