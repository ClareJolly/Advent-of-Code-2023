import parseGames from '../helpers/parseGames'
import { Subset, AvailableColors, Game } from '../types'

export type AvailableCubes = { [key in AvailableColors]: number }

const AVAILABLE_CUBES: AvailableCubes = {
  red: 12,
  green: 13,
  blue: 14,
}

const isValidSubset = (
  subset: Subset,
  availableCubes: { [key in AvailableColors]: number },
): boolean => {
  return Object.entries(subset).every(
    ([color, num]) => num <= availableCubes[color as AvailableColors],
  )
}

const isSubsetValidForGame = (
  game: Game,
  availableCubes: { [key in AvailableColors]: number },
): boolean => {
  return game.subsets.every(subset => isValidSubset(subset, availableCubes))
}

const part1 = (inputData: string[]): number => {
  const games = parseGames(inputData)

  const possible = games.filter(game => isSubsetValidForGame(game, AVAILABLE_CUBES))

  return possible.reduce((acc, { game }) => acc + Number(game), 0)
}

export default part1
