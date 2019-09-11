export default function (flag:string, mod:string, value:string):string {
  const [_=null, padding=null, transform=null] = /^(-?\d)?([_^])?/.exec(mod) || []
  const quotes = flag.toLowerCase() === 'q'

  let result:string = String(value)
  if (transform === '_') {
    result = String(value).toLowerCase()
  }

  if (transform === '^' || flag === 'S' || flag === 'Q') {
    result = String(value).toUpperCase()
  }

  if (padding) {
    const [_=null, direction=null, width=''] = /(-?)(\d+)/.exec(padding) || []
    result = result[direction === '-' ? 'padEnd' : 'padStart'](parseInt(width, 10))
  }

  if (quotes) {
    return `"${escape(result)}"`
  }
  return result
}
