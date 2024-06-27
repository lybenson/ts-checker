# 3060 - Unshift

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/3060-easy-unshift/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/3060-easy-unshift/test-cases.ts)

实现类型版本的 `Array.unshift`。

例如：

```typescript
type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
```

## Solution

```ts
type Unshift<T extends unknown[], U> = [U, ...T]
```
