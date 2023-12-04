export interface BasicCard {
  cardNumber: number
  myNumbers: number[]
  winningNumbers: number[]
  matches: number
}
export interface Card extends BasicCard {
  score: number
  processed?: boolean
}
