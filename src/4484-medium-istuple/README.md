# IsTuple

实现一个类型 `IsTuple`，它接收一个输入类型 `T` 并返回 `T` 是否为元组类型。

例如:

```ts
type case1 = IsTuple<[number]> // true
type case2 = IsTuple<readonly [number]> // true
type case3 = IsTuple<number[]> // false
```

## Solution

```ts
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
  ? number extends T['length']
    ? false
    : true
  : false
```

首先判断泛型 `T` 是否是 `never` 类型, 如果是, 则返回 `false`

接着判断 `T` 是否是数组类型(包括只读数组), 如果不是, 则返回 `false`

最后判断 `T` 的 `length` 属性, 如果 `length` 类型是 `number`, 表示 `T` 是一个可变长度的数组类型。直接返回 `false`

```ts
type ArrayLength = number[]['length'] // ArrayLength is number
type TupleLength = [number]['length'] // TupleLength is 1
```
