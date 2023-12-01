import { Grid } from '../../types'

const create2DArray = <T = number>(
  rows: number,
  columns: number,
  valueFn?: (x: number, y: number) => T,
  value: string | number = '*',
): Grid<T> => {
  let array = new Array(rows)
  for (let i = 0; i < rows; i++) {
    array[i] = new Array(columns)
    for (let j = 0; j < columns; j++) {
      array[i][j] = valueFn ? valueFn(i, j) : value
    }
  }

  return array
}

export default create2DArray
