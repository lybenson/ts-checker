# 4179 - Flip

[Source](https://github.com/lybenson/ts-checker/blob/master/src/4179-medium-flip/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/4179-medium-flip/test-cases.ts)

实现类型 `just-flip-object`

例如:

```typescript
Flip<{ a: 'x'; b: 'y'; c: 'z' }> // {x: 'a', y: 'b', z: 'c'}
Flip<{ a: 1; b: 2; c: 3 }> // {1: 'a', 2: 'b', 3: 'c'}
Flip<{ a: false; b: true }> // {false: 'a', true: 'b'}
```

不需要支持嵌套对象和不能作为对象键的值，如数组

## Solution

```ts
type Flip<T extends Record<string, string | number | boolean>> = {
  [P in keyof T as `${T[P]}`]: P
}
```
