# 62 - 查找类型

[Source](https://github.com/lybenson/ts-checker/blob/master/src/62-medium-type-lookup/template.ts)

有时，您可能希望根据某个属性在联合类型中查找类型。

在此挑战中，我们想通过在联合类型`Cat | Dog`中通过指定公共属性`type`的值来获取相应的类型。换句话说，在以下示例中，`LookUp<Dog | Cat, 'dog'>`的结果应该是`Dog`，`LookUp<Dog | Cat, 'cat'>`的结果应该是`Cat`。

```ts
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
```

## Solution

```ts
type LookUp<U, T> = U extends { type: T } ? U : never
```

`U` 是联合类型时， `extends` 会对联合类型中每一个类型依次执行

当 `U` 时 `Cat | Dog` 时, 依次执行会得到

`Cat extends { type: 'dog' } ? Cat : never` 返回 `never`

`Dog extends { type: 'dog' } ? Dog : never` 返回 `Dog`

返回最终结果 `Dog`
