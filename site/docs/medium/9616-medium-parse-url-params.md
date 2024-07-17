# 9616 - Parse URL Params

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/9616-medium-parse-url-params/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/9616-medium-parse-url-params/test-cases.ts)

你需要实现一个类型级别的解析器，将URL参数字符串解析成一个联合类型。

例如

```ts
ParseUrlParams<':id'> // id
ParseUrlParams<'posts/:id'> // id
ParseUrlParams<'posts/:id/:user'> // id | user
```

## Solution

```ts
type ParseUrlParams<T> = T extends `${string}:${infer Rest}`
  ? Rest extends `${infer Left}/${infer Right}`
    ? Left | ParseUrlParams<Right>
    : Rest
  : never
```
