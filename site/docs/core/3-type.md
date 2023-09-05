# 数据类型

## 基本数据类型

- 数值类型 `number`

  ```ts
  const age: number = 18
  ```

- 字符串类型 `string`

  ```ts
  const name: string = 'lybenson'
  ```

- 布尔类型 `boolean`

  ```ts
  const isMale: boolean = true
  ```

- 空值 `void`: 常用在函数没有返回值时

  ```ts
  function printHeight(height: number): void {
    console.log(height)
  }
  ```

- `null` 和 `undefined`

- `any`: 任何其他类型都是 `any` 的子类型，任何类型值都可以赋值给 `any` 类型的变量

  ```ts
  const anyUse: any = {
    name: 'lybenson'
  }
  anyUse.name
  ```

- `unknown`: 未知类型，同 `any` 类型一样， 任何类型值也可以赋值给 `unknown` 类型的变量

  ```ts
  const unknownUse: unknown = {
    name: 'lybenson'
  }
  unknownUse.name // error: 'unknownUse' is of type 'unknown'.
  ```

- `never`: 表示永不存在的值的类型

  ```ts
  function error(message: string): never {
    throw new Error(message)
  }
  ```

## 其他数据类型

### 函数类型

定义函数类型时需要提供参数类型和返回值类型

```ts
const sum = (a: number, b: number): number => {
  return a + b
}
```

返回值类型可不写，`ts` 会自动进行类型推导

### 数组类型

数组的类型声明主要有下面两种:

```ts
const arr1: number[] = []
const arr2: Array<number> = []
```

### 元组类型

数组一般由同种类型的值组成，但元组可以存储不同类型的值

```ts
const student: [string, number] = ['lybenson', 18]
```

### 枚举类型

用关键字 `enum` 声明

```ts
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST
}

const direction: Direction = Direction.SOUTH
```

枚举值可以不写，默认从 0 开始

### 联合类型

联合类型表示变量的值为多种类型中的一种, 强调**或**，用 `|` 符号连接

```ts
type Roles = 'CEO' | 'CTO' | 'CFO'

const userRole: Roles = 'CTO'
```

### 交叉类型

交叉类型表示变量有类型的所有属性, 强调**与**，用 `&` 符号连接

```ts
type Student = {
  name: string
}
type Employee = {
  name: string
  salary: number
}
// UserRole 同时具有 Student 和 Employee 属性
type UserRole = Student & Employee

const user: UserRole = {
  name: 'lybenson',
  salary: 3500
}
```

:::danger 注意

被交叉的两个类型具有相同的属性名，但属性类型不同时，则属性类型也会进行交叉，如：

```ts showLineNumbers
type Student = {
  name: number
}
type Employee = {
  name: string
  salary: number
}
// name 类型不同，则类型也会交叉
type UserRole = Student & Employee
// {
//   name: number & string
//   salary: number
// }

// 报错: 不存在值同时具有 number 和 string 类型
const user: UserRole = {
  name: 'lybenson',
  salary: 3500
}
```

:::

### 可选类型

可选类型并不是一种具体的类型，而是一种类型泛式。

使用 `?` 表示， 用来声明变量类型或函数参数类型时指定一个类型，但不一定要求该变量或参数必须有值。本质是给原类型联合 `undefined` 类型

```ts
function printName(firstName: string, lastName?: string) {
  if (lastName) {
    console.log(firstName + ' ' + lastName)
  } else {
    console.log(firstName)
  }
}
// lastName 为可选类型，可不传
printName('lybenson')

// 自定义类型中定义可选属性
type Employee = {
  name: string
  salary?: number
}
const emp: Employee = {
  name: 'lybenson'
}
```

`-?` 将属性变为非可选。

### 只读类型

只读类型同样并不是一种具体的类型。

使用 `readonly` 表示属性是只读的，不可修改

```ts
// 定义 name 属性是只读的
type Employee = {
  readonly name: string
  salary?: number
}

const emp: Employee = {
  name: 'lybenson',
  salary: 3500
}

emp.name = 'jack ma' // Cannot assign to 'name' because it is a read-only property.
```

`-readonly` 将属性变为非只读。

## 自定义类型

自定义类型常用 `type` 和 `interface`, 两者的区别是

- `type` 定义联合类型、交叉类型、元组类型、函数类型等。通常用于创建复杂的类型组合
- `interface` 常用于定义**对象类型**的结构。可使用继承等特性

### `type`

```ts
type User = {
  name: string
  age: number
  sex?: number
}

type Status = 'draft' | 'published'
```

### `interface`

```ts
interface User {
  name: string
  age: number
  sex?: number
  getName: () => string
}
```

:::tip 注意

`interface` 定义的同名类型会自动合并, 如:

```ts
interface User {
  name: string
}

interface User {
  age: number
}

// 自动合并后的类型是
interface User {
  name: string
  age: number
}
```

:::

## 类型转换

### `as`

```ts
// 强制转换为 any
const distance: number = '100000' as any
```

`as const` 将值视为不可变的常量，而不是可变的变量

```ts
const name = 'lybenson' as const
```

`name` 类型是 `'lybenson'`, 而不是 `string`

如果是对象类型:

```ts
const user = {
  name: 'lybenson',
  age: 18
} as const
```

不使用 `as const`时, `user` 的类型会被推导为

```ts
const user: {
  name: string
  age: number
}
```

使用 `as const` 后, `user` 的类型会被推导为

```ts
const user: {
  readonly name: 'lybenson'
  readonly age: 18
}
```

### `<T>`

`T` 是需要转换的类型

```ts
const distance: number = <any>'100000'
```

## 内置类型声明

内置类型可以帮助我们更方便的定义类型，例如 `Omit` 可以剔除对象的属性

```ts
interface User = {
  name: string
  age: number
  sex?: number
  salary: number
  workTime: number
}

// Student 类型是 User 类型去除了字段 salary 和 workTime 后的类型
type Student = Omit<User, 'salary' | 'workTime'>
```

完整见下表

|                            类型名                            | 说明                                                                                    |
| :----------------------------------------------------------: | :-------------------------------------------------------------------------------------- |
|                         `Partial<T>`                         | 将 `T` 中所有属性变为**可选**                                                           |
|                        `Required<T>`                         | 将 `T` 中所有属性变为**必选**                                                           |
|                        `Readonly<T>`                         | 将 `T` 中所有属性变为**只读**                                                           |
|                 `Pick<T, K extends keyof T>`                 | 从 `T` 中选择一组属性,选择的属性在 `K` 中                                               |
|               `Record<K extends keyof any, T>`               | 构造一个属性名类型为 `K`, 属性类型为 `T` 的对象类型。如`type obj = Record<string, any>` |
|                       `Exclude<T, U>`                        | 从联合类型 `T` 中剔除包含在 `U` 中的类型                                                |
|                       `Extract<T, U>`                        | 从联合类型 `T` 中提取包含在 `U` 中的类型                                                |
|                `Omit<T, K extends keyof any>`                | 从 `T` 中剔除在 `K` 中的属性                                                            |
|                       `NonNullable<T>`                       | 从类型 `T` 中排除 `null` 和 `undefined`                                                 |
|        `Parameters<T extends (...args: any) => any>`         | 从函数类型 `T` 中提取参数类型，并返回一个由参数类型组成的元组类型                       |
|        `ReturnType<T extends (...args: any) => any>`         | 从函数类型 `T` 中提取并返回函数的返回值类型                                             |
| `InstanceType<T extends abstract new (...args: any) => any>` | 从构造函数类型 `T` 中提取并返回构造函数实例的类型                                       |
|                `Uppercase<S extends string>`                 | 将字符串类型 `S` 中的所有字符转换为大写字母，并返回一个新的字符串类型                   |
|                `Lowercase<S extends string>`                 | 将字符串类型 `S` 中的所有字符转换为小写字母，并返回一个新的字符串类型。                 |
|                `Capitalize<S extends string>`                | 将字符串类型 `S` 的第一个字符转换为大写字母                                             |
|               `Uncapitalize<S extends string>`               | 将字符串类型 `S` 的第一个字符转换为小写字母                                             |
|                        `ThisType<T>`                         | 指定方法中 `this` 关键字的类型                                                          |
