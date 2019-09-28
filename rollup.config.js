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
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }
    ],
    plugins
  }
]
