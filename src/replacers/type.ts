import stringReplacer from './string'
import modifiers from '../modifiers'

export default function (_:any, mods:modifiers, value:any) {
  return stringReplacer('s', mods, (
    typeof value === 'object'
    ? (
      Array.isArray(value)
      ? 'array'
      : 'object'
    )
    : typeof value
  ))
}
