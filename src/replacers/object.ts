export default function (_:any, mod:string, value:object):string {
  if (mod === '-') {
    return JSON.stringify(Object.values(value))
  }
  return JSON.stringify(value)
}
