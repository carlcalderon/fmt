const string = require('./string')

// TODO: value could be a string, array or even object (as json)
module.exports = function (_, mod, value) {
  return string('S', mod, value.toString(16))
}
