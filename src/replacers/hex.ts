import stringReplacer from './string'
import modifiers from '../modifiers'

// TODO: value could be an array or even object (as json)
export default function (flag:string, mods:modifiers, value:number|string):string {
  if (typeof value === 'number') {
    return stringReplacer(flag === 'X' ? 'S' : 's', mods, value.toString(16))
  }

  const len:number = value.length
  let result:string = ''
  for (let i = 0; i < len; i++) {
    result += ('000' + value.charCodeAt(i).toString(16)).slice(-4)
  }

  return stringReplacer(flag === 'X' ? 'S' : 's', mods, result)
}
