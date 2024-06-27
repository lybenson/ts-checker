# 296 - Permutation

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/296-medium-permutation/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/296-medium-permutation/test-cases.ts)

实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。

```typescript
type perm = Permutation<'A' | 'B' | 'C'> // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

## Solution

```ts
type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation<Exclude<T, K>>]
  : never
```
