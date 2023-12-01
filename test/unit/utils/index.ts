/* istanbul ignore file */
import { fileToArray } from '../../../src/helpers'
import path from 'path'

interface TestData {
  testData: string[][]
  realData: string[]
}

export const getDataForTest = (src: string, testOptions: number[] = []): TestData => {
  let testDataFile = 'testData'
  let testData: string[][] = []

  if (testOptions.length) {
    testOptions.forEach(f => {
      testData.push(fileToArray(path.join(src, `../data/${testDataFile}${f}.txt`)))
    })
  } else {
    testData.push(fileToArray(path.join(src, `../data/${testDataFile}.txt`)))
  }

  const realData = fileToArray(path.join(src, '../data/input.txt'))

  return { testData, realData }
}
