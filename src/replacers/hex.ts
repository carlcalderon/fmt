import stringReplacer from './string'
import modifiers from '../modifiers'

export default function (flag:string, mods:modifiers, value:any):string {
  let result:string = ''

  const as16BitHex = function (input:string):string {
    let hex:string = ''
    const len:number = input.length
    for (let i = 0; i < len; i++) {
      hex += ('000' + input.charCodeAt(i).toString(16)).slice(-4)
    }
    return hex
  }

  switch (typeof value) {
    case 'number':
      result = value.toString(16)
      break
    case 'string':
      result = as16BitHex(value)
      break
    default:
      result = as16BitHex(JSON.stringify(value))
  }

  return stringReplacer(flag === 'X' ? 'S' : 's', mods, result)
}
