import { Subset, AvailableColors, Game } from '../types'

const parseSubset = (subsetString: string): Subset => {
  const subsetData = subsetString.split(', ')
  return subsetData.reduce((acc, pair) => {
    const [num, color] = pair.split(' ')
    acc[color as AvailableColors] = parseInt(num, 10)
    return acc
  }, {} as Subset)
}

const parseGames = (inputData: string[]): Game[] => {
  return inputData.map(d => {
    const [gamePart, detailsPart] = d.split(': ')
    const gameNumber = parseInt(gamePart.replace('Game ', ''), 10)
    const subsets = detailsPart.split('; ').map(parseSubset)
    return { game: gameNumber, subsets }
  })
}

export default parseGames
