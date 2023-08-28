# 116 - Replace

[Source](https://github.com/lybenson/ts-checker/blob/master/src/116-medium-replace/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/116-medium-replace/test-cases.ts))

实现 `Replace<S, From, To>` 将字符串 `S` 中的第一个子字符串 `From` 替换为 `To` 。

例如

```ts
type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
```

## Solution

```ts
type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer V}${From}${infer R}`
  ? `${V}${To}${R}`
  : S
```

`From` 为空则直接返回原字符串类型, 不为空则执行

```ts
S extends`${infer V}${From}${infer R}`
```

通过 `infer` 关键字对原字符串进行类型分离, 找出 `From` 后替换为 `To`
