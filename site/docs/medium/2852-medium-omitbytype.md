# 2852 - OmitByType

[Source](https://github.com/lybenson/ts-checker/blob/master/src/2852-medium-omitbytype/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/2852-medium-omitbytype/test-cases.ts)

从 `T` 中选择属性，且属性的类型不是 `U`

例如:

```typescript
type OmitBoolean = OmitByType<
  {
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  },
  boolean
> // { name: string; count: number }
```

## Solution

```ts
type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P]
}
```

遍历 `keyof T`, 判断属性类型是否属于 `U`

```ts
T[P] extends U ? never : P
```

属于，则不返回
