import stringReplacer from './string'

export default function (_:any, mod:string, value:number):string {
  return stringReplacer('s', mod, String.fromCharCode(Math.floor(value)))
}
