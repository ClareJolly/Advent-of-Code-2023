import yargs from 'yargs'
const argv = yargs.argv

const run = async () => {
  const day = argv.day || argv.d || '01'
  const testData = argv.test || argv.t || false
  const realData = argv.real || argv.r || true
  try {
    const { default: dayFunc } = await import(`./${day}`)
    dayFunc({ testData, realData })
  } catch (e) {
    console.error('Error', e)
  }
}

run()
