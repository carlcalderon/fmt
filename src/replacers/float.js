const string = require('./string')

module.exports = function (_, mod, value) {
  if (mod) {
    const modifiers = mod.split('.')
    if (modifiers.length === 2) {
      if (modifiers[0]) { // padding
        if (modifiers[1]) { // decimals
          return string('s', modifiers[0], value.toFixed(parseInt(modifiers[1], 10)))
        }
        return string('s', modifiers[0], String(value))
      }
      return String(value.toFixed(parseInt(modifiers[1], 10)))
    }
    return value.toFixed(modifiers[0])
  }
  return String(value)
}
