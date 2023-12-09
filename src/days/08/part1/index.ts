import { batchByBlankLines } from '../../../helpers'

const TEST_2 = ['LLR', '', 'AAA = (BBB, BBB)', 'BBB = (AAA, ZZZ)', 'ZZZ = (ZZZ, ZZZ)']

const part1 = (inputData: string[]): number => {
  const DIRECTIONS_CONVERT = { R: 1, L: 0 }

  const [instructionsInfo, mapInfo] = batchByBlankLines(inputData)
  const instructions = instructionsInfo[0].split('').map(m => DIRECTIONS_CONVERT[m])
  const map = mapInfo.reduce((acc, item) => {
    const [key, info] = item.split(' = ')
    const regex = /[A-Z]+/g // Matches sequences of uppercase letters

    const extractedLetters = info.match(regex)
    acc[key] = extractedLetters!
    return acc
  }, {} as { [key: string]: [string, string] })

  let current = 'AAA'
  let final = 0
  let x = 0
  while (current !== 'ZZZ') {
    for (let i = 0; i < instructions.length; i++) {
      const a = instructions[i]
      const newCurrent = map[current][a]

      current = newCurrent
      x++
      if (newCurrent === 'ZZZ') {
        final = x
        break
      }
    }
  }
  return x
}

export default part1
