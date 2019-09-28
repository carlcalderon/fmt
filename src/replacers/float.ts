import stringReplacer from './string'

export default function (_:any, mod:string, value:number):string {
  if (mod) {
    const modifiers:Array<number> = mod.split('.').map(Number)
    if (modifiers.length === 2) {
      if (modifiers[0]) {
        if (modifiers[1]) {
          return stringReplacer('s', modifiers[0].toString(), value.toFixed(Math.floor(modifiers[1])))
        }
        return stringReplacer('s', modifiers[0].toString(), String(value))
      }
      return String(value.toFixed(Math.floor(modifiers[1])))
    }
    return value.toFixed(modifiers[0])
  }
  return String(value)
}
