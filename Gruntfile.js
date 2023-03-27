module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dev: {
                src: 'src/**/*.ts',
                dest: 'bin/april-fools.js',
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    configure: function (bundler) {
                        bundler.plugin(require('tsify'));
                        bundler.transform(require('babelify'), {
                            presets: ['@babel/env'],
                            extensions: ['.ts']
                        });
                    }
                }
            },
        },
        uglify: {
            dev: {
                files: {
                    'bin/april-fools.min.js': ['bin/april-fools.js'],
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');

    grunt.registerTask('default', ['browserify', 'uglify']);
};