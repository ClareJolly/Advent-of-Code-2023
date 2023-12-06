import { FormattedData, MapSummary, Stages, Summary } from '../types'
import { STAGES } from './constants'

export const extractSeeds = (inputData: string[]): number[] => {
  return inputData.slice(0, 1)[0].split(': ')[1].split(' ').map(Number)
}

export const parseAlmanacData = (data: string[][]): string[][] => {
  return data.slice(1)
}

export const formatAlmanacData = (almanacData: string[][]): FormattedData => {
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

interface GetStageDetails {
  almanacData: FormattedData
  value: number
  stage?: Stages | 'seed'
  existing?: { [key in Stages]: number }
}

export const getNextStage = (currentStage: string): string => {
  const currentStageIndex = STAGES.findIndex(s => s === currentStage) || 0
  return STAGES[currentStageIndex + 1]
}

export const calculateFinalValue = (mapSummary: MapSummary[], value: number): number => {
  const matchingDataSet = mapSummary.findIndex(m => value >= m.sourceStart && value <= m.sourceEnd)
  const valueToAdd = value - (mapSummary[matchingDataSet]?.sourceStart || 0)
  const dest = (mapSummary[matchingDataSet]?.destinationStart || 0) + valueToAdd
  return dest || value
}

export const getStageDetails = ({
  almanacData,
  value,
  stage = 'soil',
  existing = {},
}: GetStageDetails): any => {
  const stack: GetStageDetails[] = []
  let output = { ...existing }

  while (stage !== 'location') {
    const nextStage = getNextStage(stage)
    const mapSummary = almanacData[stage]?.mapSummary || []
    const final = calculateFinalValue(mapSummary, value)
    output[stage] = final

    stage = nextStage
    value = final

    stack.push({ almanacData, value, stage, existing: output })
  }

  while (stack.length > 0) {
    const { almanacData, value, stage, existing } = stack.pop()!
    const nextStage = getNextStage(stage!)
    const mapSummary = almanacData[stage!]?.mapSummary || []
    const final = calculateFinalValue(mapSummary, value)
    if (existing) existing[stage!] = final

    if (nextStage !== 'location') {
      stack.push({ almanacData, value: final, stage: nextStage, existing })
    }
  }

  return output
}

export const processSeedsBatch = (
  seedsBatch: [number, number][],
  almanacData: FormattedData,
): number => {
  let minLocation = Infinity

  for (const seeds of seedsBatch) {
    const result = []
    for (let i = 0; i <= seeds[1]; i++) {
      const seed = seeds[0] + i
      let output: Summary = { seed }
      const stagesbySeed = getStageDetails({ almanacData, value: seed })
      result.push({ ...output, ...stagesbySeed })
    }

    const minBatchLocation = Math.min(...result.map(s => s.location))
    if (minBatchLocation < minLocation) {
      minLocation = minBatchLocation
    }
  }

  return minLocation
}
