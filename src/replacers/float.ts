import stringReplacer from './string'
import modifiers from '../modifiers'

export default function (_:any, mods:modifiers, value:number):string {
  let result = String(value)
  const sign:string = (mods.sign && value >= 0) ? '+' : ''

  if (mods.precision) {
    result = value.toFixed(mods.precision)
  }

  return stringReplacer('s', mods, sign + result)
}
