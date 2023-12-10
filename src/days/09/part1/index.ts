const part1 = (inputData: string[]): number => {
  const data = inputData.map(line => line.split(' ').map(val => Number(val)))

  const sequences = data.map(d => {
    let layers = [d]
    let currentLayer = d

    while (!currentLayer.every(val => val === 0)) {
      let differences = []

      for (let i = 0; i < currentLayer.length - 1; i++) {
        differences.push(currentLayer[i + 1] - currentLayer[i])
      }

      currentLayer = differences

      layers.push(currentLayer)
    }

    return layers

    // let allZero = false
    // let x = 1
    // const diffs = [d, []]
    // let arr: number[] = [...d]
    // while (!allZero && x < 5) {
    //   arr.forEach((dd, i) => {
    //     if (i < arr.length - 1) {
    //       diffs[x].push(calculateDiff(dd, arr[i + 1]))
    //       // diffs[x].push(Math.abs(dd - arr[i + 1]))
    //     }
    //   })
    //   if (diffs[x].every(v => v === 0)) {
    //     allZero = true
    //     diffs[x].push(0)

    //     for (let j = 1; j <= x; j++) {
    //       diffs[x - j].push(
    //         diffs[x - (j - 1)][diffs[x - (j - 1)].length - 1] +
    //           diffs[x - j][diffs[x - j].length - 1],
    //       )
    //     }
    //   }
    //   arr = [...diffs[x]]
    //   diffs.push([])
    //   x++
    // }
    // return diffs
  })
  const list = sequences.map(layers =>
    layers.reduce((acc, layer) => acc + layer[layer.length - 1], 0),
  )
  return list.reduce((sum, h) => sum + h)
}

export default part1
