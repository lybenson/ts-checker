type Last<T extends any[]> = [any, ...T][T['length']]
