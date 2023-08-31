# Remove Index Signature

实现`RemoveIndexSignature<T>`，从对象类型中排除索引签名

例如：

```ts
type Foo = {
  [key: string]: any
  foo(): void
}

type A = RemoveIndexSignature<Foo> // expected { foo(): void }
```

## Solution

```ts
type RemoveIndexSignature<T, K = PropertyKey> = {
  [P in keyof T as K extends P ? never : P extends K ? P : never]: T[P]
}
```
