const digitWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

const replaceNumbers = (str: string) => {
  const strArr = str.split('')
  let forwards = ''
  let backwards = ''
  while (strArr.length > 0) {
    forwards = forwards + strArr.shift()
    backwards = (strArr.pop() ?? '') + backwards
    digitWords.forEach((word, i) => {
      if (forwards.includes(word)) {
        forwards = forwards.replace(word, i + 1 + word[word.length - 1])
      }
      if (backwards.includes(word)) {
        backwards = backwards.replace(word, word[0] + (i + 1))
      }
    })
  }
  let combined = forwards + backwards
  digitWords.forEach((word, i) => {
    if (combined.includes(word)) {
      combined = combined.replace(word, String(i + 1))
    }
  })
  return combined
}

const getCalibrationDigits = (line: string): number => {
  const firstDigitMatch = line.match(/\d/)
  const lastDigitMatch = line.match(/\d(?=[A-z]*$)/)

  const firstDigit = firstDigitMatch ? Number(firstDigitMatch[0]) : null
  const lastDigit = lastDigitMatch ? Number(lastDigitMatch[0]) : null

  if (firstDigit === null || lastDigit === null) {
    return 0
  }

  return firstDigit * 10 + lastDigit
}

const part2 = (inputData: string[]): number => {
  const replacedInput = inputData.map(line => replaceNumbers(line))

  const calibrationValues = replacedInput.map(r => getCalibrationDigits(r))

  return calibrationValues.reduce((acc, num) => acc + num)
}

export default part2
