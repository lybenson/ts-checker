# IsOdd

如果一个数组是奇数则返回 `true`
例如：

## Solution

```ts
type IsOdd<T extends number> = `${T}` extends `${string}${'.' | 'e'}${string}`
  ? false
  : `${T}` extends `${string}${1 | 3 | 5 | 7 | 9}`
  ? true
  : false
```
