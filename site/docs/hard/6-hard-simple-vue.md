# 6 - 简单的 Vue 类型

[Source](https://github.com/lybenson/ts-checker/blob/master/src/6-hard-simple-vue/template.ts)

实现类似Vue的类型支持的简化版本。

通过提供一个函数`SimpleVue`（类似于`Vue.extend`或`defineComponent`），它应该正确地推断出 computed 和 methods 内部的`this`类型。

在此挑战中，我们假设`SimpleVue`接受只带有`data`，`computed`和`methods`字段的Object作为其唯一的参数，

- `data`是一个简单的函数，它返回一个提供上下文`this`的对象，但是你无法在`data`中获取其他的计算属性或方法。

- `computed`是将`this`作为上下文的函数的对象，进行一些计算并返回结果。在上下文中应暴露计算出的值而不是函数。

- `methods`是函数的对象，其上下文也为`this`。函数中可以访问`data`，`computed`以及其他`methods`中的暴露的字段。 `computed`与`methods`的不同之处在于`methods`在上下文中按原样暴露为函数。

`SimpleVue`的返回值类型可以是任意的。

```ts
const instance = SimpleVue({
  data() {
    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10
    }
  },
  computed: {
    fullname() {
      return this.firstname + ' ' + this.lastname
    }
  },
  methods: {
    hi() {
      alert(this.fullname.toLowerCase())
    }
  }
})
```

## Solution

```ts
type GetComputed<C> = C extends Record<string, (...args: any[]) => any>
  ? { [S in keyof C]: ReturnType<C[S]> }
  : never

declare function SimpleVue<D, C, M>(
  options: {
    data: () => D
    computed: C
    methods: M
  } & ThisType<D & M & GetComputed<C>>
): any
```

### GetComputed

`GetComputed` 首先判断泛型 `C` 是否是对象结构, 其中 `key` 的类型是 `string`， `value` 的类型是函数，是对象结构，则返回对象类型, `key` 是 `C` 的 `key`, 类型则是 `key` 对应的函数的返回类型

如:

```ts
type GetComputed<C> = C extends Record<string, (...args: any[]) => any>
  ? { [S in keyof C]: ReturnType<C[S]> }
  : never

type ComputedType = GetComputed<{
  data: () => number
}>
```

`ComputedType` 类型是

```ts
{
  data: number
}
```

### ThisType

在 ts 中使用 `this` 时, 会自动推导其在当前上下文中的类型。

如:

```ts
type OptionType = {
  value: number
  methods: {
    getOption: () => number
  }
}
const option = {
  value: 2,
  methods: {
    getOption: function (): number[] {
      return this.value // Property 'value' does not exist on type '{ getOption: () => number; }'.t
    }
  }
}
```

定义变量 `option` 时会报错, 因为 `this` 的类型 被推导为

```ts
this: {
  getOption: () => number
}
```

因此需要指定 `this` 类型，使用 `ThisType<T>`

```ts
type OptionType = {
  value: number
  methods: {
    getOption: () => number
  }
} & ThisType<OptionType>
```

回到 `SimpleVue` 类型定义中

- `this` 可以在任意的 `key` 中使用，因此需要通过 `ThisType<T>` 指明 `this` 的类型

- 在 `methods` 中可以通过 `this` 直接访问 `computed` 中的属性，而不是调用方法, 因此需要把 `computed` 类型从 `{ key: function}` 转换成 `{ key: ReturnType<function> }`
