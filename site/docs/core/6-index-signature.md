# 索引签名

索引签名是一种用于定义对象的索引键和对应值类型的方式。索引签名允许你在对象中使用动态的属性名，而不仅限于使用固定的属性名。

索引签名有两种常见的形式：字符串索引签名和数字索引签名。

## 字符串索引签名

字符串索引签名允许你使用字符串作为属性名来访问对象的属性, 如:

```ts
interface User {
  [key: string]: any
}

const user: User = {
  name: 'lybenson',
  age: 18
}
```

`User` 接口允许对象具有任意字符串属性，并且这些属性的值可以是任何类型

## 数字索引签名

数字索引签名允许你使用数字作为属性名来访问对象的属性, 主要用在数组中。如:

```ts
interface Fruits {
  [index: number]: string
}
const fruits: Fruits = ['apple', 'banana', 'cherry']
```

`Fruits` 接口表示对象是一个类似数组的结构，其中的属性名必须是数字，而属性值必须是字符串类型。

## Record<K extends keyof any, T>

`ts` 内置类型中存在 `Record<K extends keyof any, T>`, 也可以用来声明一个对象类型。

同索引类型的区别是：索引类型的属性名只能是 `string`、`number`、`symbol`, 而 `Record` 却没有限制

例如: 指定 `key` 只能是 `firstName` 和 `lastName`

```ts
type User = Record<'firstName' | 'lastName', string>

// 等同于
type User = {
  firstName: string
  lastName: string
}
```
