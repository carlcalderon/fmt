const stringReplacer:Function = require('./string')

export default function (_:any, mod:string, value:any) {
  return stringReplacer('s', mod, (
    typeof value === 'object'
    ? (
      Array.isArray(value)
      ? 'array'
      : 'object'
    )
    : typeof value
  ))
}
