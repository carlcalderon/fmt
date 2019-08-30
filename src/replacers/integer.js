const string = require('./string')

module.exports = function (_, mod, value) {
  return string('s', mod, parseInt(value, 10))
}
