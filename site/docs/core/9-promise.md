# Promise

## 基本使用

在 `ts` 声明 `Promise` 类型，需要传递一个泛型用来指定 `resolve` 后的返回值类型。

如：

```ts
interface User {
  name: string
  age: number
}
const getPromisifyUser = () => {
  return new Promise<User>((resolve) => {
    resolve({
      name: 'lybenson',
      age: 18
    })
  })
}

;(async () => {
  const user = await getPromisifyUser()
})()
```

`getPromisifyUser` 的类型会被自动推导为 `() => Promise<User>`

`await getPromisifyUser()` 后的返回值类型是 `User`

如果在 `then` 方法中:

```ts
// user类型为 User
getPromisifyUser().then((user) => {
  return user
})
```

`then` 方法中回调函数的参数类型也会被推导为 `User`

## 内置类型

### PromiseConstructor

用于构造 `Promise` 和 定义静态方法

```ts showLineNumbers
interface PromiseConstructor {
  readonly prototype: Promise<any>

  new <T>(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => void
  ): Promise<T>

  all<T extends readonly unknown[] | []>(
    values: T
  ): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>

  race<T extends readonly unknown[] | []>(
    values: T
  ): Promise<Awaited<T[number]>>

  reject<T = never>(reason?: any): Promise<T>

  resolve(): Promise<void>
  resolve<T>(value: T): Promise<Awaited<T>>
  resolve<T>(value: T | PromiseLike<T>): Promise<Awaited<T>>
}
```

### Promise

定义 `Promise` 上的实例方法

```ts showLineNumbers
interface Promise<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>

  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>
}
interface Promise<T> {
  finally(onfinally?: (() => void) | undefined | null): Promise<T>
}
```

### PromiseLike

```ts showLineNumbers
interface PromiseLike<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): PromiseLike<TResult1 | TResult2>
}
```

`PromiseLike` 只有 `then` 方法, 因此并不具备错误处理能力

### Awaited

```ts
type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F, ...args: infer _): any }
  ? F extends (value: infer V, ...args: infer _) => any
    ? Awaited<V>
    : never
  : T
```

`Awaited` 用于获取 `Promise` 的返回值类型，根据传入的泛型 `T`，分为以下几种情况

- `T` 是 `null` 或 `undefined` 则原样返回
- `T` 是一个包含 `then` 方法的对象类型
  - 是，判断 `then` 方法中的参数 `onfulfilled` 类型是否是函数
    - 是，递归调用 `Awaited`, 传入 `onfulfilled` 第一个参数类型
    - 不是，返回 `never`
  - 不是，直接返回 `T`

```ts
type PromiseAwaited = Awaited<Promise<string>> // string

type RecursivePromiseAwaited = Awaited<Promise<Promise<string>>> // string

type BooleanAwaited = Awaited<boolean> // boolean

type UnionAwaited = Awaited<Date | Promise<Promise<string>>> // string | Date

type SimulatePromiseAwaited = Awaited<{ then: () => string }> // never

type PromiseLikeAwaited = Awaited<{
  then: (onfulfilled: (value: number) => any) => string
}> // number
```
