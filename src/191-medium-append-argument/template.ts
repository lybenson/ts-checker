type AppendArgument<Fn extends (...args: any[]) => any, A> = Fn extends (
  ...args: infer Args
) => infer R
  ? (...args: [...Args, A]) => R
  : never
