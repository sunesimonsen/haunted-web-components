import urlImport from 'rollup-plugin-url-import'
import { terser } from "rollup-plugin-terser";

export default {
  output: { file: './public/bundle.js', format: 'esm' },
  plugins: [
    urlImport({
      // Cache fetched modules (default: false)
      cache: true,

      // Cache fetched modules in specified folder
      cache: './.deps',

      // Enable output of fetched urls (default: false)
      verbose: true,
    }),
    terser()
  ]
}
