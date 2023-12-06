import run from '.'

describe('Run all', () => {
  it('returns the expected values', () => {
    const result = run()
    expect(result).toEqual({ part1: 771628, part2: 27363861 })
  })
})
