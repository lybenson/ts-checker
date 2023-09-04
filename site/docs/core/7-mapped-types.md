# 映射类型

映射类型通过在现有类型的每个属性上应用某种转换或映射规则来生成新的类型。基本语法如下

```ts
type TypeName<T> = {
  [P in keyof T]: T[P]
}
```

核心是方括号内的 `in` 关键字，当 `in` 后面是联合类型时，则会对联合类型的各个子类型分别赋值给 `P`

以内置类型 `Readonly` 举例, 作用是将传入的对象类型的属性都变为 `readonly`

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type User = {
  name: string
  age: number
}
// 传入 User 类型
type ReadonlyUser = Readonly<User>

// ReadonlyUser 等同于
type ReadonlyUser = {
  readonly name: string
  readonly age: number
}
```

当 `T` 为 `User` 类型时, `keyof T` 就等于联合类型 `'name' | 'age'`, `Readonly` 就变为了

```ts
type Readonly<User> = {
  readonly [P in 'name' | 'age']: User[P]
}
```

当 `in` 后面是联合类型时，则会对联合类型的各个子类型分别赋值给 `P`, 即对 `P` 赋值为 `'name'` 和 `'age'`

```ts
type Readonly<User> = {
  // P 为 name
  readonly name: User['name']
  // P 为 age
  readonly age: User['age']
}
```

得到最终结果

```ts
type ReadonlyUser = {
  readonly name: string
  readonly age: number
}
```
