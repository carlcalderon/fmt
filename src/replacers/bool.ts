import stringReplacer from './string'

export default function (_:any, mod:string, value:any):string {
  return stringReplacer('s', mod, (value ? 'true' : 'false'))
}
