type Falsy = '' | [] | false | { [key: string]: never } | 0 | undefined | null

type AnyOf<T extends readonly any[]> = T[number] extends Falsy ? false : true
