/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt){

  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-jshint");

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
      all: ['Gruntfile.js', 'tests/**/*.js', '!vendor/*.*', '!tests/vendor/*.*'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "lib",
          modules: [{ name: "main" }],
          optimize: 'uglify2',
          preserveLicenseComments: false,
          generateSourceMaps: true,
          dir: "tmp/"
        }
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

  grunt.registerTask('default', ['jshint', 'connect', 'qunit']);
  grunt.registerTask('build', ['requirejs', 'copy']);
};
