import { BasicCard, Card } from '../types'

export const doubleXTimes = (times: number, number: number = 1): number => {
  if (times > 0) {
    for (let i = 1; i < times; i++) {
      number *= 2
    }
    return number
  }
  return 0
}

export const formatStringToArr = (str: string): number[] => {
  return str
    .split(' ')
    .filter(n => !!n)
    .map(n => Number(n))
}

// Worked on test data, not real data - need to investigate
export const parseCardDataWithRegex = (card: string): BasicCard => {
  const [, cardNumber, firstArray, secondArray] = card.match(/Card (\d+): (.+) \| (.+)/)!
  const myNumbers = firstArray.replace('  ', ' ').split(' ').map(Number)
  const winningNumbers = secondArray.replace('  ', ' ').split(' ').map(Number)

  const matches = myNumbers.filter(element => winningNumbers.includes(element))

  return { cardNumber: Number(cardNumber), myNumbers, winningNumbers, matches: matches.length }
}
export const parseCardData = (card: string): BasicCard => {
  const cardParts = card.split('|')
  const cardNumber = cardParts[0].split(':')[0].trim().replace('Card ', '') // Extract the card number

  const myNumbers = formatStringToArr(cardParts[1])
  const winningNumbers = formatStringToArr(cardParts[0].split(': ')[1])

  const matches = myNumbers.filter(element => winningNumbers.includes(element))

  return { cardNumber: Number(cardNumber), myNumbers, winningNumbers, matches: matches.length }
}

export const formatCardData = (card: BasicCard): Card => {
  const { cardNumber, myNumbers, winningNumbers, matches } = card
  return {
    cardNumber,
    myNumbers,
    winningNumbers,
    matches,
    score: doubleXTimes(matches),
  }
}
