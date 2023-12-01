import fs from 'fs'

const fileToArray = (filepath: string): string[] => {
  const fileAsArray = fs.readFileSync(filepath, 'utf-8').split('\n')
  return fileAsArray.map(item => item.replace('\r', ''))
}

export default fileToArray
