# 13 - Hello World

[Source](https://github.com/lybenson/ts-checker/blob/master/src/13-warm-hello-world/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/13-warm-hello-world/test-cases.ts)

Hello, World!

这个简单的提问希望让你可以快速上手 Type Challenges。在这里，我们使用了一些神奇的技巧让 TypeScript 通过自身的类型系统来实现自动判题。

在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。

```ts
// 期望是一个 string 类型
type HelloWorld = any
```

```ts
// 你需要使得如下这行不会抛出异常
type test = Expect<Equal<HelloWorld, string>>
```

## Solution

```ts
type HelloWorld = string
```
