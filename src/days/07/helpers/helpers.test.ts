import { xOfAKind } from '.'

describe('xOfAKind', () => {
  const example = [
    { cards: ['3', '2', 'T', '3', 'K'], bid: 765 },
    { cards: ['T', '5', '5', 'J', '5'], bid: 684 }, // one pair
    { cards: ['K', 'K', '6', '7', '7'], bid: 28 },
    { cards: ['K', 'T', 'J', 'J', 'T'], bid: 220 }, // two pair
    { cards: ['Q', 'Q', 'Q', 'J', 'A'], bid: 483 }, // 3
    { cards: ['Q', 'Q', 'Q', 'Q', 'A'], bid: 483 }, // 4
    { cards: ['Q', 'Q', 'Q', 'Q', 'Q'], bid: 483 }, // 5
    { cards: ['Q', 'Q', 'Q', 'X', 'X'], bid: 483 }, // FullHouse
    { cards: ['A', '2', '3', 'A', '4'], bid: 483 }, // one pair
    { cards: ['4', '2', '3', '3', '2'], bid: 483 }, // two pair
    { cards: ['4', '2', '3', '1', 'X'], bid: 483 }, // high card
  ]

  it('returns true when 5 of a kind', () => {
    const result = xOfAKind(example[6], [5])
    expect(result).toStrictEqual(true)
  })
  it('returns true when 4 of a kind', () => {
    const hand = example[5]
    const result = xOfAKind(hand, [1, 4])
    expect(result).toStrictEqual(true)
  })
  it('returns true when 3 of a kind', () => {
    const result = xOfAKind(example[4], [1, 1, 3])
    expect(result).toStrictEqual(true)
  })
  it('returns false when full house instead of 3 of a kind', () => {
    const result = xOfAKind(example[7], [1, 1, 3])
    expect(result).toStrictEqual(false)
  })
  it('returns true when 1 pair', () => {
    const result = xOfAKind(example[8], [1, 1, 1, 2])
    expect(result).toStrictEqual(true)
  })
  it('returns false when full house instead of 1 pair', () => {
    const result = xOfAKind(example[7], [1, 1, 1, 2])
    expect(result).toStrictEqual(false)
  })
  it('returns true when full house instead of 2 of a kind', () => {
    const result = xOfAKind(example[7], [2, 3])
    expect(result).toStrictEqual(true)
  })
  it('returns true when two pair instead of 2 of a kind', () => {
    const result = xOfAKind(example[3], [1, 2, 2])
    expect(result).toStrictEqual(true)
  })
  it('returns true when high card instead ', () => {
    const result = xOfAKind(example[10], [1, 1, 1, 1, 1])
    expect(result).toStrictEqual(true)
  })

  //  'Full house'
  // 'Two pair'
  // 'High card'
})
