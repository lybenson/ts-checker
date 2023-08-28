# 2595 - PickByType

[Source](https://github.com/lybenson/ts-checker/blob/master/src/2595-medium-pickbytype/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/2595-medium-pickbytype/test-cases.ts))

从 `T` 中，选择属性，满足其类型是 `U`

例如：

```typescript
type OnlyBoolean = PickByType<
  {
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  },
  boolean
> // { isReadonly: boolean; isEnable: boolean; }
```

## Solution

```ts
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}
```

`P in keyof T as T[P] extends U ? P : never` 看出两部分

`A as B`

`A = P in keyof T` 和 `B = T[P] extends U ? P : never`

`A` 遍历 `T` 中的属性，`B` 用来判断属性类型 `T[P]` 是否是 `U`, 若是，则返回 `P`, 否则返回 `never`
