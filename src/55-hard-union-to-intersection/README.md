# 联合类型转化为交叉类型

实现高级工具类型 `UnionToIntersection<U>`

例如

```ts
type I = UnionToIntersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
```

## Solution

```ts
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => void
  ? I
  : never
```

解答本题你需要了解什么是逆变与协变

**协变 (Covariance)**

当 A 类型是 B 类型的子类型，并且这种关系保持不变时，我们说这种关系是协变的。在 TypeScript 中，大部分情况下的类型赋值都是协变的。

```ts
class Animal {}
class Dog extends Animal {}

let a: Animal
let d: Dog

a = d // 这是有效的，因为 Dog 是 Animal 的子类，所以是协变的
```

**逆变 (Contravariance)**

逆变是协变的反面。当 A 类型是 B 类型的子类型，但这种关系在某种上下文中被反转时，我们说这种关系是逆变的。在 TypeScript 中，**函数参数的类型关系是逆变的**。这意味着将一个函数赋值给另一个函数时，源函数的参数类型必须是目标函数参数类型的超类或等同于它

```ts
type CallbackWithAnimal = (param: Animal) => void
type CallbackWithDog = (param: Dog) => void

let callbackA: CallbackWithAnimal
let callbackD: CallbackWithDog

callbackA = callbackD // 无效的
callbackD = callbackA // 有效的
```

在逆变位置上，同一个类型的多个候选会被推断成交叉类型

如:

```ts
function combine<T>(callback1: (arg: T) => void, callback2: (arg: T) => void) {}

combine(
  (x: string) => {},
  (y: number) => {}
)
```

`combine` 函数中，传入两个函数作为参数传递(函数参数是逆变的)，其中一个函数接受 `string` 类型，另一个函数接受 `number` 类型。在逆变位置上，`TypeScript` 会尝试找到一个类型，该类型可以作为两个函数参数类型的公共类型。在这种情况下，最合适的类型是 `string` 和 `number` 的交叉类型，即 `string & number`

回到题目中以一个具体的例子作为解释

```ts
type UnionToIntersection<U> = (
  U extends U ? (arg: U) => unknown : never
) extends (arg: infer R) => unknown
  ? R
  : never

type M = UnionToIntersection<string | number>
```

首先 `U` 是 `string | number`, 经过

```ts
U extends U ? (arg: U) => unknown : never
```

返回

```ts
(arg: string) => unknown | (arg: number) => unknown
```

之后

```ts
((arg: string) => unknown | (arg: number) => unknown) extends (arg: infer R) => unknown ? R : never
```

根据逆变规则: 在逆变位置上，同一个类型的多个候选会被推断成交叉类型, 即 `R` 会被推断为

```ts
string & number
```

最后再返回 `R` 即得到最终的结果
