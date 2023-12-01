/* istanbul ignore file */

const sortArrayOfObjects = (arr: { [key: string]: any }[], key: string) => {
  return arr.sort(function (a, b) {
    return a[key] - b[key]
  })
}

export default sortArrayOfObjects
