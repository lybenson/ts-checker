# Combination key type

- 把多个修饰键两两组合，但不可以出现相同的修饰键组合。
- 提供的 `ModifierKeys` 中，前面的值比后面的值高，即 `cmd ctrl` 是可以的，但 `ctrl cmd` 是不允许的。

## Solution

```ts
type Combs<T extends any[]> = T extends [
  infer F extends string,
  ...infer R extends string[]
]
  ? `${F} ${R[number]}` | Combs<R>
  : never
```

在模板字符串中, 存在联合类型时, 则会把其余部分与联合类型的各个部分进行相互联合

在 `Combs` 类型定义中, 分离出了首元素 `F`

假设 `F = 'cmd'`, `R = ['ctrl', 'opt', 'fn']`

则 `R[number] = 'ctrl' | 'opt' | 'fn'`

模板字符串 `${F} ${R[number]}` 结果则等于 `'cmd ctrl' | 'cmd opt' | 'cmd fn'`
