import stringReplacer from './string'

// TODO: value could be a string, array or even object (as json)
export default function (flag:string, mod:string, value:number):string {
  return stringReplacer(flag === 'X' ? 'S' : 's', mod, value.toString(16))
}
