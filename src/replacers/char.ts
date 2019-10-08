import stringReplacer from './string'
import modifiers from '../modifiers'

export default function (_:any, mods:modifiers, value:number):string {
  return stringReplacer('s', mods, String.fromCharCode(Math.floor(value)))
}
