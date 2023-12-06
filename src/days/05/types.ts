import { STAGES } from './helpers/constants'

export type Stages = typeof STAGES[number]
export type AllStages = Stages | 'seed'

export interface MapSummary {
  sourceStart: number
  sourceEnd: number
  destinationStart: number
  destinationEnd: number
  rangeLength: number
}

export interface AlmanacDetail {
  from: Stages
  to: Stages
  mapData: number[][]
  mapSummary: MapSummary[]
  name: string
}
export type FormattedData = {
  [key in Stages]: AlmanacDetail
}

export type Summary = { [key in AllStages]: number }
