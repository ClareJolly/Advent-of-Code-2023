import { extractNumbersFromStringToArray, getResult, summariseData } from '../helpers'

const part2 = (inputData: string[]): number => {
  const time = Number(extractNumbersFromStringToArray(inputData[0]).join(''))
  const distance = Number(extractNumbersFromStringToArray(inputData[1]).join(''))

  const data = [{ time, distance }]

  const summary = summariseData(data)

  // console.dir(summary, { depth: null })

  return getResult(summary)
}

export default part2
