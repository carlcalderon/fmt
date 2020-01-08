import object from './replacers/object'
import type from './replacers/type'
import boolean from './replacers/bool'
import integer from './replacers/integer'
import binary from './replacers/binary'
import char from './replacers/char'
import hex from './replacers/hex'
import float from './replacers/float'
import string from './replacers/string'

import modifiers from './modifiers'

const flagMap = new Map([
  ['v', object],
  ['T', type],
  ['t', boolean],
  ['d', integer],
  ['b', binary],
  ['c', char],
  ['X', hex],
  ['x', hex],
  ['f', float],
  ['Q', string],
  ['q', string],
  ['S', string],
  ['s', string]
])

export default function sprintf (format:string, ...a:Array<any>) {
  let i = -1
  return format.replace(
    /(%%)|(?:%(?:(\+)?([\^_])?(\-)?(\d+)?(?:\.(\d+))?)?([vdsfbecxtq]))/gi,
    (
      _,
      literal,
      sign,
      transform,
      negative,
      padding,
      precision,
      flag
    ) => {
      if (literal) {
        return '%'
      }

      const mods:modifiers = {
        sign: Boolean(sign),
        transform,
        negative: Boolean(negative),
        padding: parseInt(padding, 10),
        precision: parseInt(precision, 10)
      }

      const method = flagMap.get(flag)
      if (method) {
        return method(flag, mods, a[++i])
      }
      throw new SyntaxError(`Unrecognized flag "${flag}".`)
    }
  )
}
