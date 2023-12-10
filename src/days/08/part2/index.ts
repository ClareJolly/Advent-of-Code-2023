import { prepareData } from '../helpers'

const TEST_1 = [
  'LR',
  '',
  '11A = (11B, XXX)',
  '11B = (XXX, 11Z)',
  '11Z = (11B, XXX)',
  '22A = (22B, XXX)',
  '22B = (22C, 22C)',
  '22C = (22Z, 22Z)',
  '22Z = (22B, 22B)',
  'XXX = (XXX, XXX)',
]
const TEST_2 = ['LLR', '', 'AAA = (BBB, BBB)', 'BBB = (AAA, ZZZ)', 'ZZZ = (ZZZ, ZZZ)']

const part2 = (inputData: string[]): number => {
  const { instructions, map } = prepareData(TEST_1)
  console.log('  ~ file: index.ts:19 ~ part2 ~ map:', map)
  console.log('  ~ file: index.ts:19 ~ part2 ~ instructions:', instructions)

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

export default part2
