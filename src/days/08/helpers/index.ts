import { batchByBlankLines } from '../../../helpers'

type Direction = 'R' | 'L'

const DIRECTIONS_CONVERT: { [key in Direction]: number } = { R: 1, L: 0 }

export const prepareData = (inputData: string[]) => {
  const [instructionsInfo, mapInfo] = batchByBlankLines(inputData)
  const instructions = instructionsInfo[0].split('').map(m => DIRECTIONS_CONVERT[m as Direction])
  const map = mapInfo.reduce((acc, item) => {
    const [key, info] = item.split(' = ')
    const regex = /[A-Z]+/g

    const extractedLetters = info.match(regex)
    acc[key] = extractedLetters! as [string, string]
    return acc
  }, {} as { [key: string]: [string, string] })

  return { instructions, map }
}
