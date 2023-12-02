const AVAILABLE_CUBES: { [key: string]: number } = {
  red: 12,
  green: 13,
  blue: 14,
}
const part1 = (inputData: string[]): number => {
  const games = inputData.map(d => {
    const [game, details] = d.split(': ')
    const gm = game.replace('Game ', '')
    const subsets = details.split('; ').map(s => {
      const sets = s.split(', ')
      const final = sets
        .map(ss => ss.split(' '))
        .reduce((acc, [num, color]) => {
          acc[color] = Number(num)
          return acc
        }, {} as { [key: string]: number })
      return final
    })
    return { game: gm, subsets }
  })

  const possible = games.filter(g => {
    return g.subsets.every(s => {
      return Object.entries(s).every(([color, num]) => {
        return num <= AVAILABLE_CUBES[color]
      })
    })
  })
  return possible.reduce((acc, { game }) => acc + Number(game), 0)
}

export default part1
