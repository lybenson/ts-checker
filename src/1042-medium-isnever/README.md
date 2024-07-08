# IsNever

实现类型 `IsNever`, 如果输入的泛型 `T` 类型是 `never` 返回 `true`, 否则返回 `false`

例如：

```ts
type A = IsNever<never> // expected to be true
type B = IsNever<undefined> // expected to be false
type C = IsNever<null> // expected to be false
type D = IsNever<[]> // expected to be false
type E = IsNever<number> // expected to be false
```

## Solution

```ts
type IsNever<T> = [T] extends [never] ? true : false
```

在判断泛型是否是 `never` 类型时，不能直接用 `T extends never` 进行判断, 这是因为泛型为联合类型并作用于条件类型时会执行类型分发。`never` 正是一种特殊的联合类型。

在 `T extends U ? X : Y` 类型定义中， 当 `T = 'A' | 'B'` 会被分发并解析为

```ts
(A extends U ? X : Y) | (B extends U ? X : Y)
```

如果类型是 `never` 将被视为空。例如

- `'A' | never` 进行类型分发时, 会直接变成 `'A'` 进行类型分发
- `'A' | (never | 'B')` 变成 `'A' | 'B'` 进行类型分发

所以当 `T` 是 `never` 类型时, 由于没有类型可以分发, 所以不会创建条件类型。得到的结果只会是 `never`

将 `T` 放入元组中, 作为一个整体可以禁止默认的类型分发行为。
