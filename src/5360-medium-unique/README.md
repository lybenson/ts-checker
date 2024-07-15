# Unique

实现 `Lodash.uniqe` 类型版本，`Unique`接受一个数组 T`，返回没有重复值的数组 `T`
例如：

```ts
type Res = Unique<[1, 1, 2, 2, 3, 3]> // expected to be [1, 2, 3]
type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]> // expected to be [1, 2, 3, 4, 5, 6, 7]
type Res2 = Unique<[1, 'a', 2, 'b', 2, 'a']> // expected to be [1, "a", 2, "b"]
type Res3 = Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]> // expected to be [string, number, 1, "a", 2, "b"]
type Res4 = Unique<[unknown, unknown, any, any, never, never]> // expected to be [unknown, any, never]
```

## Solution

```ts
type Unique<T extends any[], C extends any[] = []> = T extends [
  infer F,
  ...infer R
]
  ? IndexOf<C, F> extends -1
    ? Unique<R, [...C, F]>
    : Unique<R, C>
  : C
```

首先思考如果 `T` 不是类型, 而是具体的值。要实现数组去重, 通常需要遍历数组元素。

但在 `ts` 类型定义中, 无法使用循环, 替代循环的方式只能是递归。在递归的过程中, 通常需要一个额外的泛型 `C` 来记录循环的次数或者当前递归的结果。

在 `Unique` 类型定义中, 定义了泛型 `C` 用于存储当前递归的结果，表示最终的去重结果数组。

首先判断 `T` 中是否有元素, 不存在元素, 则直接返回上一轮递归的结果 `C`

存在元素, 则拿到首元素 `F`, 并判断 `C` 中是否存在 `F`。用于判断的逻辑借助[5153](https://ts.syen.me/medium/medium-indexof) 题的答案。若 `F` 存在于 `C` 中, 则表示重复了, 只需递归剩余元素即可。若不存在则将 `F` 加入 `C`, 并继续递归剩余元素。
