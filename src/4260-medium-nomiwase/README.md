# AllCombinations

实现类型 `AllCombinations<S>`，返回使用`S`中字符的所有组合字符串，每个字符最多只能使用一次。

例如:

```ts
type AllCombinations_ABC = AllCombinations<'ABC'>
// should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
```

## Solution

```ts
type AllCombinations<S extends string, U extends string = StringToUnion<S>> = [
  U
] extends [never]
  ? ''
  : '' | { [K in U]: `${K}${AllCombinations<never, Exclude<U, K>>}` }[U]
```

`AllCombinations` 接收两个泛型

- `S`: 字符串
- `U`: 默认为字符串中每个字符组成的联合类型, `StringToUnion` 来自于 531 题

如果 `U` 是 `never` 则返回空字符，否则将通过类型映射进行递归

下面以一个实际的例子介绍内部是如何运行的。假设字符串 `S` 等于 `'AB'`

则 `U` 等于 `'A' | 'B'`

在判断 `never` 的分支上不满足, 则进入另一个分支

```ts
{ [K in U]: `${K}${AllCombinations<never, Exclude<U, K>>}` }
```

在 [映射类型](https://ts.syen.me/core/mapped-types) 章节中, 我们知道, 当 `in` 后面是联合类型时, 则会对联合类型的各个子类型分别赋值给 `K`, 而 `Exclude` 则是将从联合类型中剔除特定的类型

此时该分支就变成了

```ts
{
  'A': `A${AllCombinations<never, 'B'}`,
  'B': `B${AllCombinations<never, 'A'}`,
}
```

`AllCombinations<never, 'B'>` 结果为

```ts
'' | 'B'
```

同理, 最后分支变为了

```ts
{
  'A': `A${'' | 'B'}`,
  'B': `B${'' | 'A'}`,
}
```

得到

```ts
{
  'A': 'A' | 'AB',
  'B': 'B' | 'BA',
}
```

在类型映射分支的最后加上 `[U]`

```ts
{
  'A': 'A' | 'AB',
  'B': 'B' | 'BA',
}['A' | 'B']
```

得到结果 `'A' | 'AB' | 'B' | 'BA'`

最后在联合上空字符, 即得到了最终结果。
