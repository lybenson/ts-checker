# 27932 - MergeAll

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/27932-medium-mergeall/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/27932-medium-mergeall/test-cases.ts)

合并多个类型到一个新类型。如果键有重叠，其值应合并为一个联合。

例如:

```ts
type Foo = { a: 1; b: 2 }
type Bar = { a: 2 }
type Baz = { c: 3 }

type Result = MergeAll<[Foo, Bar, Baz]> // expected to be { a: 1 | 2; b: 2; c: 3 }
```

## Solution

```ts
type MergeAll<
  XS extends object[],
  U = XS[number],
  K extends PropertyKey = U extends U ? keyof U : never
> = {
  [P in K]: U extends U ? U[P & keyof U] : never
}
```

`U` 是 `XS` 所有成员构成的联合类型, `K` 是 `XS` 所有成员的属性名构成的联合类型

通过映射类型构造结果

`U extends U ? U[P & keyof U] : never` 遍历联合类型, 并取出相应的属性类型。

`P & keyof U` 取 `P` 和 `keyof U` 的交集, 用于确保 `P` 是 `keyof U` 子集。
