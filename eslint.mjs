/*
**  Encodr -- Encoding/Decoding to/from JSON/CBOR/MsgPack
**  Copyright (c) 2017-2025 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import pluginJs      from "@eslint/js"
import pluginStd     from "neostandard"
import pluginN       from "eslint-plugin-n"
import pluginImport  from "eslint-plugin-import"
import pluginPromise from "eslint-plugin-promise"
import globals       from "globals"

export default [
    pluginJs.configs.recommended,
    ...pluginStd({
        ignores: pluginStd.resolveIgnoresFromGitignore()
    }),
    {
        plugins: {
            "n":       pluginN,
            "import":  pluginImport,
            "promise": pluginPromise
        },
        files:   [ "**/*.js" ],
        languageOptions: {
            ecmaVersion: 12,
            sourceType:  "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: false
                }
            },
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.worker,
                ...globals.serviceworker,
                process: true
            }
        },
        rules: {
            /*  disabled rules  */
            "curly":                                              "off",

            /*  modified rules  */
            "@stylistic/indent":                                  [ "error", 4, { SwitchCase: 1 } ],
            "@stylistic/linebreak-style":                         [ "error", "unix" ],
            "@stylistic/brace-style":                             [ "error", "stroustrup", { allowSingleLine: true } ],
            "@stylistic/quotes":                                  [ "error", "double" ],
            "@stylistic/operator-linebreak":                      [ "error", "after", { overrides: { "&&": "before", "||": "before", ":": "before" } } ],

            /*  disabled stylistic rules  */
            "@stylistic/no-multi-spaces":                         "off",
            "@stylistic/no-multiple-empty-lines":                 "off",
            "@stylistic/key-spacing":                             "off",
            "@stylistic/object-property-newline":                 "off",
            "@stylistic/space-in-parens":                         "off",
            "@stylistic/array-bracket-spacing":                   "off",
            "@stylistic/semi":                                    "off",
            "@stylistic/comma-spacing":                           "off",
            "@stylistic/space-infix-ops":                         "off",
            "@stylistic/computed-property-spacing":               "off",
            "@stylistic/quote-props":                             "off",
            "@stylistic/multiline-ternary":                       "off",
            "@stylistic/lines-between-class-members":             "off"
        }
    },
    {
        /*  test files configuration  */
        files:   [ "tst/**/*.js" ],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.mocha
            }
        }
    }
]
