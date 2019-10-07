import stringReplacer from './string'
import modifiers from '../modifiers'

export default function (_:any, mods:modifiers, value:any):string {
  return stringReplacer('s', mods, (value ? 'true' : 'false'))
}
