import stringReplacer from './string'

const typeMap:Map<string, string> = new Map([
  ['string', 's'],
  ['boolean', 't'],
  ['number', 'f'],
])

export default function (_:any, mod:string, value:any):string {
  const flag = typeMap.get(typeof value)
  if (flag !== undefined) {
    return stringReplacer(flag, mod, value)
  }

  if (mod === '-') {
    return JSON.stringify(Object.values(value))
  }
  return JSON.stringify(value)
}
