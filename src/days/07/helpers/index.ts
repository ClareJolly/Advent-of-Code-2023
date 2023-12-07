import { Hand, HandType, HandWithResults } from '../types'

export const CARD_ORDER = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

type CardType = typeof CARD_ORDER[number]

export const xOfAKind = (hand: Hand, pattern: number[] = []) => {
  const checkForX = hand.cards.reduce((acc, item) => {
    if (!acc[item]) {
      acc[item] = 0
    }
    acc[item]++
    return acc
  }, {} as { [key: string]: number })
  const values = Object.values(checkForX)
  const valuesToMatch = values.sort().join('')
  const patternToMatch = pattern.sort().join('')
  return valuesToMatch === patternToMatch
}

export const fourOfAKind = (hand: Hand) => xOfAKind(hand, [4, 1])
export const threeOfAKind = (hand: Hand) => xOfAKind(hand, [3, 1, 1])
export const fiveOfAKind = (hand: Hand) => xOfAKind(hand, [5])
export const onePair = (hand: Hand) => xOfAKind(hand, [2, 1, 1, 1])
export const twoPair = (hand: Hand) => xOfAKind(hand, [1, 2, 2])
export const fullHouse = (hand: Hand) => xOfAKind(hand, [2, 3])
export const highCard = (hand: Hand) => xOfAKind(hand, [1, 1, 1, 1, 1])

export const HAND_TYPES: HandType[] = [
  {
    name: 'Five of a kind',
    fn: fiveOfAKind,
  },
  {
    name: 'Four of a kind',
    fn: fourOfAKind,
  },
  { name: 'Full house', fn: fullHouse },
  { name: 'Three of a kind', fn: threeOfAKind },
  { name: 'Two pair', fn: twoPair },
  { name: 'One pair', fn: onePair },
  { name: 'High card', fn: highCard },
]

export const getCardStrength = (card: CardType): number => CARD_ORDER.indexOf(card)

export const compareHands = (handA: HandWithResults, handB: HandWithResults) => {
  const typeA = handA.type
  const typeB = handB.type

  const typeIndexA = HAND_TYPES.findIndex(t => t.name === typeA)
  const typeIndexB = HAND_TYPES.findIndex(t => t.name === typeB)

  if (typeIndexA !== typeIndexB) {
    return typeIndexA < typeIndexB ? -1 : 1
  }

  for (let i = 0; i < handA.cards.length; i++) {
    const strengthA = getCardStrength(handA.cards[i])
    const strengthB = getCardStrength(handB.cards[i])

    if (strengthA !== strengthB) {
      return strengthA < strengthB ? -1 : 1
    }
  }

  return 0
}

export const rankHands = (hands: HandWithResults[]): HandWithResults[] => {
  const sortedHands = hands.sort(compareHands)

  sortedHands.forEach((hand, index) => {
    hand.rank = sortedHands.length - index
  })

  return sortedHands
}
