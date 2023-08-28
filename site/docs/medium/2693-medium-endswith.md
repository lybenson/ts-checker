# 2693 - EndsWith

[Source](https://github.com/lybenson/ts-checker/blob/master/src/2693-medium-endswith/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/2693-medium-endswith/test-cases.ts))

实现`EndsWith<T, U>`,接收两个string类型参数,然后判断`T`是否以`U`结尾,根据结果返回`true`或`false`

例如:

```typescript
type a = EndsWith<'abc', 'bc'> // expected to be true
type b = EndsWith<'abc', 'abc'> // expected to be true
type c = EndsWith<'abc', 'd'> // expected to be false
```

## Solution

```ts
type EndsWith<T extends string, U extends string> = T extends `${string}${U}`
  ? true
  : false
```

直接通过 `extends` 判断 `T` 是否可以分成由 `U` 结尾的两部分，可以则返回 true
