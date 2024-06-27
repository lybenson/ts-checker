# 3192 - Reverse

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/3192-medium-reverse/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/3192-medium-reverse/test-cases.ts)

实现类型版本的数组反转 `Array.reverse`

例如：

```typescript
type a = Reverse<['a', 'b']> // ['b', 'a']
type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
```

## Solution

```ts
type Reverse<T extends unknown[]> = T extends [...infer Rest, infer Last]
  ? [Last, ...Reverse<Rest>]
  : T
```

通过 `extends` 和 `infer` 组合，将数组分为两部分，

- 除数组最后一个元素外的 `Rest`
- 数组最后一个元素 `Last`

之后，返回类型中，将 `Last` 将置于数组头部，剩余部分继续反转，即可得到最终结果
