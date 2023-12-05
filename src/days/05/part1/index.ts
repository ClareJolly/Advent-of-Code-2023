import { batchByBlankLines } from '../../../helpers'

const STAGES = ['soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location']

// export type Stages =
//   | 'soil'
//   | 'fertilizer'
//   | 'water'
//   | 'light'
//   | 'temperature'
//   | 'humidity'
//   | 'location'

type Stages = typeof STAGES[number]
type AllStages = Stages | 'seed'

interface MapSummary {
  sourceRangeList: number[]
  destinationRangeList: number[]
  mapDetail: { d: number; s: number }[]
}

interface AlmanacDetail {
  from: Stages
  to: Stages
  mapData: number[]
  mapSummary: MapSummary[]
  name: string
}
export type FormattedData = {
  [key in Stages]: AlmanacDetail
}

interface GetStageDetails {
  formatted: FormattedData
  value: number
  stage?: Stages | 'seed'
  existing?: { [key in Stages]: number }
}

type Summary = { [key in AllStages]: number }

const getStageDetails = ({ formatted, value, stage = 'soil', existing = {} }: GetStageDetails) => {
  let output = { ...existing }
  const currentStageIndex = STAGES.findIndex(s => s === stage) || 0
  const nextStage = STAGES[currentStageIndex + 1]

  const mapSummary = formatted[stage].mapSummary
  const next = mapSummary.find(m => m.mapDetail.find(detail => detail.s === value))
  const nextNext = next?.mapDetail.find(detail => detail.s === value).d
  const final = nextNext || value
  output[stage] = final
  if (stage !== 'location') {
    const stageResult = getStageDetails({
      formatted,
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

const part1 = (inputData: string[]): number => {
  const data = batchByBlankLines(inputData)
  const seeds = inputData.slice(0, 1).map(d =>
    d
      .split(': ')[1]
      .split(' ')
      .map(n => Number(n)),
  )[0]
  const almanacData = data.slice(1, data.length)

  const formatted: FormattedData = almanacData.reduce((acc, line) => {
    const [key, ...rest] = line
    const regex = /^(.*)-to-(.*) map:$/ // Regex pattern to match 'word1-to-word2 map'

    const matchResult = key.match(regex)

    const from = matchResult![1] // Extract the first word ('fertilizer')
    const to = matchResult![2] // Extract the second word ('water')

    const mapData = rest.map(r => r.split(' ').map(m => Number(m)))
    const mapSummary = mapData.map(m => ({
      destinationRangeStart: m[0],
      sourceRangeStart: m[1],
      rangeLength: m[2],
    }))
    acc[to as Stages] = {
      from,
      to,
      map: mapData,
      mapSummary: mapSummary.map(m => {
        let destinationRangeList = [m.destinationRangeStart]
        let sourceRangeList = [m.sourceRangeStart]
        for (let i = 1; i < m.rangeLength; i++) {
          destinationRangeList.push(m.destinationRangeStart + i)
          sourceRangeList.push(m.sourceRangeStart + i)
        }
        const detail = sourceRangeList.map((s, i) => {
          return {
            s: s,
            d: destinationRangeList[i],
          }
        })

        return {
          ...m,
          sourceRangeList,
          destinationRangeList,
          mapDetail: detail,
        }
      }),
      name: key.replace(':', ''),
    }
    return acc
  }, {} as { [key in Stages]: any })

  const seedsWithSteps: Summary[] = seeds.map(seed => {
    let output: Summary = { seed }
    const result = getStageDetails({ formatted, value: seed })
    return { ...output, ...result }
  })

  return Math.min(...seedsWithSteps.map(s => s.location))
}

export default part1
