export interface CoOrds {
  y: number
  x: number
}

export interface AdjacentChars {
  value: number | string
  y: number
  x: number
}

export interface TempNum {
  val: string[]
  coOrds: CoOrds[]
  hasAdj: boolean[]
  adjacent?: AdjacentChars[][]
}

export interface CompleteNumber {
  num: number
  coOrds: CoOrds[]
  isPartNumber: boolean
  isGear?: boolean
}

export type Direction = [number, number]
