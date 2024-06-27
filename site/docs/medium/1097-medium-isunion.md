# 1097 - IsUnion

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/1097-medium-isunion/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/1097-medium-isunion/test-cases.ts)

实现类型 `IsUnion`，判断类型 `T` 是否是联合类型

例如:

```ts
type case1 = IsUnion<string> // false
type case2 = IsUnion<string | number> // true
type case3 = IsUnion<[string | number]> // false
```

## Solution

```ts
type IsUnion<T, U = T> = [T] extends [never]
  ? false
  : T extends U
  ? [U] extends [T]
    ? false
    : true
  : never
```
