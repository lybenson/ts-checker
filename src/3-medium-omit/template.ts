type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TypeName = {
  [P in keyof Todo]?: Todo[P]
}
