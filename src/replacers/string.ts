import modifiers from '../modifiers'

export default function (flag:string, mods:modifiers, value:string):string {
  const quotes = flag.toLowerCase() === 'q'

  let result:string = String(value)
  if (mods.transform === '_') {
    result = String(value).toLowerCase()
  }

  if (mods.transform === '^' || flag === 'S' || flag === 'Q') {
    result = String(value).toUpperCase()
  }

  if (mods.padding) {
    result = result[mods.negative ? 'padEnd' : 'padStart'](mods.padding)
  }

  if (quotes) {
    return `"${result.replace('"', '\"')}"`
  }
  return result
}
