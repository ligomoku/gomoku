export type InfoObject<T> = {
  [K in keyof T]: (param: Indirect<T>) => T[K]
}

export type Indirect<T> = {
  [K in keyof T]: () => T[K]
}

export function indirectResolve<T>(info: InfoObject<T>): T {
  let result: T = {} as any

  let resolver: Indirect<T> = {} as any

  Object.keys(info).forEach((objectKey) => {
    let key = objectKey as keyof T
    resolver[key] = () => {
      let value = info[key](resolver)
      resolver[key] = () => value
      return value
    }
  })

  Object.keys(info).forEach((objectKey) => {
    let key = objectKey as keyof T
    result[key] = resolver[key]()
  })

  return result
}
