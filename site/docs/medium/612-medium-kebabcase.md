# 612 - KebabCase

[Source](https://github.com/lybenson/ts-checker/blob/master/src/612-medium-kebabcase/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/612-medium-kebabcase/test-cases.ts)

使用 `kebab-case` 替换 `camelCase` 或 `PascalCase` 字符串

`FooBarBaz` -> `foo-bar-baz`

例如：

```ts
type FooBarBaz = KebabCase<'FooBarBaz'>
const foobarbaz: FooBarBaz = 'foo-bar-baz'

type DoNothing = KebabCase<'do-nothing'>
const doNothing: DoNothing = 'do-nothing'
```

## Solution

```ts
type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S
```

通过 `extends` 和 `infer` 将字符串分成两部分，具体分割成哪两部分取决于 `S2 extends Uncapitalize<S2>`

`Uncapitalize<S2>` 将 `S2` 的第一个字符转换为小写。如果 `S2` 的第一个字符已经是小写，那么 `S2` 就是 `Uncapitalize<S2>` 的子集

因此，对于 `S = 'FooBarBaz'`：

- `S1` 会被推导为`'F'`
- `S2` 会被推导为`'ooBarBaz'`

然后检查 `S2` 是否 `extends Uncapitalize<S2>` 后，返回 `${Uncapitalize<S1>}${KebabCase<S2>}`, 即将 `S1` 小写, 再将 `S2` 递归处理
