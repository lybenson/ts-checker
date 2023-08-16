type CapitalizeWords<
  S extends string,
  W extends string = ''
> = S extends `${infer A}${infer B}`
  ? Uppercase<A> extends Lowercase<A>
    ? `${Capitalize<`${W}${A}`>}${CapitalizeWords<B>}`
    : CapitalizeWords<B, `${W}${A}`>
  : Capitalize<W>
