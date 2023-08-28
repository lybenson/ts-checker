# 599 - Merge

[Source](https://github.com/lybenson/ts-checker/blob/master/src/599-medium-merge/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/599-medium-merge/test-cases.ts))

将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。

例如

```ts
type foo = {
  name: string
  age: string
}

type coo = {
  age: number
  sex: string
}

type Result = Merge<foo, coo> // expected to be {name: string, age: number, sex: string}
```

## Solution

```ts
type Merge2<
  F extends Record<string, unknown>,
  S extends Record<string, unknown>
> = {
  [K in keyof (F & S)]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never
}
```

`F` 和 `S` 继承自 `Record<string, unknown>` 要求 `F` 和 `S` 必须是对象类型

`keyof (F & S)` 返回 `F` 和 `S` 中 `key` 组成的联合类型, 相同的 `key` 会去重

接着遍历这个联合类型, 优先判断 `key` 是否在 `S` 中, 存在则返回 `S[K]`, 否则判断 `key` 是否在 `F` 中, 存在则返回 `F[K]`

需要注意的是，不可写成下面的判断形式

```ts
[K in keyof (F & S)]: K extends keyof S ? S[K] : F[K]
```

由于 `K` 仅仅只是一个字符串类型，尽管已经判断了 `K` 不属于 `keyof S`, 但也不代表属于 `keyof F`, 因此不能在最后使用 `F[K]`
