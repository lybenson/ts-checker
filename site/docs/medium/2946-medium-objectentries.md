# 2946 - ObjectEntries

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/2946-medium-objectentries/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/2946-medium-objectentries/test-cases.ts)

实现 `Object.entries` 类型化版本

例如：

```ts
interface Model {
  name: string
  age: number
  locations: string[] | null
}
type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
```

## Solution

```ts
type ObjectEntries<T> = {
  [P in keyof T]-?: [
    P,
    Required<T>[P] extends never ? undefined : Required<T>[P]
  ]
}[keyof T]
```

通过 **类型映射** 先将类型转换成如下格式

```ts
{
  name: ['name', string]
  age: ['age', number]
  locations: ['locations', string[] | null]
}
```

再通过 `keyof T` 取出所有字段类型构成的联合类型

在格式转换过程中的核心代码如下

```ts
Required<T>[P] extends never ? undefined : Required<T>[P]
```

使用 `Required` 用来处理可选类型的情况, 这是由于可选类型默认带有 `undefind` 类型。例如

```ts
type T = {
  name?: string
  age?: undefined
}
```

对于 `name` 字段, 使用 `Required<T>[P]` 可以去除可选类型默认的 `undefined` 类型, 而如果直接使用 `T[P]`, 则会返回 `string | undefined`

对于 `age` 字段, 既是可选类型, 又显示声明了 `undefined` 类型。使用 `Required<T>[P]` 则会得到 `never` 类型, 因此需要单独的判断。如果类型是 `never` 则返回 `undefined`
