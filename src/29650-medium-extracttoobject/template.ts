type ExtractToObject<T, U extends keyof T> = Omit<Omit<T, U> & T[U], never>
