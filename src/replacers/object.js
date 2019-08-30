module.exports = function (flag, mod, value) {
  if (mod === '-') {
    return JSON.stringify(Object.values(value))
  }
  return JSON.stringify(value)
}
