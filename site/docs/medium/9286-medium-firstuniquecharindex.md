# 9286 - FirstUniqueCharIndex

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/9286-medium-firstuniquecharindex/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/9286-medium-firstuniquecharindex/test-cases.ts)

给定一个字符串 `s`，找到其中第一个不重复的字符并返回其索引。如果不存在，返回 -1

## Solution

```ts
type FirstUniqueCharIndex<
  T extends string,
  C extends string[] = []
> = T extends `${infer F}${infer R}`
  ? F extends C[number]
    ? FirstUniqueCharIndex<R, [...C, F]>
    : R extends `${string}${F}${string}`
    ? FirstUniqueCharIndex<R, [...C, F]>
    : C['length']
  : -1
```

通过递归实现遍历。在每次递归时向泛型 `C` 中添加 `T` 中的单个字符

一开始先判断 `T` 是否可以分割为首字符 `F` 和剩余字符串 `R`,

- 可以, 判断已经遍历过的字符数组 `C` 中是否存在 `F`
  - 存在, 说明有重复字符, 不处理并继续递归剩余元素, 并将 `F` 加入 `C` 中
  - 不存在, 判断剩余字符串是否包含 `F`
    - 包含 `F`, 说明有重复字符, 不处理并继续递归剩余元素, 并将 `F` 加入 `C` 中
    - 不包含 `F`, 说明`F` 前后都无重复字符, 则直接返回当前索引值, 即 `C['length']`
- 不可以, 表示 `T` 是空字符, 直接返回 -1
