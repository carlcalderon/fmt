import path from "path"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import typescriptPlugin from "rollup-plugin-typescript2"
import typescript from "typescript"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }))

const plugins = [
  typescriptPlugin({
    typescript,
  }),
]

export default [
  {
    input: path.resolve(__dirname, "lib", "bundle", "index.js"),
    output: [
      {
        file: pkg.main,
        name: pkg.name,
        format: "umd",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "es",
        sourcemap: true,
      },
    ],
    plugins,
  },
]
