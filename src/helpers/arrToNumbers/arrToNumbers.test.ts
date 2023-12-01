import arrToNumbers from '.'

describe('helpers', () => {
  describe('arrToNumbers', () => {
    it('returns the correct values', () => {
      const result = arrToNumbers(['1', '2'])

      expect(result).toEqual([1, 2])
    })
  })
})
