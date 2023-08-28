# 43 - 实现 Exclude

[Source](https://github.com/lybenson/ts-checker/blob/master/src/43-easy-exclude/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/43-easy-exclude/test-cases.ts))

实现内置的 `Exclude<T, U>` 类型，但不能直接使用它本身。

> 从联合类型 `T` 中排除 `U` 中的类型，来构造一个新的类型。

例如：

```ts
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

## Solution

```ts
type MyExclude<T, U> = T extends U ? never : T
```

在 `extends` 语句中，如果 `T` 是联合类型，则对联合类型的各个子类型进行一次循环, 这叫做联合类型的 `distributive` 行为

如

`T = 'a' | 'b'` , 在语句 `T extends U ? X : Y` 中等同于

```ts
('a' extends U ? X : Y) | ('b' extends U ? X : Y)
```
