# 3062 - Shift

[Source](https://github.com/lybenson/ts-checker/blob/master/src/3062-medium-shift/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/3062-medium-shift/test-cases.ts)

实现类型版本的 `Array.shift`。

例如：

```typescript
type Result = Shift<[3, 2, 1]> // [2, 1]
```

## Solution

```ts
type Shift<T extends unknown[]> = T extends [unknown, ...infer Rest] ? Rest : []
```

通过 `extends` 和 `infer` 组合，提取出数组出首元素之外的元素 `Rest`, 之后返回即可
