
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-clean")
    grunt.loadNpmTasks("grunt-browserify")
    grunt.initConfig({
        browserify: {
            "sample": {
                files: {
                    "sample.bundle.js": [ "./sample.js" ]
                },
                options: {
                    transform: [
                        [ "babelify", {
                            presets: [ "es2015", "es2016", "es2017" ],
                            plugins: [ [ "transform-runtime", {
                                "polyfill":    true,
                                "regenerator": false
                            } ] ]
                        } ]
                    ],
                    browserifyOptions: {
                        standalone: "ClientBrowser",
                        debug: false
                    }
                }
            }
        },
        clean: {
            clean: [],
            distclean: [ "node_modules" ]
        }
    })
    grunt.registerTask("default", [ "browserify" ])
}

