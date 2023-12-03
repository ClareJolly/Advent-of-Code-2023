const convertToNumber = (value: string): string | number => {
  const num = Number(value)
  return isNaN(num) ? value : num
}

const isDigit = (char: string | number) => /[0-9]/.test(String(char))
const isSymbol = (char: string | number) => char !== '.' && !isDigit(char)

// const isSymbol = (character: string | number) => {
//   if (character === '.') return false
//   const regex = /^[^\w\s]$/
//   return regex.test(String(character))
// }

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

const hasAdjacentSymbol = (data: (string | number)[][], coOrds: [number, number]) => {
  const [y, x] = coOrds
  return !ADJACENT_CONFIG.every(([yAdj, xAdj]) => {
    // console.log('  ~ file: index.ts:29 ~ return!ADJACENT_CONFIG.every ~ [yAdj, xAdj]:', [
    //   yAdj,
    //   xAdj,
    // ])
    try {
      const value = data[y + yAdj][x + xAdj]
      // console.log('  ~ file: index.ts:35 ~ return!ADJACENT_CONFIG.every ~ value:', value)
      return value ? !isSymbol(value) : true
    } catch (e) {
      return true
    }
  })
}

interface CoOrds {
  y: number
  x: number
}

interface TempNum {
  val: string[]
  coOrds: CoOrds[]
  hasAdj: boolean[]
}

interface CompleteNumber {
  num: number
  coOrds: CoOrds[]
  isPartNumber: boolean
}
const part1 = (inputData: string[]): number => {
  const data = inputData.map(d => d.split('').map(convertToNumber))

  const completeNumbers: CompleteNumber[] = []
  const num: TempNum = { val: [], coOrds: [], hasAdj: [] }
  data.forEach((d, y) =>
    d.map((n, x) => {
      if (isDigit(n)) {
        num.val.push(n as string)
        num.coOrds.push({ y: y, x: x })
        num.hasAdj.push(hasAdjacentSymbol(data, [y, x]))
        if (x < data[y].length && (isSymbol(data[y][x + 1]) || data[y][x + 1] === '.')) {
          completeNumbers.push({
            num: Number(num.val.join('')),
            coOrds: num.coOrds,
            isPartNumber: !num.hasAdj.every(h => !Boolean(h)),
          })
          // console.log(num.hasAdj)
          num.val = []
          num.coOrds = []
          num.hasAdj = []
        }
      }
      return { value: n, hasAdj: hasAdjacentSymbol(data, [y, x]) }
    }),
  )
  // console.dir(completeNumbers, { depth: null })

  const partNumbers = completeNumbers.filter(s => s.isPartNumber)
  return partNumbers.reduce((acc, { num }) => acc + num, 0)
}

export default part1
