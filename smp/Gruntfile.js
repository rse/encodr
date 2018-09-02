
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
                            presets: [
                                [ "@babel/preset-env", {
                                    "targets": {
                                        "browsers": "last 2 versions, not dead"
                                    }
                                } ]
                            ],
                            plugins: [ [ "@babel/transform-runtime", {
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

