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
