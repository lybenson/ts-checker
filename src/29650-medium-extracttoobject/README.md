# ExtractToObject

实现一个类型，从接口中提取属性值。该类型接受两个参数。输出应该是一个具有属性值的对象。属性值是对象。

例如：

```ts
type Test = { id: '1'; myProp: { foo: '2' } }
type Result = ExtractToObject<Test, 'myProp'> // expected to be { id: '1', foo: '2' }
```

## Solution

```ts
type ExtractToObject<T, U extends keyof T> = Omit<Omit<T, U> & T[U], never>
```

`Omit<T, never>` 用于展开交叉类型
