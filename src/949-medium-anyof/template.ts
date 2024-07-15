type Falsy = '' | [] | false | { [key: string]: never } | 0 | undefined | null

type AnyOf<T extends any[]> = T[number] extends Falsy ? false : true
