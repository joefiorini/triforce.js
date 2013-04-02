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
    function serveFile(res, next, path){
      fs.readFile(path, function(err,data){
        if(!err){
          res.end(data);
        } else {
          return next();
        }
      });
    }

    return function(req, res, next){

      serveFile1 = serveFile.bind(this, res, next);

      if(req.url == "/triforce-latest.js"){
        fs = require("fs");
        var triforcePath = base + "/../dist/triforce.js";
        serveFile1(triforcePath);
      } else if(req.url.match(/\.map$/)){
        var path = base + "/../dist" + req.url;
        serveFile1(path);
      } else if(req.url.match(/\.src$/)){
        var path = base + "/../dist" + req.url;
        serveFile1(path);
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
            'prime': {
              exports: 'prime'
            },
            'gator': {
              exports: 'Gator'
            },
            'jwerty': {
              exports: 'jwerty'
            }
          },
          paths: {
            "triforce": "main",
            "gator": "../vendor/gator",
            "jwerty": "../vendor/jwerty",
            "underscore": "../node_modules/lodash/lodash",
            "bacon": "../node_modules/baconjs/dist/bacon",
            "prime": "../node_modules/prime/index"
          },
          modules: [{ name: "triforce" }],
          optimize: 'none',
          preserveLicenseComments: false,
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
