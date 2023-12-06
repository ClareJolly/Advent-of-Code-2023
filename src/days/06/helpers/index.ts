export interface RaceData {
  time: number
  distance: number
}

export interface HoldOptions {
  hold: number
  remainingTime: number
  distanceTravelled: number
}

export interface RaceDataSummary extends RaceData {
  holdOptions: HoldOptions[]
}

export const extractNumbersFromStringToArray = (str: string): number[] =>
  str.match(/\d+/g)!.map(Number)

export const summariseData = (data: RaceData[]): RaceDataSummary[] => {
  return data.map(d => {
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
}

export const getResult = (summary: RaceDataSummary[]): number => {
  const waysToWin = summary.map(s => {
    return s.holdOptions.filter(h => h.distanceTravelled > s.distance).length
  })

  return waysToWin.reduce((acc, item) => acc * item, 1)
}
