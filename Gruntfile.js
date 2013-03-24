/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt){

  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");

  function serveTriforce(base){
      return function(req, res, next){
        if(req.url == "/triforce-latest.js"){
          fs = require("fs");
          var triforcePath = base + "/../dist/triforce.js";
          fs.readFile(triforcePath, function(err,data){
            if(!err){
              res.end(data);
            } else {
              return next();
            }
          });
        } else {
          return next();
        }
      }
  }

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

    jshint: {
      all: ['!Gruntfile.js', 'lib/**/*.js', 'tests/**/*.js', '!vendor/*.*', '!tests/vendor/*.*'],
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
            "triforce": "main",
            "mootools-core": "../vendor/mootools-core",
            "mootools-more": "../vendor/mootools-more"
          },
          modules: [{ name: "triforce" }],
          optimize: 'none',
          preserveLicenseComments: false,
          generateSourceMaps: true,
          useSourceUrl: true,
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
          { src: "tmp/*.map", dest: "dist/", flatten: true, expand: true, filter: "isFile" },
          { src: "tmp/*.src", dest: "dist/", flatten: true, expand: true, filter: "isFile" }
        ]
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      },
      examples: {
        options: {
          port: 9001,
          base: 'examples',
          keepalive: true,
          middleware: function(connect, options){
            return [
              serveTriforce(options.base),
              connect.static(options.base),
              connect.directory(options.base)
            ];
          }
        }
      }
    }

  });

  grunt.registerTask('default', ['connect:server', 'watch']);
  grunt.registerTask('build', ['jshint', 'requirejs', 'copy']);
};
