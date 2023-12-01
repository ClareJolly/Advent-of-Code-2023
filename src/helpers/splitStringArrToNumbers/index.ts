const splitStringArrToNumbers = (data: string[]) => data.map(d => d.split('').map(n => Number(n)))

export default splitStringArrToNumbers
