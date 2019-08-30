const string = require('./string')

module.exports = function (_, mod, value) {
  return string('s', mod, (
    typeof value === 'object'
    ? (
      Array.isArray(value)
      ? 'array'
      : 'object'
    )
    : typeof value
  ))
}
