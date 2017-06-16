/*
**  Encodr -- Encoding/Decoding to/from JSON/CBOR/MsgPack
**  Copyright (c) 2017 Ralf S. Engelschall <rse@engelschall.com>
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

/* global module: true */
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-clean")
    grunt.loadNpmTasks("grunt-browserify")
    grunt.loadNpmTasks("grunt-eslint")
    grunt.loadNpmTasks("grunt-babel")
    grunt.initConfig({
        eslint: {
            options: {
                configFile: "eslint.yaml"
            },
            "gruntfile": [ "Gruntfile.js" ],
            "encodr": [ "src/**/*.js" ]
        },
        browserify: {
            "encodr-browser": {
                files: {
                    "lib/encodr.browser.js": [ "src/encodr.js" ]
                },
                options: {
                    transform: [
                        [ "babelify", {
                            presets: [ "es2015", "es2016", "es2017", "stage-3", "stage-2" ],
                            plugins: [ [ "transform-runtime", {
                                "polyfill":    true,
                                "regenerator": false
                            } ] ]
                        } ],
                        "aliasify",
                        [ "uglifyify", { sourceMap: false, global: true } ]
                    ],
                    plugin: [
                        [ "browserify-derequire" ],
                        [ "browserify-header" ]
                    ],
                    browserifyOptions: {
                        standalone: "Encodr",
                        debug: false
                    }
                }
            }
        },
        babel: {
            "encodr-node": {
                files: {
                    "lib/encodr.node.js": [ "src/encodr.js" ]
                },
                options: {
                    sourceMap: false,
                    presets: [
                        [ "env", {
                            "targets": {
                                "node": 6.0
                            }
                        } ],
                        "es2016",
                        "es2017",
                        "stage-3",
                        "stage-2"
                    ],
                    plugins: [
                        [ "transform-runtime", {
                            "helpers":     true,
                            "polyfill":    true,
                            "regenerator": false,
                            "moduleName":  "babel-runtime"
                        } ]
                    ]
                }
            }
        },
        clean: {
            clean: [],
            distclean: [ "node_modules" ]
        }
    })
    grunt.registerTask("default", [ "eslint", "browserify:encodr-browser", "babel:encodr-node" ])
}

