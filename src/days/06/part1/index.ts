import { extractNumbersFromStringToArray, getResult, summariseData } from '../helpers'

const part1 = (inputData: string[]): number => {
  const time = extractNumbersFromStringToArray(inputData[0])
  const distance = extractNumbersFromStringToArray(inputData[1])

  const data = time.map((t, i) => ({ time: t, distance: distance[i] }))

  const summary = summariseData(data)

  // console.dir(summary, { depth: null })

  return getResult(summary)
}

export default part1
