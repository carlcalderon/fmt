// TODO: add padding
export default function (flag:string, mod:string, value:string):string {
  const [_=null, padding=null, transform=null] = /^(-?\d)?([_^])?/.exec(mod) || []
  let result:string = String(value)
  if (transform === '_') {
    result = String(value).toLowerCase()
  }
  if (transform === '^' || flag === 'S') {
    result = String(value).toUpperCase()
  }
  if (padding) {
    const [_=null, direction=null, width=''] = /(-?)(\d+)/.exec(padding) || []
    result = result[direction === '-' ? 'padEnd' : 'padStart'](parseInt(width, 10))
  }
  return result
}
