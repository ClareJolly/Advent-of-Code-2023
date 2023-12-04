const doubleXTimes = (times: number, number: number = 1): number => {
  if (times > 0) {
    for (let i = 1; i < times; i++) {
      number *= 2
    }
    return number
  }
  return 0
}

const formatStringToArr = (str: string) => {
  return str
    .split(' ')
    .map(n => n)
    .filter(n => !!n)
}

// Worked on test data, not real data - need to investigate
const parseCardDataWithRegex = (card: string) => {
  const [, cardNumber, firstArray, secondArray] = card.match(/Card (\d+): (.+) \| (.+)/)!
  const myNumbers = firstArray.replace('  ', ' ').split(' ').map(Number)
  const winningNumbers = secondArray.replace('  ', ' ').split(' ').map(Number)
  return { cardNumber, myNumbers, winningNumbers }
}
const parseCardData = (card: string) => {
  const cardParts = card.split('|')
  const cardNumber = cardParts[0].split(':')[0].trim().replace('Card ', '') // Extract the card number

  const myNumbers = formatStringToArr(cardParts[1])
  const winningNumbers = formatStringToArr(cardParts[0].split(': ')[1])
  return { cardNumber, myNumbers, winningNumbers }
}

const part1 = (inputData: string[]): number => {
  const cards = inputData.map(card => {
    const { myNumbers, cardNumber, winningNumbers } = parseCardData(card)

    const matches = myNumbers.filter(element => winningNumbers.includes(element))

    return {
      cardNumber: parseInt(cardNumber),
      myNumbers,
      winningNumbers,
      matches: matches.length,
      score: doubleXTimes(matches.length),
    }
  })

  return cards.reduce((acc, card) => acc + card.score, 0)
}

export default part1
