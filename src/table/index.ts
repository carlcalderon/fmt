import sprintf from '../sprintf'
import * as palettes from './palettes'


interface ITableKeyMap {
  [key: string]: {
    label: string
    format?: (data:any) => string|null
  }
}

interface ITableKey {
  key: string
  label: string
  format?: (data:any) => string|null
}


interface ITableData {
  [key: string]: any
}

interface ITableConfig {
  palette: string
  padding: number
  silent: boolean
}

const defaultConfig:ITableConfig = {
  palette: palettes.DEFAULT,
  padding: 1,
  silent: false
}

export default function table (
  keyMap:ITableKeyMap|Array<ITableKey>,
  data:Array<ITableData>,
  configuration:ITableConfig=defaultConfig
): string {

  // Fill in config gaps with defaults
  const config:ITableConfig = {...defaultConfig, ...configuration}

  // Deconstruct the palette into managable chunks
  const [
    TL, TS, TM, TR,
    LL, LS, LM, LR,
    ML, MS, MM, MR,
    RL, RS, RM, RR,
    BL, BS, BM, BR,
  ] = config.palette.split('')

  // Convert object based keyMap to array based keyMap
  const keys:Array<ITableKey> =
    Array.isArray(keyMap) ? keyMap : Object.keys(keyMap).map(key => {
      return { key, ...keyMap[key] }
    })

  // Figure out how many characters the longest value/label is per column
  const lengthMap = new Map(keys.map(({key, label}) => (
    [
      key,
      data.reduce((longest, item) => {
        const itemLength:number = String(item[key]).length
        return Math.max(longest, itemLength)
      }, label.length) + config.padding * 2
    ]
  )))

  // Generate placeholder whitespace for each column width
  const columns:Array<string> = keys.map(({key}) => (
    sprintf(`%${lengthMap.get(key)}s`,' ')
  ))

  // generateSolidRow returns a table row of provided parts
  const generateSolidRow = (
    left:string, separator:string, middle:string, right:string
  ):string => (
    `${left}${columns.join(middle).replace(/ /g, separator)}${right}`
  )

  // generateRow returns a table row with content
  const generateRow = (
    left:string, separator:string, middle:string, right:string, row:ITableData
  ):string => (
    left + keys.map(({key}) => (
      sprintf(
        `%${config.padding}s%-${Number(lengthMap.get(key)) - config.padding}s`,
        '',
        row[key]
      )
    )).join(middle) + right
  )

  // This is where the table will be stored
  const  result:Array<string> = []

  // top
  result.push(generateSolidRow(TL, TS, TM, TR))

  // labels
  result.push(generateRow(LL, LS, LM, LR, keys.reduce((r, {key, label}) => {
    r[key] = label
    return r
  }, {})))

  // mid
  result.push(generateSolidRow(ML, MS, MM, MR))

  // rows
  result.push(data.map(row => {
    const formattedRow = keys.reduce((r, {key, format}) => {
      r[key] = format ? format(row[key]) : row[key]
      return r
    }, {})
    return generateRow(RL, RS, RM, RR, formattedRow)
  }).join('\n'))

  // end
  result.push(generateSolidRow(BL, BS, BM, BR))

  const finalizedResult:string = result.join('\n')

  if (config.silent === false) {
    if (process) {
      process.stdout.write(finalizedResult + '\n')
    } else {
      console.log(finalizedResult)
    }
  }

  return finalizedResult
}
