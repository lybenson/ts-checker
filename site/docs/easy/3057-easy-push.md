# 3057 - Push

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/3057-easy-push/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/3057-easy-push/test-cases.ts)

在类型系统里实现通用的 `Array.push` 。

例如：

```typescript
type Result = Push<[1, 2], '3'> // [1, 2, '3']
```

## Solution

```ts
type Push<T extends unknown[], U> = [...T, U]
```
