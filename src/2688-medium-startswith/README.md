# StartsWith

实现`StartsWith<T, U>`,接收两个string类型参数,然后判断`T`是否以`U`开头,根据结果返回`true`或`false`

例如:

```typescript
type a = StartsWith<'abc', 'ac'> // expected to be false
type b = StartsWith<'abc', 'ab'> // expected to be true
type c = StartsWith<'abc', 'abcd'> // expected to be false
```

## Solution

```ts
type StartsWith<T extends string, U extends string> = T extends `${U}${string}`
  ? true
  : false
```

直接通过 `extends` 判断 `T` 是否可以分成由 `U` 开头的两部分，可以则返回 true
