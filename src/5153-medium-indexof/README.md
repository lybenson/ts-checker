# IndexOf

实现 `Array.indexOf` 的类型版本，`indexOf<T, U>` 接受一个数组 `T` 和任何`U`，并返回数组 `T` 中第一个 `U` 的索引。

例如：

```ts
type Res = IndexOf<[1, 2, 3], 2> // expected to be 1
type Res1 = IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3> // expected to be 2
type Res2 = IndexOf<[0, 0, 0], 2> // expected to be -1
```

## Solution

```ts
type Trunc<T extends string | number> = `${T}` extends `${infer L}.${infer _}`
  ? L extends '' | '-'
    ? `${L}0`
    : L
  : `${T}`
```

通过 `infer` 将字符串分为左右两部分

如果左边部分是空字符或者是 `'-'` 则返回 `${L}0`, 否则直接返回 `L`

如果不能将字符串分为左右两部分, 说明字符串没有 `.`, 即整个字符串都是整数部分，直接返回整个字符串即可。
