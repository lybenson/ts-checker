type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>
