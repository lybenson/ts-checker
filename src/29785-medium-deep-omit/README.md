# Deep Omit

实现一个类型 `DeepOmit`，类似于实用类型 `Omit`，这个类型接收两个参数。

例如：

```ts
type obj = {
  person: {
    name: string
    age: {
      value: number
    }
  }
}

type test1 = DeepOmit<obj, 'person'> // {}
type test2 = DeepOmit<obj, 'person.name'> // { person: { age: { value: number } } }
type test3 = DeepOmit<obj, 'name'> // { person: { name: string; age: { value: number } } }
type test4 = DeepOmit<obj, 'person.age.value'> // { person: { name: string; age: {} } }
```

## Solution

```ts
type DeepOmit<T, S extends string> = S extends `${infer F}.${infer R}`
  ? {
      [P in keyof T]: P extends F ? DeepOmit<T[P], R> : T[P]
    }
  : Omit<T, S>
```
