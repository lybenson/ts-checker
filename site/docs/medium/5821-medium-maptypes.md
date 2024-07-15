# 5821 - MapTypes

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/5821-medium-maptypes/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/5821-medium-maptypes/test-cases.ts)

实现 `MapTypes<T, R>`，它将对象 `T` 中的类型转换为由类型 `R` 定义的不同类型，其结构如下

```ts
type StringToNumber = {
  mapFrom: string // value of key which value is string
  mapTo: number // will be transformed for number
}
```

例如：

```ts
type StringToNumber = { mapFrom: string; mapTo: number }
MapTypes<{ iWillBeANumberOneDay: string }, StringToNumber> // gives { iWillBeANumberOneDay: number; }
```

请注意，用户可以提供类型联合：

```ts
type StringToNumber = { mapFrom: string; mapTo: number }
type StringToDate = { mapFrom: string; mapTo: Date }
MapTypes<{ iWillBeNumberOrDate: string }, StringToDate | StringToNumber> // gives { iWillBeNumberOrDate: number | Date; }
```

如果类型不存在于我们的映射中，请保留原样：

```ts
type StringToNumber = { mapFrom: string; mapTo: number }
MapTypes<
  { iWillBeANumberOneDay: string; iWillStayTheSame: Function },
  StringToNumber
> // // gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }
```

## Solution

```ts
type MapTypes<T, R extends { mapFrom: any; mapTo: any }> = {
  [P in keyof T]: T[P] extends R['mapFrom']
    ? R extends { mapFrom: T[P] }
      ? R['mapTo']
      : never
    : T[P]
}
```

通过 [映射类型](https://ts.syen.me/core/mapped-types) 提取对象类型中的字段和属性。

判断对象类型中的属性类型 `T[P]` 是否属于 `R['mapFrom']`, 若属于, 则表明要进行类型转换, 否则保留原类型

由于 `R` 可能是联合类型。例如 `R` 类型是

```ts
{ mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }
```

则:

- `R['mapFrom']` 类型为 `string | Date`
- `R['mapTo']` 类型为 `boolean | string`

如果 `T[P]` 是 `string`, 则只能应用规则 `{ mapFrom: string; mapTo: boolean }` 转换为 `boolean`。而不能直接设置为 `R['mapTo']`

因此还需要一层判断 `R extends { mapFrom: T[P] }`

在条件类型中, `R` 是 联合类型, 则会对联合类型的各个子类型分别应用 `extends`。

```ts
{ mapFrom: string; mapTo: boolean } extends { mapFrom: T[P] }
{ mapFrom: Date; mapTo: boolean } extends { mapFrom: T[P] }
```

`mapFrom`类型相同的, 则选择对应的 `mapTo`, 否则返回 `never`
