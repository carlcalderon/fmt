const stringReplacer:Function = require('./string')

export default function (_:any, mod:string, value:number|string):string {
  if (typeof value === 'string') {
    const chars:Array<number> = (
      value.split('')
      .map((char:string):number => char.charCodeAt(0))
    )
    return stringReplacer('s', mod, chars.map((charCode:number):string => (
     (charCode >>> 0).toString(2)
    )).join())
  }

  return stringReplacer('s', mod, (value >>> 0).toString(2))
}
