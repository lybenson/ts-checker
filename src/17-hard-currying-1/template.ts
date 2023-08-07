declare function Currying<F>(fn: F): Curried<F>

type Curried<F> = F extends (...args: infer A) => infer R
  ? A extends [infer First, ...infer Other]
    ? (
        arg: First
      ) => Other['length'] extends 0 ? R : Curried<(...args: Other) => R>
    : () => R
  : never
