# Extends

`extends` 本意为继承，但在 `ts` 却有着多种不同的用法。

## 接口继承

使用 `interface` 定义的类型可以实现继承，继承的接口拥有被继承接口的全部属性。

```ts
interface Animal {
  name: string
  age: number
}

interface Cat extends Animal {
  species: 'cat'
}

const cat: Cat = {
  name: 'mimi',
  age: 2,
  species: 'cat'
}
```

## 类继承

见 [Class](./10-class.md#继承)

## 条件类型

在类型定义中， 由于无法使用等号, 因此可以使用 `extends` 进行条件判断

```ts
type IsNumber<T> = T extends number ? true : false

const isNumber: IsNumber<18> = true
const isNumber: IsNumber<'lybenson'> = false
```

`IsNumber` 判断传入的泛型 `T` 是否是 `number` 类型，是则返回 `true`

## 类型推断

`extends` 搭配 `infer` 关键字可以进行类型推断

例如：获取数组类型最后一个元素类型

```ts
type Last<T extends any[]> = T extends [...unknown[], infer R] ? R : never
```
