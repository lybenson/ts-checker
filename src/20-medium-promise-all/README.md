# Promise.all

给函数`PromiseAll`指定类型，它接受元素为 Promise 或者类似 Promise 的对象的数组，返回值应为`Promise<T>`，其中`T`是这些 Promise 的结果组成的数组。

```ts
const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo')
})

// 应推导出 `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)
```

## Solution

```ts
declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{
  [K in keyof T]: Awaited<T[K]>
}>
```

首先 `PromiseAll` 的返回值类型是 `Promise`, 其次 `resolve` 后实际的返回值类型由传入 `PromiseAll` 的参数决定。`Awaited` 可以获取 `Promise` 的返回值。

通过映射类型遍历参数类型，再通过 `Awaited` 获取 `resolve` 后的返回值类型
