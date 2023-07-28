import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>
]

interface Todo1 {
  readonly title: string
  description: number
  completed: undefined
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}
