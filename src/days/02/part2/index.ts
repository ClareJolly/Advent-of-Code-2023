import parseGames from '../helpers/parseGames'
import { AvailableColors, Game } from '../types'

export type SummaryData = { [key in AvailableColors]: number[] }
export type MinValuesData = { [key in AvailableColors]: number }
export interface Summary extends Game {
  summary: SummaryData
  minValues: MinValuesData
  power: number
}

const part2 = (inputData: string[]): number => {
  const games = parseGames(inputData)
  const summary: Summary[] = games.map(game => {
    const data: SummaryData = {} as SummaryData
    game.subsets.forEach(set => {
      Object.entries(set).forEach(([color, num]) => {
        if (!data[color as AvailableColors]) data[color as AvailableColors] = []
        data[color as AvailableColors].push(num)
      })
    })
    const minValues = Object.entries(data).reduce((acc, [col, num]) => {
      acc[col as AvailableColors] = Math.max(...num)
      return acc
    }, {} as MinValuesData)

    const power = Object.values(minValues).reduce((acc, num) => {
      return acc * num
    }, 1)

    return { ...game, summary: data, minValues, power }
  })

  return summary.reduce((acc, game) => {
    return acc + game.power
  }, 0)
}

export default part2
