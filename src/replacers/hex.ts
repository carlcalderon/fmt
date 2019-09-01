import stringReplacer from './string'

// TODO: value could be a string, array or even object (as json)
export default function (_:any, mod:string, value:number):string {
  return stringReplacer('S', mod, value.toString(16))
}
