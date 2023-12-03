import { convertToNumber, isDigit, hasAdjacentSymbol, isSymbol } from '../helpers'
import { CompleteNumber, TempNum } from '../types'

const part1 = (inputData: string[]): number => {
  const data = inputData.map(d => d.split('').map(convertToNumber))

  const completeNumbers: CompleteNumber[] = []
  const num: TempNum = { val: [], coOrds: [], hasAdj: [] }
  data.forEach((row, y) =>
    row.forEach((n, x) => {
      if (isDigit(n)) {
        num.val.push(n as string)
        num.coOrds.push({ y: y, x: x })
        num.hasAdj.push(hasAdjacentSymbol(data, [y, x]))

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
        }
      }
    }),
  )

  const partNumbers = completeNumbers.filter(s => s.isPartNumber)
  return partNumbers.reduce((acc, { num }) => acc + num, 0)
}

export default part1
