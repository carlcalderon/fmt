import stringReplacer from './string'
import modifiers from '../modifiers'

export default function (_:any, mods:modifiers, value:number):string {
  let sign:string = ''
  if (mods.sign) {
    sign = value < 0 ? '-' : '+'
  }
  return stringReplacer('s', mods, sign + Math.floor(value).toString())
}
