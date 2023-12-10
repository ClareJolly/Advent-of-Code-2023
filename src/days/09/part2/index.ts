const part2 = (inputData: string[]): number => {
  const data = inputData.map(line => line.split(' ').map(val => Number(val)))

  const sequences = data.map(d => {
    let layers = [d]
    let currentLayer = d

    while (!currentLayer.every(val => val === 0)) {
      let differences = []

      for (let i = 0; i < currentLayer.length - 1; i++) {
        differences.unshift(currentLayer[i + 1] - currentLayer[i])
      }

      currentLayer = differences

      layers.push(currentLayer)
    }

    return layers
  })
  const seq = data.map(d => {
    let allZero = false
    let x = 1
    const diffs = [[...d], []]
    let arr: number[] = [...d]
    while (!allZero && x < 5) {
      arr.forEach((dd, i) => {
        if (i < arr.length - 1) {
          // diffs[x].push(dd - arr[i + 1])
          // diffs[x].push(Math.abs(dd - arr[i + 1]))
          diffs[x].push(arr[i + 1] - dd)
        }
      })
      if (diffs[x].every(v => v === 0)) {
        allZero = true
        diffs[x].unshift(0)

        for (let j = 1; j <= x; j++) {
          // diffs[x - j].unshift(diffs[x - (j - 1)][0] + diffs[x - j][0])
          console.log('  ~ file: index.ts:43 ~ seq ~ diffs[x - j][0]:', diffs[x - j][0])
          console.log('  ~ file: index.ts:42 ~ seq ~ diffs[x - (j - 1)][0]:', diffs[x - (j - 1)][0])
          diffs[x - j].unshift(diffs[x - j][0] - diffs[x - (j - 1)][0])
        }
      }
      arr = [...diffs[x]]
      diffs.push([])
      x++
    }
    return diffs
  })
  console.log('  ~ file: index.ts:53 ~ seq ~ seq:', seq)
  console.log('  ~ file: index.ts:50 ~ sequences ~ sequences:', sequences)
  return seq.reduce((sum, item) => {
    const val = item[0][0]
    console.log('  ~ file: index.ts:53 ~ returnsequences.reduce ~ val:', val)
    return sum + val
  }, 0)
  const list = sequences.map(layers => layers.reduce((acc, layer) => acc + layer[0], 0))
  console.log('  ~ file: index.ts:54 ~ part2 ~ list:', list)
  return list.reduce((sum, h) => sum + h)
}

export default part2
