# Tower of hanoi

模拟解决汉诺塔问题。你的代码应该接受圆盘数量作为输入，并返回一个步骤数组，将圆盘从塔A移动到塔B，使用塔C进行辅助。数组中的每个条目应该是一对字符串 `[From, To]`，表示圆盘从 `From -> To`。

## Solution

```ts
type Hanoi<
  N extends number,
  From extends string = 'A',
  To extends string = 'B',
  Intermediate extends string = 'C',
  C extends 0[] = []
> = C['length'] extends N
  ? []
  : [
      ...Hanoi<N, From, Intermediate, To, [...C, 0]>,
      [From, To],
      ...Hanoi<N, Intermediate, To, From, [...C, 0]>
    ]
```
