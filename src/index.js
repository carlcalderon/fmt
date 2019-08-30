const object = require('./replacers/object')
const type = require('./replacers/type')
const boolean = require('./replacers/boolean')
const integer = require('./replacers/integer')
const binary = require('./replacers/binary')
const char = require('./replacers/char')
const hex = require('./replacers/hex')
const float = require('./replacers/float')
const string = require('./replacers/string')

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

function sprintf (format, ...a) {
  let i = -1
  return format.replace(
    /(%%)|(?:%([+\-_^\d.:]+)?([vdsfbecxt]))/gi,
    (_, literal, mod, flag) => {
      ++i
      if (literal) {
        return '%'
      }

      const method = flagMap.get(flag)
      if (method) {
        return method(flag, mod, a[i])
      }
      throw new SyntaxError(`Unrecognized flag "${flag}".`)
    }
  )
}

function printf (format, ...a) {
  if (process) {
    return process.stdout.write(sprintf(format, ...a))
  }
  return console.log(sprintf(format, ...a))
}

module.exports = {
  sprintf,
  printf
}
