# 5317 - LastIndexOf

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/5317-medium-lastindexof/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/5317-medium-lastindexof/test-cases.ts)

实现 `Array.lastIndexOf` 的类型版本，`LastIndexOf<T, U>` 接受一个数组 `T` 和任意的 `U`，并返回数组 `T` 中最后一个 U 的索引。
例如：

```ts
type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
```

## Solution

```ts
type LastIndexOf<
  T extends any[],
  U,
  C extends 0[] = [],
  I extends number = -1
> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? LastIndexOf<R, U, [0, ...C], C['length']>
    : LastIndexOf<R, U, [0, ...C], I>
  : I
```

首先思考如果 `T` 不是类型, 而是具体的值。要获取最后一个元素的索引, 通常需要遍历数组元素找到最后一个索引值。

但在 `ts` 类型定义中, 无法使用循环, 替代循环的方式只能是递归。在递归的过程中, 通常需要一个额外的泛型 `C` 来记录循环的次数或者当前递归的结果。

在 `LastIndexOf` 类型定义中, 泛型 `C` 表示循环次数, 泛型 `I` 表示最终的结果。

首先通过 `infer` 关键字提取数组首元素 `F`, 接着判断 `F` 和 `U` 类型是否全等。全等则表示找到，并记录当前索引值, 传递到下一轮递归中, 否则当前索引值仍等于上一轮递归结果。
