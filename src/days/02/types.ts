export type AvailableColors = 'red' | 'green' | 'blue'

export type Subset = {
  [key in AvailableColors]: number
}
export interface Game {
  game: number
  subsets: Subset[]
}
