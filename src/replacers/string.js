// TODO: add padding
module.exports = function (flag, mod, value) {
  const [_, padding, transform] = /^(-?\d)?([_^])?/.exec(mod) || []
  let result = String(value)
  if (transform === '_') {
    result = String(value).toLowerCase()
  }
  if (transform === '^' || flag === 'S') {
    result = String(value).toUpperCase()
  }
  if (padding) {
    const [_, direction, width] = /(-?)(\d+)/.exec(padding)
    result = result[direction === '-' ? 'padEnd' : 'padStart'](parseInt(width, 10))
  }
  return result
}
