type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? R extends PromiseLike<unknown>
    ? MyAwaited<R>
    : R
  : never
