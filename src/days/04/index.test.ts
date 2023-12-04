import run from '.'

describe('Run all', () => {
  it('returns the expected values', () => {
    const result = run()
    expect(result).toEqual({ part1: 20829, part2: 12648035 })
  })
})
