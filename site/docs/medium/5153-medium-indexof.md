# 5153 - IndexOf

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/5153-medium-indexof/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/5153-medium-indexof/test-cases.ts)

实现 `Array.indexOf` 的类型版本，`indexOf<T, U>` 接受一个数组 `T` 和任何`U`，并返回数组 `T` 中第一个 `U` 的索引。

例如：

```ts
type Res = IndexOf<[1, 2, 3], 2> // expected to be 1
type Res1 = IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3> // expected to be 2
type Res2 = IndexOf<[0, 0, 0], 2> // expected to be -1
```

## Solution

```ts
type IndexOf<
  T extends unknown[],
  U,
  Index extends 0[] = []
> = Index['length'] extends T['length']
  ? -1
  : Equal<T[Index['length']], U> extends true
  ? Index['length']
  : IndexOf<T, U, [...Index, 0]>
```
