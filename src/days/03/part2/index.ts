import {
  convertToNumber,
  isDigit,
  hasAdjacentSymbol,
  isSymbol,
  getAdjacentValues,
  getAdjacentCoOrds,
} from '../helpers'
import { CoOrds, CompleteNumber, TempNum } from '../types'

const part2 = (inputData: string[]): number => {
  const data = inputData.map(d => d.split('').map(convertToNumber))

  const asterisks = data.reduce((acc, yArr, y) => {
    yArr.forEach((value, x) => {
      if (value === '*') acc.push({ y, x, adjCoOrds: getAdjacentCoOrds(data, [y, x]) })
    })
    return acc
  }, [] as { y: number; x: number; adjCoOrds: CoOrds[] }[])
  const completeNumbers: CompleteNumber[] = []
  const num: TempNum = { val: [], coOrds: [], hasAdj: [], adjacent: [] }
  data.forEach((row, y) =>
    row.forEach((n, x) => {
      if (isDigit(n)) {
        num.val.push(n as string)
        num.coOrds.push({ y: y, x: x })
        num.hasAdj.push(hasAdjacentSymbol(data, [y, x]))
        num.adjacent!.push(getAdjacentValues(data, [y, x]))

        const isEndOfNumber =
          x < data[y].length && (isSymbol(data[y][x + 1]) || data[y][x + 1] === '.')
        if (isEndOfNumber) {
          completeNumbers.push({
            num: Number(num.val.join('')),
            coOrds: num.coOrds,
            isPartNumber: !num.hasAdj.every(h => !Boolean(h)),
          })
          num.val = []
          num.coOrds = []
          num.hasAdj = []
          num.adjacent = []
        }
      }
    }),
  )

  const gears = asterisks.map(asterisk => {
    const matchIndex: number[] = []
    asterisk.adjCoOrds.forEach(coord => {
      completeNumbers.forEach((c, i) => {
        if (c.coOrds.some(b => b.y === coord.y && b.x === coord.x)) {
          matchIndex.push(i)
        }
      })
    })

    const unique = [...new Set(matchIndex)]
    return unique.length === 2 ? unique : undefined
  })

  const numbers = gears
    .filter(gear => gear?.length === 2)
    .map(gear => {
      if (gear?.length === 2) {
        return gear?.map(gearPartNum => completeNumbers[gearPartNum])
      }
      return
    })

  return numbers.reduce((a, gear) => a + gear!.reduce((b, { num }) => b * num, 1), 0)
}

export default part2
