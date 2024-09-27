import { Position } from "./type"

export function pairs<T>(array: T[]): [T, T][] {
  let result: [T, T][] = []
  array.forEach((v, k) => {
    if (k % 2 === 0) {
      result.push([v] as any)
    } else {
      result[(k - 1) / 2].push(v)
    }
  })
  return result
}

export function positionToString({ x, y }: Position) {
  return (x + 10).toString(36).toUpperCase() + (y + 1)
}

export function compareStringProperty<T extends string>(propertyName: T) {
  type TT = { [property in T]: string }
  return (a: TT, b: TT) => a[propertyName].localeCompare(b[propertyName])
}

export function compareNumberProperty<T extends string>(propertyName: T) {
  type TT = { [property in T]: number }
  return (a: TT, b: TT) => a[propertyName] - b[propertyName]
}

export function readableScore(score: number): string {
  if (score === Infinity) {
    return "Inf"
  } else if (score === -Infinity) {
    return "-Inf"
  }
  const s = (x: string) => (x ? x : "+")
  let text = score.toString(2)
  text = text.replace(/^0$/, "=")
  text = text.replace(/^(-?)0.(00+1)/, (_m, a, b) => `=(${b.length}${s(a)})`)
  text = text.replace(/^(-?)1(0+)/, (_m, a, b) => `${s(a)}${b.length}`)
  return text
}

export function pause(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
