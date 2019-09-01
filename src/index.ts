import object from './replacers/object'
import type from './replacers/type'
import boolean from './replacers/bool'
import integer from './replacers/integer'
import binary from './replacers/binary'
import char from './replacers/char'
import hex from './replacers/hex'
import float from './replacers/float'
import string from './replacers/string'

const flagMap = new Map([
  ['v', object],
  ['T', type],
  ['t', boolean],
  ['d', integer],
  ['b', binary],
  ['c', char],
  ['x', hex],
  ['f', float],
  ['S', string],
  ['s', string]
])

export function sprintf (format:String, ...a:Array<any>) {
  let i = -1
  return format.replace(
    /(%%)|(?:%([+\-_^\d.:]+)?([vdsfbecxt]))/gi,
    (_, literal, mod, flag) => {
      if (literal) {
        return '%'
      }

      const method = flagMap.get(flag)
      if (method) {
        return method(flag, mod, a[++i])
      }
      throw new SyntaxError(`Unrecognized flag "${flag}".`)
    }
  )
}

export function printf (format:String, ...a:Array<any>) {
  if (process) {
    return process.stdout.write(sprintf(format, ...a))
  }
  return console.log(sprintf(format, ...a))
}
