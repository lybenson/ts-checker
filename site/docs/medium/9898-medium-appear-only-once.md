# 9898 - Appear only once

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/9898-medium-appear-only-once/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/9898-medium-appear-only-once/test-cases.ts)

找出目标数组中只出现过一次的元素。例如：输入 `[1,2,2,3,3,4,5,6,6,6]`，输出 `[1,4,5]`

## Solution

```ts
type FindEles<T extends any[], C extends any[] = []> = T extends [
  infer F,
  ...infer R
]
  ? F extends C[number]
    ? FindEles<R, [...C, F]>
    : F extends R[number]
    ? FindEles<R, [...C, F]>
    : [F, ...FindEles<R, [...C, F]>]
  : []
```
