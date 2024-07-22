# Public Type

从给定类型 `T` 中删除以 `_` 开头的键。

例如：

```ts
type CheckRepeatedTuple<[1, 2, 3]>   // false
type CheckRepeatedTuple<[1, 2, 1]>   // true
```

## Solution

```ts
type PublicType<T extends object> = {
  [K in keyof T as K extends `_${string}` ? never : K]: T[K]
}
```
