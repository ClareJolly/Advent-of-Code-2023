import { batchByBlankLines } from '../../../helpers'
import {
  extractSeeds,
  formatAlmanacData,
  getStageDetails,
  parseAlmanacData,
  processSeedsBatch,
} from '../helpers'
import { FormattedData, Summary } from '../types'
const doWeHaveThatSeed = (seeds, seed: number, almanac): boolean =>
  seeds.some(([seedStart, length]) => seedStart <= seed && seedStart + length >= seed)

const parseNumbers = (str: string) =>
  str
    .split(' ')
    .filter(x => x !== '')
    .map(x => parseInt(x))
const groupNumbers = (numbers: number[], grouping: number): number[][] =>
  Array.from({ length: numbers.length / grouping }, (_, i) =>
    numbers.slice(i * grouping, i * grouping + grouping),
  )

// inversion of getSeedLocation function
function getSeedGivenLocation(step: number, almanac): number {
  for (const almanacEntry of almanac.slice().reverse()) {
    for (const [destination, source, length] of almanacEntry) {
      if (destination <= step && destination + length > step) {
        step = source + step - destination
        break
      }
    }
  }

  return step
}
const part2 = (inputData: string[]): number => {
  const data2 = batchByBlankLines(inputData)
  console.log('  ~ file: index.ts:47 ~ part2 ~ data2:', data2)
  const almanac = data2.slice(1).map(x =>
    groupNumbers(
      x[1].split(' ').map(n => Number(n)),
      3,
    ),
  )
  console.log('  ~ file: index.ts:45 ~ part2 ~ almanac:', almanac)
  // const input = inputData
  //   .filter(x => x !== '')
  //   .map(x => {
  //     console.log('  ~ file: index.ts:38 ~ input ~ x:', x)

  //     return parseNumbers(x.split(':')[1])
  //   })
  // console.log('  ~ file: index.ts:38 ~ part2 ~ input:', input)
  // const seeds = input[0]

  const data = batchByBlankLines(inputData)
  const rawSeedsData = extractSeeds(inputData)
  const seedsDetails = rawSeedsData.reduce((result, _, index, array) => {
    if (index % 2 === 0) {
      result.push([array[index], array[index + 1]])
    }
    return result
  }, [] as [number, number][])

  const roughAlmanacData = parseAlmanacData(data)
  const almanacData: FormattedData = formatAlmanacData(roughAlmanacData)

  const locationData = almanacData.location
  console.log('  ~ file: index.ts:25 ~ part2 ~ locationData:', locationData)
  const minDest = locationData.mapSummary.map(m => m.destinationStart)
  console.log('  ~ file: index.ts:27 ~ part2 ~ minDest:', minDest)
  const min = locationData.mapSummary.find(m => m.sourceStart === Math.min(...minDest))
  console.log('  ~ file: index.ts:29 ~ part2 ~ min:', min)

  const batchSize = 10000 // Define the batch size
  let minLocation = Infinity

  for (let i = 0; i < seedsDetails.length; i += batchSize) {
    let seedsBatch: [number, number][] = seedsDetails.slice(i, i + batchSize)
    let batchResult = processSeedsBatch(seedsBatch, almanacData)
    if (batchResult < minLocation) {
      minLocation = batchResult
    }
    // Clear memory as much as possible after each batch if needed
    seedsBatch = null
    batchResult = null
  }

  for (let i = 0; i < 1_000_000_000; i++) {
    const seed = getSeedGivenLocation(i, almanac)

    if (doWeHaveThatSeed(seedsDetails, seed, almanac)) {
      console.log('Part 2', i)
      break
    }
  }

  return minLocation
}

export default part2
