# 645 - Diff

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/645-medium-diff/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/645-medium-diff/test-cases.ts)

获取两个接口类型中的差值属性。

```ts
type Foo = {
  a: string
  b: number
}
type Bar = {
  a: string
  c: boolean
}

type Result1 = Diff<Foo, Bar> // { b: number, c: boolean }
type Result2 = Diff<Bar, Foo> // { b: number, c: boolean }
```

## Solution

```ts
type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>
```

将传入的两个泛型进行交叉运算，得到交叉类型。两个泛型具有相同的 `key` 且 相同的 `key` 对应的类型也相同则会去重, 如:

```ts
type Foo = {
  a: string
  b: number
}
type Bar = {
  a: string
  c: boolean
}
type FooUnionBar = Foo & Bar
```

`Foo & Bar` 的类型为

```ts
type FooUnionBar = {
  a: string
  b: number
  c: boolean
}
```

如果具有相同的 `key`, 但对应的类型不同时，则不同的类型也会进行交叉运算, 如:

```ts
type Foo = {
  a: string
  b: number
}
type Bar = {
  a: number
  c: boolean
}
type FooUnionBar = Foo & Bar
```

`Foo & Bar` 的类型为

```ts
type FooUnionBar = {
  a: string & number
  b: number
  c: boolean
}
```

由于不存在类型 `string & number`, 既是 `string` , 又是 `number`, 因此该类型无法使用。

再回到题目中 `keyof (O | O1)` 会返回共同的属性组成的联合类型。最后再使用 `Omit` 删除共同的属性, 即可计算出差值属性
