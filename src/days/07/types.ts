export interface Hand {
  cards: string[]
  bid: number
}

export interface HandType {
  name: string
  fn: (arg: Hand) => boolean
  fnWithJokers?: (arg: Hand) => boolean
}

export interface HandWithResults extends Hand {
  type: string
  typeWeight: number
  handString: string
  rank?: number
}
