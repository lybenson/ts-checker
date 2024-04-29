interface IHuman {
  name: string
  age: number
  eat: () => void
}

class Human implements IHuman {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  eat() {
    console.log('eat')
  }
}
