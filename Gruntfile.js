/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt){

  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.initConfig({
    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:8000/tests/main.html'
          ]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'tests/**/*.js', '!vendor/*.*', '!tests/vendor/*.*'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "lib",
          shim: {
            'mootools-core': {
              exports: 'MooTools'
            },
            'mootools-more': {
              exports: 'MooTools.More'
            },
            'functools': {
              deps: ['mootools-core'],
              exports: 'functools'
            },
            'promises': {
              deps: ['functools'],
              exports: 'Promises'
            }
          },
          paths: {
            "mootools-core": "../vendor/mootools-core",
            "mootools-more": "../vendor/mootools-more",
            "functools": "../vendor/functools",
            "promises": "../vendor/promises"
          },
          modules: [{ name: "main" }],
          optimize: 'uglify2',
          preserveLicenseComments: false,
          generateSourceMaps: true,
          dir: "tmp/"
        }
      }
    },

    watch: {
      tests: {
        files: ['tests/**/*.js', 'lib/**/*.js', 'vendor/**/*.js'],
        tasks: ['jshint', 'qunit']
      }
    },

    copy: {
      main: {
        files: [
          { src: "tmp/main.js", dest: "dist/triforce.js" },
          { src: "tmp/*.map", dest: "dist/", flatten: true, expand: true, filter: "isFile" }
        ]
      }
    }
  });

  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('build', ['requirejs', 'copy']);
};
