# All

如果列表中的所有元素都等于传递的第二个参数，则返回 true，如果有任何不匹配，则返回 false。
例如：

```ts
type Test1 = [1, 1, 1]
type Test2 = [1, 1, 2]

type Todo = All<Test1, 1> // should be same as true
type Todo2 = All<Test2, 1> // should be same as false
```

## Solution

```ts
type All<T extends any[], U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? All<R, U>
    : false
  : true
```
