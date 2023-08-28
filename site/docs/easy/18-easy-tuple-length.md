# 18 - 获取元组长度

[Source](https://github.com/lybenson/ts-checker/blob/master/src/18-easy-tuple-length/template.ts) [TestCases]((https://github.com/lybenson/ts-checker/blob/master/src/18-easy-tuple-length/test-cases.ts))

创建一个`Length`泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

例如：

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT'
]

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

## Solution

```ts
type Length<T extends readonly any[]> = T['length']
```
