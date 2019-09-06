import path from 'path'
import typescriptPlugin from 'rollup-plugin-typescript2'
import pkg from './package.json'

const plugins = [
  typescriptPlugin({
    typescript: require('typescript'),
  })
]

export default [
  {
    input: path.resolve(__dirname, 'lib', 'bundle', 'index.js'),
    output: [
      {
        file: pkg.main,
        name: pkg.name,
        format: 'umd',
      },
      {
        file: pkg.module,
        format: 'es',
      }
    ],
    plugins
  }
]
