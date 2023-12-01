/* istanbul ignore file */

const batchByBlankLines = (inputData: string[]): string[][] => {
  const batches = inputData.reduce(
    (acc, item) => {
      if (item === '') {
        acc.push([])
        return acc
      }

      acc[acc.length - 1].push(item)
      return acc
    },
    [[]] as string[][],
  )
  return batches
}

export default batchByBlankLines
