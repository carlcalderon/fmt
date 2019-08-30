const string = require('./string')

module.exports = function (_, mod, value) {
  return string('s', mod, String.fromCharCode(parseInt(value, 10)))
}
