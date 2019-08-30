const string = require('./string')

module.exports = function (_, mod, value) {
  return string('s', mod, (value >>> 0).toString(2))
}
