# 26401 - JSON Schema to TypeScript

[Answer](https://github.com/lybenson/ts-checker/blob/master/src/26401-medium-json-schema-to-typescript/template.ts) [TestCases](https://github.com/lybenson/ts-checker/blob/master/src/26401-medium-json-schema-to-typescript/test-cases.ts)

实现通用类型 `JSONSchema2TS`，该类型将返回与给定的 `JSON` 模式对应的 `TypeScript` 类型。

额外挑战处理：

- additionalProperties
- oneOf、anyOf、allOf
- minLength 和 maxLength

## Solution

```ts
type Primitives = {
  string: string
  number: number
  boolean: boolean
}

type JSONSchema2TSPrimitivesHandler<
  T,
  Type extends keyof Primitives
> = T extends {
  enum: unknown[]
}
  ? T['enum'][number]
  : Primitives[Type]

type JSONSchema2TSObjectHandler<T> = T extends { properties: infer Properties }
  ? T extends { required: infer Required extends string[] }
    ? Omit<
        {
          [K in Required[number] & keyof Properties]: JSONSchema2TS<
            Properties[K]
          >
        } & Partial<{
          [K in keyof Omit<Properties, Required[number]>]: JSONSchema2TS<
            Properties[K]
          >
        }>,
        never
      >
    : Partial<{ [K in keyof Properties]: JSONSchema2TS<Properties[K]> }>
  : Record<string, unknown>

type JSONSchema2TSArrayHandler<T> = T extends {
  items: infer Items
}
  ? JSONSchema2TS<Items>[]
  : unknown[]

type JSONSchema2TS<T> = T extends { type: infer Type }
  ? Type extends keyof Primitives
    ? JSONSchema2TSPrimitivesHandler<T, Type>
    : Type extends 'object'
    ? JSONSchema2TSObjectHandler<T>
    : JSONSchema2TSArrayHandler<T>
  : false
```

用 `infer Type` 来提取不同的类型, 并进行对应的处理

- `Primitives`
- `object`
- `array`

其中较为复杂的是 `object` 处理, 需要分别处理可选和必选的属性。最后用 `Omit<T, never>` 强制展开交叉类型
