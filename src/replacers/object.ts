import stringReplacer from './string'
import modifiers from '../modifiers'

const typeMap:Map<string, string> = new Map([
  ['string', 's'],
  ['boolean', 't'],
  ['number', 'f'],
])

export default function (_:any, mods:modifiers, value:any):string {
  const flag = typeMap.get(typeof value)
  if (flag !== undefined) {
    return stringReplacer(flag, mods, value)
  }

  if (mods.negative) {
    return JSON.stringify(Object.values(value))
  }
  return JSON.stringify(value)
}
