# 4803 - Trim Right

[Source](https://github.com/lybenson/ts-checker/blob/master/src/4803-medium-trim-right/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/4803-medium-trim-right/test-cases.ts))

实现 `TrimRight<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串结尾的空白字符串。

例如

```ts
type Trimed = TrimRight<'  Hello World  '> // 应推导出 '  Hello World'
```

## Solution

```ts
type TrimRight<S extends string> = S extends `${infer Rest}${' ' | '\n' | '\t'}`
  ? TrimRight<Rest>
  : S
```
