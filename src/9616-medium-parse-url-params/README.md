# Parse URL Params

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
