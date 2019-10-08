import stringReplacer from './string'
import modifiers from '../modifiers'

export default function (_:any, mods:modifiers, value:number|string):string {
  if (typeof value === 'string') {
    const chars:Array<number> = (
      value.split('')
      .map((char:string):number => char.charCodeAt(0))
    )
    return stringReplacer('s', mods, chars.map((charCode:number):string => (
     (charCode >>> 0).toString(2).padStart(8,'0')
    )).join(' '))
  }

  return stringReplacer('s', mods, (value >>> 0).toString(2).padStart(8,'0'))
}
