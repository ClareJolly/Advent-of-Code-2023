const part1 = (inputData: string[]): number => {
  const numbers = inputData.map(d => {
    const nums = d.replace(/[a-zA-Z]/g, '')
    return Number(`${nums[0]}${nums[nums.length - 1]}`)
  })
  return numbers.reduce((acc, num) => acc + num)
}

export default part1
