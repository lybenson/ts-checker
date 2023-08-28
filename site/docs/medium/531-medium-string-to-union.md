# 531 - String to Union

[Source](https://github.com/lybenson/ts-checker/blob/master/src/531-medium-string-to-union/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/531-medium-string-to-union/test-cases.ts))

实现一个将接收到的String参数转换为一个字母Union的类型。

例如

```ts
type Test = '123'
type Result = StringToUnion<Test> // expected to be "1" | "2" | "3"
```

## Solution

```ts
type StringToUnion<T extends string> = T extends `${infer Letter}${infer Rest}`
  ? Letter | StringToUnion<Rest>
  : never
```

通过 `infer` 分离出首字母, 并构造出联合类型，再递归剩余字符串拼接到联合类型上
