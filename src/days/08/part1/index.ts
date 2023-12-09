import { prepareData } from '../helpers'

const TEST_2 = ['LLR', '', 'AAA = (BBB, BBB)', 'BBB = (AAA, ZZZ)', 'ZZZ = (ZZZ, ZZZ)']

const part1 = (inputData: string[]): number => {
  const { instructions, map } = prepareData(inputData)

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
