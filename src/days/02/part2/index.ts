import parseGames from '../helpers/parseGames'
import { AvailableColors, Game, Subset } from '../types'

export type SummaryData = { [key in AvailableColors]: number[] }
export type MinValuesData = { [key in AvailableColors]: number }
export interface Summary extends Game {
  summary: SummaryData
  minValues: MinValuesData
  power: number
}

const summarizeSubsets = (subsets: Subset[]): SummaryData => {
  return subsets.reduce((data, set) => {
    Object.entries(set).forEach(([color, num]) => {
      const colorKey = color as AvailableColors
      if (!data[colorKey]) data[colorKey] = []
      data[colorKey].push(num)
    })
    return data
  }, {} as SummaryData)
}

const calculateMinValues = (summary: SummaryData): MinValuesData => {
  return Object.entries(summary).reduce((acc, [color, numbers]) => {
    acc[color as AvailableColors] = Math.max(...numbers)
    return acc
  }, {} as MinValuesData)
}

const calculatePower = (minValues: MinValuesData): number => {
  return Object.values(minValues).reduce((acc, num) => acc * num, 1)
}

const part2 = (inputData: string[]): number => {
  const games = parseGames(inputData)
  const summary: Summary[] = games.map(game => {
    const summaryData = summarizeSubsets(game.subsets)
    const minValues = calculateMinValues(summaryData)
    const power = calculatePower(minValues)

    return { ...game, summary: summaryData, minValues, power }
  })

  return summary.reduce((acc, game) => {
    return acc + game.power
  }, 0)
}

export default part2
