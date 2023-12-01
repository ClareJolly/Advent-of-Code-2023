import splitStringArrToNumbers from '.'

describe('splitStringArrToNumbers', () => {
  it('returns the expected result', () => {
    const result = splitStringArrToNumbers(['12345', '98765'])

    expect(result).toStrictEqual([
      [1, 2, 3, 4, 5],
      [9, 8, 7, 6, 5],
    ])
  })
})
