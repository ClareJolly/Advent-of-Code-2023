import { parseCardData, formatCardData } from '../helpers'

const part2 = (inputData: string[]): number => {
  const cards = inputData.map(card => {
    const cardDetails = parseCardData(card)

    return formatCardData(cardDetails)
  })

  let index = 0
  while (index < cards.length) {
    let cardNumberIndex = cards[index].cardNumber - 1
    for (let i = 0; i < cards[index].matches; i++) {
      cards.push({
        ...cards[cardNumberIndex + i + 1],
        processed: false,
      })
    }
    cards[index].processed = true
    index++
  }
  return index
}

export default part2
