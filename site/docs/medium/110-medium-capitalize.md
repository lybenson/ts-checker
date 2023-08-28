# 110 - Capitalize

[Source](https://github.com/lybenson/ts-checker/blob/master/src/110-medium-capitalize/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/110-medium-capitalize/test-cases.ts)

实现 `Capitalize<T>` 它将字符串的第一个字母转换为大写，其余字母保持原样。

例如

```ts
type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
```

## Solution

```ts
type MyCapitalize<S extends string> = S extends `${infer Head}${infer Tail}`
  ? `${Uppercase<Head>}${Tail}`
  : S
```

通过 `infer` 提取出 首字母和剩余字符串, 再通过 `Uppercase`将首字母大小, 最后拼接剩余字符串返回
