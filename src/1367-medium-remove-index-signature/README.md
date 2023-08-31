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

`[P in keyof T as ...]` 映射类型的一部分。表示要迭代 `T` 的所有属性，并为每个属性应用一些转换。`P` 是 `T` 的每个属性的类型。

`K extends P ? never : P extends K ? P : never` 条件类型, 用于 `T` 的每个属性的转换

- 如果 `K extends P` （即 `P` 是 `K` 的一种类型），则不保留该属性，因此将它映射为 `never`

- 否则，如果 `P extends K` （即 `K` 是 `P` 的一种类型），则保留该属性，因此将它映射为 `P`

最后的 `T[P]` 表示新对象的属性值应该是原始对象的属性值。
