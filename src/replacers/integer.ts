const stringReplacer:Function = require('./string')

export default function (_:any, mod:string, value:number):string {
  return stringReplacer('s', mod, Math.floor(value))
}
