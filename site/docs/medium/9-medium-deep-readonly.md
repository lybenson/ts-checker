# 9 - 对象属性只读（递归）

[Source](https://github.com/lybenson/ts-checker/blob/master/src/9-medium-deep-readonly/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/9-medium-deep-readonly/test-cases.ts))

实现一个泛型 `DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。不考虑数组、函数、类等。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如

```ts
type X = {
  x: {
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```

## Solution

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>
}
```

使用 `keyof T[P] extends never` 判断是否有子对象, 若有则传入子对象类型进行递归调用, 否则直接返回
