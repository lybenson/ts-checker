# 1042 - IsNever

[Source](https://github.com/lybenson/ts-checker/blob/master/src/1042-medium-isnever/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/1042-medium-isnever/test-cases.ts)

实现类型 `IsNever`, 如果输入的泛型 `T` 类型是 `never` 返回 `true`, 否则返回 `false`

例如：

```ts
type A = IsNever<never> // expected to be true
type B = IsNever<undefined> // expected to be false
type C = IsNever<null> // expected to be false
type D = IsNever<[]> // expected to be false
type E = IsNever<number> // expected to be false
```

## Solution

```ts
type IsNever<T> = [T] extends [never] ? true : false
```

or

```ts
type IsNever<T> = Equal<never, T>
```
