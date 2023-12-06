import { batchByBlankLines } from '../../../helpers'
import { extractSeeds, parseAlmanacData, formatAlmanacData, getStageDetails } from '../helpers'
import { FormattedData, Summary } from '../types'

const part1 = (inputData: string[]): number => {
  const data = batchByBlankLines(inputData)
  const seeds = extractSeeds(inputData)
  const roughAlmanacData = parseAlmanacData(data)

  const almanacData: FormattedData = formatAlmanacData(roughAlmanacData)

  const seedsWithSteps: Summary[] = seeds.map(seed => {
    let output: Summary = { seed }
    const result = getStageDetails({ almanacData, value: seed })
    return { ...output, ...result }
  })

  return Math.min(...seedsWithSteps.map(s => s.location))
}

export default part1
