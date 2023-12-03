import { AdjacentChars, Direction } from '../types'

export const isDigit = (char: string | number) => /[0-9]/.test(String(char))

export const isSymbol = (char: string | number) => char !== '.' && !isDigit(char)

export const isAsterisk = (char: string | number) => char !== '*'

export const convertToNumber = (value: string): string | number =>
  isDigit(value) ? Number(value) : value

export const ADJACENT_CONFIG: number[][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [1, 1], // diagonal
  [1, -1], // diagonal
  [-1, 1], // diagonal
  [-1, -1], // diagonal
]

export const hasAdjacentSymbol = (data: (string | number)[][], coOrds: Direction) => {
  const [y, x] = coOrds

  const hasNoAdjacent = ADJACENT_CONFIG.every(([yAdj, xAdj]) => {
    const newY = y + yAdj
    const newX = x + xAdj

    if (newY >= 0 && newY < data.length && newX >= 0 && newX < data[0].length) {
      const value = data[newY][newX]
      return value ? !isSymbol(value) : true
    }
    return true
  })

  return !hasNoAdjacent
}

export const getAdjacentValues = (
  data: (string | number)[][],
  coOrds: Direction,
): AdjacentChars[] => {
  const [y, x] = coOrds

  const adjacentsChars = ADJACENT_CONFIG.map(([yAdj, xAdj]) => {
    const newY = y + yAdj
    const newX = x + xAdj

    if (newY >= 0 && newY < data.length && newX >= 0 && newX < data[0].length) {
      const value = data[newY][newX]
      return { value: value, y: newY, x: newX }
    }
    return undefined
  })

  return adjacentsChars.filter(char => !!char) as AdjacentChars[]
}

export const getAdjacentCoOrds = (
  data: (string | number)[][],
  coOrds: Direction,
): AdjacentChars[] => {
  const [y, x] = coOrds

  const adjacentsChars = ADJACENT_CONFIG.map(([yAdj, xAdj]) => {
    const newY = y + yAdj
    const newX = x + xAdj

    if (newY >= 0 && newY < data.length && newX >= 0 && newX < data[0].length) {
      // const value = data[newY][newX]
      return { y: newY, x: newX }
    }
    return undefined
  })

  return adjacentsChars.filter(char => !!char) as AdjacentChars[]
}
