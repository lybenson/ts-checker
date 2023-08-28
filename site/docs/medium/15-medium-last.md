# 15 - 最后一个元素

[Source](https://github.com/lybenson/ts-checker/blob/master/src/15-medium-last/template.ts)

> 在此挑战中建议使用TypeScript 4.0

实现一个`Last<T>`泛型，它接受一个数组`T`并返回其最后一个元素的类型。

例如

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // 应推导出 'c'
type tail2 = Last<arr2> // 应推导出 1
```

## Solution

第一种方式:

```ts
type Last<T extends any[]> = T extends [...unknown[], infer R] ? R : never
```

通过 `infer R` 推断最后一个元素的类型并返回

第二种方式:

```ts
type Last<T extends any[]> = [any, ...T][T['length']]
```

由于 ts 类型定义中不能进行算术运算，因此不能通过 `length - 1` 的方式获取数组的最后一个元素, 只能访问 `length` 属性

所以创建一个新的类型数组，并在索引为0的位置添加一个 `any` 类型的值，再访问 `length` 属性获取最后一个元素的类型
