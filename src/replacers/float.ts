const stringReplacer:Function = require('./string')

export default function (_:any, mod:string, value:number):string {
  if (mod) {
    const modifiers:Array<number> = mod.split('.').map(Number)
    if (modifiers.length === 2) {
      if (modifiers[0]) { // padding
        if (modifiers[1]) { // decimals
          return stringReplacer('s', modifiers[0], value.toFixed(Math.floor(modifiers[1])))
        }
        return stringReplacer('s', modifiers[0], String(value))
      }
      return String(value.toFixed(Math.floor(modifiers[1])))
    }
    return value.toFixed(modifiers[0])
  }
  return String(value)
}
