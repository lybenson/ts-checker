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
