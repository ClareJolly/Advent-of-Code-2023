import create2DArray from '.'

describe('create2DArray', () => {
  it('returns the expected result', () => {
    const result = create2DArray(1, 2, () => {
      return 2
    })

    expect(result).toStrictEqual([[2, 2]])
  })
})
