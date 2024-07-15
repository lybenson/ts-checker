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
type IndexOf<T extends any[], U, I extends 0[] = []> = T extends [
  infer F,
  ...infer R
]
  ? Equal<F, U> extends true
    ? I['length']
    : IndexOf<R, U, [0, ...I]>
  : -1
```

如果 `T` 中存在元素, 则取出首元素 `F` 和 `U` 对比, 类型全等, 则表示找到。直接返回遍历次数即可

若类型不相等, 则继续遍历剩余元素。
