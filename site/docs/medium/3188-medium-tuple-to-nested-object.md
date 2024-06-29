# 3188 - Tuple to Nested Object

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/3188-medium-tuple-to-nested-object/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/3188-medium-tuple-to-nested-object/test-cases.ts)

给定一个只包含字符串类型的元组类型`T`和类型`U`，递归地构建一个对象。

例如：

```ts
type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
```

## Solution

```ts
type TupleToNestedObject<T, U> = T extends [infer F, ...infer R]
  ? {
      [K in F & string]: TupleToNestedObject<R, U>
    }
  : U
```

首先通过 `infer` 关键字 `T extends [infer F, ...infer R]` 取出元组类型中的第一个元素类型 `F`. 如果取不到，则表示传入的元组是空，则直接返回 `U`

之后使用第一个元素类型 `F` 构成对象类型结构

```ts
{
  [K in F & string]: TupleToNestedObject<R, U>
}
```

`F & string` 则是用来确保 `F` 是 `string` 类型, 如果 `F` 是 `number`, 则 `F & string` 得到的结果会是 `never`

最后通过递归的形式将数组类型的剩余元素再次传入 `TupleToNestedObject` 中

需要注意的是, 构造对象类型结构，不能这样写

```ts
{
  F: TupleToNestedObject<R, U>
}
```

这是由于 `F` 作为属性名时，会将 `F` 直接作为字符串而不是变量。为了动态地将 `F` 的值作为属性名, 需要通过类型映射的方式定义。
