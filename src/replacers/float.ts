import stringReplacer from './string'
import modifiers from '../modifiers'

export default function (_:any, mods:modifiers, value:number):string {
  let result = String(value)
  if (mods.precision) {
    result = value.toFixed(mods.precision)
  }
  return stringReplacer('s', mods, result)
}
