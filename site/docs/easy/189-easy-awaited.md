# 189 - Awaited

[Source](https://github.com/lybenson/ts-checker/blob/master/src/189-easy-awaited/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/189-easy-awaited/test-cases.ts)

假如我们有一个 `Promise` 对象，这个 `Promise` 对象会返回一个类型。在 TS 中，我们用 `Promise<T>` 中的 T 来描述这个 `Promise` 返回的类型。请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回 ExampleType 类型。

```ts
type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string
```

## Solution

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? R extends PromiseLike<unknown>
    ? MyAwaited<R>
    : R
  : never
```

`PromiseLike<T>` 用于表示类似于 `Promise` 的对象。这个接口定义了一个对象, 确保了这个对象有一个 `then` 方法，这使得它可以像 `Promise` 一样被使用。

本题中, 首先要求传入的泛型必须是 `PromiseLike` 的。之后判断泛型 `extends PromiseLike<infer R>`, 使用 `infer R` 获取具体的返回值类型 `R` , 这里使用 `extends` 的目的是为了获取 `R`

返回值类型 `R` 使用 `extends` 判断, 存在两种情况, 并

```ts
R extends PromiseLike<unknown>  MyAwaited<R> : R
```

- `R` 是 `PromiseLike` 类型, 则继续递归计算
- `R` 非 `PromiseLike` 类型, 直接返回最终类型 `R`
