const part1 = (inputData: string[]): number => {
  const time = inputData[0].match(/\d+/g)!.map(Number)
  const distance = inputData[1].match(/\d+/g)!.map(Number)

  const data = time.map((t, i) => ({ time: t, distance: distance[i] }))

  const summary = data.map(d => {
    const holdOptions = []
    for (let i = 1; i < d.time; i++) {
      const hold = i
      const remainingTime = d.time - i
      const distanceTravelled = i * remainingTime
      holdOptions.push({ hold, remainingTime, distanceTravelled })
    }

    return {
      ...d,
      holdOptions,
    }
  })

  // console.dir(summary, { depth: null })
  const waysToWin = summary.map(s => {
    return s.holdOptions.filter(h => h.distanceTravelled > s.distance).length
  })

  return waysToWin.reduce((acc, item) => acc * item, 1)
}

export default part1
