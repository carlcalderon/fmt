import stringReplacer from './string'

// TODO: value could be an array or even object (as json)
export default function (flag:string, mod:string, value:number|string):string {
  if (typeof value === 'number') {
    return stringReplacer(flag === 'X' ? 'S' : 's', mod, value.toString(16))
  }

  const len:number = value.length
  let result:string = ''
  for (let i = 0; i < len; i++) {
    result += ('000' + value.charCodeAt(i).toString(16)).slice(-4)
  }

  return stringReplacer(flag === 'X' ? 'S' : 's', mod, result)
}
