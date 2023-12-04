import { parseCardData, formatCardData } from '../helpers'

const part1 = (inputData: string[]): number => {
  const cards = inputData.map(card => {
    const cardDetails = parseCardData(card)

    return formatCardData(cardDetails)
  })

  return cards.reduce((acc, card) => acc + card.score, 0)
}

export default part1
