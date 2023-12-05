import { batchByBlankLines } from '../../../helpers'
import { FormattedData, Stages, MapSummary, Summary } from '../types'

const STAGES = ['soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location']

interface GetStageDetails {
  almanacData: FormattedData
  value: number
  stage?: Stages | 'seed'
  existing?: { [key in Stages]: number }
}

const getNextStage = (currentStage: string): string => {
  const currentStageIndex = STAGES.findIndex(s => s === currentStage) || 0
  return STAGES[currentStageIndex + 1]
}

const calculateFinalValue = (mapSummary: MapSummary[], value: number): number => {
  const matchingDataSet = mapSummary.findIndex(m => value >= m.sourceStart && value <= m.sourceEnd)
  const valueToAdd = value - (mapSummary[matchingDataSet]?.sourceStart || 0)
  const dest = (mapSummary[matchingDataSet]?.destinationStart || 0) + valueToAdd
  return dest || value
}

const getStageDetails = ({
  almanacData,
  value,
  stage = 'soil',
  existing = {},
}: GetStageDetails): any => {
  let output = { ...existing }

  const nextStage = getNextStage(stage)
  const mapSummary = almanacData[stage]?.mapSummary || []

  const final = calculateFinalValue(mapSummary, value)
  output[stage] = final

  if (stage !== 'location') {
    const stageResult = getStageDetails({
      almanacData,
      value: final,
      stage: nextStage,
      existing: output,
    })

    output = { ...output, ...stageResult }
  } else {
    return output
  }

  return output
}

const extractSeeds = (inputData: string[]): number[] => {
  return inputData.slice(0, 1)[0].split(': ')[1].split(' ').map(Number)
}

const parseAlmanacData = (data: string[][]): string[][] => {
  return data.slice(1)
}

const formatAlmanacData = (almanacData: string[][]): FormattedData => {
  return almanacData.reduce((acc: FormattedData, line: string[]) => {
    const [key, ...rest] = line
    const regex = /^(.*)-to-(.*) map:$/
    const matchResult = key.match(regex)

    if (matchResult) {
      const from = matchResult[1]
      const to = matchResult[2]

      const mapData = rest.map(r => r.split(' ').map(Number))
      const mapSummary = mapData.map(([destinationRangeStart, sourceRangeStart, rangeLength]) => ({
        destinationRangeStart,
        sourceRangeStart,
        rangeLength,
        sourceStart: sourceRangeStart,
        sourceEnd: sourceRangeStart + rangeLength - 1,
        destinationStart: destinationRangeStart,
        destinationEnd: destinationRangeStart + rangeLength - 1,
      }))

      acc[to] = {
        from,
        to,
        mapData: mapData,
        mapSummary,
        name: key.replace(':', ''),
      }
    }

    return acc
  }, {} as FormattedData)
}

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
