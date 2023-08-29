# 16259 - To primitive

[Source](https://github.com/lybenson/ts-checker/blob/master/src/16259-medium-to-primitive/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/16259-medium-to-primitive/test-cases.ts)

将类型为字面类型（标签类型）的属性，转换为基本类型。

```ts
type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
}
```

要求结果如下：

```ts
type PersonInfo = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
}
```

## Solution

```ts
type ToPrimitive<T> = T extends object
  ? T extends (...args: unknown[]) => unknown
    ? Function
    : {
        [Key in keyof T]: ToPrimitive<T[Key]>
      }
  : T extends { valueOf: () => infer P }
  ? P
  : T
```

判断 `T` 是否是 `object`

- 是 `object`: 判断 `T` 是否是函数 `T extends (...args: unknown[]) => unknown`
  - 是函数: 返回 `Function`
  - 不是函数: 则递归计算类型
- 不是 `object`: 说明需要获取原始类型，`valueOf` 是所有对象的原型方法，返回的是原始类型
