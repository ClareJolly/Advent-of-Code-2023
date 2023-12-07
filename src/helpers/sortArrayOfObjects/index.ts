/* istanbul ignore file */

const sortArrayOfObjects = <
  T = {
    [key: string]: any
  },
>(
  arr: { [key: string]: any }[],
  key: string,
): T[] => {
  return arr.sort(function (a, b) {
    return a[key] - b[key]
  }) as T[]
}

export default sortArrayOfObjects
