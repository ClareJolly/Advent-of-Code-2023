import { HAND_TYPES, rankHands } from '../helpers'
import { Hand } from '../types'

const part1 = (inputData: string[]): number => {
  const hands: Hand[] = inputData
    .map(d => d.split(' '))
    .map(([hand, bid]) => ({ cards: hand.split(''), bid: Number(bid) }))

  const results = hands.map(h => {
    const typeIndex = HAND_TYPES.findIndex(t => t.fn(h))
    return {
      ...h,
      type: HAND_TYPES[typeIndex].name,
      typeWeight: (HAND_TYPES.length - typeIndex) * 1000,
      handString: h.cards.join(''),
    }
  })

  const rankedHands = rankHands(results)

  return rankedHands.reduce((total, hand) => {
    return total + hand.bid * hand.rank!
  }, 0)
}

export default part1

// 32T3K
// KTJJT
// KK677
// T55J5
// QQQJA
