# 关键字

## keyof

`keyof T` 用于获取类型 `T` 的所有属性名，并返回属性名构成的联合类型，如

```ts
type User = {
  id: number
  name: string
  age: number
}
type UserKey = keyof User // 'id' | 'name' | 'age'
```

## typeof

`typeof` 用于获取变量的类型

```ts
const user = {
  id: 1,
  name: 'lybenson',
  age: 18
}
type User = typeof user

// 相当于
type User = {
  id: number
  name: string
  age: number
}
```

## infer

常用在存在泛型的类型定义中。由于在泛型中无法直接获得泛型内部相关参数的类型，因此可以使用 `infer` 并接合 `extends` 用于类型推导。

例如：获取函数的返回值类型

```ts
type GetFunctionReturnType<T extends Function> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never

type ReturnType = GetFunctionReturnType<() => string> // string
```

`GetFunctionReturnType` 约束泛型 `T` 必须是函数, 具体实现中通过 `extends` 和 `infer` 关键字获取函数的返回值类型

## in

`in` 可以安全的检查一个对象上是否存在一个属性

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}
interface User {
  id: number
  name: string
  age: number
}

function getName(instance: User | Todo): string {
  // 检查 instance 是否有 name 字段
  if ('name' in instance) {
    return instance.name
  }
  return ''
}
```

## satisfies

`satisfies` 表示表达式满足类型的某一种情况

```ts
type Employee = {
  id: number
  name: string
  salary:
    | number
    | {
        id: string
        amount: number
      }
}
```

`Employee.salary` 字段表示员工的薪资类型, 可以是一个具体数量的金额，也可以是等值的某种物品

使用 `Employee` 类型

```ts
const employee: Employee = {
  id: 1,
  name: 'lybenson',
  salary: {
    id: 'mbp-latest',
    amount: 1
  }
}

employee.salary.id // Property 'id' does not exist on type 'number | { id: string; amount: number; }'.
```

上面定义员工的工资是一台最新款的 `mbp`, 但使用 `employee.salary.id` 时会报错, 因为 `salary` 类型还有可能是 `number`

使用 `satisfies` 处理这种情况。定义变量时不需要使用显示声明类型, 而是使用 `satisfies` 让变量去匹配类型, 如果无法匹配类型则会报错

```ts
const employee = {
  id: 1,
  name: 'lybenson',
  salary: {
    id: 'mbp',
    amount: 1
  }
} satisfies Employee
```

变量 `employee` 类型被推导为

```ts
const employee: {
  id: number
  name: string
  salary: {
    id: string
    amount: number
  }
}
```
