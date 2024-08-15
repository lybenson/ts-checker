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

## is

`is` 关键字常用于类型谓词(type predicate)。

类型谓词通过定义一个函数来检查某个值是否属于特定类型。这个函数返回一个**布尔值**, 如果函数返回 `true`, 则表示将这个值的类型收窄为特定的类型

```ts
function getName(name: string | undefined): name is string {
  return !!name
}

function getFullName(
  firstName: string | undefined,
  lastName: string | undefined
) {
  if (getName(firstName) && getName(lastName)) {
    return firstName + lastName
  }
  return ''
}
```

`getFullName` 函数用于将 `firstName` 和 `lastName` 相加，但由于这两个参数都有可能是 `undefined`, 直接相加会报错。通过函数 `getName` 的类型谓词 `name is string`, 返回 `true`, 则表示 `name`是 `string` 类型。

如果 `firstName` 有值, 调用 `getName(firstName)` 后, 在 `if` 条件块中 `firstName` 类型将收窄为 `string` 类型。

一个更复杂的例子:

```ts
// 管理员角色
type Admin = {
  kind: 'admin'
  name: string
  privileges: string[]
}

// 普通用户角色
type User = {
  kind: 'user'
  name: string
  accessLevel: number
}

// 统一角色类型
type Role = Admin | User

// 判断角色是否是管理员
function isAdmin(role: Role): role is Admin {
  return role.kind === 'admin' && Array.isArray(role.privileges)
}

// 判断角色是否是普通用户
function isUser(role: Role): role is User {
  return role.kind === 'user' && typeof role.accessLevel === 'number'
}

// 使用这些类型谓词的函数
function processRole(role: Role) {
  if (isAdmin(role)) {
    console.log(
      `Admin ${role.name} has privileges: ${role.privileges.join(', ')}`
    )
  } else if (isUser(role)) {
    console.log(`User ${role.name} has access level: ${role.accessLevel}`)
  }
}
```

在 `processRole` 函数中, 调用 `isAdmin(role)` 如果返回 `true`, 则在 `if` 条件块中参数 `role` 类型将收窄为 `Admin`

## asserts

`asserts` 关键字定义一个函数,该函数在某个条件不满足时会抛出错误,而在条件满足时则不做任何事

```ts
interface User {
  id: number
  name: string
}

// 断言 obj 是否是 User 类型
function assertUser(obj: any): asserts obj is User {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Value must be an object')
  }
  if (typeof obj.id !== 'number') {
    throw new Error('id must be a number')
  }
  if (typeof obj.name !== 'string') {
    throw new Error('name must be a string')
  }
}

function processUser(user: unknown) {
  assertUser(user)

  // 参数 user 类型变为 User
  console.log(`User ${user.name} has id ${user.id}`)
}
```

在 `processUser` 函数中, 调用 `assertUser(user)`, 如果没有抛出异常, 则参数 `user` 的类型将被收窄为 `User`

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

使用 `satisfies` 处理这种情况。定义变量时不需要显示声明类型, 而是使用 `satisfies` 让变量去匹配类型, 如果无法匹配类型则会报错

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
