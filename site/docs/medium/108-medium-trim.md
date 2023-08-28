# 108 - 去除两端空白字符

[Source](https://github.com/lybenson/ts-checker/blob/master/src/108-medium-trim/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/108-medium-trim/test-cases.ts))

实现`Trim<T>`，它接受一个明确的字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。

例如

```ts
type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
```

## Solution

```ts
type Trim<S extends string> = S extends
  | `${' ' | '\t' | '\n'}${infer T}`
  | `${infer T}${' ' | '\t' | '\n'}`
  ? Trim<T>
  : S
```
