# 11 - 元组转换为对象

[Source](https://github.com/lybenson/ts-checker/blob/master/src/11-easy-tuple-to-object/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/11-easy-tuple-to-object/test-cases.ts)

将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应。

例如：

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

## Solution

```ts
type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P
}
```

`PropertyKey` 是内置类型

```ts
declare type PropertyKey = string | number | symbol
```

定义对象的 `key` 只能是这三种类型之一

`T[number]` 返回数组元素构成的联合类型, 如数组 `['name', 'age', 'sex']` , 则 `T[number]` 为 `'name' | 'age' | 'sex'`

之后通过映射类型 ` [P in T[number]]: P` 遍历数组构造对象类型
