import type { Equal, Expect } from '@type-challenges/utils'

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    }
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    }
  }
})

type OptionType = {
  value: number
  methods: {
    getOption: () => number
  }
}

const option: OptionType = {
  value: 2,
  methods: {
    getOption: function (): number {
      return this.value
    }
  }
}
type GetComputed<C> = C extends Record<string, (...args: any[]) => any>
  ? { [S in keyof C]: ReturnType<C[S]> }
  : never

type Computed = GetComputed<{
  data: number
}>
