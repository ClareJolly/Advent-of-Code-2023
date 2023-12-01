import mockFs from 'mock-fs'

import fileToArray from '.'

const fileStruct = {
  'path/to/textList.txt': Buffer.from('1\n2\n3'),
  'path/to/textListWin.txt': Buffer.from('1\r\n2\r\n3\r'),
}

describe('fileToArray', () => {
  beforeEach(() => {
    mockFs(fileStruct)
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('returns the expected data', () => {
    expect(fileToArray('path/to/textList.txt')).toEqual(['1', '2', '3'])
  })
  it('returns the expected data when on windows', () => {
    expect(fileToArray('path/to/textListWin.txt')).toEqual(['1', '2', '3'])
  })
})
