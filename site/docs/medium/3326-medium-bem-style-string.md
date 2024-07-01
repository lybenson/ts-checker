# 3326 - BEM style string

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/3326-medium-bem-style-string/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/3326-medium-bem-style-string/test-cases.ts)

块、元素、修饰符方法（BEM）是CSS类的一种流行命名约定。

例如，块组件可以表示为 `btn`，依赖于该块的元素可以表示为 `btn__price`，改变块样式的修饰符可以表示为`btn--big`或`btn__price--warning`

实现一个从这三个参数生成字符串联合的`BEM<B, E, M>`。其中`B`是字符串文字，`E`和`M`是字符串数组（可以为空）。

## Solution

```ts
type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = `${B}${E extends [] ? '' : `__${E[number]}`}${M extends []
  ? ''
  : `--${M[number]}`}`
```

对于数组类型 `E`， 在类型定义中通过 `E[number]` 可以获得数组元素构成的联合类型。如果数组为空, 则会得到 `never` 类型

在 `BEM` 的类型定义中，字符串拼接的过程中，如果遇到联合类型, 则会遍历联合类型, 每次取出一个联合类型, 构成新的联合类型。

例如:

```ts
type S = `size_${'sm' | 'md' | 'lg'}`

// 遍历联合类型构成新的联合类型
type S = 'size_sm' | 'size_md' | 'size_lg'
```
