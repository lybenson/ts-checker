---
title: 技巧
draft: true
---

## 判断类型全等

## 条件类型中的分配律

`T extends T ? T : never` 遍历联合类型

## 判断 never 类型

`[T] extends [never] ? true : false`

## 强制类型展开

`Omit<T, never>`

```ts
type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
```
