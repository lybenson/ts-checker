---
title: class
---

## 基本使用

使用关键字 `class` 定义类

```ts
class User {
  readonly id: bigint // 只读属性
  name: string
  age?: number // 可选属性
  private salary: number = 0 // 私有属性

  // 定义构造函数
  constructor(id: bigint, name: string, age: number = 0, salary?: number) {
    this.id = id
    this.name = name
    this.age = age
    this.salary = salary
  }

  // 定义实例方法
  eat(food: string) {
    console.log(`${this.name} is eating ${food}`)
  }
}

// 创建类实例
const user = new User(1n, 'syen', 30, 1000)
user.eat('banana') // 打印： syen is eating banana
```

## 可见性

可见性定义了类中的字段和方法对外的可访问权限, 有三种可见性修饰符

- `public` 公开的,无访问权限限制 (默认)
- `protected` 类内部及其子类可访问
- `private` 仅供类内部访问

如果在构造函数的参数前添加可见性修饰符, 那么这些参数将自动变为类的成员

```ts
class User {
  // 构造函数: name 是类的成员
  constructor(public name: string) {
    this.name = name
  }
}

const user = new User('John')
console.log(user.name)
```

## 继承

派生类通过关键字 `extend` 继承基类的所有属性和方法，并可以定义其他字段。还可以重写基类的方法

例如

```ts
// Employee 称作派生类, User 称作基类
class Employee extends User {
  department: string

  constructor(
    id: bigint,
    name: string,
    age: number,
    salary: number,
    department: string
  ) {
    // super 关键字调用基类的构造函数
    super(id, name, age, salary)
    this.department = department
  }

  work() {
    console.log(`${this.name} is working in ${this.department}`)
  }

  // 重写基类的方法
  eat(food: string) {
    console.log(`${this.name} is eating ${food} on canteen`)
  }
}
```

## 静态成员

静态成员是定义在类上的属性，而不是类的实例上。这意味着静态成员不能被类的实例访问。

```ts
class User {}
class UserList {
  // 静态属性
  static count: number = 0
  add(user: User) {
    UserList.count++
  }
  // 静态方法
  static getCount() {
    return UserList.count
  }
}

const userList = new UserList()
userList.add(new User())
userList.add(new User())
userList.add(new User())

console.log(UserList.count) // 打印：3
console.log(UserList.getCount()) // 打印：3
```

> 静态成员也可以使用可见性修饰符

## 泛型类

定义类的时候, 还可以传入泛型

```ts
class User<T> {
  data: T
  update(data: T) {
    this.data = data
  }
}
```

## 抽象类

抽象类（`abstract class`）是一种特殊的类，它不能直接实例化。但可以作为派生类的基类。抽象类中可以添加抽象属性和抽象方法

抽象属性不能设置初始值, 抽象方法不能有实现。派生类在继承抽象类后，必须实现其中的抽象属性和抽象方法

```ts
abstract class User {
  abstract id: bigint // 抽象属性

  abstract eat(): void // 抽象方法

  sleep() {
    console.log('User sleep')
  }
}

// 派生类继承
class Person extends User {
  id: bigint = 10n

  // 实现抽象方法
  eat() {
    console.log('Person eat')
  }
}

const p = new Person()
console.log(p.id) // 打印: 10n
p.eat() // 打印: Person eat
p.sleep() // 打印: User sleep
```

## 实现接口

类可以使用关键字 `implements` 去实现一个接口。这个接口定义了类必须要具备的结构。

```ts
interface IHuman {
  name: string
  age: number
  eat: () => void
}

class Human implements IHuman {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  eat() {
    console.log('eat')
  }
}
```

> 尽管接口也常被用来进行类型定义，但对于类实现接口来说也并不冲突。类实现了接口，也就说明了类具有接口定义的所有字段和方法。
